import { LoginButton } from '@components/common/Button';
import styles from "@styles/loginpage/signUp.module.scss";
import React from 'react';

const SignUpWelcom = () => {
  return (
    <div className={styles.welcome_container}>
      <p>환영합니다!</p> 
      <LoginButton 
        text='로그인 하러가기' 
        type='button' 
        active={true}
        url= "/login"/>
    </div>
  );
};

export default SignUpWelcom;