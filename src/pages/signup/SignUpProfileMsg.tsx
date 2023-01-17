import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { Intro } from '@components/common/Text/SignUpPageText';
import { LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import basic_profile from '@img/basic_profile.svg';
import Loading from '@pages/Loading';

const SignUpProfileMsg = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [loading, setLoading] = useState(false);

  const setProfileMsg = useUserStore((state)=>state.setProfileMsg);
  const [msgLength, setMsgLength] = useState(0);

  const {id, pwd, more_pwd, email, 
        nickName, choiceTerms, requiredTerms, 
        profileImg, profileMsg, 
        emailYn, nickNameYn, passwordYn, loginYn} = useUserStore();

  const memberInfo = {
    'loginId': id,
    'password': pwd,
    'more_password': more_pwd,
    'email': email,
    'nickName': nickName,
    'choiceTerms': choiceTerms,
    'requiredTerms': requiredTerms,
    'profile': profileMsg,
    'emailYn': emailYn,
    'nickNameYn': nickNameYn,
    'passwordYn': passwordYn,
    'loginYn': loginYn,
  }

  let formData = new FormData();
  formData.append('memberImage', profileImg);
  formData.append('memberSignUpDto', new Blob([JSON.stringify(memberInfo)], {
    type: "application/json"
    }));

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
      setProfileMsg(value);
      setMsgLength(value.length);
  }
  const onSubmit = (e:FormEvent)=>{
    console.log(memberInfo);
    const headers = {"Content-Type": "multipart/form-data"};
      e.preventDefault();
      setLoading(true);
      axiosConfig.post("/member/signup", formData ,{headers})
      .then(res=>{
        console.log(res);
        setLoading(false);
        navigate("/signup/welcome");
        //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
      }).catch(err=>{
        console.log(err);
      })
    //유저 전체 정보 전송
  }
  return (
      <div>
        <Intro span={"프로필 메세지를"} intro2={"적어주세요."}/>
        <p className={styles.omit_p}>(생략가능)</p>
        {state?
            <img alt='첨부사진' src={state} className={styles.profile}/>:

            <img alt='첨부사진' src={basic_profile} className={styles.profile}/>
        }

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

        {loading && <Loading/>}
      </div>
  );
};

export default SignUpProfileMsg;