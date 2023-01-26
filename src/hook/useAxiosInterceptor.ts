import { useErrorStore } from '@store/errorStore';
import { useLoadingStore } from '@store/loadingStore';
import axiosConfig from '@utils/axiosConfig';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
export const useAxiosInterceptor = ()=>{
  const setLoading = useLoadingStore(state=>state.setLoading);
 
  const getRefresh = async()=>{
    const refreshToken = localStorage.getItem("refresh_token");
    const headers = { Refresh: `${refreshToken}` };

    await axiosConfig.get("/auth/reissue", { headers })
    .then(res=>{
      console.log(res);
      const data = res.data;
      const newAccessToken = data.data.accessToken;
      localStorage.setItem("access_token", newAccessToken);

    }).catch(err=>{
      console.log(err);
      // localStorage.clear();
      // window.location.reload();
    })
  // const getRefresh = async()=>{
  //   const refreshToken = localStorage.getItem("refresh_token");
  //   const headers = { Refresh: `${refreshToken}` };

  //   await axiosConfig.get("/auth/reissue", { headers })
  //   .then(res=>{
  //     console.log(res);
  //     const data = res.data;
  //     const newAccessToken = data.data.accessToken;
  //     localStorage.setItem("access_token", newAccessToken);

  //   }).catch(err=>{
  //     console.log(err);
  //     // localStorage.clear();
  //     // window.location.reload();
  //   })

    // const newAccessToken = data.data.accessToken;
    // const newRefreshToken = data.data.refreshToken; 

    // localStorage.setItem("access_token", newAccessToken);
    // localStorage.setItem("refresh_token", newRefreshToken);
  }
  // }

  const errorHandler = async(err:AxiosError<any, any>)=>{ //res에서 넘어온 에러
    setLoading(false);

    const config = err.config;
    console.log(`인터셉트 에러: ${err}`);
    const refreshToken = localStorage.getItem("refresh_token");

    if(config?.url === '/auth/reissue'){
      if(!refreshToken){
        console.log('자동로그아웃');
        localStorage.clear();
        window.location.reload();
      }
    }
    
    //액세스토큰 만료 시
    if (err.response?.status === 401 && config?.url !== '/auth/reissue') {
      console.log('401임')
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      
      if(!refreshToken){
        return;
      }
      // if(!refreshToken){
      //   return;
      // }

      try {
        console.log('리프레시')
        // console.log(`${process.env.REACT_APP_API_URL}`);
        // const res = await getRefresh();
        const headers = { Refresh: `${refreshToken}` };
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/reissue`, { headers }); //refresh로 access 토큰 재발급
        const data = res.data;

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        const refreshExpired = data.refreshTokenExpirationMinutes;
        const accessExpired = data.accessTokenExpirationMinutes;

        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);
        localStorage.setItem("refresh_expired", refreshExpired);
        localStorage.setItem("access_expired", accessExpired);
        console.log(res); //응답일수도 에러일수도
        // if(res.status === 401){ //리프레시 만료
        //   localStorage.removeItem("refreshToken");
        //   return;
        // }

        if(newAccessToken){
          console.log('뉴액세스토큰받았다')
          config!.headers = {
            Authorization: `${newAccessToken}`,
          };
        }
        return await axios(config!);

      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  }

  const requestHandler = (config:AxiosRequestConfig)=>{
    setLoading(true); //리퀘스트시 로딩 켜기
    
    const present = new Date();
    const expire = new Date(localStorage.getItem("refresh_expired")!);
    if(present.getTime() >= expire.getTime()){
      localStorage.removeItem("refresh_token");
    }
    const accessToken = localStorage.getItem("access_token");    
    if (accessToken) {
      config.headers = {
        Authorization: accessToken,
      };
    } 
    return config;
  }
  const requestInterceptor = axiosConfig.interceptors.request.use(requestHandler);

  const responseHandler = (response:AxiosResponse)=>{
    setLoading(false); //응답 후 로딩 끄기
    // console.log("인터셉트 응답:" + response);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const refreshExpired = response.data.refreshTokenExpirationMinutes;
    const accessExpired = response.data.accessTokenExpirationMinutes;

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("refresh_expired", refreshExpired);
      localStorage.setItem("access_expired", accessExpired);
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