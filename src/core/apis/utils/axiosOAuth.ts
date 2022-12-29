import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: "https://84ad-211-58-204-152.jp.ngrok.io", // 백엔드 url
  headers:{
    "ngrok-skip-browser-warning": "12345",
  },
});

// instance.interceptors.request.use((req)=>{
//   return req;
// },(err)=>{  //요청 에러 캐치
//   return Promise.reject(err);
// });

// instance.interceptors.response.use((res)=>{
//   console.log("로그인 완료");
//   // localStorage.setItem("user", res.data.token);
//   console.log(res);
//   // redirect();
//   return res;
// },(err)=>{  //응답 에러 캐치
//   console.log(`에러 status는: ${err.response.status}`);
//   console.log(`에러는: ${err.response.data.error}`);
//   return Promise.reject(err);
// });

export default instance;