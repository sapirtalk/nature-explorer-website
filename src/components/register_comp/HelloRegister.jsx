'use client';

import { useEffect } from "react";


const HelloRegister = ({firstName}) => {

    console.log('in hello register',firstName);



    useEffect(() => {
        // timeout to show the hello message then redirect to login
        setTimeout(() => {
            window.location.href = '/login';
        }, 3000);

    }, [])




    return (
        <div dir='rtl' className="flex flex-col h-full bg-white rounded-lg justify-center items-center">
            <h1 className="text-2xl text-center mb-6">היי {firstName}!</h1>
            <p className="text-center">נרשמת בהצלחה</p>
            <p className="text-center">מעבירים אותך לדף ההתחברות</p>
        </div>
    )

}

export default HelloRegister