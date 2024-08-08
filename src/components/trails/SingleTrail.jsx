'use client'

import Image from 'next/image'
import Stars from './ratingStars/Stars';
import UserLike from './UserLike';
import { useEffect } from 'react';
import {Link} from "@nextui-org/link";
import { GiPathDistance } from "react-icons/gi";
import { FaWeightHanging } from "react-icons/fa6";
import { MdAccessTimeFilled } from "react-icons/md";





const SingleTrail = ({id ,image , name , desc , length , difficulty , duration , kids , pets , babyStroller , rating , user_id , liked}) => {


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

  const likedCallback = async (value) => {
     const res = await fetch(`/api/user_panel/favorite_trails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user_id,
          trailId: id,
          action: value ? 'add' : 'remove',
        }),
      });

      console.log(res.json());
  };




  return (
    <div>
    <div dir="rtl" className='flex text-text h-[20vh] lg:h-[25vh] w-full min-w-[95vw] lg:min-w-[60vw] lg:w-[60vw] rounded-lg bg-white shadow-2xl flex-row mt-4 '>
      <div className='w-[30%]'>
        <Image 
          src={image[0]}
          alt={name}
          width={500}
          height={500} 
          className='w-full h-full rounded-r-lg' />
      </div>
      <div className='w-[70%] flex flex-col'>  
      <div className='flex flex-col px-3 h-[32%] border-b-2 pb-2'>
        <div className='flex flex-row-reverse pt-1 justify-between'>
          {user_id ? <UserLike trail_id = {id} user_id = {user_id} liked = {liked} likedCallback = {likedCallback} /> : null}
          {rating ? <Stars rating = {rating} readOnly={true} /> : <p className='text-[12px] lg:text-[15px] text-gray-400'>ללא דירוג</p>}
        </div>
        <Link color="secondary" className='hover:text-purple-300 underline pb-2 lg:text-[24px] underline-offset-auto' showAnchorIcon href = {`/trails/${id}`}>
          <h2>{name}</h2>
        </Link>
      </div>
      <div className='flex flex-row justify-start h-[45%] px-3'>
        <div className='w-[60%] overflow-y-scroll'>
          <p className='px-2 py-4 text-[12px] lg:text-[15px]'>{desc}</p>
        </div>
        <div className='flex flex-col justify-center w-[40%] border-r-2 pr-2 lg:text-[15px] text-[12px]'>
          <p className='flex flex-row-'><GiPathDistance className='mx-2 lg:text-[20px]' /> {length} קמ</p>
          <p className='flex flex-row-'><FaWeightHanging className='mx-2 lg:text-[20px]' /> {difficultyTranslate(difficulty)}</p>
          <p className='flex flex-row-'><MdAccessTimeFilled className='mx-2 lg:text-[20px]' /> {duration} שעות</p>
        </div>  
      </div>
      <div className='flex text-[12px] lg:text-[15px] flex-row text-center justify-between px-3 border-t-2 pt-1'>
        <div className='w-[30%]'>
          <p>לילדים: {kids ? 'כן' : 'לא'}</p>
        </div>
        <div className='w-[40%]'>
          <p>לחיות מחמד: {pets ? 'כן' : 'לא'} </p>
        </div>
        <div className='w-[30%]'>
          <p>לעגלות: {babyStroller ? 'כן' : 'לא'}</p>
        </div>
        </div>
      </div>
    </div>
    </div>






  )
}



export default SingleTrail