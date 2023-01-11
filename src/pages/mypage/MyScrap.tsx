import Card from '@components/common/Card';
import React, { useState } from 'react';
import styles from '@styles/mypage/myGood.module.scss';
import Header from '@components/common/Header/Header';

const MyScrap = () => {

  return (
    <div className={styles.mywriting}>
      <Header/>
      <p className={styles.good}>내 스크랩
        <div className={styles.text_deco}></div>
      </p>
        {/* <button className={`${styles.active} ${styles.good}`}>좋아요 글
          <div className={styles.text_deco}></div>
        </button> */}

      <div className={styles.card_container}>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        {/* <p className={styles.empty}>내가 스크랩 한 글이 없습니다.</p> */}
      </div>
    </div>
      // {/* 게시판 완성 후 가져오기 */}
  );
};

export default MyScrap;