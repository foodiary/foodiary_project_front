import React, { useState } from 'react';
import {BsSearch, BsPlusSquare} from 'react-icons/bs';
import {VscBell} from 'react-icons/vsc';
import {FaUserCircle, FaRegCompass} from 'react-icons/fa';
import {HiOutlineUserCircle} from 'react-icons/hi';
import {RiHome5Line} from 'react-icons/ri';
import styles from '@styles/header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(false);
  return (
      <div className={styles.header}>
        <div className={styles.main_logo}>
          <Link to="/">Foodiary</Link>
        </div>
        <div className={styles.navbar}>
          <Link to="/">랭킹</Link>
          <Link to="/">식단</Link>
          <Link to="/">레시피</Link>
          <Link to="/">마이페이지</Link>
        </div>
        <div className={styles.mobile_navbar}>
          <Link to="/"><RiHome5Line/></Link>
          <Link to="/"><FaRegCompass/></Link>
          <Link to="/"><BsPlusSquare/></Link>
          <Link to="/"><HiOutlineUserCircle/></Link>
        </div>
        <div className={styles.profile}>
          <button><BsSearch/></button>
          <button><VscBell/></button>
          {!user? <button className={styles.login_btn}>LOGIN</button>: 
          <div><FaUserCircle/></div>}
        </div>
      </div>
  );
};

export default Header;