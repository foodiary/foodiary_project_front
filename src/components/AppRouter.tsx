import OtherLoginPage from '@pages/login/OtherLoginPage';
import MainPage from '@pages/MainPage';
import LoginMainPage from '@pages/login/LoginMainPage';
import SignUpAgree from '@pages/signup/SignUpAgree';
import SignUpEmail from '@pages/signup/SignUpEmail';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import SignUpId from '@pages/signup/SignUpId';
import SignUpPwd from '@pages/signup/SignUpPwd';
import SignUpProfileImage from '@pages/signup/SignUpProfileImage';
import SignUpProfileMsg from '@pages/signup/SignUpProfileMsg';
import SignUpAuthMail from '@pages/signup/SignUpAuthMail';
import SignUpNickName from '@pages/signup/SignUpNickName';
import MyPageMain from '@pages/mypage/MyPageMain';
import MyPageSetting from '@pages/mypage/setting/MyPageSetting';
import MyWriting from '@pages/mypage/MyWriting';
import MyComments from '@pages/mypage/MyComments';
import MyCommentsDetail from '@pages/mypage/MyCommentsDetail';
import MyCommentsEdit from '@pages/mypage/MyCommentsEdit';
import MyRecommend from '@pages/mypage/MyRecommend';
import MyGood from '@pages/mypage/MyGood';
import MyScrap from '@pages/mypage/MyScrap';
import Notice from '@pages/mypage/notice/Notice';
import NoticeDetail from '@pages/mypage/notice/NoticeDetail';
import FAQ from '@pages/mypage/FAQ';
import Contact from '@pages/mypage/contact/Contact';
import ContactDetail from '@pages/mypage/contact/ContactDetail';
import ModifyNickName from '@pages/mypage/setting/ModifyNickName';
import ModifyProfileMsg from '@pages/mypage/setting/ModifyProfileMsg';
import { LoginLayout, MainLayOut } from './layout/LayOut';
import FindId from '@pages/login/FindId';
import FindPwd from '@pages/login/FindPwd';
import SignUpAgreeDetail from '@pages/signup/SignUpAgreeDetail';
import ModifyPwd from '@pages/login/ModifyPwd';
import SignUpWelcom from '@pages/signup/SignUpWelcom';
import OAuthRedirect from '@pages/OAuthRedirect';
import { useUserStore } from '@store/userStore';
import SignUpPwdConfirm from '@pages/signup/SignUpPwdConfirm';
import PrivateRouter from './PrivateRouter';
import ScrollRestoration from './ScrollRestoration';
import MenuPage from '@pages/MenuPage';
import ExplorePage from '@pages/ExplorePage';
import ExploreDetail from '@pages/ExploreDetail';
import WritingDetails from '@pages/WritingDetails';
import WritingPage from '@pages/WritingPage';
import ContactEdit from '@pages/mypage/contact/ContactEdit';
import axiosConfig from '@utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import axios from 'axios';
import Loading from '@pages/Loading';
import MyContact from '@pages/mypage/contact/MyContact';
import Search from '@pages/Search';
import SearchResult from '@pages/SearchResult';

const AppRouter = () => {
  const token = localStorage.getItem("access_token");
  const oauthLogin = useUserStore(state=>state.oauthLogin);

  return (
    <div>
      <BrowserRouter>
        <ScrollRestoration/>
        <Routes>
          <Route element={<MainLayOut/>}>
            <Route path='/' element={<MainPage/>}/>

            {!oauthLogin && <Route path='/oauth/google/callback' element={<OAuthRedirect/>}/>}
            {!oauthLogin && <Route path='/oauth/naver/callback' element={<OAuthRedirect/>}/>}
            
            {/* <Route path='/menu' element={<MenuPage/>}/> */}

            <Route path='/detail/:id' element={<WritingDetails/>}/>

            <Route path='/explore' element={<ExplorePage/>}/>
            <Route path='/explore/details' element={<ExploreDetail/>}/>

            <Route path='/mypage' element={<MyPageMain/>}/>


            <Route element={<PrivateRouter/>}>
              <Route path='/menu' element={<MenuPage/>}/>

              <Route path='/mypage/setting' element={<MyPageSetting/>}/>
              <Route path='/mypage/mywriting' element={<MyWriting/>}/>
              <Route path='/mypage/mygood' element={<MyGood/>}/>
              <Route path='/mypage/myscrap' element={<MyScrap/>}/>
              <Route path='/member/nickname/change' element={<ModifyNickName/>}/>
              <Route path='/member/msg/change' element={<ModifyProfileMsg/>}/>

              <Route path='/mypage/contact' element={<Contact/>}/>
              <Route path='/mypage/mycontact' element={<MyContact/>}/>
              <Route path='/mypage/contact/detail' element={<ContactDetail/>}/>
              <Route path='/mypage/contact/edit' element={<ContactEdit/>}/>
              
              <Route path='/mypage/mycomments' element={<MyComments/>}/>
              {/* <Route path='/mypage/mycomments/detail/:id/:id' element={<MyCommentsDetail/>}/> */}
              <Route path='/mypage/mycomments/edit' element={<MyCommentsEdit/>}/>

              <Route path='/mypage/myrecommend' element={<MyRecommend/>}/>
            </Route>
           
            
            <Route path='/mypage/notice' element={<Notice/>}/>
            <Route path='/mypage/notice/detail/:id' element={<NoticeDetail/>}/>
            <Route path='/mypage/faq' element={<FAQ/>}/>

            <Route path='/member/password/change' element={<ModifyPwd/>}/>
            <Route path='/write' element={<WritingPage edit={false}/>}/>
            <Route path='/modify/:id' element={<WritingPage edit={true}/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/search/result' element={<SearchResult/>}/>

          </Route>

          {!token && 
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

              <Route path='/login' element={<LoginMainPage/>}/>
              <Route path='/login/other' element={<OtherLoginPage/>}/> 

              <Route path='/find/id' element={<FindId/>}/>
              <Route path='/find/pwd' element={<FindPwd/>}/>

            </Route>
          }

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;