
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
import { GiArchiveRegister } from "react-icons/gi";




const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [curPath , setPath] = useState('/home');

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  


    
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
        <Link href='/'>
          <Image src={logo} alt='logo' width={80} height={80} />
        </Link>
        <div>
          <ul className={`${navbar.ul_desktop}`}>
            <Link className={curPath == '/home' ? 'opacity-50' : ''} href='/home'>
              <li className={`${navbar.li_desktop}`}>בית</li>
            </Link>
            <Link href='/news'>
              <li className={`${navbar.li_desktop}`}>חדשות</li>
            </Link>
            <Link href='/about'>
              <li className={`${navbar.li_desktop}`}>קצת עלינו</li>
            </Link>
            <Link href='/contact'>
              <li className={`${navbar.li_desktop}`}>צרו קשר</li>
            </Link>
          </ul>
          <div className={`${navbar.hamburger}`}>
            <RxHamburgerMenu onClick={handleNav} className={!menuOpen ? 'text-4xl text-text' : 'text-blocked text-4xl'} />
          </div>
          <div className={menuOpen ? navbar.menu_opened : navbar.menu_closed}>
            <div className={`${navbar.inner_menu_close_btn}`}>
              <IoMdClose onClick={handleNav} className='text-4xl text-text' />
            </div>
            <div className={`${navbar.user_intro}`}>
              <p>,שלום אורח</p>
            </div>
            <ul className={`${navbar.ul_opened_menu}`}>
              <Link className={curPath == '/home' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/home'>
                <li className={`${navbar.li_opened_menu}`}>בית
                  <IoHome size={25} />
                </li>
              </Link>
              <Link className={curPath == '/news' ? '  opacity-70 border-text' : ''} onClick={handleNav} href='/news'>
                <li className={`${navbar.li_opened_menu}`}>חדשות
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
