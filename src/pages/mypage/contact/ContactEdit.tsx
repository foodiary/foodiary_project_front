import { useLoginUserStore } from '@store/loginUserStore';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '@styles/mypage/contact.module.scss';
import WritingForm from '@components/common/WrtingForm/WritingForm';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';

const ContactEdit = () => {
  const {search, state} = useLocation();
  const questionId = search.slice(1);
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);

  return (
      <div>
        <div className={styles.title}>
          <DecoTitle title='문의 내역 수정'/>
        </div>
        <WritingForm 
          storedTitle={state.title}
          storedContent={state.content}
          existingPath = {state.existingPath}
          edit={true}
          maxLength={1000}
          label='문의 내용'
          url={`/question/${memberId}/${questionId}`}
          dtoType='memberQuestionEditResponseDto'
        />
      </div>
  );
};

export default ContactEdit;