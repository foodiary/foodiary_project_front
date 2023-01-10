// import OtherLoginPage from '@pages/login/OtherLoginPage';
import MainPage from '@pages/MainPage';
// import LoginMainPage from '@pages/login/LoginMainPage';
// import SignUpAgree from '@pages/signup/SignUpAgree';
// import SignUpEmail from '@pages/signup/SignUpEmail';
// import SignUpSetProfile from '@pages/signup/SignUpProfileImage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import SignUpId from '@pages/signup/SignUpId';
// import SignUpPwd from '@pages/signup/SignUpPwd';
// import SignUpProfileImage from '@pages/signup/SignUpProfileImage';
// import SignUpProfileMsg from '@pages/signup/SignUpProfileMsg';
// import SignUpAuthMail from '@pages/signup/SignUpAuthMail';
// import SignUpNickName from '@pages/signup/SignUpNickName';
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

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<MainPage/>}/>
          <Route path='/signup/agree' element={<SignUpAgree/>}/>
          <Route path='/signup/id' element={<SignUpId/>}/>
          <Route path='/signup/pwd' element={<SignUpPwd/>}/>
          <Route path='/signup/email' element={<SignUpEmail/>}/>
          <Route path='/signup/authmail' element={<SignUpAuthMail/>}/>
          <Route path='/signup/nickname' element={<SignUpNickName/>}/>
          <Route path='/signup/profileImage' element={<SignUpProfileImage/>}/>
          <Route path='/signup/profileMsg' element={<SignUpProfileMsg/>}/>
          <Route path='/login' element={<LoginMainPage/>}/>
          <Route path='/login/other' element={<OtherLoginPage/>}/> */}

          <Route path='/mypage' element={<MyPageMain/>}/>
          <Route path='/mypage/setting' element={<MyPageSetting/>}/>
          <Route path='/mypage/mywriting' element={<MyWriting/>}/>
          <Route path='/mypage/mygood' element={<MyGood/>}/>
          <Route path='/mypage/myscrap' element={<MyScrap/>}/>

          <Route path='/mypage/mycomments' element={<MyComments/>}/>
          <Route path='/mypage/mycomments/detail' element={<MyCommentsDetail/>}/>
          <Route path='/mypage/mycomments/edit' element={<MyCommentsEdit/>}/>
          <Route path='/mypage/myrecommend' element={<MyRecommend/>}/>

          <Route path='/mypage/notice' element={<Notice/>}/>
          <Route path='/mypage/notice/detail' element={<NoticeDetail/>}/>
          <Route path='/mypage/faq' element={<FAQ/>}/>
          <Route path='/mypage/contact' element={<Contact/>}/>
          <Route path='/mypage/contact/detail' element={<ContactDetail/>}/>



          {/* /find/id   /find/pwd */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;