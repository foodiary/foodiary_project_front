import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import { useState } from 'react';
import styles from '@styles/writingDetails.module.scss';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import {MdOutlineRemoveRedEye} from 'react-icons/md';

interface ResType{
  dailyBody: string;
  dailyComment: number;
  dailyCreate: string;
  dailyLike: number;
  dailyPath: string;
  dailyTitle: string;
  dailyView: number;
  dailyWriter: string;
  memberId: number;
  userCheck: boolean;
}
const WritingDetails = () => {
  const {pathname} = useLocation();
  const id = pathname.slice(17); // 글 아이디
  const [contents, setContents] = useState<ResType>();
  const [comments, setComments] = useState([]);


  const getContents = ()=>{
    axiosConfig.get(`/dailys/datils`, {params:{dailyId: id}})
    .then(res=>{
      console.log(res);
      setContents(res.data);
    }).catch(err=>{
      console.log(err);
    });
  }
  const getComments = ()=>{
    const page = 1;
    axiosConfig.get(`/dailys/comment`, {params:{dailyId: id, page: page}})
    .then(res=>{
      console.log(res);
      if(res !== undefined){
        setComments(res.data);
      }
    }).catch(err=>{
      
      console.log(err);
    });
  }

  useEffect(()=>{
    getContents();
    getComments();
  },[]);
  const date = contents?.dailyCreate.slice(0,10).replaceAll("-","/");
  return (
    <div className={styles.writing_detail}>
      <div className={styles.img}>
        <img src={contents?.dailyPath} alt="첨부사진"/>
      </div>
      <div className={styles.writing_container}>
        <h2>{contents?.dailyTitle}</h2>
        <p className={styles.created}>{date}</p>
        <p className={styles.writer}>{contents?.dailyWriter}</p>
        <div className={styles.people_res}>
          <div className={styles.res}>
            <MdOutlineRemoveRedEye/>
            <p>{contents?.dailyView}</p>
          </div>
          <div className={styles.res}>
            <BsSuitHeart/>
            <p>{contents?.dailyLike}</p>
          </div>
        </div>
        <div className={styles.contents}>
          <p>{contents?.dailyBody}</p>
        </div>
      </div>
      <div className={styles.comments_container}>
        {/* 코멘트박스 넣기 */}
      </div>
    </div>
  );
};

export default WritingDetails;