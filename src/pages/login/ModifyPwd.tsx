import { Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';
import React, { FormEvent, useState } from 'react';
import styles from '@styles/loginpage/signUp.module.scss';
import { useUserStore } from '@store/userStore';
import { LoginButton } from '@components/common/LoginButton/Button';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { AlertBox } from '@components/common/AlertBox/AlertBox';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ModifyPwd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jwt = location.search.slice(5);
  const email = useUserStore((state)=>state.email);
  const pwd = useUserStore((state)=>state.pwd);
  const more_pwd = useUserStore((state)=>state.more_pwd);

  const [alert, setAlert] = useState(false);
  const [err, setErr] = useState(false);

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    console.log(`비밀번호: ${pwd}`);
    console.log(`확인비번: ${more_pwd}`);
    console.log(`jwt는?: ${jwt}`);

    axiosConfig.post("/member/password/change/jwt", {
      // email: email,
      jwt: jwt,
      password: pwd,
      more_password: more_pwd,
    }).then(res=>{
      if(res === undefined){
        return;
      }
      else{
        setAlert(true);
        setTimeout(()=>{navigate("/login")},3000);
      }
      // if(res.status === 404){
      //   setErr(true);
      // }
      // else{
      //   setAlert(true);
      //   setTimeout(()=>{navigate("/login")},3000);
      // }
      console.log(res); //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      console.log(err);
      // setErr(true);
    })
  }
  return (
    <div className={styles.login_container}>
      <Intro intro1={""} span={"비밀번호변경"} intro2={""}/>
      <form onSubmit={onSubmit} className={styles.new_pwd_container}>
        <Input
          id={"pwd"} 
          type={"password"} 
          label={"새 비밀번호"} 
          placeholder={"비밀번호를 입력해주세요"}
        />
        <Input 
          id={"more_pwd"} 
          type={"password"} 
          label={"새 비밀번호 확인"} 
          placeholder={"비밀번호를 입력해주세요"}
          validate="no"
        />
        <div className={styles.confirm}>
          <LoginButton type="submit" text='확인' active={(pwd===more_pwd) ? true:false}/>
        </div>
      </form>
        {alert && 
          <AlertBox type={true} text="비밀번호가 변경되었습니다. 다시 로그인해주세요."/>
        }
        {/* {err && 
          <AlertBox type={false} text="일치하는 회원이 없습니다."/>
        } */}
    </div>
  );
};

export default ModifyPwd;