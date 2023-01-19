import axiosConfig from '@utils/axiosConfig';
import { useState } from 'react';

export const useAxiosInterceptor = ()=>{
  const [err, setErr] = useState(false);
  const errorHandler = (err:string)=>{
    console.log(err);
    setErr(true); // 알럿박스를 어떻게 보여줄지...?
  }
  const requestHandler = (res:string)=>{
    console.log(res);
    return res;
  }
}