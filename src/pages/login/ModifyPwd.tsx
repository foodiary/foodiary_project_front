import { Intro } from '@components/common/Text/SignUpPageText';
import Input from '@components/common/Input/Input';
import React, { FormEvent, useState } from 'react';
import styles from '@styles/loginpage/signUp.module.scss';
import { useUserStore } from '@store/userStore';
import { LoginButton } from '@components/common/LoginButton/Button';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { AlertBox } from '@components/common/AlertBox/AlertBox';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useLoginUserStore } from '@store/loginUserStore';

const ModifyPwd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //jwt가 있을때 없을때 url 구분
  let jwt = "";
  if(location.search.includes("jwt")){
    jwt = location.search.slice(5);
  }

  // const jwt = location.search.slice(5);
  const pwd = useUserStore((state)=>state.pwd);
  const more_pwd = useUserStore((state)=>state.more_pwd);
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const clearUser = useLoginUserStore(state=>state.reset);

  let url = "";

  const [alert, setAlert] = useState(false);
  const [err, setErr] = useState(false);

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    if(jwt){
      url = '/member/password/change/jwt';
      axiosConfig.post(url, {
        jwt: jwt,
        password: pwd,
        more_password: more_pwd,
      }).then(res=>{
        console.log(res);
        setAlert(true);
          //로그인 저장된 기록 지우기, 토큰도 지워
        localStorage.clear();
        clearUser();
        setTimeout(()=>{
          navigate("/login");
          window.location.reload();
        },2000);
          // setTimeout(()=>{navigate("/login")},2000);
      }).catch(err=>{
        console.log(err);
        // setErr(true);
      })
    }
    else{
      if(!memberId){
        return(<AlertBox text='로그인된 유저가 아닙니다.' type={false}/>)
      }
      else{
        url = `/member/password/${memberId}`;
        axiosConfig.patch(url, {
          password: pwd,
          more_password: more_pwd,
        }).then(res=>{
          if(res === undefined){
            return;
          }
          else{
            console.log(res);
            setAlert(true);
              //로그인 저장된 기록 지우기, 토큰도 지워
            localStorage.clear();
            clearUser();
            setTimeout(()=>{
              navigate("/login");
              window.location.reload();
            },2000);
            //로그인 저장된 기록 지우기, 토큰도 지워
            // setTimeout(()=>{navigate("/login")},3000);
          }
        }).catch(err=>{
          console.log(err);
          // setErr(true);
        })
      }
    }
    console.log(`비밀번호: ${pwd}`);
    console.log(`확인비번: ${more_pwd}`);
    console.log(`jwt는?: ${jwt}`);
    console.log(`url는?: ${url}`);

    // localStorage.clear();
    
    // axiosConfig.post(url, {
    //   jwt: jwt,
    //   password: pwd,
    //   more_password: more_pwd,
    // }).then(res=>{
    //   if(res === undefined){
    //     return;
    //   }
    //   else{
    //     setAlert(true);
    //     //로그인 저장된 기록 지우기, 토큰도 지워
    //     setTimeout(()=>{navigate("/login")},3000);
    //   }
    //   // if(res.status === 404){
    //   //   setErr(true);
    //   // }
    //   // else{
    //   //   setAlert(true);
    //   //   setTimeout(()=>{navigate("/login")},3000);
    //   // }
    //   console.log(res); //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    // }).catch(err=>{
    //   console.log(err);
    //   // setErr(true);
    // })
  }
  return (
    <div className={styles.login_container}>
      <Intro intro1={""} span={"새 비밀번호변경"} intro2={""}/>
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
          <LoginButton 
            type="submit" 
            text='확인' 
            active={((pwd===more_pwd)&& pwd && more_pwd) ? true:false}/>
        </div>
      </form>
        {alert && 
          <AlertBox type={true} text="비밀번호가 변경되었습니다. 다시 로그인해주세요."/>
        }
    </div>
  );
};

export default ModifyPwd;