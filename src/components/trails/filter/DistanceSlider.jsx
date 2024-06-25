'use client'

import React , {useEffect, useState} from "react";
import { Slider } from '@nextui-org/slider';


export default function DistanceSlider({updateFilter , filter}) {

  const [value, setValue] = useState([0, 30]);



  useEffect(() => {

    // time out to prevent multiple calls
    const timeout = setTimeout(() => {
      updateFilter({...filter, distance: value });
    }, 2000);
    
    return () => clearTimeout(timeout);
    
  }, [value]);





  return (
    <div dir="ltr">
    <Slider 
      label="מרחק"
      step={0.5}
      value={value}
      onChange={(value) => setValue(value)} 
      maxValue={30} 
      minValue={0} 
      defaultValue={[0, 30]}
      showTooltip={true}
      showOutline={true}
      disableThumbScale={true}
      formatOptions={{style: "unit", unit: "kilometer", maximumFractionDigits: 1}}
      tooltipValueFormatOptions={{style: "unit", unit: "kilometer", maximumFractionDigits: 1}}
      classNames={{
        base: "max-w-md",
        filler: "bg-gradient-to-r from-blue-100 to-blue-500 dark:from-blue-500 dark:to-blue-100",
        labelWrapper: "mb-2",
        label: "font-medium text-default-700 text-medium",
        value: "font-medium text-default-500 text-small",
        thumb: [
          "w-6 h-6 bg-white border-2 border-blue-500 dark:border-blue-100",
          "hover:border-blue-700 dark:hover:border-blue-300",
          "focus:border-blue-700 dark:focus:border-blue-300",
          "active:border-blue-700 dark:active:border-blue-300",
        ],
        step: "h-1 bg-blue-500 dark:bg-blue-100",
      }}
      tooltipProps={{
        offset: 2,
        placement: "bottom",
        classNames: {
          base: [
            // arrow color
            "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
          ],
          content: [
            "p-2 shadow-xl",
            "text-white bg-gradient-to-r from-secondary-400 to-primary-500",
          ],
        },
      }}
    />
    </div>
  );
}
