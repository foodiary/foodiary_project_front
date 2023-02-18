import React, { FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { DuplicationText, Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';
import { DuplicateCheckBtn, LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import duplicateCheck from '../../core/apis/utils/duplicateCheck';
import {motion} from 'framer-motion';

const SignUpId = () => {
  const id = useUserStore((state)=>state.id);
  const validationErr = useUserStore((state)=>state.validationErr);
  const setLoginYn = useUserStore((state)=>state.setLoginYn);

  const [next, setNext] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(()=>{
    setErr(false);
    setNext(false);
  },[id]);

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    duplicateCheck.post("/member/check/loginid", {
      loginId: id,
    }).then(res=>{
        setErr(false);
        setNext(true);
        setLoginYn("Y");

    }).catch(err=>{
      if(err.response.data.msg === "아이디가 중복입니다"){
        setErr(true);
      }
      console.log(err);
    })
  }
  return (
    <div className={styles.login_container}>
      <Intro intro1={"감사합니다!"} span={"아이디를"} intro2={"입력해주세요."}/>
        <form onSubmit={onSubmit} className={styles.input_container}>
          <Input
            id={"id"} 
            type={"text"} 
            label={"아이디"} 
            placeholder={"아이디를 입력해주세요"}
            text={"영문 소문자/숫자를 이용하여 6자리 이상 13자리 이하"}
          />
          <DuplicateCheckBtn active={!validationErr?true:false}/> 
        </form>

        {err && 
            <DuplicationText text='중복 아이디입니다. 아이디를 수정해주세요'/>
        }

        <LoginButton type="button" text='확인' 
          active={next?true:false} url="/signup/pwd"/>
    </div>
  );
};

export default SignUpId;