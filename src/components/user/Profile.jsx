'use client'

import { useEffect , useState } from "react"
import FavoriteTrails from "./FavoriteTrails"






const Profile = () => {
    
    const [user , setUser] = useState({})



    useEffect(() => {

        const curUser = localStorage.getItem('user')
        if (curUser) {
            setUser(JSON.parse(curUser))
        }
        else {
            window.location.href = '/login'
        }

    } , [])



    return (
        <div dir ="rtl" className="w-full min-h-[80vh] px-2">
            <header className="text-center mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold">פרופיל</h1>
            </header>
            <div className="flex flex-col justify-start text-center text-text items-start border-y-3 p-5 border-text h-[18%]">
                <span className="text-center text-lg lg:text-xl flex flex-row">
                    <p className="font-bold pl-2">מייל:</p>
                    <p className="text-center">{user.email}</p>
                </span>
                <span className=" text-center text-lg lg:text-xl flex flex-row">
                    <p className="text-center font-bold pl-2">שם מלא:</p>
                    <p className="text-center">{user.firstName} {user.lastName}</p>
                </span>
            </div>
            <div className="w-full h-full pt-4">
                <FavoriteTrails />
            </div>
        </div>
    )
}



export default Profile