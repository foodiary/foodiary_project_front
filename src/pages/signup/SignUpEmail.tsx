import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { DuplicationText, Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';
import { useUserStore } from '@store/userStore';
import duplicateCheck from '../../core/apis/utils/duplicateCheck';
import axios from 'axios';
import axiosConfig from '../../core/apis/utils/axiosConfig';

const SignUpEmail = () => {
  const navigate = useNavigate();
  const email = useUserStore((state)=>state.email);
  const validationErr = useUserStore((state)=>state.validationErr);
  const [send, setSend] = useState(false);

  const [next, setNext] = useState(false);
  // console.log(email);
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    // axiosConfig.post("/email/auth",{
    //   email: email
    // }).then(res=>{
    //   console.log(res);
    // }).catch(err=>{
    //   console.log(err);
    // })
    duplicateCheck.post("/member/check/email", {
      email: email,
    }).then(res=>{
      setSend(true);
      console.log(res); //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      console.log(err);
    })
    console.log(`이메일: ${email}`);
  }
  const onEmailSend = (e:FormEvent)=>{
    e.preventDefault();
    axiosConfig.post("/member/email/send",{
      email: email
    }).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
    navigate("/signup/authmail");
  }
  return (
    <div className={styles.login_container}>
      <Intro intro1={"본인인증을 위해"} span={"이메일을"} intro2={"입력해주세요."}/>
      <form onSubmit={onSubmit} className={styles.input_container}>
          <Input 
              id={"email"} 
              type={"email"} 
              label={"이메일"} 
              placeholder={"이메일을 입력해주세요"}
            />
          <DuplicateCheckBtn active={!validationErr?true:false}/> 
      </form>
      {!next && <DuplicationText text='중복 이메일입니다. 이메일을 수정해주세요'/>}

        <form onSubmit={onEmailSend}>
          <LoginButton type="submit" text='이메일 발송하기' 
            active={send?true:false}/>
        </form>
        {/* url="/signup/authmail" */}
      {/* <Intro intro1={"본인인증을 위해"} span={"이메일"} intro2={"을 입력해주세요."}/>
          <div className={styles.input_container}>
            <Input 
              id={"email"} 
              type={"email"} 
              label={"이메일"} 
              placeholder={"이메일을 입력해주세요"}
            />
            <DuplicateCheckBtn/>
          </div>
          <LoginButton type="button" text='확인' url='/signup/authmail'/> */}

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