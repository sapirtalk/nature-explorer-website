import Image from 'next/image';



const TrailDetails = ({ trail }) => {

    const { name, description, distance, difficulty, duration, kids, pets, babyStroller, image } = trail;


  return (
    <div dir="rtl" className='flex text-text h-full flex-col p-3'>
      <div className='flex justify-center p-3 h-[20%]'>
        <h2 className='text-3xl text-center'>{name}</h2>
      </div>
      <div className='flex flex-col justify-center h-full'>
        <div className='w-full'>
          <p className='p-2'>{description}</p>
        </div>
        <div className='flex flex-row text-center justify-between border-t-2 px-3 pt-1 w-full'>
          <p>מרחק: <p className='font-bold' >{distance} קמ </p></p>
          <p>קושי: <p className='font-bold' >{difficulty}</p></p>
          <p>זמן: <p className='font-bold' >{duration} שעות</p></p>
        </div>  
      </div>
      <div className='flex flex-row  text-center justify-between px-3 border-t-2 pt-1'>
        <div className=''>
          <p>לילדים: <p className='font-bold' >{kids ? 'כן' : 'לא'}</p></p>
        </div>
        <div className='flex justify-center'>
          <p>לחיות מחמד: <p className='font-bold'>{pets ? 'כן' : 'לא'}</p> </p>
        </div>
        <div className=''>
          <p>לעגלות: <p className='font-bold' >{babyStroller ? 'כן' : 'לא'}</p></p>
        </div>
      </div>  
    </div>
  );
};

export default TrailDetails;