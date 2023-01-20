import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import home_icon from '@img/home_icon.svg';
import explore_icon from '@img/explore_icon.svg';
import mypage_icon from '@img/mypage_icon.svg';
import styles from './navbar.module.scss';
import {MdOutlineRestaurantMenu} from 'react-icons/md';

const NavBar = () => {
  const {pathname} = useLocation();
  
  return (
    <div className={styles.navbar}>
      <Link to="/">
        <img src={home_icon} alt="홈" className={pathname==="/" ? "": styles.no_active}/>
      </Link>  
      <Link to="/hot" className={pathname==="/hot" ? "": styles.no_active}>
        <MdOutlineRestaurantMenu size={'25px'}/>
        {/* <img src={hot_icon} alt="랭킹" className={pathname==="/hot" ? "": styles.no_active}/> */}
      </Link>
      <Link to="/explore">
        <img src={explore_icon} alt="탐색" className={pathname.includes("/explore") ?  "": styles.no_active}/>
      </Link>
      <Link to="/mypage">
        <img src={mypage_icon} alt="마이페이지" className={pathname.includes("/mypage") ? "": styles.no_active}/>
      </Link>
    </div>
  );
};

export default NavBar;