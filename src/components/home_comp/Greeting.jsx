"use client";

import { greeting } from '@/styles/tailwindSaved';

const greetingText = {
    title: 'ברוכים הבאים לאתר בשבילי חיפה!',
    body1 : 'אתר זה הוקם כדי לשתף מסלולים עירוניים המקיפים את השכונות הרבות על רכס הכרמל. שבילים ומסלולים הטובלים בטבע ירוק, בפריחות צבעוניות, מאגרי מים, שרידים הסטורים, מערות ומה שבדרך. לפעמים אנו שוכחים שהדברים הטובים באמת נמצאים ממש מתחת ליד הבית... זכרו לבקר אך גם לשמור על הטבע. בשבילנו, ובשביל עתיד ירוק!',
    body2 : 'מוזמנים להירשם ולהיות חלק מהקהילה!'
}

const Greetings = () => {


    return (
        <div dir='rtl'>
                <div className={greeting.greeting_container}>
                    <h1 className={greeting.greeting_title}>{greetingText.title}</h1>
                    <p className={greeting.greeting_text}>{greetingText.body1}</p>
                    <p className={greeting.greeting_text}>{greetingText.body2}</p>
                </div>
        </div>
    );
}

export default Greetings;