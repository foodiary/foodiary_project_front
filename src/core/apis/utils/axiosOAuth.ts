import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const redirect = ()=>{
//   const navigate = useNavigate();
//   navigate("/");
// }
const instance = axios.create({
  baseURL: "", // 백엔드 url
  // headers:{
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
});

instance.interceptors.request.use((req)=>{
  return req;
},(err)=>{  //요청 에러 캐치
  return Promise.reject(err);
});

instance.interceptors.response.use((res)=>{
  console.log("로그인 완료");
  // localStorage.setItem("user", res.data.token);
  console.log(res);
  // redirect();
  return res;
},(err)=>{  //응답 에러 캐치
  console.log(`에러 status는: ${err.response.status}`);
  console.log(`에러는: ${err.response.data.error}`);
  return Promise.reject(err);
});

export default instance;