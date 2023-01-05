import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpProfileMsg = () => {
  const navigate = useNavigate();
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    navigate("/");
    console.log("가입 완료");
  }
  return (
      <div className={styles.login_container}>
        <Intro span={"프로필 메세지를"} intro2={"적어주세요."}/>
        <p className={styles.omit_p}>(생략가능)</p>
                {/* <form className={styles.login_form}> */}
        <div className={styles.profile}></div>
          <div className={styles.input_container}>
            {/* <textarea></textarea> 로 구현하기*/}
            <Input 
              id={"message"} 
              type={"text"} 
              label={"프로필 메세지"} 
              placeholder={"프로필 메세지를 입력해주세요"}
            />
          </div>
          <form onSubmit={onSubmit}>
            <LoginButton type="submit" text='완료' active={true}/>
          </form>
        {/* </form> */}
        </div>
  );
};

export default SignUpProfileMsg;