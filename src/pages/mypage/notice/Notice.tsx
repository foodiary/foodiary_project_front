import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/notice.module.scss';
import { Link } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';
import { Intro } from '@components/common/Text/SignUpPageText';
import axiosConfig from '../../../core/apis/utils/axiosConfig';
import EmptyText from '@components/common/Text/EmptyText';
import WritingLink from '@components/common/WritingLink/WritingLink';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';

interface ResType{
  noticeCreate: string;
  noticeId: number;
  noticeTitle: string;
}

const Notice= () => {
  const page = 1;
  const [noticeList, setNoticeList] = useState([]);

  useEffect(()=>{
    axiosConfig.get('/notice',{
      params: {page: page}
    }).then(res=>{
      console.log(res);
      setNoticeList(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  return (
    <div className={styles.notice}>
      <div className={styles.title}>
        <DecoTitle title='공지사항'/>
      </div>
      <div className={styles.board}>
        {noticeList.length >0 ?
          noticeList.map((item:ResType)=>{
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


        

        {/* <Link to="/mypage/notice/detail" className={styles.comment_container}>
          <div className={styles.comment}>
            <p>데이터센터 화재로 인한 카카오톡 서비스 장애</p>
            <p>22/12/15</p>
          </div>
          <BiChevronRight/>
        </Link> */}

        {/* <Link to="/mypage/notice/detail" className={styles.comment_container}>
          <div className={styles.comment}>
            <p>카카오톡 장애로 불편을 드려 죄송합니다.</p>
            <p>22/12/15</p>
          </div>
          <BiChevronRight/>
        </Link> */}
        {/* <Link to="/mypage/notice/detail" className={styles.comment_container}>
          <div className={styles.comment}>
            <p>완연해진 가을에 찾아온 9.9.5 업데이트 안내</p>
            <p>22/12/15</p>
          </div>
          <BiChevronRight/>
          </Link> */}
      </div>
    </div>
  );
};

export default Notice;