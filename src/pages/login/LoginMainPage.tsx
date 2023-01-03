import Header from '@components/common/Header';
import React from 'react';
// import styles from "@styles/loginPage.module.scss";///
import styles from "@styles/loginpage/loginDefault.module.scss";
import {SiNaver} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';
import { Intro } from '@pages/Form';
import { LoginButton } from '@components/common/Button';
import { Link } from 'react-router-dom';

const LoginMainPage = () => {
  return (
    <div>
      {/* <Header/>
      <div className={styles.check_blue}></div>
      <div className={styles.check_mint}></div>
      <div className={styles.star}></div>
      <div className={styles.dessert}></div>
      <div className={styles.surprise}></div>
      <div className={styles.japanese_food}></div>
      <div className={styles.korean_food}></div>
      <div className={styles.western_food}></div>
      <div className={styles.pinkStar}></div>
      <div className={styles.thumbs_up}></div> */}

      <div className={styles.login_container}>
        <Intro intro1={"안녕하세요"} span={"Foodiary"} intro2={"입니다!"}/>

        <div className={styles.btn_container}>
          <button className={`${styles.login_btn} ${styles.google}`}>
            <FcGoogle/> 구글계정으로 로그인
          </button>
          <button className={`${styles.login_btn} ${styles.naver}`}>
            <SiNaver/> 네이버 로그인
          </button>
          <LoginButton type='button' text='다른 방법으로 로그인' url='/login/other'/>
          {/* <button className={`${styles.login_btn} ${styles.other}`}>
            다른방법으로 로그인
          </button> */}
          {/* <p>Foodiary가 처음이신가요? <Link to="/signup/agree">간편 가입하기</Link></p> */}
        </div>
        <div className={styles.signup}>
          <p>Foodiary가 처음이신가요? <Link to="/signup/agree">간편 가입하기</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginMainPage;