import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import home_icon from '@img/home_icon.svg';
import hot_icon from '@img/hot_icon.svg';
import explore_icon from '@img/explore_icon.svg';
import mypage_icon from '@img/mypage_icon.svg';
import basic_profile from '@img/basic_profile.png';
import go_back_btn from '@img/go_back_btn.svg';

import { useLoginUserStore } from '@store/loginUserStore';

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(false);
  const memberPath = useLoginUserStore(state=>state.userInfo.memberPath);
  // const userInfo = useLoginUserStore((state)=>state.userInfo);
  const [profileImg, setProfileImg] = useState(false);

  console.log(memberPath);
  const token = localStorage.getItem("access_token");
  useEffect(()=>{
    if(token){
      setLoginUser(true);
    }
    else{
      setLoginUser(false);
    }
  },[]);

  return (
      <div className={styles.header}>
        <div className={styles.profile}>
          {!loginUser? 
            <div className={styles.before_login}>
              <Link to="/signup/agree" className={styles.signup_btn}>회원가입</Link>
              <Link to="/login" className={styles.login_btn}>로그인</Link>
            </div>:
            <div className={styles.after_login}>
              <button onClick={()=>navigate(-1)} className={styles.go_back_btn}>
                <img src={go_back_btn} alt="뒤로가기"/>
              </button>
              <div className={styles.user}>
                <Link to="/mypage">
                  {memberPath !==null ?
                    <img src={memberPath} alt="프로필"/>: 
                    <img src={basic_profile} alt="프로필사진"/>
                  }
                </Link>
              </div>
            </div>
          }
        </div>
        
      </div>
  );
};

export default Header;