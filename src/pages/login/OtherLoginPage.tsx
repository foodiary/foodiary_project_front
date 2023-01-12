import React, { FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/otherLoginPage.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import { Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';import { LoginButton } from '@components/common/LoginButton/Button';
import axiosConfig from "../../core/apis/utils/axiosConfig";
import { useUserStore } from '@store/userStore';
import { useLoginUserStore } from '@store/loginUserStore';
import { AlertBox } from '@components/common/AlertBox/AlertBox';
import axios from 'axios';
import Loading from '@pages/Loading';

const OtherLoginPage = () => {
  const navigate = useNavigate();
  const id = useUserStore((state)=>state.id);
  const pwd = useUserStore((state)=>state.pwd);
  // const {setId, setSequenceId, setEmail, setNickName, setProfileImg, setProfileMsg} = useLoginUserStore();
  const setUserInfo = useLoginUserStore((state)=>state.setUserInfo);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(()=>{
    if(id && pwd){
      setLogin(true);
    }
    else{
      setLogin(false);
    }
  },[id, pwd]);

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    console.log(id, pwd);
    setLoading(true);
    axiosConfig.post("/auth/login", {
      loginId: id,
      password: pwd,
    }).then(res=>{
      console.log(res);
      console.log("로그인 완료");
      setLoading(false);
      // navigate("/");
      // axiosConfig.get(`/member/76`).then(res=>{
      //   // setUserInfo(res.data);
      //   navigate("/") ;
      // }).catch(err=>{
      //   console.log(err);
      // })
    }).catch(err=>{
      console.log(err);
      setErr(true);
    })
    console.log(`통신중`);
}
  return (
    <div className={styles.login_container}>
      <div className={styles.add_margin}>
        <Intro intro1={"안녕하세요"} span={"Foodiary"} intro2={"입니다!"}/>
      </div>
      <div className={styles.input_id}>
        <Input 
          id={"id"} 
          type={"text"} 
          label={"아이디"} 
          placeholder={"아이디를 입력해주세요"}
          validate="no"
        />
      </div>
        <Input 
          id={"pwd"} 
          type={"password"} 
          label={"비밀번호"} 
          placeholder={"비밀번호를 입력해주세요"}
          validate="no"
        />

        <div className={styles.forget_account}>
          <p>기억이 안나시나요?
            <Link to="/find/id">아이디 찾기</Link>
            <Link to="/find/pwd">비밀번호 찾기</Link>
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <LoginButton type="submit" text='로그인' active={login?true:false}/>
        </form>
        
        <div className={styles.signup}>
          <p>Foodiary가 처음이신가요? <Link to="/signup/agree">가입하기</Link></p>
        </div>
        
        {err && 
          <AlertBox type={false} text="아이디 또는 비밀번호를 다시 확인해주세요."/>
        }
        {loading && <Loading/>}

      </div>
  );
};

export default OtherLoginPage;