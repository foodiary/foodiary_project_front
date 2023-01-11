import Input from '@components/common/Input/Input';
import { LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModifyProfileMsg = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const setProfileMsg = useUserStore((state)=>state.setProfileMsg);
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    setValue(e.target.value);
  }
  const onClick = ()=>{
    setProfileMsg(value);
    navigate(-1);
  }
  return (
    <div>
      <p>프로필메세지 변경</p>
      <p>새 프로필메세지</p>
      <textarea maxLength={100} 
        placeholder="새 프로필메세지를 입력해주세요"
        onChange={onChange}/>
      
      <div onClick={onClick}>
        <LoginButton text='확인' type='button'/>
      </div>
    </div>
  );
};

export default ModifyProfileMsg;