import Input from '@components/common/Input/Input';
import { LoginButton } from '@components/common/LoginButton/Button';
import React from 'react';

const ModifyNickName = () => {
  return (
    <div>
      <p>닉네임 변경</p>
      <Input label='새 닉네임' id='nickname' type='text' placeholder='새 닉네임을 입력해주세요'/>
      <LoginButton text='확인' type='button'/>
    </div>
  );
};

export default ModifyNickName;