"use client";

import Link from "next/link";
import { greeting } from '@/styles/tailwindSaved';
import { topBar } from "@/styles/tailwindSaved";

const greetingText = {
    title: 'ברוכים הבאים לאתר בשבילי חיפה!',
    body1 : 'אתר זה הוקם כדי לשתף מסלולים עירוניים המקיפים את השכונות הרבות על רכס הכרמל. שבילים ומסלולים הטובלים בטבע ירוק, בפריחות צבעוניות, מאגרי מים, שרידים הסטורים, מערות ומה שבדרך. mלפעמים אנו שוכחים שהדברים הטובים באמת נמצאים ממש מתחת ליד הבית... זכרו לבקר אך גם לשמור על הטבע. בשבילנו, ובשביל עתיד ירוק!',
    body2 : 'מוזמנים להירשם ולהיות חלק מהקהילה!'
}

const TopBar = () => {


    return (
        <div dir='rtl'>
                <div className='bg-tertiary'>
                    <br/>
                    <br/>
                </div>
        </div>
    );
}

export default TopBar;