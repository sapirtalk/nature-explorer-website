'use client'



import React, { use } from "react";
import {CheckboxGroup} from "@nextui-org/react";
import CustomCheckBox from "./CustomCheckBox";

export default function CheckBoxOptions({updateFilter, filter}) {



  const [groupSelected, setGroupSelected] = React.useState([]);




  // compile a filter format from the group
const compileToFilter = (group) => {
  let newfilter = { ...filter }; // Create a shallow copy of the existing filter object

  if (group.includes('kids')) {
    newfilter.kids = true;
  } else if (!group.includes('kids') && filter.kids) {
    delete newfilter.kids; // Remove the key from the object
    console.log('we are here', newfilter);
  }

  if (group.includes('pets')) {
    newfilter.pets = true;
  } else if (!group.includes('pets') && filter.pets) {
    delete newfilter.pets; // Remove the key from the object
  }

  if (group.includes('babyStroller')) {
    newfilter.babyStroller = true;
  } else if (!group.includes('babyStroller') && filter.babyStroller) {
    delete newfilter.babyStroller; // Remove the key from the object
  }

  let diff = group.filter((el) => el === 'easy' || el === 'medium' || el === 'hard');

  if (diff.length > 0) {
    newfilter.difficulty = diff.map((el) => difficultyTranslate(el));
  } else {
    delete newfilter.difficulty; // Remove the key from the object
  }

  return newfilter;
};







  React.useEffect(() => {

    // timeout to prevent multiple calls
    let timeout = setTimeout(() => {

      let properFilter = compileToFilter(groupSelected);
      
      console.log("properFilter" , properFilter);

      updateFilter(properFilter);

    }, 1000);

    return () => {
      clearTimeout(timeout);
    }

  }, [groupSelected]);







  return (
    <div className="flex flex-col mt-5 gap-1 w-full">
      <CheckboxGroup
        className="gap-2 w-full"
        label="העדפות נוספות:"
        orientation="horizontal"
        value={groupSelected}
        onChange={setGroupSelected}
      >
        <CustomCheckBox value="kids">ילדים</CustomCheckBox>
        <CustomCheckBox value="pets">חיות מחמד</CustomCheckBox>
        <CustomCheckBox value="babyStroller">עגלה</CustomCheckBox>
        <CustomCheckBox value="hard">קשה</CustomCheckBox>
        <CustomCheckBox value="medium">בינוני</CustomCheckBox>
        <CustomCheckBox value="easy">קל</CustomCheckBox>
      </CheckboxGroup>
    </div>
  );
}



// translate difficulty to number
const difficultyTranslate = (diff) => {
  switch (diff) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    case 'hard':
      return 3;
    default:
      return 0;
  }
}



