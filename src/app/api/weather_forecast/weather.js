// // Load environment variables from .env file
// require('dotenv').config();
// const axios = require('axios');
// const get = axios.get;  // Assign the get method from axios to a variable


// // Get environment variables
// const appId = process.env.OPEN_WEATHER_MAP_APP_ID;
// const baseUrl = process.env.WEATHER_BASE_URL;

// // Function to fetch weather data
// async function getWeather(city) {
//   try {
//     const response = await get(`${baseUrl}?q=${city}&appid=${appId}&lang=he&units=metric`);
//     const data = response.data;
//     console.log(`Weather in ${city}:`);
//     console.log(`Temperature: ${data.main.temp}°Celsius`);
//     console.log(`Weather: ${data.weather[0].description}`);
//   } catch (error) {
//     console.error('Error fetching weather data:', error);
//   }
// }
// // Fetch weather data for a specific city
// getWeather('Haifa');
