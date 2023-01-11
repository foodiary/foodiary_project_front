import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/notice.module.scss';
import Header from '@components/common/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosConfig from '../../../core/apis/utils/axiosConfig';

// interface ResType{
//   noticeCreate: string;
//   noticeId: number;
//   noticeTitle: string;
//   noticeContent: string;
// }
type ResType = {
  // [noticeContent: string]:string;
  noticeCreate: string;
  noticeId: number;
  noticeTitle: string;
  noticeContent: string;
}
const NoticeDetail = () => {
  const {state} = useLocation();
  const noticeId = state.noticeId;
  const [detail, setDetail] = useState<ResType[]>([]);
  const arr = Object.values(detail)
  useEffect(()=>{
    axiosConfig.get(`/notice/${noticeId}`).then(res=>{
      // console.log(res);
      setDetail(Array(res.data));
    }).catch(err=>{
      console.log(err);
    })
  },[]);
  // const name = Object.values(detail)[0];
  console.log(detail);

  return (
    <div className={styles.notice_detail}>
      {detail.map((item:ResType, index)=>{
        let date = item.noticeCreate.slice(4,10);
        const year = item.noticeCreate.slice(2,4);
        date = date.replaceAll("-", "/");
        return(
          <>
            <p  key={index} className={styles.title}>
              {item.noticeTitle}
            </p>
            <p className={styles.date}>
              {year+date}
            </p>
            <p className={styles.content}>
              {item.noticeContent}
            </p>
          </>

        )
      })}

    </div>
  );
};

export default NoticeDetail;