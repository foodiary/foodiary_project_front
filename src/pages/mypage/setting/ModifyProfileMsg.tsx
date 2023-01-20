import Input from '@components/common/Input/Input';
import { LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@styles/mypage/modifyInfo.module.scss';
import { Intro } from '@components/common/Text/SignUpPageText';
import { useLoginUserStore } from '@store/loginUserStore';

const ModifyProfileMsg = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [msgLength, setMsgLength] = useState(0);

  const newNickName = useUserStore(state=>state.newNickName);
  const newProfileMsg = useUserStore((state)=>state.newProfileMsg);
  const setNewProfileMsg = useUserStore((state)=>state.setNewProfileMsg);
  const memberProfile = useLoginUserStore(state=>state.userInfo.memberProfile);

  useEffect(()=>{
    if(newProfileMsg){
      setValue(newProfileMsg);
    }
    else{
      setValue(memberProfile);
    }
  },[]);

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
    setValue(value);
    setNewProfileMsg(value);
    setMsgLength(value.length);  
  }
  const onClick = ()=>{
    setNewProfileMsg(value);
    // navigate("/mypage/setting",{state: {newMsg: value}} );
    navigate("/mypage/setting", {state: {msg: newProfileMsg, nickname: newNickName}});

  }
  return (
    <div className={styles.modify_container}>
      <Intro intro1={""} span={"프로필메세지 변경"} intro2={""}/>
      <div className={styles.msg_input}>
        <p className={styles.label}>새 프로필메세지</p>
        <textarea maxLength={100} 
          placeholder="새 프로필메세지를 입력해주세요"
          value={value}
          onChange={onChange}/>
        <p className={styles.msg_length}>{msgLength}/100</p>

      </div>
      {/* <p className={styles.msg_length}>{msgLength}/100</p> */}

      <div onClick={onClick} className={styles.confirm_btn}>
        <LoginButton text='확인' type='button' active={msgLength > 0?true:false}/>
      </div>
    </div>
  );
};

export default ModifyProfileMsg;