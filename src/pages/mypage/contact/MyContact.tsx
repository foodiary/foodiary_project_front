import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/contact.module.scss';
import WritingLink from '@components/common/WritingLink/WritingLink';
import axiosConfig from '../../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';
import { useNavigate } from 'react-router-dom';

interface ResType{
  questionAnswerYn: string;
  questionCreate: string;
  questionId: 0;
  questionTitle: string;
}

const MyContact = () => {
  const [write, setWrite] = useState(false); //탭 모드
  const navigate = useNavigate();

  const page = 1;
  const [myQ, setMyQ] = useState([]); //내 문의내역
  const memberId = useLoginUserStore(state=>state.userInfo.memberId); //멤버시퀀스

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
    <div className={styles.mywriting}>

    <div className={`${styles.tab} ${styles.contact_tab}`}>
        <button 
          className={styles.non_active}
          onClick={()=>navigate('/mypage/contact')}
        >
          1:1 문의하기
          {/* {write && <div className={styles.text_deco}></div>} */}
        </button>
        <button 
          className={styles.active}
          onClick={()=>{ 
            navigate('/mypage/mycontact');
            }}
        >
          문의내역 확인
          <div className={styles.text_deco}></div>
        </button>
      </div>
    <div className={styles.board}>
          {myQ.length > 0 ?
            myQ.map((item:ResType)=>{
              const questionAnswerYn = item.questionAnswerYn==="Y"?"답변완료":"답변대기";
              const date = item.questionCreate.slice(2,10).replaceAll("-",'.');
              return(
                <WritingLink 
                  text1={item.questionTitle} 
                  text2={questionAnswerYn + " "+ date} 
                  url={`/mypage/contact/detail?${item.questionId}`}
                  state={{questionId: item.questionId}}
                />
              )
            }):
            <EmptyText text='문의 내역이 없습니다.'/>
          }
    </div>
    </div>
  );
};

export default MyContact;