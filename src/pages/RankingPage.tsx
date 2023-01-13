import React, { useEffect } from 'react';
import styles from '@styles/rankingPage.module.scss';
import { MediumCard } from '@components/common/Card';
import { Link } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import { useState } from 'react';

const RankingPage = () => {
  const [rankingList, setRankingList] = useState([]);
  const [month, setMonth] = useState(true);
  let url = "";
  const getRankList = ()=>{
    if(month){
      url = '/rank/month';
    }
    else{
      url = '/rank/week';
    }
    axiosConfig.get(url).then(res=>{
      console.log(res);
      setRankingList(res.data);
    }).catch(err=>{
      console.log(err);
    })
  }
  
  useEffect(()=>{
    getRankList();
  },[]);
  
  return (
    <div className={styles.ranking}>
      <h3>랭킹</h3>
      <div className={styles.card_container}>
        <Link to="/detail">  {/**글 상세보기로 넘어가기*/}
          <MediumCard 
            tag='top 20' 
            title='이야 타이틀' 
            userId='배고파'
            info={true}
            like={2}
            scrap={5}/>
          </Link>
        <MediumCard 
          tag='top 20' 
          title='이야 탙' 
          userId='이런'
          info={true}
          />
      </div>
    </div>
  );
};

export default RankingPage;