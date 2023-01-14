import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/myComments.module.scss';
import WritingLink from '@components/common/WritingLink/WritingLink';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import EmptyText from '@components/common/Text/EmptyText';

interface ResType{
  dailyCommentBody: string;
  dailyCommentId: 0;
  dailyId: 0;
  dailyTitle: string;
  // recipeCommentBody: string;
  // recipeCommentId: 0;
  // recipeId: 0;
  // recipeTitle: string;
}
const MyComments = () => {
  // const [day, setDay] = useState(true);
  const [commentList, setCommentList] = useState([]);
  const page = 1;
  // const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const memberId = 76;

  // let url = '';
  const url = `/member/comment/daily/${memberId}`;
  useEffect(()=>{
    // if(day){
    //   url = `/member/comment/daily/${memberId}`
    // }
    // else{
    //   url = `/member/comment/recipe/${memberId}`
    // }
    axiosConfig.get(url, {
      params: {page: page}
    }).then(res=>{
      console.log(res);
      setCommentList(res.data);
    }).catch(err=>{
      console.log(err);
    });

  },[]);
  return (
    <div className={styles.mycomments}>
      <div className={styles.tab}>
        <div className={styles.title}>
          하루 식단
          {<div className={styles.text_deco}></div>}
        </div>
        {/* <button 
          className={day? styles.active: styles.non_active}
          onClick={()=>{setDay(true)}}
        >
          하루 공유 
          {day && <div className={styles.text_deco}></div>}
        </button>
        <button 
          className={!day? styles.active: styles.non_active}
          onClick={()=>{setDay(false)}}
        >
          레시피 공유 */}
          {/* {!day && <div className={styles.text_deco}></div>} */}
        {/* </button> */}
      </div>
      <div className={styles.board}>
        {commentList.length > 0 ? 
          commentList.map((item:ResType)=>{
            const url = `/mypage/mycomments/detail/${item.dailyId}/${item.dailyCommentId}`;
            // if(day){
            //   url = `/mypage/mycomments/detail/${item.dailyId}/${item.dailyCommentId}`;
            // }else{
            //   url= `/mypage/mycomments/detail/${item.recipeCommentId}`
            // }
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
    </div>
  );
};

export default MyComments;