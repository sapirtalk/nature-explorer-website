'use client';

import SingleTrail from "../trails/SingleTrail"
import { fetchData } from "@/utils"
import { useEffect, useState } from "react"
import Link from 'next/link'
import { Spinner } from "@nextui-org/react";



const RecommendedTrails = () => {

    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user_id_state, setUser_id_state] = useState(null);
    const [favTrails, setFavTrails] = useState([])



    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));
        const user_id = user ? user.id : null;

        const getFavorites = async (user_id) => {

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
            console.log(data);
    
            return data.favorite_trails;
        };

        getFavorites(user_id).then((trails) => {
            // get only the _id of the trails
            setFavTrails(trails.map((trail) => trail._id));
            setUser_id_state(user_id);
        })

    }, []);



    

    useEffect(() => {

        console.log("user_id_state in second useEffect:", user_id_state);

        fetchData('/api/trails_recommended')
        .then((data) => {
            console.log("favtrails in fetchData: ", favTrails)
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
            
        })
        .catch((error) => {
            console.log('Error fetching data:', error);
        });
    }, [user_id_state , favTrails]);
    
    return (
        <div className='flex flex-col justify-center items-center flex-wrap'>
            <h1 className='text-2xl'>מסלולים מומלצים</h1>
            {loading ? <div className="flex justify-start flex-col pt-5 h-[80vh] items-center">
                <Spinner label="...טוען מסלולים" color="secondary" labelColor="secondary" size="lg" />
                </div> : 
            <div className="lg:flex lg:flex-col lg:mb-10 lg:items-center lg:justify-center">{trails}</div>}
        </div>
    )
}


export default RecommendedTrails