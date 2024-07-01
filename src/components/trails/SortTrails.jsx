'use client'

import { Button } from "@nextui-org/react";
import { useEffect } from "react";



const SortTrails = ({ desktop ,updateSort , updateOpenSort , sort , openSort }) => {


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
        <div className='flex lg:w-full h-full lg:h-[20vh] flex-col'>
            <div classname = 'flex flex-col h-full'>
                <p className='text-l pb-1'>מיון לפי:</p>
            <div className='flex lg:grid lg:grid-cols-2 lg:gap-4 flex-row w-full justify-between my-2 items-center'>
                <Button size="sm" onClick={() => updateSort('distance')} className={`flex flex-row-reverse justify-center ${sort.by == 'distance' ? 'bg-slate-400' : 'bg-slate-500'} items-center text-white text-xl rounded-lg shadow-lg p-2 px-4`}>
                    <p className='pl-1 text-[12px]'>מרחק</p>
                </Button>
                <Button size="sm" onClick={() => updateSort('difficulty')} className={`flex flex-row-reverse justify-center ${sort.by == 'difficulty' ? 'bg-slate-400' : 'bg-slate-500'} items-center text-white text-xl shadow-lg rounded-lg p-2 px-4`}>
                    <p className='pl-1 text-[12px]'>קושי</p>
                </Button>
                <Button size="sm" onClick={() => updateSort('duration')} className={`flex flex-row-reverse justify-center ${sort.by == 'duration' ? 'bg-slate-400' : 'bg-slate-500'} items-center text-white text-xl shadow-lg rounded-lg p-2 px-4`}>
                    <p className='pl-1 text-[12px]'>זמן</p>
                </Button>
                <Button size="sm" onClick={() => updateSort('Rating')} className={`flex flex-row-reverse justify-center ${sort.by == 'Rating' ? 'bg-slate-400' : 'bg-slate-500'} items-center text-white text-xl shadow-lg rounded-lg p-2 px-4`}>
                    <p className='pl-1 text-[12px]'>דירוג</p>
                </Button>
                </div>
                <div className={desktop ? 'hidden' : 'flex justify-center items-center'}>
                    <Button onClick={() => updateOpenSort(false)} className='w-[20vw] shadow-lg text-white bg-blue-500 mt-5' auto>
                        סגור X
                    </Button>
                </div>
            </div>

        </div>    
    );
}

export default SortTrails;