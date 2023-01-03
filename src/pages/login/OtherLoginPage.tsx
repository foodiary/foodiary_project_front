import React, { FormEvent, useState } from 'react';
import styles from "@styles/loginpage/otherLoginPage.module.scss";
import { Link } from 'react-router-dom';
import { Input, Intro } from '@pages/Form';
import { LoginButton } from '@components/common/Button';

const OtherLoginPage = () => {
  // const onSubmit = (e:FormEvent)=>{
  //   console.log("서버통신중");
  // }
  return (
    <div>
      <div className={styles.login_container}>
        <Intro intro1={"안녕하세요"} span={"Foodiary"} intro2={"입니다!"}/>
        <div className={styles.input_id}>
          <Input 
            id={"id"} 
            type={"text"} 
            label={"아이디"} 
            placeholder={"아이디를 입력해주세요"}
          />
        </div>
        {/* {id && 
          <button type='button' className={styles.id_cancel} onClick={()=>setId("")}>
            <MdOutlineCancel/>
          </button>} */}
        <Input 
          id={"pwd"} 
          type={"password"} 
          label={"비밀번호"} 
          placeholder={"비밀번호를 입력해주세요"}
        />

        <div className={styles.forget_account}>
          <p>기억이 안나시나요?
            <Link to="/find/id">아이디 찾기</Link>
            <Link to="/find/pwd">비밀번호 찾기</Link>
          </p>
        </div>

        {/* <form> */}
          <LoginButton type="button" text='로그인' url='/signup/agree'/>
        {/* </form> */}
        
        <div className={styles.signup}>
          <p>Foodiary가 처음이신가요? <Link to="/signup/agree">간편 가입하기</Link></p>
        </div>
        
        {/* {pwd && 
          <button type='button' className={styles.pwd_eye} onClick={()=>setViewPwd(prev=>!prev)}>
            <IoMdEyeOff/>
          </button>} */}
        {/* <div className={styles.intro}>
          <p> 안녕하세요,</p>
          <p><span>Foodiary</span> 입니다!</p>
          <div></div>
        </div> */}
        {/* <LoginForm/> */}
      </div>
    </div>
  );
};

export default OtherLoginPage;