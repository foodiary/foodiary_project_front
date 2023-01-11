import React, { FormEvent, useEffect, useState } from 'react';
import styles from '@styles/mypage/myCommentsEdit.module.scss';
import Header from '@components/common/Header/Header';
import { LoginButton } from '@components/common/LoginButton/Button';

const MyCommentsEdit = () => {
  const [value, setValue] = useState("");
  // const value = "기존에 있던 댓글 내용~~"

  useEffect(()=>{
    setValue("기존내용아아");
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
  }
  return (
    <div className={styles.edit}>
      <Header/>
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
    </div>
  );
};

export default MyCommentsEdit;