import React, { FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro, ValidationText } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';
import {FieldValues, useForm, UseFormResetField} from 'react-hook-form';
import { useUserStore } from '@store/userStore';
import duplicateCheck from '../../core/apis/utils/duplicateCheck';

const SignUpId = () => {
  const id = useUserStore((state)=>state.id);
  const setId = useUserStore((state)=>state.setId);

  // const {register, handleSubmit, watch, resetField} = useForm();
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    duplicateCheck.post("/member/check/loginid", {
      loginId: id,
    }).then(res=>{
      console.log(res); //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      console.log(err);
    })
    console.log(`아이디: ${id}`);
  }
//  sdnlfk1
  return (
    <div className={styles.login_container}>
      <Intro intro1={"감사합니다!"} span={"아이디"} intro2={"를 입력해주세요."}/>
        <form onSubmit={onSubmit} className={styles.input_container}>
          <Input
                id={"id"} 
                type={"text"} 
                label={"아이디"} 
                placeholder={"아이디를 입력해주세요"}
                // register = {register("id")}
                
                // reset = {resetField("id")!}
            />
          <DuplicateCheckBtn active={id?true:false}/> 
        </form>
        <ValidationText text='영문 소문자/숫자를 이용하여 6자리 이상 13자리 이하'/>
        <LoginButton type="button" text='확인' active={id?true:false} url="/signup/pwd"/>

        {/* <DuplicateCheckBtn url='/member/check/id' value={id} active={id?true:false}/> */}

        {/* <form onSubmit={(e)=>{console.log(e)}}>
          <LoginButton type="submit" text='테스트' active={true}/>
        </form> */}
          {/* <div className={styles.input_container}>
              <Input
                id={"id"} 
                type={"text"} 
                label={"아이디"} 
                placeholder={"아이디를 입력해주세요"}
              />
              <DuplicateCheckBtn/>
          </div>

          <LoginButton type="button" text='확인' url='/signup/pwd'/> */}
    </div>
  );
};

export default SignUpId;