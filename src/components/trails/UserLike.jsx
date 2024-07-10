'use client'

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const UserLike = ({ trail_id, user_id, liked, fromTrailPage }) => {
  const [isliked, setIsLiked] = useState(liked);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const toggleLike = async () => {
    setIsLiked(!isliked);
    likedCallback(!isliked);

    if (isliked) {
      toast.info('מסלול הוסר ממועדפים');
    } else {
      toast.success('מסלול נוסף למועדפים');
    }

  };

  const likedCallback = async (value) => {
    await fetch(`/api/user_panel/favorite_trails`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user_id,
        trailId: trail_id,
        action: value ? 'add' : 'remove',
      }),
    });
  };

  return (
    <div className="cursor-pointer hover:opacity-50">
      {isliked 
        ? <FaHeart onClick={toggleLike} className={`text-red-500 ${fromTrailPage ? 'lg:text-[40px] text-[40px]' : 'lg:text-[30px]'}`} /> 
        : <FaRegHeart className={`${fromTrailPage ? 'lg:text-[40px] text-[40px]' : 'lg:text-[30px]'}`} onClick={toggleLike} />}
    </div>
  );
};

export default UserLike;
