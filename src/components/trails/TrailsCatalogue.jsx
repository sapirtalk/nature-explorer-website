'use client'

import React, { useEffect, useState } from 'react'
import SingleTrail from './SingleTrail';
import Link from 'next/link';
import { FaSort } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import SortTrails from './SortTrails';
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import FilterTrails from './filter/FilterTrails';


const TrailsCatalogue = () => {

    const [filter, setFilter] = useState({});
    const [sort, setSort] = useState({ by: 'name', order: 'asc' });
    const [trails, setTrails] = useState([]);
    const [openSort, setOpenSort] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [loading, setLoading] = useState(true);



    const updateSort = (by) => {
        if (by !== sort.by) {
            setSort({ by: by, order: sort.order });
        }
        else {
            setSort({by: 'name', order: sort.order})
    }
        
    };
    const updateDirection = () => {
        setSort({ by: sort.by, order: sort.order === 'asc' ? 'desc' : 'asc' });
    };

    const updateOpenSort = (value) => {
        setOpenSort(value);

        if (value) {
            setOpenFilter(false);
        }
    }

    const updateFilter = (filter) => {
        setFilter(filter);
    }

    const updateOpenFilter = (value) => {
        setOpenFilter(value);

        if (value) {
            setOpenSort(false);
        }
    }
   
    const clearSortAndFilter = () => {
        setFilter({});
        setSort({ by: 'name', order: 'asc' });
    }

    const checkCleared = () => {
        if (Object.keys(filter).length === 0 && sort.by === 'name') {
            return true;
        }
        return false;
    }


    const trailsShow = () => {
        if (trails.length > 0) {
          return trails.map((trail) => (
            <Link href={`/trails/${trail._id}`} key={trail._id}>
              <SingleTrail 
                id={trail._id} 
                image={trail.image} 
                name={trail.name} 
                desc={trail.description} 
                length={trail.distance} 
                difficulty={trail.difficulty} 
                duration={trail.duration} 
                kids={trail.kidsFriendly} 
                pets={trail.petsFriendly} 
                babyStroller={trail.babyStrollerFriendly}
                rating = {trail.Rating} 
              />
            </Link>
          ));
        } else {
          return <h1>לא נמצאו מסלולים מתאימים</h1>;
        }
      };
      


    useEffect(() => {

        console.log(filter);


        const fetchTrails = async () => {
            const res = await fetch('/api/trails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filterReq: filter, SortReq: sort })
            });
            const data = await res.json();
            console.log(data);

            return data.trails;
        };

        fetchTrails().then((trails) => {
            setTrails(trails);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }
    , [filter, sort]);
        


    return (
        <div dir="rtl" className='flex flex-col items-center pt-1 w-full'>
            <div className='flex justify-between my-[2vh] w-[100%] items-center'>
                <button className={`${openSort ? 'bg-blue-300'  : 'bg-blue-500'} flex flex-row-reverse justify-center items-center text-white text-xl rounded-lg p-2 px-4`}
                        onClick={() => updateOpenSort(!openSort) }>
                    <FaSort />
                    <p className='pl-1 text-[15px]'>מיון לפי</p>
                </button>
                <button className={`${openFilter ? 'bg-secondary bg-opacity-50'  : 'bg-secondary'} flex flex-row-reverse justify-center items-center text-white text-xl rounded-lg p-2 px-4`}
                        onClick={() => updateOpenFilter(!openFilter) }>
                    <FaFilter size={14} />
                    <p className='pl-1 text-[15px]'>סינון</p>
                </button>
                <button onClick={() => clearSortAndFilter()} className={`${checkCleared() ? 'disabled opacity-40 p-2 px-4' : 'p-2 px-4'}`}>
                    <p className='pl-1 text-[12px]'>X בטל שינויים</p>
                </button>
            </div>
            <div className='flex m-2 justify-start w-full items-center'>
                <input onInput={(e) => updateFilter({name: e.target.value})} type="text" placeholder="חיפוש מסלולים" className='w-[100%] p-2 rounded-lg' />
            </div>
            <div className='flex m-1 justify-start w-full items-center'>
            <button onClick={() => updateDirection()} >
             {sort.order === 'asc' ? <FaSortAmountDownAlt size={20}/> : <FaSortAmountUp size={20} />}
            </button>   
            </div>
            {loading ? <div className='flex h-[80vh] justify-center items-start'>
                        <h1 className='text-xl'>טוען מסלולים...</h1>
                        </div> 
                        :  
                        trailsShow()
            }

            <div className={openSort ? 'fixed bottom-0 w-[100%] sm:hidden backdrop-blur h-[30vh] bg-white bg-opacity-70 p-5 ease-in duration-300' : 'fixed bottom-[-100%] p-10 ease-in duration-300'}>
                <SortTrails updateSort={updateSort} updateOpenSort={updateOpenSort} sort = {sort} openSort = {openSort}  />
            </div>
            <div className={openFilter ? 'fixed bottom-0 w-[100%] sm:hidden backdrop-blur h-[60vh] bg-white bg-opacity-70 p-5 ease-in duration-300' : 'fixed bottom-[-100%] p-10 ease-in duration-300'}>
                <FilterTrails updateFilter={updateFilter} updateOpenFilter={updateOpenFilter} filter = {filter} openFilter = {openFilter}  />
            </div>      

        </div>
    )
    }


export default TrailsCatalogue;