import { HalfButton, LoginButton } from '@components/common/LoginButton/Button';
import Header from '@components/common/Header/Header';
import styles from '@styles/mypage/myPageSetting.module.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import pen_icon from '@img/pen_icon.svg';
import basic_profile from '@img/basic_profile.svg';

const MyPageSetting = () => {
  const [viewBtn, setViewBtn] = useState(false);
  const handleModifyImg = ()=>{
    
  }
  return (
    <div className={styles.profile}>
      <Header/> 
      <div className={styles.profile_container}>
        <img src={basic_profile} alt="기본이미지" className={styles.profile_img}/>

        <div className={styles.user_nickname}>
          <p>ffoodyy</p>
        </div>

        <div className={styles.user}>
          <div className={styles.info}>
            <p>아이디</p>
            <p>ffoodyy</p>
          </div>
          <div className={styles.info}>
            <p>이메일</p>
            <p>ffoodyy@gmail.com</p>
          </div>
        </div>

        <p className={styles.profile_msg}>
          맛집투어만큼 만들기를 좋아하는 ffoodyyyyy
          {/* ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ */}
        </p>    
      </div>
      
      <div className={styles.btn_set}>
        <button onClick={()=>{setViewBtn(true)}} className={styles.modify_btn}>
          <img src={pen_icon} alt="프로필이미지 수정"/>
        </button>
        {/* <Link to='/' className={styles.modify_btn}>
          
          <img src={pen_icon} alt="프로필이미지 수정"/>
        </Link> */}
        <Link to='/member/img/change' className={styles.modify_btn}>
          <img src={pen_icon} alt="닉네임 수정"/>
        </Link>
        <Link to='/member/msg/change' className={styles.modify_btn}>
          <img src={pen_icon} alt="프로필메세지 수정"/>
        </Link>
      </div>

      <div className={styles.btn}>
        <LoginButton type='button' text='완료' active={true}/>
      </div>

      {/* {viewBtn && 
        <HalfButton text='수정' text2='삭제' type=''
      } */}
    </div>
  );
};

export default MyPageSetting;