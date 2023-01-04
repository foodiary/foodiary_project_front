import Card from '@components/common/Card';
import React from 'react';
import styles from '@styles/mypage/myWriting.module.scss';

const MyWriting = () => {
  return (
    <div className={styles.mywriting}>
      <Card/> 
      {/* 게시판 완성 후 가져오기 */}
    </div>
  );
};

export default MyWriting;