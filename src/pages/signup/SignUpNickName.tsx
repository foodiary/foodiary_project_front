import React, { FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { DuplicationText, Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';
import { DuplicateCheckBtn, LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import duplicateCheck from '../../core/apis/utils/duplicateCheck';
import { AlertBox } from '@components/common/AlertBox/AlertBox';

const SignUpNickName = () => {
  const nickName = useUserStore((state)=>state.nickName);
  const validationErr = useUserStore((state)=>state.validationErr);
  const setNickNameYn = useUserStore((state)=>state.setNickNameYn);

  const [next, setNext] = useState(false);
  const [err, setErr] = useState(false);

  
  useEffect(()=>{
    setErr(false);
    setNext(false);
  },[nickName]);

  // const {register, handleSubmit, watch, resetField} = useForm();
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    duplicateCheck.post("/member/check/nickname", {
      nickName: nickName,
    }).then(res=>{
      console.log(res);
      if(res){
        setErr(false);
        setNext(true);
        setNickNameYn("Y");
      }
      //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      if(err.response.data.msg === "닉네임이 중복입니다"){
        setErr(true);
      }
      console.log(err);
    })
    console.log(`닉네임: ${nickName}`);
  }
  return (
      <div className={styles.login_container}>
        <Intro intro1={"환영합니다! 사용하실"} span={"닉네임을"} intro2={"적어주세요!"}/>
          <form onSubmit={onSubmit} className={styles.input_container}>
            <Input 
              id={"nickname"} 
              type={"text"} 
              label={"닉네임"} 
              placeholder={"닉네임을 입력해주세요"}
              text={'한글/영어/숫자로 2자리 이상 10자리 이하'}
            />
            <DuplicateCheckBtn active={!validationErr?true:false}/> 
            {/* {err && <DuplicationText text='중복 닉네임입니다. 닉네임을 수정해주세요'/>} */}

          </form>
          {err && <DuplicationText text='중복 닉네임입니다. 닉네임을 수정해주세요'/>}
        <LoginButton type="button" text='다음' 
          active={next?true:false} url="/signup/profileImage"/>
        {/* <Intro intro1={"환영합니다! 사용하실"} span={"닉네임"} intro2={"을 적어주세요!"}/>
          <div className={styles.input_container}>
            <Input 
              id={"nickname"} 
              type={"text"} 
              label={"닉네임"} 
              placeholder={"닉네임을 입력해주세요"}
            />
            <DuplicateCheckBtn/>
          </div>
          <LoginButton type="button" text='다음' url='/signup/profileImage'/> */}
      </div>
  );
};

export default SignUpNickName;