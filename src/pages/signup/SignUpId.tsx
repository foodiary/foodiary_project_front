import React, { FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { DuplicationText, Input, Intro, ValidationText } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';
import {FieldValues, useForm, UseFormResetField} from 'react-hook-form';
import { useUserStore } from '@store/userStore';
import duplicateCheck from '../../core/apis/utils/duplicateCheck';

const SignUpId = () => {
  const id = useUserStore((state)=>state.id);
  const validationErr = useUserStore((state)=>state.validationErr);
  const [next, setNext] = useState(false);
  // const duplicationErr = useUserStore(state=>state.duplicationErr);
  const [err, setErr] = useState(false);
  // const {register, handleSubmit, watch, resetField} = useForm();

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    duplicateCheck.post("/member/check/loginid", {
      loginId: id,
    }).then(res=>{
      console.log(`성공의 응답?: ${res}`);
      if(res === undefined){
        setErr(true);
        return;
      }
      else{
        setErr(false);
        setNext(true);
      }
      // setNext(true);
      //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      console.log(err);
    })
    console.log(`아이디: ${id}`);
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
                // rules={
                //   minLength:{
                //     value: 6, 
                //     message: "영문 소문자/숫자를 이용하여 6자리 이상 13자리 이하",
                //   },
                //   maxLength:{
                //     value: 13, 
                //     message: "영문 소문자/숫자를 이용하여 6자리 이상 13자리 이하",
                //   }
                // }
                // register = {register("id")}
                
                // reset = {resetField("id")!}
            />
          <DuplicateCheckBtn active={!validationErr?true:false}/> 
          {/* {!next && <DuplicationText text='중복 아이디입니다. 아이디를 수정해주세요'/>} */}
        </form>
        {err && <DuplicationText text='중복 아이디입니다. 아이디를 수정해주세요'/>}

        {/* <ValidationText text='영문 소문자/숫자를 이용하여 6자리 이상 13자리 이하'/> */}
        <LoginButton type="button" text='확인' 
          active={next?true:false} url="/signup/pwd"/>

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