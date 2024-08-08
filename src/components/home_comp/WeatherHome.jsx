'use client';

import { useState, useEffect } from 'react';

const getDescription = (icon) => {
  switch (icon) {
    case '01d':
    case '01n':
      return 'שמיים בהירים';
    case '02d':
    case '02n':
      return "בהיר עם עננים לפרקים";
    case '03d':
    case '03n':
      return 'מעונן חלקית';
    case '04d':
    case '04n':
      return 'מעונן';
    case '09d':
    case '09n':
      return 'ממטרי גשם לפרקים';
    case '10d':
    case '10n':
      return 'גשום';
    case '11d':
    case '11n':
      return 'סופת רעמים';
    case '13d':
    case '13n':
      return 'שלג';
    case '50d':
    case '50n':
      return 'ערפל';
    default:
      return 'שמיים בהירים';
  }
}

const WeatherHome = () => {
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city: 'Haifa' })
        });

        const result = await response.json();

        if (response.ok) {
          const now = new Date();
          const closestWeather = result.data.reduce((prev, curr) => {
            const prevDiff = Math.abs(new Date(prev.localTimestamp) - now);
            const currDiff = Math.abs(new Date(curr.localTimestamp) - now);
            return (currDiff < prevDiff ? curr : prev);
          });

          if (closestWeather) {
            setWeather({
              temperature: Math.round(closestWeather.weatherData.temperature),
              feelsLike: Math.round(closestWeather.weatherData.feels_like),
              humidity: Math.round(closestWeather.weatherData.humidity),
              description: getDescription(closestWeather.weatherData.icon),
              time: new Date(closestWeather.localTimestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
            });
            setIcon(closestWeather.weatherData.icon);
          } else {
            setWeather(null);
          }
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch weather data.');
      }
    };

    fetchWeather();
  }, []);

  return (
    <div dir='rtl' className='text-center'>
      <h1 className='font-bold mr-4'>מזג האוויר כעת בחיפה והסביבה</h1>
      {icon && (
        <div className='flex items-center justify-center lg:flex-col'>
          <div className='flex items-center'>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt='weather icon'
              className='w-20 h-20'
            />
            <div className='text-3xl font-bold'>
              {weather.temperature}°C
            </div>
          </div>
          <div className='text-sm lg:text-base mr-4'>
            <p>מרגיש כמו: {weather.feelsLike}°C</p>
            <p>לחות: {weather.humidity}%</p>
            <p>{weather.description}</p>
          </div>
        </div>
      )}
      {error && <p className='text-red-500'>{error}</p>}
    </div>
  );
};

export default WeatherHome;
