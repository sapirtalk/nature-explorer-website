'use client'

import SingleStar from './SingleStar'
import { useState } from 'react'



const Stars = ({rating , user_id , trail_id , readOnly , onTrailPage , userRating, setUserRating}) => {

    const userInput = (index) => {
        setUserRating(index)
    }






    return (

        !readOnly ?
        <div className='flex flex-col'>
        <div className='flex flex-row-reverse my-2'>
            <SingleStar onClick={() => userInput(1)} index={1} userRating={userRating} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(2)} index={2} userRating={userRating} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(3)} index={3} userRating={userRating} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(4)} index={4} userRating={userRating} rating={rating} onTrailPage={onTrailPage} />
            <SingleStar onClick={() => userInput(5)} index={5} userRating={userRating} rating={rating} onTrailPage={onTrailPage} />
        </div>
        <div className='my-2'>
            <h1>דירוג : {userRating}</h1>
        </div>
        <p className='text-red-500 cursor-pointer hover:underline' onClick={() => userInput(0)}>אפס שינויים</p>
        </div>
        :
        <div className='flex flex-row-reverse'>
            <SingleStar index={1} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={2} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={3} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={4} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
            <SingleStar index={5} rating={rating} readOnly = {true} onTrailPage={onTrailPage} />
        </div>
        

    )
}




export default Stars


    

