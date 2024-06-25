'use client'

import { Button } from "@nextui-org/react";
import { useEffect } from "react";



const SortTrails = ({ updateSort , updateOpenSort , sort , openSort }) => {


    // close the sort menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.sort-trails' && openSort)) {
                updateOpenSort(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [updateOpenSort , sort]);




    return (
        <div className='flex h-full flex-col'>
            <div classname = 'flex flex-col h-full'>
                <p className='text-xl pb-1'>מיון לפי:</p>
            <div className='flex flex-row w-full justify-center my-2 items-center'>
                <button onClick={() => updateSort('distance')} className={`flex flex-row-reverse w-[20vw] justify-center ${sort.by == 'distance' ? 'bg-slate-400' : 'bg-slate-500'} items-center text-white text-xl rounded-lg p-2 px-4`}>
                    <p className='pl-1 text-[12px]'>מרחק</p>
                </button>
                <button onClick={() => updateSort('difficulty')} className={`flex flex-row-reverse w-[20vw] justify-center mx-10 ${sort.by == 'difficulty' ? 'bg-slate-400' : 'bg-slate-500'} items-center text-white text-xl rounded-lg p-2 px-4`}>
                    <p className='pl-1 text-[12px]'>קושי</p>
                </button>
                <button onClick={() => updateSort('duration')} className={`flex w-[20vw] flex-row-reverse justify-center ${sort.by == 'duration' ? 'bg-slate-400' : 'bg-slate-500'} items-center text-white text-xl rounded-lg p-2 px-4`}>
                    <p className='pl-1 text-[12px]'>זמן</p>
                </button>
                </div>
                <div className='flex justify-center items-center '>
                    <Button onClick={() => updateOpenSort(false)} className='w-[20vw] text-white bg-blue-500 mt-5' auto>
                        סגור X
                    </Button>
                </div>
            </div>

        </div>    
    );
}

export default SortTrails;