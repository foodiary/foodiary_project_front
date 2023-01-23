import React, { useEffect, useRef, useState } from 'react';
import styles from '@styles/mypage/myComments.module.scss';
import WritingLink from '@components/common/WritingLink/WritingLink';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import EmptyText from '@components/common/Text/EmptyText';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
  dailyCommentBody: string;
  dailyCommentId: 0;
  dailyId: 0;
  dailyTitle: string;
}
const MyComments = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);

  const target = useRef<HTMLDivElement>(null);
  const commentList = useInfiniteScroll({target: target, url:`/member/comment/daily/${memberId}`});

  return (
    <div className={styles.mycomments}>
      <div className={styles.title}>
        <DecoTitle title='하루 식단'/>
      </div>
      <div className={styles.board}>
        {commentList.items.length > 0 ? 
          commentList.items.map((item:ResType)=>{
            const url = `/detail/${item.dailyId}`;
            return(
              <WritingLink 
                url={url} 
                text1={item.dailyCommentBody} 
                text2={item.dailyTitle}/>      
            )
          }):
          <EmptyText text='내가 작성한 댓글이 없습니다.'/>
        }
      </div>

        {commentList && 
          <div ref={target} className={styles.scroll_target}>
              <p>마지막 페이지입니다</p>
          </div>
        }
    </div>
  );
};

export default MyComments;