import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpProfileImage = () => {
  return (
    <div>
      <div className={styles.login_container}>
        <Intro intro1={"대표 할"} span={"프로필 이미지를"} intro2={"입력해주세요."}/>
        <p className={styles.omit_p}>(생략가능)</p>
        
        <div className={styles.basic_profile}></div>
        {/* <form className={styles.login_form}> */}
          <div className={styles.file_container}>
            <input type="file"></input>
          </div>
          <LoginButton type="button" text='다음' url='/signup/profileMsg'/>
        {/* </form> */}
        </div>
    </div>
  );
};

export default SignUpProfileImage;