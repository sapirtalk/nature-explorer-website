import React from 'react'

function Contact() {
  return (
    <div className='place-content-center text-center justify-center item-center p-3 text-text'>
      <span dir='rtl'>
      <header className='text-2xl font-bold'>צור קשר</header>
      <br/>
      <p>נשמח לשמוע מכם! ניתך ליצור איתנו קשר באמצעות כתובת המייל הבאה:</p>
      <br/>
      <a href='mailto:ntr.explorer1@gmail.com' className='underline underline-offset-auto'>ntr.explorer1@gmail.com</a>
      <br/>
      <br/>
      <p>מוזמנים להצטרף גם אל קבוצת הפייסבוק שלנו </p>
      <a href='https://www.facebook.com/groups/2787205004828441/' className='underline underline-offset-auto'>״בשבילי חיפה - שבילים , מסלולים, פינות טבע בעיר״</a>
      <br/>
      <br/>
      <p>שימו לב, האתר מנוהל על ידי מתנדבים, ולכן ייתכן שמענה לפנייה ייקח קצת זמן</p>
      <br/>
      <p><span dir='rtl'>תודה על הסבלנות, נחזור אליכם בהקדם!</span></p>
      </span>
    </div>
  )
}

export default Contact