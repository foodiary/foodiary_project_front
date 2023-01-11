import Input from '@components/common/Input/Input';
import { DuplicateCheckBtn, LoginButton } from '@components/common/LoginButton/Button';
import React, { FormEvent, useState } from 'react';
import styles from '@styles/mypage/modifyInfo.module.scss';
// import styles from '@styles/loginpage/signUp.module.scss';
import { DuplicationText, Intro } from '@components/common/Text/SignUpPageText';
import { useUserStore } from '@store/userStore';
import { useNavigate } from 'react-router-dom';
import duplicateCheck from '../../../core/apis/utils/duplicateCheck';

const ModifyNickName = () => {
  const navigate = useNavigate();
  const nickName = useUserStore(state=>state.nickName);
  // const newNickName = useUserStore(state=>state.newNickName);
  const setNewNickName = useUserStore(state=>state.setNewNickName);
  const validationErr = useUserStore((state)=>state.validationErr);
  const [next, setNext] = useState(true);
  const [err, setErr] = useState(false);

  const onClick = ()=>{
    navigate(-1);
    setNewNickName(nickName);
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    duplicateCheck.post("/member/check/nickname", {
      nickName: nickName,
    }).then(res=>{
      console.log(res);
      // if(res === undefined){
      //   setErr(true);
      // }
      if(res){
        setErr(false);
        setNext(true);
      }
      //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    }).catch(err=>{
      if(err.response.data.msg === "닉네임이 중복입니다"){
        setErr(true);
      }
      console.log(err);
    })
    console.log(`닉네임: ${nickName}`);
  }
  return (
    <div className={styles.modify_container}>
      <Intro intro1={""} span={"닉네임 변경"} intro2={""}/>
      {/* <div className={styles.nickname_input}> */}
        {/* <Input label='새 닉네임' id='nickname' type='text' placeholder='새 닉네임을 입력해주세요'/> */}
        <form onSubmit={onSubmit} className={styles.input_container}>
            <Input 
              id={"nickname"} 
              type={"text"} 
              label={"새 닉네임"} 
              placeholder={"변경할 닉네임을 입력해주세요"}
              text={'한글/영어/숫자로 2자리 이상 16자리 이하'}
            />
            <DuplicateCheckBtn active={!validationErr?true:false}/> 

          </form>
      {/* </div> */}
      {err && <DuplicationText text='중복 닉네임입니다. 닉네임을 수정해주세요'/>}
      <div onClick={onClick} className={styles.confirm_btn}>
        <LoginButton text='확인' type='button' active={next? true: false} url="/mypage/setting"/>
      </div>
    </div>
  );
};

export default ModifyNickName;