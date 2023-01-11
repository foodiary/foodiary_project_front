import Card from '@components/common/Card';
import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/myGood.module.scss';
import Header from '@components/common/Header/Header';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';

const MyGood = () => {
  const memberId = useLoginUserStore(state=>state.memberId);
  const [likeList, setLikeList] = useState([]);
  const page = 1;

  useEffect(()=>{
    axiosConfig.get(`/member/like/${memberId}`,{
      params: {page: page}
    }).then(res=>{
      console.log(res);
      setLikeList(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  return (
    <div className={styles.mywriting}>
      <p className={styles.good}>좋아요 글 
        <div className={styles.text_deco}></div>
      </p>

      <div className={styles.card_container}>
        {likeList.length > 0 ? likeList.map(item=>{
          return(
            <div className={styles.card}><Card/></div>
          )
        }):
            <EmptyText text='내가 좋아요한 글이 없습니다.'/>
        }
      </div>
    </div>
      // {/* 게시판 완성 후 가져오기 */}
  );
};

export default MyGood;