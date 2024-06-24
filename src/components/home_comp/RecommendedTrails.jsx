'use client';

import SingleTrail from "../trails/SingleTrail"
import { fetchData } from "@/utils"
import { useEffect, useState } from "react"
import Link from 'next/link'



const RecommendedTrails = () => {
    
    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchData('/api/trails_recommended')
        .then((data) => {
            setTrails(data.trails.map((trail) => (
                <Link href = {`/trails/${trail._id}`} key = {trail._id}>
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
                    />
                </Link>
            ))
            )
            setLoading(false);
        })
        .catch((error) => {
            console.log('Error fetching data:', error);
        });
    }, []);
    
    return (
        <div className='flex flex-col justify-center items-center flex-wrap'>
            <h1 className='text-2xl'>מסלולים מומלצים</h1>
            {loading ? <div className="flex justify-center pt-3 h-[80vh] items-start"><h1>טוען מסלולים...</h1></div> : trails}
        </div>
    )
}


export default RecommendedTrails