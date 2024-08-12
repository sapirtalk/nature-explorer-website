'use client';

import SingleTrail from "../trails/SingleTrail"
import { fetchData } from "@/utils"
import { useEffect, useState } from "react"
import Link from 'next/link'
import { Spinner } from "@nextui-org/react";



const RecommendedTrails = ({cookieCallback}) => {

    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user_id_state, setUser_id_state] = useState(null);
    const [favTrails, setFavTrails] = useState([])



    useEffect(() => {

        const getFavorites = async () => {

            const user = await cookieCallback('user' , null, 'get');
            const user_id = user ? user.id : null;
            setUser_id_state(user_id);

            if (!user_id) {
                return [];
            }   
            const res = await fetch('/api/user_panel/favorite_trails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId : user_id })
            });
            const data = await res.json();
    
            return data.favorite_trails;
        };

        getFavorites().then((trails) => {
            // get only the _id of the trails
            setFavTrails(trails.map((trail) => trail._id));
        })

    }, [cookieCallback]);



    

    useEffect(() => {

       
        const res = fetch ('/api/trails_recommended', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {
            
            setTrails(data.trails.map((trail) => (
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
                    rating = {trail.averageRating}
                    liked = {favTrails.includes(trail._id)}
                    user_id = {user_id_state}
                />
                </div>
            ))
            )
            setLoading(false);
            console.log('RecommendedTrails fetched');
            
        })
        .catch((error) => {
            console.log('Error fetching data:', error);
        });
    }, [user_id_state , favTrails]);
    
    return (
        <div className='flex flex-col justify-center items-center flex-wrap'>
            <h1 className='text-2xl mb-7'>מסלולים מומלצים</h1>
            {loading ? <div className="flex justify-start flex-col pt-5 h-[80vh] items-center">
                <Spinner label="...טוען מסלולים" color="secondary" labelColor="secondary" size="lg" />
                </div> : 
            <div className="lg:flex lg:flex-col lg:mb-10 lg:items-center lg:justify-center">{trails}</div>}
        </div>
    )
}


export default RecommendedTrails