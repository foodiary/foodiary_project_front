import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpEmail = () => {
  return (
    <div className={styles.login_container}>
      <Intro intro1={"본인인증을 위해"} span={"이메일"} intro2={"을 입력해주세요."}/>
          <div className={styles.input_container}>
            <Input 
              id={"email"} 
              type={"email"} 
              label={"이메일"} 
              placeholder={"이메일을 입력해주세요"}
            />
            <DuplicateCheckBtn type="button"/>
          </div>
          <LoginButton type="button" text='확인' url='/signup/authmail'/>

      {/* <div className={styles.login_container}>
        <div className={styles.intro}>
          <p>본인인증을 위해</p>
          <p><span>이메일을</span> 입력해주세요.</p>
          <div></div>
        </div>
          <form onSubmit={onSubmit} className={styles.login_form}>
            <div className={`${styles.input_id} ${styles.input_box}`}>
              <p>이메일</p>
              <input type="email" 
                placeholder='이메일을 입력해주세요' 
                onChange={onChange}
                value={email}
                className={styles.input}
              />
              {email && <button type='button' className={styles.id_cancel} onClick={()=>setEmail("")}>
                <MdOutlineCancel/>
              </button>}
              <p className={styles.pwd_err}>정확한 비밀번호를 입력해주세요</p>
            </div>
            <button type='button'>중복확인</button>
            <button type='submit'>확인</button>
          </form> */}
        </div>
  );
};

export default SignUpEmail;