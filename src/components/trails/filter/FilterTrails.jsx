


'use client'

import { useEffect } from "react";
import DistanceSlider from "./DistanceSlider";
import DurationSlider from "./DurationSlider";
import {Button} from "@nextui-org/react";
import CheckBoxOptions from "./CheckBoxOptions";


const FilterTrails = ({desktop ,updateFilter , updateOpenFilter , filter , openFilter }) => {


    

    return (
        <div className='lg:w-full'>
            <div className = ''>
                <p className='text-l pb-1'>סנן לפי:</p>
            <div className='flex flex-col justify-center'>
                <DistanceSlider updateFilter={updateFilter} filter={filter} />
                <DurationSlider updateFilter={updateFilter} filter={filter} />
                <CheckBoxOptions updateFilter={updateFilter} filter={filter} />
            </div>
            <div className={ desktop ? 'hidden' :'flex justify-center items-center h-[20%] '}>
                    <Button onClick={() => updateOpenFilter(false)} className='w-[20vw] text-white bg-blue-500 mt-5' auto>
                        סגור X
                    </Button>
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