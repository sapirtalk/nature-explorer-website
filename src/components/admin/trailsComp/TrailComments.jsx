'use client'

import SingleComment from "@/components/trails/trailPage/SingleComment";
import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useState } from "react";




const TrailComments = ({commentsData , adminId , closeCallback , trailName , usersData}) => {

    const [deletedComments , setDeletedComments] = useState([])


    const sortedComments = commentsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))


    // for each comment add the username from the user id
    for (let i = 0; i < sortedComments.length; i++) {
        const user = usersData.find(user => user._id === sortedComments[i].userId)
        sortedComments[i].userName = user.firstName + " " + user.lastName
    }


    


    const handleDelete = async (commentId) => {
        const response = await fetch(`/api/admin_panel/comments`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: adminId,
                commentId: commentId
            })
        })

        const data = await response.json()
        if (!data.success) {
            toast.error(data.message)
        } else {
            toast.success('התגובה נמחקה בהצלחה')
            setDeletedComments([...deletedComments , commentId])
        }
    }


    const showComments = () => {
        
        if (sortedComments.length >0) {
            return (
                sortedComments.map((comment) => (
                    <div key={comment._id} className={`${deletedComments.includes(comment._id) ? 'hidden' : ''} w-[70%] flex py-2 flex-row justify-center items-center`}>
                        <SingleComment key={comment._id} comment={comment} />
                        <Button onClick = {() => handleDelete(comment._id)} startContent={<MdDelete size={40} />} className="text-lg" color="error" >
                            מחק
                        </Button>
                    </div> 
                ))
            )
        } else {
            return (
                <div className="w-[70%] flex py-2 flex-row justify-center items-center">
                    <p>לא נמצאו תגובות</p>
                </div>
            )
        }
    }



    return (
        <div className="w-[80%] h-[100%] bg-[#f9f9f8] rounded-3xl shadow-xl hover:shadow-3xl justify-center items-center">
            <div className="h-[5%] flex w-full justify-end items-end">
            <Button size="sm" onClick={() => {
                window.location.reload() 
                closeCallback({modal: 'none' , trail : null })}} className="flex flex-row-reverse justify-center bg-transparent text-black text-xl rounded-lg p-2 px-4">סגור</Button>
            </div>
            <div className="h-[13%]">
                <header className="text-center text-[24px] font-bold border-text p-4">תגובות על {trailName}</header>
                <p className="text-center text-gray-400">נמצאו {sortedComments.length} תגובות</p>
            </div>
            <div dir="rtl" className="flex justify-start flex-col items-center w-full h-[80%] overflow-y-scroll">
                {showComments()}
            </div>
        </div>
    );
}



export default TrailComments