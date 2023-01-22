import React, { FormEvent, useState } from 'react';
import styles from '@styles/loginpage/signUp.module.scss';
import { useUserStore } from '@store/userStore';
import { LoginButton } from '@components/common/LoginButton/Button';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { AlertBox } from '@components/common/AlertBox/AlertBox';
import { Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';

const FindId = () => {
  const email = useUserStore((state)=>state.email);
  const [send, setSend] = useState(false);
  const [err, setErr] = useState(false);

  const onSubmit = (e:FormEvent)=>{
    setErr(false);
    setSend(false);
    e.preventDefault();

    axiosConfig.post("/member/find/id", {
      email: email,
    }).then(res=>{
      setSend(true);
      setErr(false)
      // setTimeout(()=>setSend(false), 3000);

      console.log(res); //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      console.log(err);
      setSend(false);
      setErr(true);
      // setTimeout(()=>setErr(false), 3000);
    })
  }
  return (
    <div className={styles.login_container}>
      <Intro intro1={"가입하실때 사용하신"} span={"이메일을"} intro2={"입력해주세요."}/>
      <form onSubmit={onSubmit} className={styles.findId_container}>
          <Input 
              id={"email"} 
              type={"email"} 
              label={"이메일"} 
              placeholder={"이메일을 입력해주세요"}
          />
          <div className={styles.findId_btn}>
            <LoginButton type="submit" text='확인' 
              active={email? true:false}/>
          </div>
        </form>
        {send && 
          <AlertBox type={true} text="이메일 발송이 완료되었습니다. 이메일을 확인해주세요."/>
        }
        {err && 
          <AlertBox type={false} text="일치하는 회원이 없습니다."/>
        }
    </div>
  );
};

export default FindId;