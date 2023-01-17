import { useLoginUserStore } from '@store/loginUserStore';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import styles from '@styles/mypage/contact.module.scss';
import ContactForm from '@components/common/ContactForm/ContactForm';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';

interface ResType{
  questionContent: string;
  questionTitle: string;
  //이미지도 받아야함
}

const ContactEdit = () => {
  const {search} = useLocation();
  const questionId = search.slice(1);
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const [detail, setDetail] = useState([]);

  useEffect(()=>{
    axiosConfig.get(`/question/${memberId}/${questionId}/`)
    .then(res=>{
      setDetail(res.data);
    })
  },[]);
  return (
      <div>
        <div className={styles.title}>
          <DecoTitle title='문의 내역 수정'/>
        </div>
        <ContactForm storedTitle='title' storedContent='content'/>
      </div>
  );
};

export default ContactEdit;