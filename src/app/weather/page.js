// src/app/weather/page.js
import React from 'react';
import WeatherComp from '@/components/home_comp/WeatherComp';

const WeatherPage = () => {
  return (
    <div>
      <header className='text-center text-text text-2xl lg:text-[30px] font-bold border-text p-4 border-b-[10px]'>מזג אוויר</header>
      <br/>
        <WeatherComp />
    </div>
  );
};

export default WeatherPage;