// src/app/api/weather/route.js
import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';


// export async function DELETE() {

//   const db = await connectToDatabase();
//   const collection = await db.collection('WeatherLogs');

//   try {
    
//     await collection.deleteMany({ localTimestamp: { $exists: true } });
//     return NextResponse.json({ success: true, message: 'Weather data deleted' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: 'Failed to delete weather data' }, { status: 500 });
//   }

// }

// POST /api/weather
// Purpose:
// get weather data for a city from the OpenWeatherMap API or from cache (MongoDB)
// Input Example:
// { "city": "Haifa" }
export async function POST(req) {
  try {
    const { city } = await req.json();
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!city) {
      return NextResponse.json({ success: false, message: 'City is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = await db.collection('WeatherLogs');

    // Calculate date range: today and the next 3 days
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 3);
    endDate.setUTCHours(23, 59, 59, 999); // Ensure endDate includes the entire end day

    // Generate array of expected timestamps (00:00, 03:00, 06:00, ..., 21:00) for each day in the range
    const expectedTimestamps = [];
    for (let d = new Date(today); d <= endDate; d.setUTCDate(d.getUTCDate() + 1)) {
      for (let hour of [0, 3, 6, 9, 12, 15, 18, 21]) {
        const timestamp = new Date(d);
        timestamp.setUTCHours(hour, 0, 0, 0);
        expectedTimestamps.push(timestamp.toISOString());
      }
    }

    // Find existing records in the database within the date range
    const existingRecords = await collection.find({ "city.name": city, localTimestamp: { $gte: today, $lte: endDate } }).toArray();

    // Check if any expected timestamp is missing
    const missingTimestamps = expectedTimestamps.filter(ts => !existingRecords.some(record => record.localTimestamp.toISOString() === ts));

    if (missingTimestamps.length === 0) {
      // If no timestamps are missing, return the existing records
      return NextResponse.json({ success: true, source: 'cache', data: existingRecords }, { status: 200 });
    }

    // If any timestamps are missing, make an API call
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;


    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, message: data.message }, { status: response.status });
    }

    const cityData = {
      name: data.city.name,
      country: data.city.country,
      sunrise: data.city.sunrise,
      sunset: data.city.sunset,
    };

    const timezoneOffset = data.city.timezone;

    // Transform the data to the new format
    const transformedData = data.list.map(entry => ({
      dt: entry.dt,
      localTimestamp: new Date(entry.dt * 1000 + timezoneOffset * 1000),
      city: cityData,
      weatherData: {
        temperature: entry.main.temp,
        feels_like: entry.main.feels_like,
        humidity: entry.main.humidity,
        main: entry.weather[0].main,
        description: entry.weather[0].description,
        icon: entry.weather[0].icon,
      },
      updatedAt: new Date(),
    }));

    // Update existing records and add new ones
    for (const entry of transformedData) {
      await collection.updateOne(
        { dt: entry.dt, "city.name": city },
        { $set: entry },
        { upsert: true }
      );
    }

    // Delete old records (at least 2 days old)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    await collection.deleteMany({ "city.name": city, localTimestamp: { $lt: twoDaysAgo } });

    // Fetch updated records for today and the next 3 days
    const updatedRecords = await collection.find({ "city.name": city, localTimestamp: { $gte: today, $lte: endDate } }).toArray();

    return NextResponse.json({ success: true, source: 'api', data: updatedRecords }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch weather data' }, { status: 500 });
  }
}