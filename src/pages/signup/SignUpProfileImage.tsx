import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import { Intro } from '@pages/Form';
import { LoginButton } from '@components/common/Button';

const SignUpProfileImage = () => {
  return (
      <div className={styles.login_container}>
        <div className={styles.profile_container}>
        <Intro intro1={"대표 할"} span={"프로필 이미지"} intro2={"를 입력해주세요."}/>
        <p className={styles.omit_p}>(생략가능)</p>
        
        <div className={styles.basic_profile}></div>
        {/* <form className={styles.login_form}> */}
        <div className={styles.file_container}>
          <input type="file"></input>
        </div>
        {/* <LoginButton type="button" text='다음' url='/signup/profileMsg'/> */}
        {/* </form> */}
        </div>
        <LoginButton type="button" text='다음' active={true} url='/signup/profileMsg'/>
      </div>
  );
};

export default SignUpProfileImage;