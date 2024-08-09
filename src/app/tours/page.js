import React from 'react';
import Tours from '../../components/Tours';

const ToursPage = () => {
  return (
    <div>
      <header className='text-center text-text text-2xl lg:text-[30px] font-bold border-text p-4 border-b-[10px]'>סיורים</header>
      <br/>
      <Tours />
    </div>
  );
};

export default ToursPage;