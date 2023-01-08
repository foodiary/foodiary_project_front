import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';
import { useUserStore } from '@store/userStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { AlertBox } from '@components/common/AlertBox';

const SignUpAuthMail = () => {
  const email = useUserStore((state)=>state.email);
  const mailauth = useUserStore((state)=>state.mailauth);
  const [next, setNext] = useState(false);
  const [err, setErr] = useState(false);

  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(60);
  const time = useRef(60);
  let timerId = useRef<React.MutableRefObject<null>>(null);
  // console.log(time.current--);
  // console.log(timerId.current);
  // const min = Math.floor(time/60);
  // const sec = Math.floor(time%60);
  // setTimeout(()=>{remainTime()}, 2000);
  // let timerId:any;
  
  // console.log(min);
  // let timerId:any;
  // let timer = setInterval(()=>{remainTime()},1000);

  // useEffect(()=>{
  //   // time.current--;
  //   timerId.current = setInterval(()=>{
  //     remainTime();
  //   },1000);
  //   return ()=>clearInterval(timerId);
  //   // timer = setInterval(()=>{remainTime()},1000);
  // },[]);

  const remainTime = ()=>{
    // time.current--;
    // setMin(Math.floor(time.current / 60));
    // setSec(time.current % 60);
    // time.current -= 1;
    // if(min === 0 && sec === 0){
    //   // clearInterval(timer);
    // }
    // else{
    //   if(sec < 1){
    //     setSec(60);
    //     setMin(prev=>prev-1)
    //   }
    //   else{
    //     setSec(prev=>prev-1)
    //   }
    // }
    // time--;
    // const min = Math.floor(time/60);
    // const sec = Math.floor(time%60);

    // if(min === 0 && sec === 0){
    //   clearInterval(timer);
    // }
    // else{
    //   setMin(min);
    //   setSec(sec);
    // }
    // console.log(min, sec);
  }
  // timer = setInterval(()=>{remainTime()},1000);
  // useEffect(()=>{
  //   if(time.current <= 0){
  //     clearInterval(timerId.current);
  //   }
  // },[sec]);

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    axiosConfig.post('/member/email/send/confirm',{
      email: email,
      num: mailauth
    }).then(res=>{
      console.log(res);
      if(res === undefined){
        return;
      }
      else{
        setNext(true);
      }
      // setNext(true);

    }).catch(err=>{
      console.log(err);
      setErr(true);
    })
    console.log(mailauth);
  };

  return (
    <div className={styles.login_container}>
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
            <div>{min}:{String(sec).padStart(2,"0")}</div>
          </div>
          <p className={styles.remail}>인증 메일을 받지 못하셨나요? 
            <button type='button'>이메일 다시 보내기</button>
          </p>
          <LoginButton type={next? "button" : "submit"} text={next? '인증완료': '인증하기'} 
            active={mailauth?true:false} url={next?'/signup/nickname':""}/>
        </form>
        {err && 
          <AlertBox type={false} text="인증번호가 일치하지 않습니다. 다시 확인해주세요"/>
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