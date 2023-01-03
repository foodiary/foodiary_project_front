import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpProfileMsg = () => {
  return (
      <div className={styles.login_container}>
        <Intro intro1={"프로필 메세지를"} span={""} intro2={"적어주세요."}/>
        <p className={styles.omit_p}>(생략가능)</p>
                {/* <form className={styles.login_form}> */}
        <div className={styles.profile}></div>
          <div className={styles.input_container}>
            <Input 
              id={"message"} 
              type={"text"} 
              label={"프로필 메세지"} 
              placeholder={"프로필 메세지를 입력해주세요"}
            />
          </div>
          <LoginButton type="button" text='완료' url='/'/>
        {/* </form> */}
        </div>
  );
};

export default SignUpProfileMsg;