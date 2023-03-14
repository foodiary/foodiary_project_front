import React from 'react';
import styles from '@styles/mainTitle.module.scss';
import arrow_icon from "@img/arrow_icon.svg";
import diary from "@img/diary.png";

const MainTitle = () => {
  return (
    <>
    <div className={styles.title}>
      <p>안녕하세요, 푸디어리입니다!</p>
      <p>Foodiary</p>
      <img src={diary} className={styles.diary} alt="다이어리"/>
    </div>
    <img src={arrow_icon} className={styles.arrow_img} alt="화살표"/>
    </>
  );
};

export default MainTitle;