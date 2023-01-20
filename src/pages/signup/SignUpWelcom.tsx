import { LoginButton } from '@components/common/LoginButton/Button';
import styles from "@styles/loginpage/signUp.module.scss";
import React from 'react';
import welcome from '@img/welcome.png';

const SignUpWelcom = () => {
  return (
    <div className={styles.welcome_container}>
      <img src={welcome} alt='환영'/>
      <p>환영합니다!</p> 
      <p><span>푸디어리</span>와 함께 해요!</p>
      <LoginButton 
        text='로그인 하러가기' 
        type='button' 
        active={true}
        url= "/login"/>
    </div>
  );
};

export default SignUpWelcom;