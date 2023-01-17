import { LargeCard } from '@components/common/Card';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from "../styles/explorePage.module.scss";
import {GoSearch} from 'react-icons/go';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import {BiCommentDetail} from 'react-icons/bi';

interface ResType{
  dailyCreate: string;
  dailyId: number;
  dailyPath1: string;
  dailyTitle: string;
  dailyView: number;
  dailyLike: number;
  dailyWriter: string | null;
}

const ExploreDetail = () => {
  const {state} = useLocation();
  const [list, setList] = useState([]);
  useEffect(()=>{
    setList(state.list);
  },[]);

  return (
    <div className={styles.questWrapper}>
      <section className={styles.title}>
        <div className={styles.title_div}>
          <DecoTitle title="하루식단"/>
        </div>
        <Link to="/search" className={styles.search_icon}>
          <GoSearch/>
        </Link>
      </section>

      <div className={styles.card_container}>
        {list.map((item:ResType)=>{
          return(
            <Link to= {`/detail/${item.dailyId}`} key={item.dailyId}>
              <div className={styles.card}>
                <LargeCard 
                  img={item.dailyPath1} 
                  info={true}
                  title={item.dailyTitle}
                  content={"내용내용내용내용내용"}
                  like={item.dailyLike}
                  view = {item.dailyView}
                  userId={"푸디어리"}/>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default ExploreDetail;