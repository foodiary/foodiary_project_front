import { useState } from "react"
import axiosConfig from '@utils/axiosConfig';
import { useLoginUserStore } from "@store/loginUserStore";
import { AxiosRequestConfig } from "axios";

interface PropsType{
  method: string;
  url: string;
  // foodId: number;
  data: object;
}
export const useDebounce = ({data, url, method}:PropsType)=>{
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  // const [state, setState] = useState(false); //상태변경
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);

  const onChange = async()=>{
    // setState(prev=>!prev); //상태를 이전상태로 변경
    if(timer){
      console.log('타이머 클리어');
      clearTimeout(timer);
    }
  
    const newTimer = setTimeout(async()=>{
      try{
        await axiosConfig({
          method: method, //url, method는 prop으로 받기
          url: url,
          data: data,
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
      }catch(err){
        console.log(err);
      }
    }, 2000);  //800
    setTimer(newTimer);
  };

  return onChange;
}