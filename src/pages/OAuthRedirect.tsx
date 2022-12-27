import React from 'react';
import { useLocation } from 'react-router-dom';
import Loading from './Loading';
import axiosOAuth from '@utils/axiosOAuth';

const OAuthRedirect = () => {
  const location = useLocation();
  // if(location.hash)
  // console.log(location.hash.search("code")); // 있으면 1, 없으면 -1 반환
  // const access_token = location.hash.slice(14);
  // const code = location???;
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
  // axiosOAuth.get("/").then((res)=>{
  //   console.log(res);
  // }).catch(err=>{
  //   console.log(err);
  // })
  console.log(location);
  return (
    <div>
      <Loading/>
    </div>
  );
};

export default OAuthRedirect;