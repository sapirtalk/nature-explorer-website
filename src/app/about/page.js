import React from 'react'
import Image from 'next/image'
import inbalHenBargav from '../../../public/resources/images/people/inbalHenBargav.jpeg'
import naamaTesler from '../../../public/resources/images/people/naamaTesler.jpeg'
import odedUlman from '../../../public/resources/images/people/odedUlman.jpeg'
import israelPeer from '../../../public/resources/images/people/israelPeer.jpeg'
import aviAvelboum from '../../../public/resources/images/people/aviAvelboum.jpeg'
import audreyLanger from '../../../public/resources/images/people/audreyLanger.jpeg'
import asafBenLevi from '../../../public/resources/images/people/asafBenLevi.jpeg'
import ehudSvirsky from '../../../public/resources/images/people/ehudSvirski.jpeg'
import talyMoav from '../../../public/resources/images/people/talyMoav.jpeg'
import michalKogan from '../../../public/resources/images/people/michalKogan.jpeg'
import orlySasson from '../../../public/resources/images/people/orlySasson.jpeg'
import pniniaMadan from '../../../public/resources/images/people/pniniaMadan.jpeg'
import tomerShalev from '../../../public/resources/images/people/tomerShalev.jpeg'


const teamMembers = [
  {
    name: 'ענבל חן ברגב',
    image: inbalHenBargav,
    description: 'מורה, עו"ד, מנהלת קבוצת הפייסבוק "בשבילי חיפה" , כותבת בהתנדבות טור בנושאי טבע במגזין "חי פה" ומנהלת האתר.',
  },
  {
    name: 'נעמה טסלר',
    image: naamaTesler,
    description: 'אקולוגית ומומחית לשיקום יערות לאחר שריפה, פעלה בשיקום השריפה של 2016 ומובילה סיורים בואדי אחוזה ובגבעת אורנים.',
  },
  {
    name: 'עודד אולמן',
    image: odedUlman,
    description: 'הנדסאי בניין שיצא לגמלאות ומאז הוא עסוק מתמיד, מוביל סיור בשביל אהוד.',
  },
  {
    name: 'ישראל פאר',
    image: israelPeer,
    description: 'מנהל את מיזם "תכנית לאומית לניטור פרפרים" ומוביל סיורי הרצאה והיכרות עם פרפרי הכרמל.',
  },
  {
    name: 'אבי אלבאום',
    image: aviAvelboum,
    description: 'חבר הועד המנהל של "עמותת ירוק בלב" ומלווה סיורים בגבעת העיזים שברמת בגין.',
  },
  {
    name: 'אודרי לנגר',
    image: audreyLanger,
    description: 'מדריכת טיולים ומלמדת אקולוגיה וחינוך סביבתי בבתי ספר בחיפה, מובילה סיורים בכל שבילי חיפה.',
  },
  {
    name: 'אסף בן לוי',
    image: asafBenLevi,
    description: 'יו"ר עמותת ירוק בלב ויועץ משפטי בחברה להגנת הטבע, מוביל סיור בגבעת העיזים שברמת בגין.',
  },
  {
    name: 'אהוד סבירסקי',
    image: ehudSvirsky,
    description: 'מורה למדעים וביולוגיה ומוביל סיורים בכל שבילי הכרמל.',
  },
  {
    name: 'טלי מואב',
    image: talyMoav,
    description: 'היסטוריונית ומספרת סיפורים, פעילה סביבתית בנושאי טבע, סביבה, איכות חיים וחברה ומתנדבת במיזמים שונים. מדריכת טיולים בארץ וברחבי חיפה ושבילי הכרמל.',
  },
  {
    name: 'מיכל קוגן',
    image: michalKogan,
    description: 'סטודנטית לגינון טיפולי ואקותרפיה ואדריכלית פנים, פעילה בגינה הקהילתית של רמת אלון ומובילה סיורים בואדי בן דור וואדי שנאק.',
  },
  {
    name: 'אורלי ששון',
    image: orlySasson,
    description: 'אדריכלית נוף ומתכננת ערים / מאמנת כושר ומורה ליוגה, פעילה חברתית שנים רבות בעיר חיפה, בעיקר בתחום גינות קהילתיות וטבע עירוני, מובילה סיורים במגוון אתרים בטבע העירוני של חיפה.',
  },
  {
    name: 'פנינה מדן',
    image: pniniaMadan,
    description: 'תושבת נווה שאנן, רכזת גינת השבשבת, הגינה הקהילתית של שכונת זיו. פעילה סביבתית ורכזת פורום טבע וסביבה בחיפה והמפרץ.',
  },
  {
    name: 'תומר שלו',
    image: tomerShalev,
    description: 'פעיל חברתי סביבתי בעמותת "פורום ציבורי כרמל", "ירוק בלב" וצוות יער רמת-אלון. כותב תוכנות סביבתיות.'
  },
];

function About() {
  return (
    <div className="lg:flex text-center justify-center lg:text-[24px] lg:h-full item-center p-3 text-text lg:w-[100%] mb-5" dir="rtl">
      <div className="lg:w-[50%]">
        <span dir="rtl">
          <header className="text-2xl lg:text-[30px] font-bold">קצת עלינו</header>
          <br />
          <p>ברוכים הבאים לאתר &quot;בשבילי חיפה&quot;!</p>
          <br />
          <p> הכול התחיל בינואר 2021, כשמגפת הקורונה הכריחה אותנו להישאר קרוב לבית. אז, פתחנו את קבוצת הפייסבוק &quot;בשבילי חיפה- שבילים, מסלולים, פינות טבע בעיר&quot; והתחלנו לחפש את הפינות הירוקות והקסומות של העיר שלנו.</p>
          <br />
          <p> מאז, אנחנו לא מפסיקים לגלות ולשתף את היופי הטבעי של חיפה והסביבה. הצטרפו אלינו למסע בטבע, גלו מקומות חדשים, ותיהנו מכל רגע.</p>
          <br />
          <p> אנחנו דואגים לשמור על הניקיון והטבע למען המטיילים הבאים, ומזכירים שכל המסלולים שלנו הן בגדר המלצה בלבד. כל אחד ואחת מוזמנים לבדוק את המסלולים, דרגת הקושי והפרטים השונים, ולנהוג באחריות ובבטיחות בהתאם לשיקול דעתם.</p>
          <br />
          <p> תודה שאתם חלק מקהילת &quot;בשבילי חיפה&quot;. יחד, נמשיך לגלות, לשמור וליהנות מהטבע הנפלא שסביבנו.</p>
          <br />
          <p> צאו לטייל, ותהנו מכל רגע!</p>
        </span>
      </div>
      <div className="lg:hidden border-8 border-tertiary mt-5 mb-5"></div>
      <div className="lg:w-[50%] lg:mr-10">
        <div className="mb-3">
          <header className="text-2xl lg:text-[30px] font-bold">הכירו אותנו</header>
          <p className="mt-3 text-lg text-gray-600">האנשים שמאחורי הסיורים</p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 lg:grid-cols-2 text-right">
          {teamMembers.map((member, index) => (
            <li key={index}>
              <div className="flex items-center gap-x-6">
                <Image className="w-20 h-20 rounded-full" src={member.image} width={80} height={80} alt={member.name} />
                <div>
                  <header className="text-lg">{member.name}</header>
                  <p className="text-sm text-indigo-600">{member.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default About;