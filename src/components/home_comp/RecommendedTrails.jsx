'use client';

import SingleTrail from "../trails/SingleTrail"
import { fetchData } from "@/utils"
import { useEffect, useState } from "react"



const RecommendedTrails = () => {
    
    const [trails, setTrails] = useState([]);
    
    useEffect(() => {
        fetchData('/api/trails_recommended')
        .then((data) => {
            console.log('Data fetched:', data.trails);
            setTrails(data.trails.map((trail) => (
                <SingleTrail 
                key={trail._id} 
                image={trail.image} 
                name={trail.name} 
                desc={trail.description} 
                length={trail.distance} 
                difficulty={trail.difficulty} 
                duration={trail.duration} 
                kids={trail.kidsFriendly} 
                pets={trail.petsFriendly} 
                babyStroller={trail.babyStrollerFriendly} />
            ))
            )
        })
        .catch((error) => {
            console.log('Error fetching data:', error);
        });
    }, []);
    
    return (
        <div className='flex flex-row justify-center flex-wrap'>
            <h1 className='text-2xl'>מסלולים מומלצים</h1>
            {trails}
        </div>
    )
}


export default RecommendedTrails