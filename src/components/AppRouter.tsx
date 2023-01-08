import OtherLoginPage from '@pages/login/OtherLoginPage';
import MainPage from '@pages/MainPage';
import LoginMainPage from '@pages/login/LoginMainPage';
import SignUpAgree from '@pages/signup/SignUpAgree';
import SignUpEmail from '@pages/signup/SignUpEmail';
import SignUpSetProfile from '@pages/signup/SignUpProfileImage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpId from '@pages/signup/SignUpId';
import SignUpPwd from '@pages/signup/SignUpPwd';
import SignUpProfileImage from '@pages/signup/SignUpProfileImage';
import SignUpProfileMsg from '@pages/signup/SignUpProfileMsg';
import SignUpAuthMail from '@pages/signup/SignUpAuthMail';
import SignUpNickName from '@pages/signup/SignUpNickName';
import LayOut from './layout/LayOut';
import FindId from '@pages/login/FindId';
import FindPwd from '@pages/login/FindPwd';
import SignUpAgreeDetail from '@pages/signup/SignUpAgreeDetail';
import ModifyPwd from '@pages/login/ModifyPwd';
import SignUpWelcom from '@pages/signup/SignUpWelcom';

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<LayOut/>}>
            <Route path='/' element={<MainPage/>}/>

            <Route path='/signup/agree' element={<SignUpAgree/>}/>
            <Route path='/signup/agree/detail' element={<SignUpAgreeDetail/>}/>

            <Route path='/signup/id' element={<SignUpId/>}/>
            <Route path='/signup/pwd' element={<SignUpPwd/>}/>
            <Route path='/signup/email' element={<SignUpEmail/>}/>
            <Route path='/signup/authmail' element={<SignUpAuthMail/>}/>
            <Route path='/signup/nickname' element={<SignUpNickName/>}/>
            <Route path='/signup/profileImage' element={<SignUpProfileImage/>}/>
            <Route path='/signup/profileMsg' element={<SignUpProfileMsg/>}/>
            <Route path='/signup/welcome' element={<SignUpWelcom/>}/>
            
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