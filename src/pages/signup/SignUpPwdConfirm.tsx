import React, { FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { ValidationText, Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';
import { DuplicateCheckBtn, LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';

const SignUpPwdConfirm = () => {
  const oauthLogin = useUserStore(state=>state.oauthLogin);
  const validationErr = useUserStore((state)=>state.validationErr);
  const pwd = useUserStore(state=>state.pwd);
  const more_pwd = useUserStore(state=>state.more_pwd);
  const setMorePwd = useUserStore(state=>state.setMorePwd);

  // const [  const pwd = useUserStore(state=>state.pwd);

  return (
    <div>
      <Intro intro1={"비밀번호를"} span={"한번 더"} intro2={"입력해주세요."}/>
      <div className={styles.pwd_container}>
          <Input
            id={"more_pwd"} 
            type={"password"} 
            label={"비밀번호 확인"} 
            placeholder={"비밀번호를 입력해주세요"}
            text={"영문자/특수문자/숫자를 포함하여 8자리 이상 16자리 이하"}
      />
      <div className={styles.pwd_confirm}>
        {pwd === more_pwd ? 
          <ValidationText text="비밀번호가 일치합니다" color="green"/>:
          <ValidationText text="비밀번호가 일치하지 않습니다" color="red"/>
        }
      </div>
      </div>
      {/* <div className={styles.pwd_confirm}>
        {pwd === more_pwd ? 
          <ValidationText text="비밀번호가 일치합니다" color="green"/>:
          <ValidationText text="비밀번호가 일치하지 않습니다" color="red"/>
        }
      </div> */}
      <LoginButton 
          type="button" 
          text='확인' 
          active={validationErr?false:true} 
          url={oauthLogin? "/signup/nickname" : "/signup/email"}/>
    </div>
  );
};

export default SignUpPwdConfirm;