import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axiosOAuth from '@utils/axiosOAuth';
import axiosConfig from '@utils/axiosConfig';

import axios from 'axios';
import { useUserStore } from '@store/userStore';
import { useLoginUserStore } from '@store/loginUserStore';

const OAuthRedirect = () => {

  let provider_id = "";

  const setOAuthLogin = useUserStore(state=>state.setOAuthLogin);
  const setEmail = useUserStore(state=>state.setEmail);
  const setEmailYn = useUserStore(state=>state.setEmailYn);
  const setUserInfo = useLoginUserStore((state)=>state.setUserInfo);

  const navigate = useNavigate();
  const location = useLocation();

  let authCode = location.search.slice(6);;
  let url = "";

  if(location.pathname === "/oauth/google/callback"){
    url = `/oauth/google/callback?code=${authCode}`;
    provider_id = process.env.REACT_APP_GOOGLE_CLIENT_ID!;
  }
  else if(location.pathname === "/oauth/naver/callback"){
    url = `/oauth/naver/callback?code=${authCode}`;
    provider_id = process.env.REACT_APP_NAVER_CLIENT_ID!;
  }
  
  const authLogin = async()=>{
    axiosConfig.get(url)
    .then(res=>{
      if(res.data.newUser === true){
        setOAuthLogin(true);
          setEmail(res.data.email);
          setEmailYn("Y");
          navigate('/signup/agree');
      }
      else{
        setOAuthLogin(false);
        const memberId = res.data.memberId;
        axiosConfig.get(`/member/${memberId}`)
            .then(res=>{
              setUserInfo(res.data);
              navigate("/") ;
            }).catch(err=>{
              console.log(`otherLoginPage: ${err}`);
            })
      }
    }).catch(err=>{
      console.log(err);
    })
    
  };

  useEffect(()=>{
    authLogin();
    console.log(`인증코드: ${authCode}`);

  },[authCode]);
  
   return (
    <div>
      <Loading/>
    </div>
  );
};

export default OAuthRedirect;