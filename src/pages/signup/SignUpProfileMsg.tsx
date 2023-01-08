import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Input, Intro } from '@pages/Form';
import { DuplicateCheckBtn, LoginButton } from '@components/common/Button';
import { useUserStore } from '@store/userStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';

const SignUpProfileMsg = () => {
  const navigate = useNavigate();
  const setProfileMsg = useUserStore((state)=>state.setProfileMsg);
  const [msgLength, setMsgLength] = useState(0);
  const {id, pwd, email, nickName, choiceTerms, requiredTerms, profileImg, profileMsg} = useUserStore();
  const memberInfo = {
    'loginId': id,
    'password': pwd,
    'more_password': pwd,
    'email': email,
    'nickName': nickName,
    'choiceTerms': choiceTerms,
    'requiredTerms': requiredTerms,
    'profile': profileMsg,
  }

  let formData = new FormData();
  formData.append('memberImage', "");
  formData.append('memberSignUpDto', new Blob([JSON.stringify(memberInfo)], {
    type: "application/json"
    }));

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
      setProfileMsg(value);
      setMsgLength(value.length);
  }
  const onSubmit = (e:FormEvent)=>{
    const headers = {"Content-Type": "multipart/form-data"};
      e.preventDefault();
      axiosConfig.post("/member/signup", formData ,{headers})
      .then(res=>{
        console.log(res);
        if(res === undefined){
          return;
        }
        else{
          navigate("/login");
        }
        console.log("가입 완료");
        // navigate("/login");
        //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
      }).catch(err=>{
        console.log(err);
      })
      console.log(`닉네임: ${nickName}`);
      // axiosConfig.interceptors.request.use((config)=>{
      //   config.headers = {
      //     "Content-Type": "multipart/form-data"
      //   };
      //   return config;
      // })
    //유저 전체 정보 전송
  }
  return (
      <div className={styles.login_container}>
        <Intro span={"프로필 메세지를"} intro2={"적어주세요."}/>
        <p className={styles.omit_p}>(생략가능)</p>
        <div className={styles.profile}></div>

        <div className={styles.msg_container}>
          <p>프로필 메세지</p>
          <textarea 
            placeholder='프로필 메세지를 입력해주세요' 
            maxLength={100}
            onChange={onChange}>      
          </textarea>
          <p className={styles.msg_length}>{msgLength}/100</p>
        </div>
          <form onSubmit={onSubmit}>
            <LoginButton type="submit" text='완료' active={true}/>
          </form>
        </div>
  );
};

export default SignUpProfileMsg;