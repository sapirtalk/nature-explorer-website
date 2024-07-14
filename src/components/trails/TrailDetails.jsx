import Image from 'next/image';
import { GiPathDistance } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";


const TrailDetails = ({ trail }) => {

    const { name, description, distance, difficulty, duration, kids, pets, babyStroller, image } = trail;

    const difficultyTranslate = (diff) => {
      switch (diff) {
        case 1:
          return 'קל';
        case 2:
          return 'בינוני';
        case 3:
          return 'קשה';
        default:
          return 'לא ידוע';
      }
    }


  return (
    <div className='w-full'>
    <div dir="rtl" className='flex lg:hidden text-text lg:text-[30px] text-[18px] h-full flex-col p-3'>
      <div className='flex flex-col lg:flex-row justify-center h-full'>
        <div className='w-full text-center'>
          <p className='p-2'>{description}</p>
        </div>
        <div className='flex flex-row text-center justify-between border-t-2 px-3 pt-1 w-full'>
          <div className='flex justify-center flex-col'>
            <span className='flex flex-row-reverse'>מרחק: <GiPathDistance className='ml-1' size={25} /></span>
            <p className='font-bold' >{distance} קמ</p>
          </div>
          <div className='flex justify-center flex-col'>
            <span className='flex flex-row-reverse'>קושי: <FaWeightHanging className='ml-1' size={25} /></span>
            <p className='font-bold' >{difficultyTranslate(difficulty)}</p>
          </div>
          <div className='flex justify-center flex-col'>
            <span className='flex flex-row-reverse'>משך: <MdAccessTimeFilled className='ml-1' size={25} /></span>
            <p className='font-bold' >{duration} שעות</p>
          </div>
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
    <div dir="rtl" className='hidden lg:flex text-text lg:text-[24px] w-full h-full flex-col p-3'>
    <div className='flex flex-col items-center justify-center'>
      <div className='w-full text-center'>
        <p className='p-2'>{description}</p>
      </div>
      <div className='flex flex-col text-center  justify-center px-3 pt-1 w-full'>
      <div className='flex flex-row text-center w-full justify-between px-3 pt-1'>
        <div className='flex flex-col'> 
          <span className='flex flex-row-reverse justify-between'>מרחק: <GiPathDistance color='black' className='px-1' size={30} /> </span> 
          <p className='font-bold' >{distance} קמ </p>
        </div>
        <div className='flex flex-col'>
        <span className='flex flex-row-reverse justify-between'>קושי: <FaWeightHanging color='black' className='px-1' size={30} /> </span> 
        <p className='font-bold' >{difficultyTranslate(difficulty)}</p>
        </div>
        <div className='flex flex-col'>
        <span className='flex flex-row-reverse justify-center'>זמן: <MdAccessTimeFilled color='black' className='px-1' size={30} /> </span> 
        <p className='font-bold' >{duration} שעות</p>
        </div>
      </div>
      <div className='flex flex-row  w-full text-center justify-between px-3 border-t-2 pt-1'>
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