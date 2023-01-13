import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/myGood.module.scss';
import Header from '@components/common/Header/Header';
import EmptyText from '@components/common/Text/EmptyText';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import { SmallCard } from '@components/common/Card';
import { Link } from 'react-router-dom';

interface ResType{
  dailyId: 0;
  dailyPath: string;
}

const MyScrap = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const [scrapList, setScrapList] = useState([]);
  const page = 1;

  useEffect(()=>{
    axiosConfig.get(`/member/scrap/daily/${memberId}`,{
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
        {scrapList.length > 0 ? scrapList.map((item:ResType)=>{
          return(
            <Link to="/daily/detail" className={styles.card}>
              <SmallCard img={item.dailyPath}/>
            </Link>          
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