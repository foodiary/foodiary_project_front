import { useLoginUserStore } from '@store/loginUserStore';
import { useUserStore } from '@store/userStore';
import axiosConfig from '@utils/axiosConfig';
import { useEffect } from 'react';

// type Id = {memberId: number};

export const useUpdateUser = ()=>{
  const token = localStorage.getItem("access_token");
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const setUserInfo = useLoginUserStore(state=>state.setUserInfo);

  useEffect(()=>{
    if(token){
      if(memberId !== 0){
        axiosConfig.get(`/member/${memberId}`)
        .then(res=>{
          setUserInfo(res.data);
        }).catch(err=>{
          console.log(`업뎃유저에서: ${err}`);
        })
      }
    }
    else{
      return
    }
    //  if(token){
    //   axiosConfig.get(`/member/${memberId}`)
    //   .then(res=>{
    //     setUserInfo(res.data);
    //   }).catch(err=>{
    //     console.log(`업뎃유저에서: ${err}`);
    //   })
    // }

  },[memberId, token]);
  
  return;
}