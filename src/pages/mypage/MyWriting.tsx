import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/myWriting.module.scss';
import Header from '@components/common/Header/Header';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import EmptyText from '@components/common/Text/EmptyText';
import { LargeCard, MediumCard, SmallCard } from '@components/common/Card';
import { Link } from 'react-router-dom';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';

interface WritingRes{
  dailyPath1?: string; //이미지
  dailyId?: number; //글 아이디
}
const MyWriting = () => {
  const [writingList, setWritingList] = useState([]);
  const page = 1;
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  // const memberId = 76;

  useEffect(()=>{
    const url = `/member/post/daily/${memberId}`;

    axiosConfig.get(url, {
      params: {page: page}
    }).then(res=>{
      console.log(res);
      setWritingList(res.data);
    }).catch(err=>{
      console.log(err);
    });

  },[]);
 
  return (
    <div className={styles.mywriting}>
      <div className={styles.title}>
        <DecoTitle title='하루 식단'/>
      </div>
      <div className={styles.card_container}>
        {writingList.length > 0 ? writingList.map((item:WritingRes)=>{
          const url = `/detail/${item.dailyId}`;
          return(
            <Link to={url} 
              key={item.dailyId} 
              className={styles.card}>
              <SmallCard img={item.dailyPath1}/>
            </Link>
          )
        }): 
            <EmptyText text='내가 작성한 글이 없습니다.'/>
        }
      </div>
      
    </div>
  );
};

export default MyWriting;