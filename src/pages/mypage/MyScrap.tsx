import Card from '@components/common/Card';
import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/myGood.module.scss';
import Header from '@components/common/Header/Header';
import EmptyText from '@components/common/Text/EmptyText';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
const MyScrap = () => {
  const memberId = useLoginUserStore(state=>state.memberId);
  const [scrapList, setScrapList] = useState([]);
  const page = 1;

  useEffect(()=>{
    axiosConfig.get(`/member/scrap/${memberId}`,{
      params: {page: page}
    }).then(res=>{
      console.log(res);
      setScrapList(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  return (
    <div className={styles.mywriting}>
      <p className={styles.good}>내 스크랩
        <div className={styles.text_deco}></div>
      </p>

      <div className={styles.card_container}>
        {scrapList.length > 0 ? scrapList.map(item=>{
          return(
            <div className={styles.card}><Card/></div>
          )
        }):
            <EmptyText text='내가 스크랩한 글이 없습니다.'/>
        }
      </div>
    </div>
      // {/* 게시판 완성 후 가져오기 */}
  );
};

export default MyScrap;