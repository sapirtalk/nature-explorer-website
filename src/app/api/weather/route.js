// src/app/api/weather/route.js
import { connectToDatabase } from '../middleware/mongo';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { city } = await req.json();
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  if (!city) {
    return NextResponse.json({ success: false, message: 'City is required' }, { status: 400 });
  }

  const db = await connectToDatabase();
  const collection = await db.collection('WeatherLogs');

  // Check if there's existing data within the last 12 hours
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
  const existingEntry = await collection.findOne({ city, importTime: { $gte: twelveHoursAgo } });

  if (existingEntry) {
    return NextResponse.json({ success: true, source: 'api call to the database', data: existingEntry.data }, { status: 200 });
  }

  // If no recent data, make an API call
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ success: false, message: data.message }, { status: response.status });
    }

        // Get the timezone offset in seconds
        const timezoneOffset = data.city.timezone;

        // Convert sunrise and sunset to local time
        const sunriseUTC = new Date(data.city.sunrise * 1000);
        const sunsetUTC = new Date(data.city.sunset * 1000);
        const sunriseLocal = new Date(sunriseUTC.getTime() + timezoneOffset * 1000);
        const sunsetLocal = new Date(sunsetUTC.getTime() + timezoneOffset * 1000);
    
        // Update the city object with local times
        const cityData = {
          ...data.city,
          sunrise: sunriseLocal,
          sunset: sunsetLocal
        };

      // Transform the data to a dictionary of dictionaries with local time conversion
      const transformedData = data.list.reduce((acc, entry) => {
        // Convert dt_txt from UTC to local time
        const utcTime = new Date(entry.dt * 1000); // dt is in Unix time format
        const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
        const localTimeStr = localTime.toISOString();
  
        acc[localTimeStr] = entry;
        return acc;
      }, {});
  
      const structuredData = { ...data, city: cityData, list: transformedData };
  
      const weatherLog = { 
          city,
          importTime: new Date(),
          timezone: timezoneOffset, // Timezone offset in seconds from UTC
          data: structuredData
      };

    // Insert new data with importTime
    const result = await collection.insertOne(weatherLog);

    // Fetch the inserted document
    const insertedDocument = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json({ success: true, source: 'api call to the weather service', data: insertedDocument }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch weather data' }, { status: 500 });
  }
}