
"use client";

import Image from 'next/image';
import logo from '../resources/images/logo/logo.png';
import Link from 'next/link';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from 'react';
import { navbar } from '../styles/tailwindSaved';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };


  // Close the menu when clicking outside of it
  useEffect(() => {
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
            <Link href='/home'>
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
            <ul className={`${navbar.ul_opened_menu}`}>
              <Link onClick={handleNav} href='/home'>
                <li className={`${navbar.li_opened_menu}`}>בית</li>
              </Link>
              <Link onClick={handleNav} href='/news'>
                <li className={`${navbar.li_opened_menu}`}>חדשות</li>
              </Link>
              <Link onClick={handleNav} href='/about'>
                <li className={`${navbar.li_opened_menu}`}>קצת עלינו</li>
              </Link>
              <Link onClick={handleNav} href='/contact'>
                <li className={`${navbar.li_opened_menu}`}>צרו קשר</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
