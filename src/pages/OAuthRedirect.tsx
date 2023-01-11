import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';
// import axiosOAuth from '@utils/axiosOAuth';
import axiosOAuth from '../core/apis/utils/axiosOAuth';
import axios from 'axios';
import { useUserStore } from '@store/userStore';

const OAuthRedirect = () => {
  let provider_id = "";
  // const google_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  // const naver_id = process.env.REACT_APP_NAVER_CLIENT_ID;

  const setOAuthLogin = useUserStore(state=>state.setOAuthLogin);
  const setEmail = useUserStore(state=>state.setEmail);

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
    axiosOAuth.get(url)
      .then(res=>{
        console.log(res);
        if(res.data.body.newUser === true){
          setOAuthLogin(true);
          setEmail(res.data.body.email);
          navigate('/signup/agree');
        }
        else{
          setOAuthLogin(false);
          axiosOAuth.get(`/oauth/${provider_id}/callback`).then(res=>{
            console.log(`oauth로그인: ${res}`);
          }).catch(err=>{
            console.log(err);
          })
          navigate('/');
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