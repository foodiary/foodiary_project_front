import React from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';

const SignUpAuthMail = () => {
  return (
    <div className={styles.login_container}>
      <Intro intro1={"메일이 발송되었습니다."} span={"인증번호"} intro2={"를 입력해주세요!"}/>
      <div className={styles.success_logo}></div>
        {/* <form className={styles.login_form}> */}
          <div className={styles.input_container}>
            <Input 
              id={"mailauth"} 
              type={"text"} 
              label={"인증번호"} 
              placeholder={"인증번호를 입력해주세요"}
            />
            {/* <DuplicateCheckBtn type="button"/> */}
            <div>시간초</div>
          </div>
          <p className={styles.remail}>인증 메일을 받지 못하셨나요? <button>이메일 다시 보내기</button></p>
          <LoginButton type="button" text='인증완료' url='/signup/nickname'/>
        {/* </form> */}
      
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

export default SignUpAuthMail;