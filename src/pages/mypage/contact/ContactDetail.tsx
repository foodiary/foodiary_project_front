import Header from '@components/common/Header/Header';
import styles from '@styles/mypage/contact.module.scss';
import React, { useEffect, useState } from 'react';
import answer_icon from '@img/answer_icon.svg';
import { useNavigate } from 'react-router';
import {useLocation} from 'react-router-dom';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '@utils/axiosConfig';

interface ResType{
  answerContent: string;
  answerCreate: string;
  answerTitle: string;
  questionContent: string;
  questionCreate: string;
  questionTitle: string;
  questionAnswerYn: string;
}
interface Obj{
  resobj: ResType
}
const ContactDetail = () => {
  const [write, setWrite] = useState(false);
  const navigate = useNavigate();
  const {state} = useLocation();
  const {search} = useLocation();
  
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const [res, setRes] = useState<ResType>();

  useEffect(()=>{
    axiosConfig.get(`/question/${memberId}/${search.slice(1)}`)
    .then(res=>{
      console.log(res);
      setRes(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  return (
    <div className={styles.mywriting}>
      <div className={`${styles.tab} ${styles.contact_tab}`}>
        <button 
          className={write? styles.active: styles.non_active}
          onClick={()=>{navigate(-1)}}
        >
          1:1 문의하기
          {write && <div className={styles.text_deco}></div>}
        </button>
        <button 
          className={!write? styles.active: styles.non_active}
        >
          문의내역 확인
          {!write && <div className={styles.text_deco}></div>}
        </button>
      </div>

    <div className={styles.detail}>
      <div className={styles.detail_container}>
       
        <p className={styles.detail_title}>
          {res?.questionTitle}
        </p>
        <p className={styles.detail_content}>
          {res?.questionContent}
        </p>
        <div className={styles.status}>
          <p className={styles.state}>
            {res?.questionAnswerYn==="Y"? "답변완료": "답변대기"}
          </p>
          <p>{res?.questionCreate.slice(2,10).replaceAll("-","/")}</p>
        </div>
      </div>

      {res?.answerTitle && 
        <div className={styles.answer_container}>
          <p className={styles.detail_title}>
            <img src={answer_icon} alt="화살표"/>
            {res?.answerTitle}
          </p>
          <p className={styles.detail_content}>
            {res?.answerContent}
          </p>
        </div>}
      </div>
    </div>
  );
};

export default ContactDetail;