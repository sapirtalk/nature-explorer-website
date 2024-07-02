'use client';

import React, { useState , useEffect } from 'react';
import { greeting } from '@/styles/tailwindSaved';
import Link from 'next/link';


const greetingText = {
    title: 'ברוכים הבאים לאתר בשבילי חיפה!',
    body1 : 'אתר זה הוקם כדי לשתף מסלולים עירוניים המקיפים את השכונות הרבות על רכס הכרמל. שבילים ומסלולים הטובלים בטבע ירוק, בפריחות צבעוניות, מאגרי מים, שרידים הסטורים, מערות ומה שבדרך.',
    body2 : 'לפעמים אנו שוכחים שהדברים הטובים באמת נמצאים ממש מתחת ליד הבית... זכרו לבקר אך גם לשמור על הטבע. בשבילנו, ובשביל עתיד ירוק!',
    body3 : 'מוזמנים להירשם ולהיות חלק מהקהילה!'

}

const Greeting = () => {
    
    const [opened, setOpened] = useState(false);
    const [parsedUser, setParsedUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem('user');
            if (user) {
                setParsedUser(JSON.parse(user));
            }
            else {
                setOpened(true);
            }
        }
      }, []);


    if (parsedUser) {
        return null;
    }
    return (
        <div dir='rtl' className={opened ? greeting.greeting_container : 'hidden'}>
            <div className='flex w-full'>
                <button onClick={() => setOpened(!opened)} className='text-black hover:opacity-50 text-2xl lg:text-[26px] text-end'>X</button>
            </div>
            <div className='flex flex-col justify-center items-center w-full'>
            <h1 className={greeting.greeting_title}>{greetingText.title}</h1>
            <p className={greeting.greeting_text}>{greetingText.body1}</p>
            <p className={greeting.greeting_text}>{greetingText.body2}</p>
            <p className={greeting.greeting_text}>{greetingText.body3}</p>
            </div>
            <div className='flex justify-between pt-10 lg:justify-center items-center w-[80%]'>
                <Link href={'/register'} className='bg-blue-500 lg:ml-10 hover:opacity-50 text-white text-xl rounded-lg p-2'>להרשמה</Link>
                <Link href={'/login'} className='bg-blue-500 text-white hover:opacity-50 lg:mr-10 text-xl rounded-lg p-2'>התחברות</Link>
            </div>    
        </div>        
    );
    }

export default Greeting;

