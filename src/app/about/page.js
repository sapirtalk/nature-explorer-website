import React from 'react'
import Image from 'next/image'
import logo from '../../../public/resources/images/logo/logo.png'
// import inbalHenBargav from '../../../public/resources/images/people/inbalHenBargav.jpeg'
// import naamaTessler from '../../../public/resources/images/people/naamaTessler.jpeg'
// import odedUlman from '../../../public/resources/images/people/odedUlman.jpeg'
import israelPeer from '../../../public/resources/images/people/israelPeer.jpeg'
// import aviAlbaum from '../../../public/resources/images/people/aviAlbaum.jpeg'
// import audreyLanger from '../../../public/resources/images/people/audreyLanger.jpeg'
// import asafBenLevi from '../../../public/resources/images/people/asafBenLevi.jpeg'
// import ehudSvirsky from '../../../public/resources/images/people/ehudSvirsky.jpeg'
// import taliMoav from '../../../public/resources/images/people/taliMoav.jpeg'
// import michalKogan from '../../../public/resources/images/people/michalKogan.jpeg'
import orlySasson from '../../../public/resources/images/people/orlySasson.jpeg'


function About() {
  return (
    <div className='lg:flex text-center justify-center lg:text-[24px] lg:h-full item-center p-3 text-text lg:w-[100%] mb-5' dir='rtl'>
      <div className='lg:w-[50%]'>
      <span dir='rtl'>
      <header className='text-2xl lg:text-[30px] font-bold'>עלינו</header>
      <br/>
      <p>ברוכים הבאים לאתר &quot;בשבילי חיפה&quot;!</p>
      <br/>
      <p> הכול התחיל בינואר 2021, כשמגפת הקורונה הכריחה אותנו להישאר קרוב לבית. אז, פתחנו את קבוצת הפייסבוק &quot;בשבילי חיפה- שבילים, מסלולים, פינות טבע בעיר&quot; והתחלנו לחפש את הפינות הירוקות והקסומות של העיר שלנו.</p>
      <br/>
      <p> מאז, אנחנו לא מפסיקים לגלות ולשתף את היופי הטבעי של חיפה והסביבה. הצטרפו אלינו למסע בטבע, גלו מקומות חדשים, ותיהנו מכל רגע.</p>
      <br/>
      <p> אנחנו דואגים לשמור על הניקיון והטבע למען המטיילים הבאים, ומזכירים שכל המסלולים שלנו הן בגדר המלצה בלבד. כל אחד ואחת מוזמנים לבדוק את המסלולים, דרגת הקושי והפרטים השונים, ולנהוג באחריות ובבטיחות בהתאם לשיקול דעתם.</p>
      <br/>
      <p> תודה שאתם חלק מקהילת &quot;בשבילי חיפה&quot;. יחד, נמשיך לגלות, לשמור וליהנות מהטבע הנפלא שסביבנו.</p>
      <br/>
      <p> צאו לטייל, ותהנו מכל רגע!</p>
      </span>
      </div>
      <div className='lg:hidden border-8 border-tertiary mt-5 mb-5'></div>
      <div className="lg:w-[50%] lg:mr-10">
        <div className='mb-3'>
          <header className="text-2xl lg:text-[30px] font-bold">הכירו אותנו</header>
            <p className="mt-3 text-lg text-gray-600">האנשים שמאחורי הסיורים</p>
        </div>
          <ul className="grid gap-x-8 gap-y-12 lg:grid-cols-2 text-right">
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">ענבל חן ברגב</header>
                  <p className="text-sm text-indigo-600">מורה, עו"ד, מנהלת קבוצת הפייסבוק &quot;בשבילי חיפה&quot; , כותבת בהתנדבות טור בנושאי טבע במגזין &quot;חי פה&quot; ומנהלת האתר</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">נעמה טסלר</header>
                  <p className="text-sm text-indigo-600">אקולוגית ומומחית לשיקום יערות לאחר שריפה, פעלה בשיקום השריפה של 2016 ומובילה סיורים בואדי אחוזה ובגבעת אורנים</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">עודד אולמן</header>
                  <p className="text-sm text-indigo-600">הנדסאי בניין שיצא לגמלאות ומאז הוא עסוק מתמיד, מוביל סיור בשביל אהוד</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={israelPeer} width={80} height={80} />
                <div>
                  <header className="text-lg">ישראל פאר</header>
                  <p className="text-sm text-indigo-600">מנהל את מיזם &quot;תכנית לאומית לניטור פרפרים&quot; ומוביל סיורי הרצאה והיכרות עם פרפרי הכרמל</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">אבי אלבאום</header>
                  <p className="text-sm text-indigo-600">חבר הועד המנהל של &quot;עמותת ירוק בלב&quot; ומלווה סיורים בגבעת העיזים שברמת בגין</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">אודרי לנגר</header>
                  <p className="text-sm text-indigo-600">מדריכת טיולים ומלמדת אקולוגיה וחינוך סביבתי בבתי ספר בחיפה, מובילה סיורים בכל שבילי חיפה</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">אסף בן לוי</header>
                  <p className="text-sm text-indigo-600">יו"ר עמותת ירוק בלב ויועץ משפטי בחברה להגנת הטבע, מוביל סיור בגבעת העיזים שברמת בגין</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">אהוד סבירסקי</header>
                  <p className="text-sm text-indigo-600">מורה למדעים וביולוגיה ומוביל סיורים בכל שבילי הכרמל</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">טלי מואב</header>
                  <p className="text-sm text-indigo-600">היסטוריונית, מדריכת טיולים ופעילה סביבתית, מובילה סיור בנחל הגיבורים</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={logo} width={80} height={80} />
                <div>
                  <header className="text-lg">מיכל קוגן</header>
                  <p className="text-sm text-indigo-600">סטודנטית לגינון טיפולי ואקותרפיה ואדריכלית פנים, פעילה בגינה הקהילתית של רמת אלון ומובילה סיורים בואדי בן דור וואדי שנאק</p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-6">
                <Image src={orlySasson} width={80} height={80} />
                <div>
                  <header className="text-lg">אורלי ששון</header>
                  <p className="text-sm text-indigo-600">מדריכת טיולים ומובילת סיורים בכל שבילי חיפה</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  )
}

export default About