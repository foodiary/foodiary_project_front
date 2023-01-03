import React from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpId = () => {
  return (
    <div className={styles.login_container}>
      <Intro intro1={"감사합니다!"} span={"아이디"} intro2={"를 입력해주세요."}/>
          <div className={styles.input_container}>
            <Input
              id={"id"} 
              type={"text"} 
              label={"아이디"} 
              placeholder={"아이디를 입력해주세요"}
            />
            <DuplicateCheckBtn type="button"/>
          </div>
          <LoginButton type="button" text='확인' url='/signup/pwd'/>
    </div>
  );
};

export default SignUpId;