import React from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';
import {LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';

const SignUpPwd = () => {
  const validationErr = useUserStore((state)=>state.validationErr);

  return (
    <div className={styles.login_container}>
      <div className={styles.pwd_intro}>
        <Intro span={"비밀번호를"} intro2={"입력해주세요."}/>
      </div>
        <form className={styles.pwd_container}>
          <Input
            id={"pwd"} 
            type={"password"} 
            label={"비밀번호"} 
            placeholder={"비밀번호를 입력해주세요"}
            text={"영문자/특수문자/숫자를 포함하여 8자리 이상 16자리 이하"}
          />
        </form>
        <LoginButton 
          type="button" 
          text='확인' 
          active={validationErr?false:true} 
          url="/signup/pwd/confirm"/>
    </div>
  );
};

export default SignUpPwd;