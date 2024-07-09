'use client'


import { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { Spinner } from '@nextui-org/react';
import { ScrollShadow } from "@nextui-org/react";





const CommentsSection = ({trail_id , user_id }) => {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        // fetch comments
        fetch ('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trailId: trail_id,
                method: 'GET'
            })
        }).then(res => res.json())
        .then(data => {

            if (!data.comments) return
            console.log(data)
            setComments(data.comments)
        })

        setLoading(false)

        

    }, [])



    return (
        <div dir="rtl" className="w-full px-2">
         <header className="text-center text-text text-2xl lg:text-[30px] font-bold">תגובות משתמשים</header>
            <br />
            {loading ? <div className="flex justify-start flex-col pt-5 h-[80vh] items-center">
                <Spinner label="...טוען תגובות" color="secondary" labelColor="secondary" size="lg" />
                </div> : 
                <ScrollShadow hideScrollBar className="w-full h-[40vh] py-5">
                    {comments.map(comment => (
                        <div key={comment._id} className="w-full flex px-2 flex-col justify-center items-center">
                            <SingleComment comment={comment} user_id={user_id} />
                            <br />
                        </div>
                    ))}
                </ScrollShadow>
            }
        </div>
    );
}



export default CommentsSection