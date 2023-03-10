import { LargeCard } from '@components/common/Card';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from "../styles/explorePage.module.scss";
import {GoSearch} from 'react-icons/go';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { BsPencilFill } from "react-icons/bs";

interface ResType{
  dailyCreate: string;
  dailyId: number;
  dailyThumbnail: string;
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
          <DecoTitle title="하루공유"/>
        </div>
        <div className={styles.icon_box}>
          <Link to="/write" className={styles.search_icon}>
            <BsPencilFill />
          </Link>
          <Link to="/search" className={styles.search_icon}>
            <GoSearch />
          </Link>
        </div>
      </section>

      <div className={styles.card_container}>
        {list.map((item:ResType)=>{
          return(
            <Link to= {`/detail/${item.dailyId}`} key={item.dailyId}>
              <div className={styles.card}>
                <LargeCard 
                  img={item.dailyThumbnail} 
                  info={true}
                  title={item.dailyTitle}
                  like={item.dailyLike}
                  view = {item.dailyView}
                  userId={item.dailyWriter || "푸디어리"}/>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default ExploreDetail;