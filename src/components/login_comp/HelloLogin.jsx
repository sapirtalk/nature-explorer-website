'use client';

import { useEffect } from "react";


const HelloLogin = ({firstName}) => {



    useEffect(() => {
        // timeout to show the hello message then redirect to home
        setTimeout(() => {
            window.location.href = '/home';
        }, 3000);

    }, [])




    return (
        <div dir='rtl' className="flex flex-col h-full bg-white rounded-lg justify-center items-center">
            <h1 className="text-2xl text-center mb-6">היי {firstName}!</h1>
            <p className="text-center">התחברת בהצלחה</p>
            <p className="text-center">מעבירים אותך לדף הבית</p>
        </div>
    )

}

export default HelloLogin