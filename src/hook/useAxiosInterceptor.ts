import { useErrorStore } from '@store/errorStore';
import { useLoadingStore } from '@store/loadingStore';
import axiosConfig from '@utils/axiosConfig';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export const useAxiosInterceptor = ()=>{

  const setLoading = useLoadingStore(state=>state.setLoading);

  const errorHandler = async(err:AxiosError)=>{ //res에서 넘어온 에러
    setLoading(false);
    
    const config = err.config;
    console.log(`인터셉트 에러: ${err}`);

    //액세스토큰 만료 시
    if (err.response?.status === 401) {
      console.log('401임')
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (accessToken) {
        localStorage.removeItem("access_token");
      }
      if(!refreshToken){
        return;
      }

      try {
        console.log('리프레시 다시')
        console.log(refreshToken);

        const headers = { Refresh: `${refreshToken}` };
        const res = await axiosConfig.get("/auth/reissue", { headers }); //refresh로 access 토큰 재발급
        const data = res.data;
        console.log(res);
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken; //??

        config!.headers = {
          Authorization: `${accessToken}`,
        };

        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);
        return await axios(config!);

      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }

  const requestHandler = (config:AxiosRequestConfig)=>{
    // console.log(config);
    setLoading(true); //리퀘스트시 로딩 켜기

    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers = {
        // Authorization: `Bearer ${accessToken}`,
        Authorization: accessToken,
      };
    }
    return config;
  }
  const requestInterceptor = axiosConfig.interceptors.request.use(requestHandler);

  const responseHandler = (response:AxiosResponse)=>{
    setLoading(false); //응답 후 로딩 끄기

    console.log("인터셉트 응답:" + response);

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const refreshExpired = response.data.refreshTokenExpirationMinutes;

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("refresh_expired", refreshExpired);
    }

    return response;
  }
  const responseInterceptor = axiosConfig.interceptors.response.use(
    (res) => responseHandler(res),
    (err) => errorHandler(err),
  );

  useEffect(() => {
    return () => {
      axiosConfig.interceptors.request.eject(requestInterceptor); // eject는 제거라는 뜻
      axiosConfig.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
}