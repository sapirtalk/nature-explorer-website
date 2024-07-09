import Image from 'next/image';



const TrailDetails = ({ trail }) => {

    const { name, description, distance, difficulty, duration, kids, pets, babyStroller, image } = trail;


  return (
    <div>
    <div dir="rtl" className='flex lg:hidden text-text lg:text-[30px] text-[18px] h-full flex-col p-3'>
      <div className='flex flex-col lg:flex-row justify-center h-full'>
        <div className='w-full text-center'>
          <p className='p-2'>{description}</p>
        </div>
        <div className='flex flex-row text-center justify-between border-t-2 px-3 pt-1 w-full'>
          <span>מרחק: <p className='font-bold' >{distance} קמ </p></span>
          <span>קושי: <p className='font-bold' >{difficulty}</p></span>
          <span>זמן: <p className='font-bold' >{duration} שעות</p></span>
        </div>  
      </div>
      <div className='flex flex-row  text-center justify-between px-3 border-t-2 pt-1'>
        <div className=''>
          <span>לילדים: <p className='font-bold' >{kids ? 'כן' : 'לא'}</p></span>
        </div>
        <div className='flex justify-center'>
          <span>לחיות מחמד: <p className='font-bold'>{pets ? 'כן' : 'לא'}</p> </span>
        </div>
        <div className=''>
          <span>לעגלות: <p className='font-bold' >{babyStroller ? 'כן' : 'לא'}</p></span>
        </div>
      </div>  
    </div>
    <div dir="rtl" className='hidden lg:flex text-text lg:text-[24px] h-full flex-col p-3'>
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full text-center'>
        <p className='p-2'>{description}</p>
      </div>
      <div className='flex flex-col text-center justify-center border-b-2 px-3 pt-1 w-[70%]'>
      <div className='flex flex-row text-center justify-between px-3 pt-1'>
        <span>מרחק: <p className='font-bold' >{distance} קמ </p></span>
        <span>קושי: <p className='font-bold' >{difficulty}</p></span>
        <span>זמן: <p className='font-bold' >{duration} שעות</p></span>
      </div>
      <div className='flex flex-row  text-center justify-between px-3 border-t-2 pt-1'>
      <div className=''>
        <span>לילדים: <p className='font-bold' >{kids ? 'כן' : 'לא'}</p></span>
      </div>
      <div className='flex justify-center'>
        <span>לחיות מחמד: <p className='font-bold'>{pets ? 'כן' : 'לא'}</p> </span>
      </div>
      <div className=''>
        <span>לעגלות: <p className='font-bold' >{babyStroller ? 'כן' : 'לא'}</p></span>
      </div>
      </div>
    </div>   
    </div> 
  </div>
  </div>
  );
};

export default TrailDetails;