
"use client";

import Image from 'next/image';
import logo from '../../public/resources/images/logo/logo.png';
import Link from 'next/link';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from 'react';
import { navbar } from '../styles/tailwindSaved';
import { IoHome } from "react-icons/io5";
import { IoNewspaperSharp } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { GiArchiveRegister } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FaMapSigns } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { FaFlag } from "react-icons/fa";
import { Tooltip } from '@nextui-org/react';
import { TiWeatherCloudy } from "react-icons/ti";





const Navbar = ({cookieCallback}) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [curPath , setPath] = useState('/home');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };


  const handleLogout = async () => {

    const confirmation = window.confirm('האם אתה בטוח שברצונך להתנתק?');

    if (confirmation) {
      const rememberMe = await cookieCallback('rememberMe', null ,'get');
      setUser(null);


      if (rememberMe !== 'true') {
        await cookieCallback('user', null, 'remove');
      }

      handleNav();
      toast.success('התנתקת בהצלחה');
      // redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }

  };


  useEffect(() => {
    const fetchCookie = async () => {
      const cookie = await cookieCallback('user', null, 'get');
      setUser(cookie);
    };

    fetchCookie();
  }, [cookieCallback]);

    
  // Close the menu when clicking outside of it
  useEffect(() => {
    setPath(window.location.pathname);
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.navbar-container') && menuOpen) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);


  return (
    <nav className={`navbar-container ${navbar.container}`}>
      <div className={`${navbar.inner_div}`}>
        <div className='flex items-center flex-row'>
        <div className='lg:hidden'> 
        <Link href='/'>
          <Image src={logo} alt='logo' width={80} height={80} />
        </Link>
        </div>
        
        {user == null ?  (
          <div className='hidden lg:flex p-1 text-text'>
          <Tooltip placement='bottom' content={<div className='text-xl p-1 '>התחברות</div>} shadow='none' showArrow>
            <div className='p-1 mr-5'>
            <Link href='/login' className={curPath == '/login' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/login')}>
              <p className={navbar.desktop_p}>התחברות</p>
              &nbsp;
              <BiLogIn className='xl:text-[40px] lg:text-[30px]'/>
            </Link>
            </div>
          </Tooltip>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>הרשמה</div>} shadow='none' showArrow>
            <div className='p-1'>
            <Link href='/register' className={curPath == '/register' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/register')}>
              <p className={navbar.desktop_p}>הרשמה</p>
              &nbsp;
              <GiArchiveRegister className='xl:text-[40px] lg:text-[30px]'/>
            </Link>
            </div>
          </Tooltip>
        </div>
        ) : (
          <div className='hidden lg:flex text-xl'>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>התנתק</div>} shadow='none' showArrow>
            <button onClick={handleLogout} className='mx-5 flex items-center flex-row hover:text-blue-500'>
              <p className={navbar.desktop_p}>התנתק</p>
              &nbsp;
              <BiLogOut className='xl:text-[40px] lg:text-[30px]' />
            </button>  
          </Tooltip>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>הפרופיל שלי</div>} shadow='none' showArrow>
          <Link href='/profile' className={curPath == '/profile' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/profile')}>
            <p className={navbar.desktop_p}>אזור אישי</p>
            &nbsp;
            <CgProfile className='xl:text-[40px] lg:text-[30px]' />
          </Link>
          </Tooltip>
        </div>

)}


        </div>
        <div>
          <ul className={`${navbar.ul_desktop}`}>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>דף הבית</div>} shadow='none' showArrow>
            <Link onClick={() => setPath('/home')} className={curPath == '/home' ? navbar.desktop_link_curr : navbar.desktop_link} href='/home'>
              <p className={navbar.desktop_p}>דף הבית</p>
              &nbsp;
              <IoHome className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip  placement='bottom' content={<div className='text-xl p-1'>מסלולים</div>} shadow='none' showArrow>
            <Link href = '/trail_catalogue' className={curPath == '/trail_catalogue' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/trail_catalogue')}>
              <p className={navbar.desktop_p}>מסלולים</p>
              &nbsp;
              <FaMapSigns className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>סיורים</div>} shadow='none' showArrow>
            <Link className={curPath == '/tours' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/tours')} href='/tours'>
              <p className={navbar.desktop_p}>סיורים</p>
              &nbsp;
              <FaFlag className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>כתבות</div>} shadow='none' showArrow>
            <Link href = '/articles' className={curPath == '/articles' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/articles')}>
              <p className={navbar.desktop_p}>כתבות</p>
              &nbsp;
              <IoNewspaperSharp className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>אודות</div>} shadow='none' showArrow>
            <Link href='/about' className={curPath == '/about' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/about')}>
              <p className={navbar.desktop_p}>קצת עלינו</p>
              &nbsp;
              <BsFillInfoCircleFill className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>צור קשר</div>} shadow='none' showArrow>
            <Link href='/contact' className={curPath == '/contact' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/contact')}>
              <p className={navbar.desktop_p}>צור קשר</p>
              &nbsp;
              <AiFillMessage className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>חיפוש</div>} shadow='none' showArrow>
            <Link href='/weather' className={curPath == '/weather' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/weather')}>
              <p className={navbar.desktop_p}>מזג אויר</p>
              &nbsp;
              <TiWeatherCloudy className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
          </ul>
          <div className={`${navbar.hamburger}`}>
            <RxHamburgerMenu onClick={handleNav} className={!menuOpen ? 'text-4xl text-text' : 'text-blocked text-4xl'} />
          </div>
          <div className={menuOpen ? navbar.menu_opened : navbar.menu_closed} dir='rtl'>
            <div>
            <span className={`${navbar.inner_menu_close_btn}`} dir='ltr'>
              <IoMdClose onClick={handleNav} className='text-4xl text-text' />
            <p className={`${navbar.user_intro} mt-1`} dir='ltr'>
              {user == null ? "שלום אורח," : `,שלום ${user.firstName}`}
              </p>
            </span>
            </div>
            <hr className='w-full border-[2px] border-text' />
            <br />
            <ul className={`${navbar.ul_opened_menu}`}>
              <Link className={curPath == '/home' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/home'>
                <li className={`${navbar.li_opened_menu}`}>
                  <IoHome size={25} />
                  &nbsp;
                  בית
                </li>
              </Link>
              <Link className={curPath == '/trail_catalogue' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/trail_catalogue'>
                <li className={`${navbar.li_opened_menu}`}>
                  <FaMapSigns size={25} />
                  &nbsp;
                  מסלולים
                </li>
              </Link>
              <Link className={curPath == '/tours' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/tours'>
                <li className={`${navbar.li_opened_menu}`}>
                  <FaFlag size={25} />
                  &nbsp;
                  סיורים
                </li>
              </Link>
              <Link className={curPath == '/articles' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/articles'>
                <li className={`${navbar.li_opened_menu}`}>
                  <IoNewspaperSharp size={25} />
                  &nbsp;
                  כתבות
                </li>
              </Link>
              <Link className={curPath == '/about' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/about'>
                <li className={`${navbar.li_opened_menu}`}>
                  <BsFillInfoCircleFill size={25} />
                  &nbsp;
                  קצת עלינו
                </li>
              </Link>
              <Link className={curPath == '/contact' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/contact'>
                <li className={`${navbar.li_opened_menu}`}>
                  <AiFillMessage size={25} />
                  &nbsp;
                  צור קשר
                </li>
              </Link>
              <Link className={curPath == '/weather' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/weather'>
                <li className={`${navbar.li_opened_menu}`}>
                  <TiWeatherCloudy size={25} />
                  &nbsp;
                  מזג אויר
                </li>
              </Link>
              <hr className='w-full border-[2px] border-text' />
              {user == null ? (
                <ul className={`${navbar.ul_opened_menu}`}>
                  <Link className={curPath == '/login' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/login'>
                    <li className={`${navbar.li_opened_menu}`}>
                      <BiLogIn size={25} />
                      &nbsp;
                      התחברות
                    </li>
                  </Link>
                  <Link className={curPath == '/register' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/register'>
                    <li className={`${navbar.li_opened_menu}`}>
                      <GiArchiveRegister size={25} />
                      &nbsp;
                      הרשמה
                    </li>
                  </Link>
                </ul>
              ) : (
                <ul className={`${navbar.ul_opened_menu}`}>
                  <Link className={curPath == '/profile' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/profile'>
                    <li className={`${navbar.li_opened_menu}`}> 
                      <CgProfile size={25} />
                      &nbsp;
                      אזור אישי
                    </li>
                  </Link>
                  <button onClick={handleLogout} 
                          className={`${navbar.li_opened_menu} text-text`}>
                          <BiLogOut size={25} />
                          &nbsp;
                          התנתק
                  </button>
                </ul>
              )}
            </ul>
          </div>
        </div>
        <div className='hidden lg:flex lg:items-center lg:flex-row '>
          <Link href='/'>
            <Image src={logo} alt='logo' width={120} height={120} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
