import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import axiosOAuth from '@utils/axiosOAuth';
import axios from 'axios';

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let googleCode = "";
  let naverCode = "";
  if(location.pathname === "/oauth/google/callback"){
    googleCode = location.search.slice(6);
  }
  else if(location.pathname === "/oauth/naver/callback"){
    naverCode = location.search.slice(6);
  }
  
  const googleLogin = async(authCode:string)=>{
    axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
    axiosOAuth.defaults.headers['Access-Control-Allow-Origin'] = "*";
    axios.defaults.withCredentials = true;

    axiosOAuth.interceptors.response.use((res)=>{
      localStorage.setItem("test", "인터셉트");
      localStorage.setItem("user", JSON.stringify(res.data));
      return res;
    },(err)=>{
        return Promise.reject(err);
    });
    const res= await axiosOAuth.get(`/oauth/google/callback?code=${authCode}`);
    return res;
  };
  const naverLogin = async(authCode:string)=>{
    axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
    axiosOAuth.defaults.headers['Access-Control-Allow-Origin'] = "*";
    axios.defaults.withCredentials = true;

    const res= await axiosOAuth.get(`/oauth/naver/callback?code=${authCode}`);
    return res;
  }
  useEffect(()=>{
    googleLogin(googleCode).then((res)=>{
      console.log(res.data);
      navigate(-1);
    })
  },[googleCode]);

  useEffect(()=>{
    naverLogin(naverCode).then((res)=>{
      console.log(res.data);
      navigate(-1);
    })
  },[naverCode]);


  // axiosOAuth.interceptors.request.use((config)=>({
  //   ...config,
  //   headers: {
  //     "GOOGLE_ACCESS_TOKEN": access_token,
  //   }
  // }))
  // axiosOAuth.interceptors.request.use((config)=>({
  //   ...config,
  //   headers: {
  //     "NAVER_AUTH_CODE": code,
  //   }
  // }))
   return (
    <div>
      <Loading/>
    </div>
  );
};

export default OAuthRedirect;