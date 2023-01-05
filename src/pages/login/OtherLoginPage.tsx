import React, { FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/otherLoginPage.module.scss";
import { Link } from 'react-router-dom';
import { Input, Intro } from '@pages/Form';
import { LoginButton } from '@components/common/Button';
import axiosConfig from "../../core/apis/utils/axiosConfig";
import { useUserStore } from '@store/userStore';

const OtherLoginPage = () => {
  const id = useUserStore((state)=>state.id);
  const pwd = useUserStore((state)=>state.pwd);
  const [confirm, setConfirm] = useState(false);

  useEffect(()=>{
    if(id && pwd){
      setConfirm(true);
    }
    else{
      setConfirm(false);
    }
  },[id, pwd]);

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    axiosConfig.post("/member/login", {
      loginId: id,
      password: pwd,
    }).then(res=>{
      console.log(res); //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      console.log(err);
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

        <form onSubmit={onSubmit}>
          <LoginButton type="submit" text='로그인' active={confirm?true:false}/>
        </form>
        
        <div className={styles.signup}>
          <p>Foodiary가 처음이신가요? <Link to="/signup/agree">가입하기</Link></p>
        </div>
        
        {/* {pwd && 
          <button type='button' className={styles.pwd_eye} onClick={()=>setViewPwd(prev=>!prev)}>
            <IoMdEyeOff/>
          </button>} */}
      </div>
  );
};

export default OtherLoginPage;