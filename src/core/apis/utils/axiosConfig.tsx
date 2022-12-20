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
  return res;
},(err)=>{  //응답 에러 캐치
  return Promise.reject(err);
});

export default instance;