import Header from '@components/common/Header';
import React from 'react';
import styles from "@styles/loginPage.module.scss";
import {SiNaver} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';
import "../styles/globals.css";
// import {FcGoogle} from '../../public/img';

const LoginPage = () => {
  return (
    <div>
      <Header/>
      <div className={styles.check_blue}></div>
      <div className={styles.check_mint}></div>
      <div className={styles.star}></div>
      <div className={styles.dessert}></div>
      <div className={styles.surprise}></div>
      <div className={styles.japanese_food}></div>
      <div className={styles.korean_food}></div>
      <div className={styles.western_food}></div>
      <div className={styles.pinkStar}></div>
      <div className={styles.thumbs_up}></div>

      <div className={styles.login_container}>
        <div className={styles.intro}>
          <p> 안녕하세요,</p>
          <p><span>Foodiary</span> 입니다!</p>
          <div></div>
        </div>
        <div className={styles.btn_container}>
          <button className={`${styles.login_btn} ${styles.google}`}>
            <FcGoogle/> 구글계정으로 로그인
          </button>
          <button className={`${styles.login_btn} ${styles.naver}`}>
            <SiNaver/> 네이버 로그인
          </button>
          <button className={`${styles.login_btn} ${styles.other}`}>
            다른방법으로 로그인
          </button>
          <p>Foodiary가 처음이신가요? <button>간편 가입하기</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;