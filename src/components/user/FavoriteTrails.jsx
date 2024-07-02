'use client'

import SingleTrail from "../trails/SingleTrail"
import { fetchData } from "@/utils"
import { useEffect, useState } from "react"
import Link from 'next/link'
import { Spinner } from "@nextui-org/react";


const FavoriteTrails = () => {

    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);

    const user_id = JSON.parse(localStorage.getItem('user')).id;
    
    useEffect(() => {
        const fetchFavTrails = async () => {
            const res = await fetch('/api/user_panel/favorite_trails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId : user_id })
            });
            const data = await res.json();
            console.log(data);

            return data.favorite_trails;
        };

        fetchFavTrails().then((data) => {
            setTrails(data.map((trail) => (
                    <div key={trail._id}>
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
                        rating = {trail.averageRating || 3}
                        liked = {true}
                        user_id = {user_id}
                    />
                    </div>
            ))
            )

            setLoading(false);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    
    return (
        <div className='flex flex-col justify-center items-center flex-wrap'>
            <h1 className='text-2xl'>מסלולים מועדפים</h1>
            {loading ? <div className="flex justify-start flex-col pt-5 h-[80vh] items-center">
                <Spinner label="...טוען מסלולים" color="secondary" labelColor="secondary" size="lg" />
                </div> : 
            <div className="lg:flex lg:flex-col lg:mb-10 lg:items-center lg:justify-center">{trails}</div>}
        </div>
    )
    


    


}


export default FavoriteTrails