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
}
interface Obj{
  resobj: ResType
}
const ContactDetail = () => {
  const [write, setWrite] = useState(false);
  const navigate = useNavigate();
  const {state} = useLocation();
  const memberId = useLoginUserStore(state=>state.memberId);
  const [content, setContent] = useState<Obj>();

  useEffect(()=>{
    axiosConfig.get(`/question/${memberId}/${state.questionId}`)
    .then(res=>{
      console.log(res);
      setContent(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  return (
    <div className={styles.mywriting}>
      <div className={styles.tab}>
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
          문의 제목이 들어가는 공간입니다.
        </p>
        <p className={styles.detail_content}>
          문의 내용이 들어가는 공간입니다.
          문의 내용이 들어가는 공간입니다.
          문의 내용이 들어가는 공간입니다.
          문의 내용이 들어가는 공간입니다.
          문의 내용이 들어가는 공간입니다.
        </p>
        <div className={styles.status}>
          <p className={styles.state}>답변완료</p>
          <p>2022.12.30</p>
        </div>
      </div>
      <div className={styles.answer_container}>
        {/* <img src={answer_icon} alt="화살표"/> */}
        <p className={styles.detail_title}>
          <img src={answer_icon} alt="화살표"/>
          답변 제목이 들어가는 공간입니다.
        </p>
        <p className={styles.detail_content}>
          답변내용이 들어가는 공간입니다.
          답변내용이 들어가는 공간입니다.
          답변내용이 들어가는 공간입니다.
          답변내용이 들어가는 공간입니다.
          답변내용이 들어가는 공간입니다.
        </p>
      </div>
      </div>
    </div>
  );
};

export default ContactDetail;