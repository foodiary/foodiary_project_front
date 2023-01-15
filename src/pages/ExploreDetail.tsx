import { LargeCard } from '@components/common/Card';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from "../styles/explorePage.module.scss";
import {GoSearch} from 'react-icons/go';

interface ResType{
  dailyCreate: string;
  dailyId: number;
  dailyPath: string;
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
      <div className={styles.titleDiv}>
        <h3 className={styles.activeTitle}>
          하루식단
        </h3>
        <Link to="/search"><GoSearch/></Link>
      </div>
      <div className={styles.card_container}>
        {list.map((item:ResType)=>{
          return(
            <Link to= {`/writing/details/${item.dailyId}`} key={item.dailyId}>
              <div className={styles.card}>
                <LargeCard 
                  img={item.dailyPath} 
                  info={true}
                  title={item.dailyTitle}
                  like={item.dailyLike}
                  scrap={item.dailyView}
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