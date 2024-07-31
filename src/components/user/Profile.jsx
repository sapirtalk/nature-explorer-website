'use client'

import { useEffect } from "react";
import FavoriteTrails from "./FavoriteTrails";
import UserSettings from "./UserSettings";
import RegisteredTours from "./RegisteredTours";

const Profile = ({ user, cookieCallback }) => {


    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }
    }, [user]);

    // Return null or a loading indicator while the redirect is happening
    if (!user) {
        return null;
    }

    return (
        <div dir="rtl" className="w-full min-h-[80vh] px-2">
            <header className="text-center mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold">איזור אישי</h1>
            </header>
            <div className="flex flex-col justify-start text-center text-text items-start border-y-3 p-5 border-text h-[18%]">
                <div className="w-full flex justify-end items-end">
                    <UserSettings 
                        userEmail={user.email} 
                        userId={user.id} 
                        cookieCallback={cookieCallback} 
                        firstName={user.firstName} 
                        lastName={user.lastName} 
                    />
                </div>
                <span className="text-center text-lg lg:text-xl flex flex-row">
                    <p className="font-bold pl-2">מייל:</p>
                    <p className="text-center">{user.email}</p>
                </span>
                <span className=" text-center text-lg lg:text-xl flex flex-row">
                    <p className="text-center font-bold pl-2">שם מלא:</p>
                    <p className="text-center">{user.firstName} {user.lastName}</p>
                </span>
            </div>
            <div className="w-full h-full pt-4 border-b-2 border-black flex flex-row justify-center items-center">
                <RegisteredTours userId={user._id ? user._id : user.id} />
            </div>
            <div className="w-full h-full pt-4">
                <FavoriteTrails user_id={user._id ? user._id : user.id} cookieCallback={cookieCallback} />
            </div>
        </div>
    );
}

export default Profile;
