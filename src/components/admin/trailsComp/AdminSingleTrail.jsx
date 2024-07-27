
'use client'

import Image from 'next/image'
import Stars from '../../trails/ratingStars/Stars';
import { GiPathDistance } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";





const AdminSingleTrail = ({trail , admin}) => {

    const { id, image, name, description, distance, difficulty, duration, kidsFriendly, petsFriendly, babyStrollerFriendly, averageRating } = trail; 

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
    <div>
    <div dir="rtl" className='flex text-text h-[20vh] lg:h-[20vh] w-full min-w-[95vw] lg:min-w-[30vw] lg:w-[30vw] rounded-lg bg-white shadow-2xl flex-row '>
      <div className='w-[30%]'>
        <Image 
          src={image[0] ? image[0] : '/resources/images/logo/logo.png'}
          alt={name}
          width={500}
          height={500} 
          className='w-full h-full rounded-r-lg' />
      </div>
      <div className='w-[70%] flex flex-col'>  
      <div className='flex flex-col px-3 h-[32%] border-b-2 pb-2'>
        <div className='flex flex-row-reverse pt-1 justify-between'>
          {averageRating ? <Stars rating = {averageRating} readOnly={true} /> : <p className='text-[12px] lg:text-[15px] text-gray-400'>ללא דירוג</p>}
        </div>
        <p className='text-[12px] flex text-end lg:text-[24px]'>{name}</p>
      </div>
      <div className='flex flex-row justify-start h-[45%] px-3'>
        <div className='w-[60%] flex text-pretty overflow-y-scroll'>
          <p className='px-2 py-4 text-[12px] lg:text-[15px]'>{description}</p>
        </div>
        <div className='flex flex-col justify-center w-[40%] border-r-2 pr-2 lg:text-[15px] text-[12px]'>
          <p className='flex flex-row-'><GiPathDistance className='mx-2 text-[20px]' /> {distance} קמ</p>
          <p className='flex flex-row-'><FaWeightHanging className='mx-2 text-[20px]' /> {difficultyTranslate(difficulty)}</p>
          <p className='flex flex-row-'><MdAccessTimeFilled className='mx-2 text-[20px]' /> {duration} שעות</p>
        </div>  
      </div>
      <div className='flex text-[12px] lg:text-[15px] flex-row text-center justify-between px-3 border-t-2 pt-1'>
        <div className='w-[30%]'>
          <p>לילדים: {kidsFriendly ? 'כן' : 'לא'}</p>
        </div>
        <div className='w-[40%]'>
          <p>לחיות מחמד: {petsFriendly ? 'כן' : 'לא'} </p>
        </div>
        <div className='w-[30%]'>
          <p>לעגלות: {babyStrollerFriendly ? 'כן' : 'לא'}</p>
        </div>
        </div>
      </div>
    </div>
    </div>






  )
}



export default AdminSingleTrail