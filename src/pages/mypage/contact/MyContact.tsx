import React, { useEffect, useRef, useState } from 'react';
import styles from '@styles/mypage/contact.module.scss';
import WritingLink from '@components/common/WritingLink/WritingLink';
import axiosConfig from '../../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';
import { useNavigate } from 'react-router-dom';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
  questionAnswerYn: string;
  questionCreate: string;
  questionId: 0;
  questionTitle: string;
}

const MyContact = () => {
  const navigate = useNavigate();
  const memberId = useLoginUserStore(state=>state.userInfo.memberId); //멤버시퀀스

  const target = useRef<HTMLDivElement>(null);
  const myQ = useInfiniteScroll({target: target, url:`/question/${memberId}`});


  // const page = 1;
  // const [myQ, setMyQ] = useState([]); //내 문의내역

  // useEffect(()=>{
  //     axiosConfig.get(`/question/${memberId}`,{
  //     params: {page: page}
  //     }).then(res=>{
  //         console.log(res);
  //         setMyQ(res.data);
  //     }).catch(err=>{
  //       console.log(err);
  //     })
  //   }
  // ,[]);
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
        {myQ.items.length > 0 ?
          myQ.items.map((item:ResType)=>{
            const questionAnswerYn = item.questionAnswerYn==="Y"?"답변완료":"답변대기";
            const date = item.questionCreate.slice(2,10).replaceAll("-",'.');
            return(
              <WritingLink 
                text1={item.questionTitle} 
                isAnswer={questionAnswerYn}
                text2={date} 
                url={`/mypage/contact/detail?${item.questionId}`}
                state={{questionId: item.questionId}}
              />
            )
          }):
            <EmptyText text='문의 내역이 없습니다.'/>
          }
      </div>
      {/* {myQ.items.length>0 && */}
        <div ref={target} className={styles.scroll_target}>
          {/* <p>마지막 페이지입니다</p> */}
        </div>
        {/* } */}
    </div>
  );
};

export default MyContact;