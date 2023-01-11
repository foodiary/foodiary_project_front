import { LoginButton } from "@components/common/LoginButton/Button";
import { useLoginUserStore } from "@store/loginUserStore";
import { useEffect } from "react";
import axiosConfig from "../core/apis/utils/axiosConfig";

const MainPage = () => {
  const userInfo = useLoginUserStore((state)=>state.userInfo);
  const setUserInfo = useLoginUserStore((state)=>state.setUserInfo);
  const {setMemberLoginId, setMemberId, setMemberEmail, setMemberNickName, setMemberPath, setMemberProfile} = useLoginUserStore();

  useEffect(()=>{
    // axiosConfig.post(`/auth/login`,
    // {loginId: 'asdf789', password: 'asdf789!'})
    // .then(res=>{
    //   console.log(`로그인: ${res}`);

    //   // navigate("/") ;
    // }).catch(err=>{
    //   console.log(err);
    // })
    axiosConfig.get(`/member/85`).then(res=>{
      // console.log(`유저받아오기: ${res.data.memberEmail}`);
      const data = res.data;
      setUserInfo(res.data);
      setMemberLoginId(data.memberLoginId);
      setMemberEmail(data.memberEmail);
      setMemberNickName(data.memberNickName);
      setMemberPath(data.memberPath);
      setMemberId(data.memberId);
      setMemberProfile(data.memberProfile);

      // navigate("/") ;
    }).catch(err=>{
      console.log(err);
    })
  },[]);
  
  return (
    <div>
      메인페이지입니다
      <LoginButton text="테스트" type="button"/>
    </div>
  );
};

export default MainPage;