import { LoginButton } from '@components/common/Button';
import Header from '@components/common/Header';
import styles from '@styles/mypage/myPageSetting.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const MyPageSetting = () => {
  return (
    <div className={styles.profile}>
      <Header/> 
      <div className={styles.profile_container}>
        <div className={styles.profile_image}></div>
        <div className={styles.user_info}>
          <p>ffoodyy</p>
          <p>이메일</p>
        </div>
        <p className={styles.profile_msg}>
          맛집투어만큼 만들기를 좋아하는 ffoodyyyyy
          {/* ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ */}
        </p>    
      </div>
      
      <div className={styles.btn_set}>
        <div className={styles.btn_container}>
          <button className={styles.modify_btn}></button>
        </div>
        <div className={styles.btn_container}>
          <button className={styles.modify_btn}></button>
        </div>
        <div className={styles.btn_container}>
          <button className={styles.modify_btn}></button>
        </div>
      </div>
      <div className={styles.btn}>
        <LoginButton type='button' text='완료' active={true}/>
      </div>
    </div>
  );
};

export default MyPageSetting;