import React, { useEffect } from 'react';
import styles from '@styles/rankingPage.module.scss';
import { MediumCard, SmallCard } from '@components/common/Card';
import { Link } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import { useState } from 'react';
import { ButtonComp, buttonStyled } from '@components/common';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import EmptyText from '@components/common/Text/EmptyText';

interface ResType{
  recipeComment: number
  recipeId: number; 
  recipeLike: number;
  recipePath1: string;
  recipeTitle: string;
  recipeView: number;
  recipeWriter: string;
}
// 레시피 -> 데일리로 변경하기

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
  },[month]);
  
  return (
    <div className={styles.ranking}>
      <DecoTitle title='랭킹'/>

      <div className={styles.tab}>
          <ButtonComp
           text={"1달"}
           btnStyle={month? buttonStyled.buttonActive: buttonStyled.button}
           onClick={()=>setMonth(true)}
          />
          <ButtonComp
            text={"1주"}
            btnStyle={month? buttonStyled.button: buttonStyled.buttonActive}
            onClick={()=>setMonth(false)}
          />
      </div>

      <div className={styles.card_container}>
        {rankingList.length > 0?
          rankingList.map((item:ResType)=>{
            return(
              <Link to={`/detail/${item.recipeId}`}> 
                <SmallCard img={item.recipePath1}/>
              </Link>
            )
          }):
          <EmptyText text='랭킹이 없습니다'/>
        }

      
      </div>
    </div>
  );
};

export default RankingPage;