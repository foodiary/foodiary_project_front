import { useErrorStore } from '@store/errorStore';
import { useLoadingStore } from '@store/loadingStore';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '@utils/axiosConfig';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useUpdateUser } from './useUpdateUser';

export const useAxiosInterceptor = ()=>{
  const setLoading = useLoadingStore(state=>state.setLoading);
  const reset = useLoginUserStore(state=>state.reset);

  // const [year, setYear] = useState(false);
  // const [month, setMonth] = useState(false);
  // const [day, setDay] = useState(false);
  // const [hours, setHours] = useState(false);

  // const timeDifference = (present: Date, expire: Date)=>{
  //   console.log(present, expire);

  //   if(present.getFullYear() === expire.getFullYear()){
  //     setYear(true);
  //   }
  //   if(present.getMonth() === expire.getMonth()){
  //     setMonth(true);
  //   }
  //   if(present.getDay() === expire.getDay()){
  //     setDay(true);
  //   }
  //   if(present.getHours() === expire.getHours()){
  //     setHours(true);
  //   }
  // }
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
  // }

  const errorHandler = async(err:AxiosError)=>{ //res에서 넘어온 에러
    setLoading(false);
    console.log(err);
    const refreshToken = localStorage.getItem("refresh_token");
    if(!refreshToken){
      console.log('자동로그아웃');
      localStorage.clear();
      window.location.reload();
      return;
    }

    else{
      const config = err.config;
      console.log(`인터셉트 에러: ${err}`);
      // console.log(`에러: ${err.response?.data.status}`); //UNAUTHORIZED

      //액세스토큰 만료 시
      // if (err.response?.data.status === "UNAUTHORIZED") {
        if (err.response?.status === 401) {
        console.log('액세스 만료')
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

      if (accessToken) {
        localStorage.removeItem("access_token");
        // reset();
      }
      // if(!refreshToken){
      //   return;
      // }

      try {
        console.log('리프레시')
        // console.log(`${process.env.REACT_APP_API_URL}`);

        // const res = await getRefresh();
        const headers = { Refresh: `${refreshToken}` };

        await axiosConfig.get(`/auth/reissue`, { headers })
        .then(res=>{
          console.log(res);
          const data = res.data;
          const newAccessToken = data.accessToken;
          if(newAccessToken){
            console.log('뉴액세스토큰받았다')
            config!.headers = {
              Authorization: `${newAccessToken}`,
            };
            localStorage.setItem("access_token", newAccessToken);
            window.location.reload();
          }
        }).catch(err=>{
          console.log(err);
          return Promise.reject(err);
        })
        // const res = await axiosConfig.get(`/auth/reissue`, { headers }); //refresh로 access 토큰 재발급
        // const data = res.data;
        // console.log(res); //응답일수도 에러일수도
       
        // const newAccessToken = data.accessToken;
        // if(newAccessToken){
        //   console.log('뉴액세스토큰받았다')
        //   config!.headers = {
        //     Authorization: `${newAccessToken}`,
        //   };
        // }
        

        // localStorage.setItem("access_token", newAccessToken);
        // localStorage.setItem("refresh_token", newRefreshToken);
        return await axiosConfig(config!);

      } catch (err) {
        return Promise.reject(err);
      }
    }
    }
    // return Promise.reject(err);
    return err;
  }

  const requestHandler = (config:AxiosRequestConfig)=>{
    // console.log(config);
    setLoading(true); //리퀘스트시 로딩 켜기

    const present = new Date();
    const expire = new Date(localStorage.getItem("refresh_expired")!);
    if(present === expire){
      localStorage.removeItem("refresh_token");
    }

    const accessToken = localStorage.getItem("access_token");    
    if (accessToken) {
      config.headers = {
        Authorization: accessToken,
      };
    }

    // const present = new Date();
    // const refreshExpired = new Date(localStorage.getItem("refresh_expired")!);

    // try{
    //   if(refreshExpired){
    //     timeDifference(present, refreshExpired);
    //   }
    //   if(year && month && day && hours){
    //     if((refreshExpired.getMinutes()-present.getMinutes()) === 1){
    //       console.log('리프레시 1분 남음');
    //       getRefresh();
    //     }
    //   }
    // }catch(err){
    //   console.log(err);
    // }

    
    return config;
  }
  const requestInterceptor = axiosConfig.interceptors.request.use(requestHandler);

  const responseHandler = (response:AxiosResponse)=>{
    setLoading(false); //응답 후 로딩 끄기

    // console.log("인터셉트 응답:" + response);

    const accessToken = response.data.accessToken;
    const accessExpired = response.data.accessTokenExpirationMinutes;
    const refreshToken = response.data.refreshToken;
    const refreshExpired = response.data.refreshTokenExpirationMinutes;

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
    (err) => {errorHandler(err); console.log(err)},
  );

  useEffect(() => {
    return () => {
      axiosConfig.interceptors.request.eject(requestInterceptor); // eject는 제거라는 뜻
      axiosConfig.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);
}