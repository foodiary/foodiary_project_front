import { LoginButton } from "@components/common/LoginButton/Button";
import { useLoginUserStore } from "@store/loginUserStore";
import { useCallback, useEffect } from "react";
import axiosConfig from "../core/apis/utils/axiosConfig";
import Loading from "./Loading";

const MainPage = () => {
  const token = localStorage.getItem("access_token");

  const userInfo = useLoginUserStore((state)=>state.userInfo);
  const setUserInfo = useLoginUserStore((state)=>state.setUserInfo);
  const memberId = useLoginUserStore((state)=>state.userInfo.memberId);
  // const memberId = 76; //미주님 아이디
  // const userInfo = {id: 1, name: "MIjin", age: 15};

  // useEffect(()=>{
  //   axiosConfig.get('/member/76').then(res=>{
  //     console.log(res);
  //     setUserInfo(res.data);
  //     // navigate("/") ;
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // },[]);

  // console.log(userInfo);
  // const {setMemberLoginId, setMemberId, setMemberEmail, setMemberNickName, setMemberPath, setMemberProfile} = useLoginUserStore();

  // const getMemberInfo = useCallback(()=>{
  //   if(token){
  //     axiosConfig.get(`/member/${memberId}`).then(res=>{
  //     // console.log(`유저받아오기: ${res.data.memberEmail}`);
  //     const data = res.data;
  //     setUserInfo(data);
  //     // setMemberLoginId(data.memberLoginId);
  //     // setMemberEmail(data.memberEmail);
  //     // setMemberNickName(data.memberNickName);
  //     // setMemberPath(data.memberPath);
  //     // setMemberId(data.memberId);
  //     // setMemberProfile(data.memberProfile);

  //     // navigate("/") ;
  //   }).catch(err=>{
  //     console.log(err);
  //   })}

  // },[token]);
  // //로그인후로 바꿔야 함
  // useEffect(()=>{
  //   getMemberInfo();
  // },[]);

  return (
    <div>
      메인페이지입니다
    </div>
  );
};

export default MainPage;