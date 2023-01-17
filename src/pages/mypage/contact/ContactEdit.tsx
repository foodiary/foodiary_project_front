import { useLoginUserStore } from '@store/loginUserStore';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import styles from '@styles/mypage/contact.module.scss';
import WritingForm from '@components/common/WrtingForm/WritingForm';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';

interface ResType{
  questionContent: string;
  questionTitle: string;
  //이미지도 받아야함
}

const ContactEdit = () => {
  const {search, state} = useLocation();

  const questionId = search.slice(1);
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const [detail, setDetail] = useState([]);

  // useEffect(()=>{
  //   axiosConfig.get(`/question/${memberId}/${questionId}/`)
  //   .then(res=>{
  //     setDetail(res.data);
  //   })
  // },[]);
  return (
      <div>
        <div className={styles.title}>
          <DecoTitle title='문의 내역 수정'/>
        </div>
        <WritingForm 
          storedTitle={state.title}
          storedContent={state.content}
          edit={true}
          maxLength={1000}
          label='문의 내용'
          url={`/question/${memberId}/${questionId}`}
          existingPath="" //기존 파일
          dtoType='memberQuestionEditResponseDto'
        />
      </div>
  );
};

export default ContactEdit;