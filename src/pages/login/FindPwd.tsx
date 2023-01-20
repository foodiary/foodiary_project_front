import React, { FormEvent, useState } from 'react';
import styles from '@styles/loginpage/signUp.module.scss';
import { useUserStore } from '@store/userStore';
import { LoginButton } from '@components/common/LoginButton/Button';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { AlertBox } from '@components/common/AlertBox/AlertBox';
import { Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';

const FindPwd = () => {
  const id = useUserStore((state)=>state.id);
  const email = useUserStore((state)=>state.email);

  const [send, setSend] = useState(false);
  const [err, setErr] = useState(false);

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    axiosConfig.post("/member/find/password", {
      email: email,
      loginId: id,
    }).then(res=>{
      if(res.status === 404){
        setErr(true);
        setSend(false);
      }
      else{
        setErr(false);
        setSend(true);
      }
      console.log(res); 
      setTimeout(()=>setSend(false), 3000);

    }).catch(err=>{
      console.log(err);
      setTimeout(()=>setErr(false), 3000);

      // setErr(true);
    })
  }
  return (
    <div className={styles.login_container}>
      <Intro intro1={"아이디와"} span={"이메일을"} intro2={"입력해주세요."}/>
      <form onSubmit={onSubmit} className={styles.findPwd_container}>
        <Input
          id={"id"} 
          type={"text"} 
          label={"아이디"} 
          placeholder={"아이디를 입력해주세요"}
          validate="no"
        />
        <Input 
          id={"email"} 
          type={"email"} 
          label={"이메일"} 
          placeholder={"이메일을 입력해주세요"}
          validate="no"
        />
        <div className={styles.findPwd_btn}>
          <LoginButton type="submit" text='확인' active={(email&&id) ? true:false}/>
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

export default FindPwd;