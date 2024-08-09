'use client'

import SingleTrail from "../trails/SingleTrail"
import { useEffect, useState } from "react"
import { Spinner } from "@nextui-org/react";



const FavoriteTrails = ({user_id}) => {

    

    const [trails, setTrails] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
            return data.favorite_trails;
        };

        fetchFavTrails().then((data) => {
            setTrails(data.map((trail) => (
                    <div className="w-full" key={trail._id}>
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
            <div className="lg:flex py-2 lg:flex-col lg:mb-10 lg:items-center lg:justify-center">{trails.length > 0 ? trails : <p>אין מסלולים מועדפים</p>}</div>}
        </div>
    )
    


    


}


export default FavoriteTrails