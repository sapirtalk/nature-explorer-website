
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




const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [curPath , setPath] = useState('/home');
  const [user, setUser] = useState(null);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };


  const handleLogout = () => {

    const confirmation = window.confirm('האם אתה בטוח שברצונך להתנתק?');

    if (confirmation) {

      const rememberMe = localStorage.getItem('rememberMe');

      if (rememberMe !== 'true') {
        localStorage.removeItem('user');
      }


      localStorage.removeItem('rememberMe');
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
        <Tooltip content="בית" size='lg' shadow='none' showArrow>
          <Link href='/'>
            <Image src={logo} alt='logo' width={100} height={100} />
          </Link>
        </Tooltip>
        </div>
        {user == null ?  (
          <div className='hidden lg:ml-[10vw] lg:flex lg:items-center lg:flex-row '>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>הרשמה</div>} shadow='none' showArrow>  
            <Link href='/register' className={curPath == '/register' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/register')}>
              <GiArchiveRegister size={40}/>
            </Link>
          </Tooltip>
          <Tooltip placement='bottom' content={<div className='text-xl p-1'>התחברות</div>} shadow='none' showArrow>
            <Link href='/login' className={curPath == '/login' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/login')}>
              <BiLogIn size={40} />
            </Link>
          </Tooltip>
        </div>
        ) : (
          <div className='hidden lg:ml-[10vw] lg:flex lg:items-center lg:flex-row '>
          <p className='mx-5 text-2xl'> ,שלום {user.firstName}</p>
        <Tooltip placement='bottom' content={<div className='text-xl p-1'>הפרופיל שלי</div>} shadow='none' showArrow>
          <Link href='/profile' className={curPath == '/profile' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/profile')}>
            <CgProfile size={40} />
          </Link>
        </Tooltip>
        <Tooltip placement='bottom' content={<div className='text-xl p-1'>התנתק</div>} shadow='none' showArrow>
          <button onClick={handleLogout} className='mx-5'>
            <BiLogOut size={40} />
          </button>  
        </Tooltip>
        </div>   
          )}
        
        </div>
        <div>
          <ul className={`${navbar.ul_desktop}`}>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>דף הבית</div>} shadow='none' showArrow>
            <Link onClick={() => setPath('/home')} className={curPath == '/home' ? 'opacity-50 mx-5' : 'mx-5'} href='/home'>
              <IoHome size={40} />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>סיורים</div>} shadow='none' showArrow>
            <Link className={curPath == '/tours' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/tours')} href='/tours'>
              <FaFlag size={40} />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>אודות</div>} shadow='none' showArrow>
            <Link href='/about' className={curPath == '/about' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/about')}>
               <BsFillInfoCircleFill size={40} />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>צור קשר</div>} shadow='none' showArrow>
            <Link href='/contact' className={curPath == '/contact' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/contact')}>
              <AiFillMessage size={40} />
            </Link>
            </Tooltip>
            <Tooltip placement='bottom' content={<div className='text-xl p-1'>כתבות</div>} shadow='none' showArrow>
            <Link href = '/articles' className={curPath == '/articles' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/articles')}>
              <IoNewspaperSharp size={40} />
            </Link>
            </Tooltip>
            <Tooltip  placement='bottom' content={<div className='text-xl p-1'>מסלולים</div>} shadow='none' showArrow>
            <Link href = '/trail_catalogue' className={curPath == '/trail_catalogue' ? 'opacity-50 mx-5' : 'mx-5'} onClick={() => setPath('/trail_catalogue')}>
              <FaMapSigns size={40} />
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
              <Link className={curPath == '/news' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/news'>
                <li className={`${navbar.li_opened_menu}`}>עדכונים
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
