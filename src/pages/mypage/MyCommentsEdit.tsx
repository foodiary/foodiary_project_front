import React, { useState } from 'react';
import styles from '@styles/mypage/myCommentsEdit.module.scss';
import Header from '@components/common/Header/Header';
import { LoginButton } from '@components/common/LoginButton/Button';

const MyCommentsEdit = () => {
  const value = "기존에 있던 댓글 내용~~"
  const [msgLength, setMsgLength] = useState(0);
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
    setMsgLength(value.length);
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
      <div className={styles.btn}>
        <LoginButton text='등록' type='button' active={true}/>
      </div>
    </div>
  );
};

export default MyCommentsEdit;