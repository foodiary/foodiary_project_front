import React, { useState } from 'react';
import styles from '@styles/mypage/myComments.module.scss';
import Header from '@components/common/Header/Header';
import { Link } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';
import WritingLink from '@components/common/WritingLink/WritingLink';

const Notice = () => {
  const [day, setDay] = useState(true);
  return (
    <div className={styles.mycomments}>
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
      <div className={styles.board}>
        <WritingLink url="/mypage/mycomments/detail" text1='다이어터인데 불닭볶ㅇ면ㅁ?!' text2='오늘 다이어터 하루 식단 구경하세용'/>      
        <WritingLink url="/mypage/mycomments/detail" text1='헐 맛집이 문닫아서 슬프시겠어욤,,,,,,,,,,,,,,,,' text2='저희 집 근처 곱창집 마지막 식사입니다....'/>      
        <WritingLink url="/mypage/mycomments/detail" text1='아보카도 맛있나요? 아무맛도 안나던데' text2='아보카도 팡인의 하루식단!'/>      
        <WritingLink url="/mypage/mycomments/detail" text1='와 그냥 금손이신거같아요 진짜 카페 음식이라고 해...' text2='인스타 맛집st 오픈 샌드위치 만들었어요!'/>      
        <WritingLink url="/mypage/mycomments/detail" text1='ㅎㅎㅎ그래요?' text2='제발 돼라...'/>      
        </div>
    </div>
  );
};

export default Notice;