import Card from '@components/common/Card';
import React, { useState } from 'react';
import styles from '@styles/mypage/myWriting.module.scss';
import Header from '@components/common/Header/Header';

const MyWriting = () => {
  const [day, setDay] = useState(true);

  return (
    <div className={styles.mywriting}>
      <Header/>
      <div className={styles.tab}>
        <button 
          className={day? styles.active: styles.non_active}
          onClick={()=>{setDay(true)}}
        >
          하루 공유 
          {day && <div className={styles.text_deco}></div>}
        </button>
        <button 
          className={!day? styles.active: styles.non_active}
          onClick={()=>{setDay(false)}}
        >
          레시피 공유
          {!day && <div className={styles.text_deco}></div>}
        </button>
      </div>
      <div className={styles.card_container}>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>

        {/* <Card/> 
        <Card/> 
        <Card/> 
        <Card/>  */}
      </div>
    </div>
      // {/* 게시판 완성 후 가져오기 */}
  );
};

export default MyWriting;