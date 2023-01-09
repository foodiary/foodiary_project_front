import OtherLoginPage from '@pages/login/OtherLoginPage';
import MainPage from '@pages/MainPage';
import LoginMainPage from '@pages/login/LoginMainPage';
import SignUpAgree from '@pages/signup/SignUpAgree';
import SignUpEmail from '@pages/signup/SignUpEmail';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpId from '@pages/signup/SignUpId';
import SignUpPwd from '@pages/signup/SignUpPwd';
import SignUpProfileImage from '@pages/signup/SignUpProfileImage';
import SignUpProfileMsg from '@pages/signup/SignUpProfileMsg';
import SignUpAuthMail from '@pages/signup/SignUpAuthMail';
import SignUpNickName from '@pages/signup/SignUpNickName';
import { LoginLayout, MainLayOut } from './layout/LayOut';
import FindId from '@pages/login/FindId';
import FindPwd from '@pages/login/FindPwd';
import SignUpAgreeDetail from '@pages/signup/SignUpAgreeDetail';
import ModifyPwd from '@pages/login/ModifyPwd';
import SignUpWelcom from '@pages/signup/SignUpWelcom';
import OAuthRedirect from '@pages/OAuthRedirect';
import { useUserStore } from '@store/userStore';
import SignUpPwdConfirm from '@pages/signup/SignUpPwdConfirm';

const AppRouter = () => {
  const [loginUser, setLoginUser] = useState(false);
  const token = localStorage.getItem("access_token");
  useEffect(()=>{
    // console.log("AppRouter 컴포넌트: ", token);
    if(token){
      setLoginUser(true);
    }
    else{
      setLoginUser(false);
    }
  },[]);
  const oauthLogin = useUserStore(state=>state.oauthLogin);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayOut/>}>
            {/* {loginUser && <Route path='/' element={<MainPage/>}/>} */}
            <Route path='/' element={<MainPage/>}/>

          {/* </Route> */}
            {!oauthLogin && <Route path='/oauth/google/callback' element={<OAuthRedirect/>}/>}
            {!oauthLogin && <Route path='/oauth/naver/callback' element={<OAuthRedirect/>}/>}
          </Route>

          <Route element={<LoginLayout/>}>
            <Route path='/signup/agree' element={<SignUpAgree/>}/>
            <Route path='/signup/agree/detail' element={<SignUpAgreeDetail/>}/>

            <Route path='/signup/id' element={<SignUpId/>}/>
            <Route path='/signup/pwd' element={<SignUpPwd/>}/>
            <Route path='/signup/pwd/confirm' element={<SignUpPwdConfirm/>}/>
            <Route path='/signup/email' element={<SignUpEmail/>}/>
            <Route path='/signup/authmail' element={<SignUpAuthMail/>}/>
            <Route path='/signup/nickname' element={<SignUpNickName/>}/>
            <Route path='/signup/profileImage' element={<SignUpProfileImage/>}/>
            <Route path='/signup/profileMsg' element={<SignUpProfileMsg/>}/>
            <Route path='/signup/welcome' element={<SignUpWelcom/>}/>
          {/* </Route> */}

          {/* <Route> */}
            <Route path='/login' element={<LoginMainPage/>}/>
            <Route path='/login/other' element={<OtherLoginPage/>}/>
            <Route path='/find/id' element={<FindId/>}/>
            <Route path='/find/pwd' element={<FindPwd/>}/>

            <Route path='/member/password/change' element={<ModifyPwd/>}/>

          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;