import React, { FormEvent, useEffect, useState } from 'react';
import styles from '@styles/mypage/myCommentsEdit.module.scss';
import Header from '@components/common/Header/Header';
import { LoginButton } from '@components/common/LoginButton/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import { AlertBox } from '@components/common/AlertBox/AlertBox';

const MyCommentsEdit = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [alert, setAlert] = useState(false);
  const memberId = 76;

  useEffect(()=>{
    setValue(state.content);
  },[]);

  const [msgLength, setMsgLength] = useState(0);
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
    setValue(value);
    setMsgLength(value.length);
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    console.log("등록"); //응답 후 이전페이지이동
    axiosConfig.patch(`/daily/comment/${state.dailyId}/${memberId}/${state.commentId}`)
    .then(res=>{
      console.log(res);
      setAlert(true);
      setTimeout(()=>navigate(-1),2000);
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className={styles.edit}>
      <div className={styles.rewrite}>
        <textarea
          value={value}
          maxLength={200}
          onChange={onChange}
          placeholder="댓글을 수정해보세요"
        />
        <div className={styles.word_restrict}>
          <p>{msgLength}/200</p>
        </div>
      </div>
      <form className={styles.btn} onSubmit={onSubmit}>
        <LoginButton text='등록' type='submit' active={true}/>
      </form>
      {alert&&<AlertBox text='댓글이 수정되었습니다.' type={true}/>}
    </div>
  );
};

export default MyCommentsEdit;