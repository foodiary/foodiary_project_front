import React, { FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro, ValidationText } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';
import { useUserStore } from '@store/userStore';

const SignUpPwd = () => {
  // const pwd = useUserStore((state)=>state.pwd);
  const validationErr = useUserStore((state)=>state.validationErr);
  // const [next, setNext] = useState(false);

  return (
    <div className={styles.login_container}>
      <Intro span={"비밀번호를"} intro2={"입력해주세요."}/>
        <div className={styles.pwd_container}>
          <Input
            id={"pwd"} 
            type={"password"} 
            label={"비밀번호"} 
            placeholder={"비밀번호를 입력해주세요"}
            text={"영문자/특수문자/숫자를 포함하여 8자리 이상 16자리 이하"}
          />
        </div>
        {/* <ValidationText text="영문자/특수문자/숫자를 포함하여 8자리 이상 16자리 이하"/> */}
        <LoginButton type="button" text='확인' active={validationErr?false:true} url="/signup/email"/>
        
        {/* <Intro span={"비밀번호를"} intro2={"입력해주세요."}/>
         <div className={styles.input_container}>
          <Input 
          id={"pwd"} 
          type={"password"} 
          label={"비밀번호"} 
          placeholder={"비밀번호를 입력해주세요"}
          />
          </div>
          <LoginButton type="button" text='확인' url='/signup/email'/> */}
          
             {/* {pwd && <button type='button' className={styles.pwd_eye} onClick={()=>setViewPwd(prev=>!prev)}>
               <IoMdEyeOff/>
             </button>} */}
    </div>
  );
};

export default SignUpPwd;