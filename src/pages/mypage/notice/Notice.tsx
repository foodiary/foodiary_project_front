import React, { useEffect, useRef, useState } from 'react';
import styles from '@styles/mypage/notice.module.scss';
import { Link } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';
import { Intro } from '@components/common/Text/SignUpPageText';
import axiosConfig from '../../../core/apis/utils/axiosConfig';
import EmptyText from '@components/common/Text/EmptyText';
import WritingLink from '@components/common/WritingLink/WritingLink';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
  noticeCreate: string;
  noticeId: number;
  noticeTitle: string;
}

const Notice= () => {
  // const page = 1;
  // const [noticeList, setNoticeList] = useState([]);
  const target = useRef<HTMLDivElement>(null);
  const noticeList = useInfiniteScroll({target: target, url:'/notice'});


  // useEffect(()=>{
  //   axiosConfig.get('/notice',{
  //     params: {page: page}
  //   }).then(res=>{
  //     console.log(res);
  //     setNoticeList(res.data);
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // },[]);

  return (
    <div className={styles.notice}>
      <div className={styles.title}>
        <DecoTitle title='공지사항'/>
      </div>
      <div className={styles.board}>
        {noticeList.items.length >0 ?
          noticeList.items.map((item:ResType)=>{
            let date = item.noticeCreate.slice(4,10);
            const year = item.noticeCreate.slice(2,4);
            date = date.replaceAll("-", ".");
            const url = `/mypage/notice/detail/${item.noticeId}`;
            return(
              <WritingLink text1={item.noticeTitle} text2={year+date} 
                url={url} state={{noticeId: item.noticeId}}/>
            )}):
          <EmptyText text='등록된 공지사항이 없습니다.'/>
        }
      </div>
      {noticeList.items.length>0 &&
        <div ref={target} className={styles.scroll_target}>
          <p>마지막 페이지입니다</p>
        </div>}
    </div>
  );
};

export default Notice;