import { useLoadingStore } from '@store/loadingStore';
import axiosConfig from '@utils/axiosConfig';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect } from 'react';
export const useAxiosInterceptor = ()=>{
  const setLoading = useLoadingStore(state=>state.setLoading);

  const errorHandler = async(err:AxiosError<any, any>)=>{ //res에서 넘어온 에러
    setLoading(false);

    const config = err.config;
    console.log(`인터셉트 에러: ${err}`);
    const refreshToken = localStorage.getItem("refresh_token");

    //액세스토큰 만료 시
    if (err.response?.status === 401 && config?.url !== '/auth/reissue') {
      console.log('401임')
      // const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      let newAccessToken = "";
      if(!refreshToken){
        return Promise.reject(err);
      }

      try {
        console.log('리프레시');
        const headers = { Refresh: `${refreshToken}` };
        await axios.get(`${process.env.REACT_APP_API_URL}/auth/reissue`, { headers })
        .then(res=>{
          console.log(res);
          const data = res.data;
          const newAccessToken = data.accessToken;
          const newRefreshToken = data.refreshToken;
          const refreshExpired = data.refreshTokenExpirationMinutes;
          const accessExpired = data.accessTokenExpirationMinutes;

          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("refresh_token", newRefreshToken);
          localStorage.setItem("refresh_expired", refreshExpired);
          localStorage.setItem("access_expired", accessExpired);

          if(newAccessToken){
            console.log('뉴액세스토큰받았다')
            config!.headers = {
              Authorization: `${newAccessToken}`,
            };
          }
          
        }).catch(err=>{
          console.log(err);
          console.log('자동로그아웃');
          localStorage.clear();
          window.location.reload();
        })
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