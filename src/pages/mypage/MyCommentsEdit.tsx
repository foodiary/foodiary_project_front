import React from 'react';
import styles from '@styles/mypage/myCommentsEdit.module.scss';
import Header from '@components/common/Header';
import { LoginButton } from '@components/common/Button';

const MyCommentsEdit = () => {
  return (
    <div className={styles.edit}>
      <Header/>
      <div className={styles.rewrite}>
        <textarea
          maxLength={200}
        />
        <div className={styles.word_restrict}>
          <p>16/200</p>
        </div>
      </div>
      <div className={styles.btn}>
        <LoginButton text='등록' type='button' active={true}/>
      </div>
    </div>
  );
};

export default MyCommentsEdit;