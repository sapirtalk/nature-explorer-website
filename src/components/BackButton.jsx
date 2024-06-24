
'use client'



import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";




const BackButton = () => {

    const router = useRouter();

    const handleClickBack = () => {
        router.back();
    }



    return (
        <button onClick={handleClickBack} className='flex flex-row items-center justify-center text-black rounded-lg p-2 px-4'>
            <MdKeyboardBackspace className='text-2xl' />
        </button>
    );


   

}


export default BackButton;
