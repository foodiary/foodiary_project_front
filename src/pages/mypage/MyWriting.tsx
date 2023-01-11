import Card from '@components/common/Card';
import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/myWriting.module.scss';
import Header from '@components/common/Header/Header';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import EmptyText from '@components/common/Text/EmptyText';

const MyWriting = () => {
  const [day, setDay] = useState(true);
  const [writingList, setWritingList] = useState([]);
  const page = 1;
  const memberId = useLoginUserStore(state=>state.memberId);
  let url = '';
  useEffect(()=>{
    if(day){
      url = `/member/post/daily/${memberId}`
    }
    else{
      url = `/member/post/recipe/${memberId}`
    }
    axiosConfig.get(url, {
      params: {page: page}
    }).then(res=>{
      console.log(res);
      setWritingList(res.data);
    }).catch(err=>{
      console.log(err);
    });

  },[day]);

  return (
    <div className={styles.mywriting}>
      <div className={styles.tab}>
        <button 
          className={day? styles.active: styles.non_active}
          onClick={()=>{setDay(true)}}
        >
          하루 식단
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
        {writingList.length > 0 ? writingList.map(item=>{
          return(
            <div className={styles.card}><Card/></div>
          )
        }):
          // <div className={styles.empty}>
            <EmptyText text='내가 작성한 글이 없습니다.'/>
          // </div>
        }
        {/* <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div>
        <div><Card/></div> */}


      
      </div>
    </div>
      // {/* 게시판 완성 후 가져오기 */}
  );
};

export default MyWriting;