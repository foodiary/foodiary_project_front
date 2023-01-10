import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import home_icon from '@img/home_icon.svg';
import hot_icon from '@img/hot_icon.svg';
import explore_icon from '@img/explore_icon.svg';
import mypage_icon from '@img/mypage_icon.svg';

const Header = () => {
  const [loginUser, setLoginUser] = useState(false);
  const token = localStorage.getItem("access_token");
  useEffect(()=>{
    console.log("Header 컴포넌트: ", token);
    if(token){
      setLoginUser(true);
    }
    else{
      setLoginUser(false);
    }
  },[]);
  const {pathname} = useLocation();

  return (
      <div className={styles.header}>
        <div className={styles.profile}>
          {!loginUser? 
            <div className={styles.before_login}>
              <Link to="/signup/agree" className={styles.signup_btn}>회원가입</Link>
              <Link to="/login" className={styles.login_btn}>로그인</Link>
            </div>:
            <div className={styles.after_login}>
              <div className={styles.user}>
                <Link to="/mypage"><img src={mypage_icon} alt="프로필사진"/></Link>
              </div>
            </div>
          }
        </div>
        <div className={styles.navbar}>
          <Link to="/"><img src={home_icon} alt="홈" className={pathname==="/" ? "": styles.no_active}/></Link>  
          <Link to="/"><img src={hot_icon} alt="랭킹" className={pathname==="/" ? "": styles.no_active}/></Link>
          <Link to="/"><img src={explore_icon} alt="탐색" className={pathname==="/" ?  "": styles.no_active}/></Link>
          <Link to="/mypage"><img src={mypage_icon} alt="마이페이지" className={pathname==="/mypage" ? "": styles.no_active}/></Link>
        </div>
        
      </div>
  );
};

export default Header;