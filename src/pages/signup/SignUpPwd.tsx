import React from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpPwd = () => {
  return (
    <div className={styles.login_container}>
        <Intro intro1={"비밀번호를"} span={""} intro2={"입력해주세요."}/>
         <div className={styles.input_container}>
          <Input 
          id={"pwd"} 
          type={"password"} 
          label={"비밀번호"} 
          placeholder={"비밀번호를 입력해주세요"}
          />
          </div>
          <LoginButton type="button" text='확인' url='/signup/email'/>
          
             {/* {pwd && <button type='button' className={styles.pwd_eye} onClick={()=>setViewPwd(prev=>!prev)}>
               <IoMdEyeOff/>
             </button>} */}
    </div>
  );
};

export default SignUpPwd;