import React, { useState } from 'react';
import styles from '@styles/mypage/myComments.module.scss';
import Header from '@components/common/Header';

const MyComments = () => {
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
        <div className={styles.comment}>
          <p>다이어터인데 불닭볶ㅇ면ㅁ?!</p>
          <p>오늘 다이어터 하루 식단 구경하세용</p>
        </div>
        <div className={styles.comment}>
          <p>헐 맛집이 문닫아서 슬프시겠어욤,,,,,,,,,,,,,,,,</p>
          <p>저희 집 근처 곱창집 마지막 식사입니다....</p>
        </div>
        <div className={styles.comment}>
          <p>아보카도 맛있나요? 아무맛도 안나던데</p>
          <p>아보카도 팡인의 하루식단!</p>
        </div>
        <div className={styles.comment}>
          <p>와 그냥 금손이신거같아요 진짜 카페 음식이라고 해...</p>
          <p>인스타 맛집st 오픈 샌드위치 만들었어요!</p>
        </div>
        <div className={styles.comment}>
          <p>계란후라이 올라간 간짜장</p>
          <p>오늘 점메추 부탁드려요~~</p>
        </div>
        <div className={styles.comment}>
          <p>치킨 is 언제든</p>
          <p>지금 치킨 먹는거 추천? 비추천?</p>
        </div>
        <div className={styles.comment}>
          <p>혜자 도시락 추천드립니다</p>
          <p>저 오늘 편의점에서 먹어야하는데 뭐 먹을까요ㅠㅠ</p>
        </div>
      </div>
    </div>
  );
};

export default MyComments;