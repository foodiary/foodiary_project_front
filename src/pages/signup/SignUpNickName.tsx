import React, { FormEvent } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';
import { useUserStore } from '@store/userStore';

const SignUpNickName = () => {
  const nickName = useUserStore((state)=>state.nickName);

  // const {register, handleSubmit, watch, resetField} = useForm();
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    console.log(`닉네임: ${nickName}`);
  }
  return (
      <div className={styles.login_container}>
        <Intro intro1={"환영합니다! 사용하실"} span={"닉네임"} intro2={"을 적어주세요!"}/>
          <form onSubmit={onSubmit} className={styles.input_container}>
            <Input 
              id={"nickname"} 
              type={"text"} 
              label={"닉네임"} 
              placeholder={"닉네임을 입력해주세요"}
            />
            <DuplicateCheckBtn active={nickName?true:false}/> 
          </form>
        <LoginButton type="button" text='다음' active={nickName?true:false} url="/signup/profileImage"/>

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