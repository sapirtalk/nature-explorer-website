import React from 'react'
import {Link} from "@nextui-org/link";

function Contact() {
  return (
    <div className='text-center justify-start item-start p-3 text-text h-[55vh]'>
      <span dir='rtl'>
      <header className='text-2xl font-bold'>צור קשר</header>
      <br/>
      <p>נשמח לשמוע מכם! ניתך ליצור איתנו קשר באמצעות כתובת המייל הבאה:</p>
      <br/>
      <Link isBlock showAnchorIcon href="mailto:ntr.explorer1@gmail.com" color="secondary" className='underline underline-offset-auto font-bold'>ntr.explorer1@gmail.com</Link>
      <br/>
      <br/>
      <p>מוזמנים להצטרף גם אל קבוצת הפייסבוק שלנו </p>
      <Link isBlock showAnchorIcon href="https://www.facebook.com/groups/2787205004828441/" color="secondary" className='underline underline-offset-auto'>״בשבילי חיפה - שבילים , מסלולים, פינות טבע בעיר״</Link>
      <br/>
      <br/>
      <p>שימו לב, האתר מנוהל על ידי מתנדבים, ולכן ייתכן שמענה לפנייה ייקח קצת זמן</p>
      <br/>
      <p>תודה על הסבלנות, נחזור אליכם בהקדם!</p>
      </span>
    </div>
  )
}

export default Contact