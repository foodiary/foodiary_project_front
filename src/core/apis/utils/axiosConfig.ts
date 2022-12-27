import React from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: "",
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((req)=>{
  return req;
},(err)=>{  //요청 에러 캐치
  return Promise.reject(err);
});

instance.interceptors.response.use((res)=>{
  // console.log("로그인 완료");
  // localStorage.setItem("user", res.data.token);
  // console.log(res);
  return res;
},(err)=>{  //응답 에러 캐치
  // console.log(`에러 status는: ${err.response.status}`);
  // console.log(`에러는: ${err.response.data.error}`);
  return Promise.reject(err);
});

export default instance;