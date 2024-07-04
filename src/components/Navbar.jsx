
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




const Navbar = ({cookieCallback}) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [curPath , setPath] = useState('/home');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);


  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };


  const handleLogout = () => {

    const confirmation = window.confirm('האם אתה בטוח שברצונך להתנתק?');

    if (confirmation) {
      const rememberMe = localStorage.getItem('rememberMe');

      if (rememberMe !== 'true') {
        localStorage.removeItem('user');
        cookieCallback('user', null, 'remove');
      }


      localStorage.removeItem('rememberMe');
      cookieCallback('rememberMe', null, 'remove');
      setUser(null);
      handleNav();
      toast.success('התנתקת בהצלחה');
      // redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }

  };


  useEffect(() => {
    const visiblePaths = ['/tours', '/articles', '/trail_catalogue'];
    setIsSearchVisible(visiblePaths.includes(curPath));
  }, [curPath]);


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

    
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search query:', searchQuery);
  };

  return (
    <nav className={`navbar-container ${navbar.container}`}>
      <div className={`${navbar.inner_div}`}>
        <div className='flex items-center flex-row'>
        <div className='lg:hidden'> 
        <Link href='/'>
          <Image src={logo} alt='logo' width={80} height={80} />
        </Link>
        </div>
        <div className='hidden lg:flex lg:items-center lg:flex-row '>
          <Link href='/'>
            <Image src={logo} alt='logo' width={120} height={120} />
          </Link>
        </div>
        {user == null ?  (
          <div className='hidden lg:ml-[10vw] lg:flex lg:items-center lg:flex-row '>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>הרשמה</div>} shadow='none' showArrow>  
            <Link href='/register' className={curPath == '/register' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/register')}>
              <p className={navbar.desktop_p}>הרשמה</p>
              <GiArchiveRegister className='xl:text-[40px] lg:text-[30px]'/>
            </Link>
          </Tooltip>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>התחברות</div>} shadow='none' showArrow>
            <Link href='/login' className={curPath == '/login' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/login')}>
              <p className={navbar.desktop_p}>התחברות</p>
              <BiLogIn className='xl:text-[40px] lg:text-[30px]' />
            </Link>
          </Tooltip>
        </div>
        ) : (
          <div className='hidden lg:ml-[10vw] lg:flex lg:items-center lg:flex-row '>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>הפרופיל שלי</div>} shadow='none' showArrow>
          <Link href='/profile' className={curPath == '/profile' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/profile')}>
            <p className={navbar.desktop_p}>{user.firstName}</p>
            <CgProfile className='xl:text-[40px] lg:text-[30px]' />
          </Link>
          </Tooltip>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>התנתק</div>} shadow='none' showArrow>
            <button onClick={handleLogout} className='mx-5 flex items-center flex-row hover:text-blue-500'>
              <p className={navbar.desktop_p}>התנתק</p>
              <BiLogOut className='xl:text-[40px] lg:text-[30px]' />
            </button>  
          </Tooltip>
          </div>   
        )}

          {isSearchVisible && (
          <div>
            <span dir='rtl'>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="חפש"
                className="border rounded px-3 py-2 pl-16"
                />
                <button type="submit" className="absolute left-3 mt-2">
                  🔍
                </button>
              </form>
            </span>
          </div>
          )}


        </div>
        <div>
          <ul className={`${navbar.ul_desktop}`}>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>דף הבית</div>} shadow='none' showArrow>
            <Link onClick={() => setPath('/home')} className={curPath == '/home' ? navbar.desktop_link_curr : navbar.desktop_link} href='/home'>
              <p className={navbar.desktop_p}>דף הבית</p>
              <IoHome className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip  placement='bottom' content={<div className='text-xl p-1'>מסלולים</div>} shadow='none' showArrow>
            <Link href = '/trail_catalogue' className={curPath == '/trail_catalogue' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/trail_catalogue')}>
              <p className={navbar.desktop_p}>מסלולים</p>
              <FaMapSigns className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>סיורים</div>} shadow='none' showArrow>
            <Link className={curPath == '/tours' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/tours')} href='/tours'>
              <p className={navbar.desktop_p}>סיורים</p>
              <FaFlag className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>כתבות</div>} shadow='none' showArrow>
            <Link href = '/articles' className={curPath == '/articles' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/articles')}>
              <p className={navbar.desktop_p}>כתבות</p>
              <IoNewspaperSharp className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>אודות</div>} shadow='none' showArrow>
            <Link href='/about' className={curPath == '/about' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/about')}>
              <p className={navbar.desktop_p}>קצת עלינו</p>
              <BsFillInfoCircleFill className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>צור קשר</div>} shadow='none' showArrow>
            <Link href='/contact' className={curPath == '/contact' ? navbar.desktop_link_curr : navbar.desktop_link} onClick={() => setPath('/contact')}>
              <p className={navbar.desktop_p}>צור קשר</p>
              <AiFillMessage className='xl:text-[40px] lg:text-[30px]' />
            </Link>
            </Tooltip>
          </ul>
          <div className={`${navbar.hamburger}`}>
            <RxHamburgerMenu onClick={handleNav} className={!menuOpen ? 'text-4xl text-text' : 'text-blocked text-4xl'} />
          </div>
          <div className={menuOpen ? navbar.menu_opened : navbar.menu_closed}>
            <div className={`${navbar.inner_menu_close_btn}`}>
              <IoMdClose onClick={handleNav} className='text-4xl text-text' />
            </div>
            <div className={`${navbar.user_intro}`}>
              {user == null ? <p className='text-black text-xl'>,שלום אורח</p> : <p className='text-black text-xl'>,שלום {user.firstName}</p>}
            </div>
            <ul className={`${navbar.ul_opened_menu}`}>
              <Link className={curPath == '/home' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/home'>
                <li className={`${navbar.li_opened_menu}`}>בית
                  <IoHome size={25} />
                </li>
              </Link>
              <Link className={curPath == '/trail_catalogue' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/trail_catalogue'>
                <li className={`${navbar.li_opened_menu}`}>מסלולים
                  <FaMapSigns size={25} />
                </li>
              </Link>
              <Link className={curPath == '/tours' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/tours'>
                <li className={`${navbar.li_opened_menu}`}>סיורים
                  <FaCircleExclamation size={25} />
                </li>
              </Link>
              <Link className={curPath == '/articles' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/articles'>
                <li className={`${navbar.li_opened_menu}`}>כתבות
                  <IoNewspaperSharp size={25} />
                </li>
              </Link>
              <Link className={curPath == '/about' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/about'>
                <li className={`${navbar.li_opened_menu}`}>קצת עלינו
                  <BsFillInfoCircleFill size={25} />
                </li>
              </Link>
              <Link className={curPath == '/contact' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/contact'>
                <li className={`${navbar.li_opened_menu}`}>צרו קשר
                  <AiFillMessage size={25} />
                </li>
              </Link>
              <hr className='w-full border-[2px] border-text' />
              {user == null ? (
                <ul className={`${navbar.ul_opened_menu}`}>
                  <Link className={curPath == '/login' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/login'>
                    <li className={`${navbar.li_opened_menu}`}>התחברות
                      <BiLogIn size={25} />
                    </li>
                  </Link>
                  <Link className={curPath == '/register' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/register'>
                    <li className={`${navbar.li_opened_menu}`}>הרשמה
                      <GiArchiveRegister size={25} />
                    </li>
                  </Link>
                </ul>
              ) : (
                <ul className={`${navbar.ul_opened_menu}`}>
                  <Link className={curPath == '/profile' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/profile'>
                    <li className={`${navbar.li_opened_menu}`}>פרופיל
                      <CgProfile size={25} />
                    </li>
                  </Link>
                  <button onClick={handleLogout} 
                          className={`${navbar.li_opened_menu} text-text`}>
                            התנתק
                          <BiLogOut size={25} />
                  </button>
                </ul>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
