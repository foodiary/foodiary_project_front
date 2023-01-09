import Header from '@components/common/Header/Header';
import React from 'react';
import styles from "@styles/loginpage/loginDefault.module.scss";
import {SiNaver} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';
import { LoginButton } from '@components/common/LoginButton/Button';
import { Link } from 'react-router-dom';
import {googleAuthUrl, naverAuthUrl} from '@core/auth/Auth';
import { Intro } from '@components/common/Text/SignUpPageText';

const LoginMainPage = () => {
  const handleAuthGoogle =()=>{
    window.location.assign(googleAuthUrl);
  }
  const handleAuthNaver =()=>{
    window.location.assign(naverAuthUrl);
  }
  return (
      <div className={styles.login_container}>
        <div className={styles.add_margin}>
          <Intro intro1={"안녕하세요"} span={"Foodiary"} intro2={"입니다!"}/>
        </div>
        <div className={styles.btn_container}>
          <button className={`${styles.login_btn} ${styles.google}`} onClick={handleAuthGoogle}>
            <FcGoogle/> 구글계정으로 로그인
          </button>
          <button className={`${styles.login_btn} ${styles.naver}`} onClick={handleAuthNaver}>
            <SiNaver/> 네이버 로그인
          </button>
          <div className={styles.other}>
            <LoginButton type='button' text='다른 방법으로 로그인' url='/login/other' active={true}/>
          </div>
        </div>

        <div className={styles.signup}>
          <p>Foodiary가 처음이신가요? <Link to="/signup/agree">가입하기</Link></p>
        </div>
      </div>
  );
};

export default LoginMainPage;