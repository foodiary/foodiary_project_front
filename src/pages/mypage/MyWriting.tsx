import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/myWriting.module.scss';
import Header from '@components/common/Header/Header';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import EmptyText from '@components/common/Text/EmptyText';
import { LargeCard, MediumCard, SmallCard } from '@components/common/Card';
import { Link } from 'react-router-dom';

interface WritingRes{
  dailyPath?: string; //이미지
  dailyId?: number; //글 아이디
  recipeId?: number;
  recipePath?: string | null;
}
const MyWriting = () => {
  const [day, setDay] = useState(true);
  const [writingList, setWritingList] = useState([]);
  const page = 1;
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  let url = '';
  // const navigate = 

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
  // const onClick = ()=>{
  //   navigat
  //   /dailys/datils parmas dailyId
  // }
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
        {writingList.length > 0 ? writingList.map((item:WritingRes)=>{
          let url = ''
          if(day){
            url = `/mypage/daily/details/${item.dailyId}`
          }
          else{ url = `/mypage/recipe/details/${item.recipeId}`}
          return(
            <Link to={url} 
              key={item.dailyId} 
              className={styles.card}>
              <SmallCard img={item.dailyPath}/>
            </Link>
          )
        }): 
            <EmptyText text='내가 작성한 글이 없습니다.'/>
        }
      </div>
      
    </div>
      // {/* 게시판 완성 후 가져오기 */}
  );
};

export default MyWriting;