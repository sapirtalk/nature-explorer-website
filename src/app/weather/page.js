// src/app/weather/page.js
import React from 'react';
import WeatherComp from '@/components/WeatherComp';

const WeatherPage = () => {
  return (
    <div dir='rtl'>
      <header className='text-center text-text text-2xl lg:text-[30px] font-bold border-text p-4 border-b-[10px]'>מזג אוויר</header>
      <br/>
      <p className='text-xl font-bold hidden lg:flex'>מזג האוויר בחיפה והסביבה לימים הקרובים</p>
      <p className='justify-center items-center flex lg:hidden text-xl font-bold'>מזג האוויר בחיפה והסביבה לימים הקרובים</p>
        <WeatherComp />
    </div>
  );
};

export default WeatherPage;