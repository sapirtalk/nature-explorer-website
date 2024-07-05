'use client'


import { FaRegHeart , FaHeart } from "react-icons/fa";
import { useState , useEffect } from "react";




const UserLike = ({trail_id , user_id , likedCallback , liked}) => {

    const [isliked , setIsLiked] = useState(liked);



    const toggleLike = async () => {
        setIsLiked(!isliked);
        likedCallback(!isliked);
    }
        


        



    return (
        <div className="cursor-pointer hover:opacity-50">
            {isliked ? <FaHeart onClick={() => toggleLike()} className='text-red-500 lg:text-[24px]' /> : <FaRegHeart className="lg:text-[24px]" onClick={() => toggleLike()} />}
        </div>
    )
    
}

export default UserLike




