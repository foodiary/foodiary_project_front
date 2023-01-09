import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';
import { DuplicateCheckBtn, LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { AlertBox } from '@components/common/AlertBox/AlertBox';

const SignUpAuthMail = () => {
  const email = useUserStore((state)=>state.email);
  const mailauth = useUserStore((state)=>state.mailauth);
  const [next, setNext] = useState(false);
  const [err, setErr] = useState(false);
  const [alert, setAlert] = useState(false);
  const [timeout, setTimeout] = useState(false);

  const init = ()=>{
    setErr(false);
    setAlert(false);
  };
  useEffect(()=>{
    init();
  },[mailauth]);

  const [seconds, setSeconds] = useState(300);
  useEffect(()=>{
    const interval = setInterval(()=>{
      if(seconds === 0){
        clearInterval(interval);
      }
      else{
        setSeconds(seconds -1);
      }
    }, 1000);
    return ()=> clearInterval(interval);
  },[seconds]);

  const handleSendMailAgain = ()=>{
    setErr(false);
    setSeconds(300);
    axiosConfig.post("/member/email/send",{
      email: email
    }).then(res=>{
      if(res === undefined){
        setAlert(false);
        return;
      }
      else{
        setAlert(true);
      }
      console.log(res);
    }).catch(err=>{
      console.log(err);
      setAlert(false);
    })
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    axiosConfig.post('/member/email/send/confirm',{
      email: email,
      num: mailauth
    }).then(res=>{
      console.log(res);
      // if(res === undefined){
      //   setTimeout(true);
      //   return;
      // }
      if(res){
        setTimeout(false);
        setNext(true);
      }

    }).catch(err=>{
      const errMsg = err.response.data.msg;
      console.log(`컴포넌트에서 : ${errMsg}`);
      if(errMsg === "인증 시간을 초과하였습니다. 다시 시도해주세요"){
        setTimeout(true);
      }
      else if(errMsg === "인증번호가 일치하지 않습니다."){
        setErr(true);
      }
    })
    console.log(mailauth);
  };

  return (
    <div className={styles.authmail_container}>
      <Intro intro1={"메일이 발송되었습니다."} span={"인증번호"} intro2={"를 입력해주세요!"}/>
      <div className={styles.success_logo}></div>
        <form className={styles.login_form} onSubmit={onSubmit}>
          <div className={styles.input_container}>
            <Input 
              id={"mailauth"} 
              type={"text"} 
              label={"인증번호"} 
              placeholder={"인증번호를 입력해주세요"}
              validate={"no"}
            />
            {/* <DuplicateCheckBtn type="button"/> */}
            <div className={styles.remain_time}>
              {Math.floor(seconds/60)}:{String(Math.floor(seconds%60)).padStart(2,"0")}
            </div>
          </div>
          <p className={styles.remail}>인증 메일을 받지 못하셨나요? 
            <button type='button' onClick={handleSendMailAgain}>이메일 다시 보내기</button>
          </p>
          <LoginButton type={next? "button" : "submit"} text={next? '인증완료': '인증하기'} 
            active={mailauth?true:false} url={next?'/signup/nickname':""}/>
        </form>
        {next && 
          <AlertBox type={true} text="이메일 인증이 완료되었습니다"/>
        }
        {err && 
          <AlertBox type={false} text="인증번호가 일치하지 않습니다. 다시 확인해주세요"/>
        }
        {alert && 
          <AlertBox type={true} text="인증메일이 재발송되었습니다"/>
        }
        {timeout && 
          <AlertBox type={false} text="인증시간이 초과되었습니다. 메일을 다시 보내주세요"/>
        }
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