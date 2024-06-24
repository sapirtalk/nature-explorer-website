


'use client'

import { useEffect } from "react";



const FilterTrails = ({ updateFilter , updateOpenFilter , filter , openFilter }) => {


    // close the sort menu when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.filter-trails' && openFilter)) {
                updateOpenFilter(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [updateOpenFilter , filter]);




    return (
        <div className='flex flex-col justify-center'>
            <div classname = 'flex flex-col justify-center items-center'>
                <p className='text-l pb-1'>סנן לפי:</p>
            <div className='flex flex-row w-full justify-center items-center'>
               <h1>WIP</h1> 
                </div>
            </div>

        </div>    
    );
}

export default FilterTrails;




const difficultyTranslate = (diff) => {
    switch (diff) {
        case 'קל':
            return 1;
        case 'בינוני':
            return 2;
        case 'קשה':
            return 3;
        default:
            return 0;
  }
}