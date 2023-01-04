import React, { useState } from 'react';
import {BsSearch, BsPlusSquare} from 'react-icons/bs';
import {VscBell} from 'react-icons/vsc';
import {FaUserCircle, FaRegCompass} from 'react-icons/fa';
import {HiOutlineUserCircle} from 'react-icons/hi';
import {RiHome5Line} from 'react-icons/ri';
import styles from '@styles/header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(true);
  return (
      <div className={styles.header}>
        <div className={styles.profile}>
          {!user? <button className={styles.login_btn}>LOGIN</button>:
            <div className={styles.after_login}>
              <button className={styles.bell}><VscBell/></button> 
              <div className={styles.user}><FaUserCircle/></div>
            </div>
          }
        </div>
        <div className={styles.navbar}>
          <Link to="/"><RiHome5Line/></Link>
          <Link to="/"><FaRegCompass/></Link>
          <Link to="/"><BsPlusSquare/></Link>
          <Link to="/mypage"><HiOutlineUserCircle/></Link>
        </div>
        
      </div>
  );
};

export default Header;