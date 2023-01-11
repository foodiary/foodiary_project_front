import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/contact.module.scss';
import WritingLink from '@components/common/WritingLink/WritingLink';
import axiosConfig from '../../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';

interface ResType{
  questionAnswerYn: string;
  questionCreate: string;
  questionId: 0;
  questionTitle: string;
}

const MyContact = () => {
  const page = 1;
  const [myQ, setMyQ] = useState([]); //내 문의내역
  const memberId = useLoginUserStore(state=>state.memberId); //멤버시퀀스

  useEffect(()=>{
      axiosConfig.get(`/question/${memberId}`,{
      params: {page: page}
      }).then(res=>{
          console.log(res);
          setMyQ(res.data);
      }).catch(err=>{
        console.log(err);
      })
    }
  ,[]);
  return (
    <div className={styles.board}>
          {myQ.length > 0 ?
            myQ.map((item:ResType)=>{
              return(
                <WritingLink 
                  text1={item.questionTitle} 
                  text2={item.questionAnswerYn + item.questionCreate} 
                  url='/mypage/contact/detail' 
                  state={{questionId: 1}}/>
              )
            }):
            <EmptyText text='문의 내역이 없습니다.'/>
          }
    </div>
  );
};

export default MyContact;