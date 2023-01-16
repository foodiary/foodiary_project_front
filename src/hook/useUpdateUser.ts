import { useLoginUserStore } from '@store/loginUserStore';
import { useUserStore } from '@store/userStore';
import axiosConfig from '@utils/axiosConfig';
import { useEffect } from 'react';

// type Id = {memberId: number};

export const useUpdateUser = ()=>{
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  console.log(memberId);
  const setUserInfo = useLoginUserStore(state=>state.setUserInfo);

  useEffect(()=>{
    if(memberId !== 0){
      axiosConfig.get(`/member/${memberId}`)
      .then(res=>{
        setUserInfo(res.data);
      }).catch(err=>{
        console.log(`업뎃유저에서: ${err}`);
      })
    }

  },[]);
  
  return;
}