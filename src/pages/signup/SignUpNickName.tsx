import React from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpNickName = () => {
  return (
    <div>
      <div className={styles.login_container}>
        <Intro intro1={"환영합니다! 사용하실"} span={"닉네임"} intro2={"을 적어주세요!"}/>
        {/* <form className={styles.login_form}> */}
          <div className={styles.input_container}>
            <Input 
              id={"nickname"} 
              type={"text"} 
              label={"닉네임"} 
              placeholder={"닉네임을 입력해주세요"}
            />
          </div>
          <LoginButton type="button" text='다음' url='/signup/profileImage'/>
        {/* </form> */}
        </div>
    </div>
  );
};

export default SignUpNickName;