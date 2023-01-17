import React from 'react';
import styles from './commentBox.module.scss';
import basic_profile from '@img/basic_profile.png';
import {FiMoreVertical} from 'react-icons/fi';
import { useLoginUserStore } from '@store/loginUserStore';

interface ResType{
  dailyCommentBody: string;
  dailyCommentCreate: string;
  // "dailyCommentId": number;
  dailyCommentWriter: string;
  // dailyId: number;
  // dailyLike: number;
  // dailyScrap: number;
  // dailyTitle: string;
  isMine?: boolean; // 댓글이 본인 것인지(true)
}

const CommentBox = ({
  dailyCommentBody,
  dailyCommentCreate,
  dailyCommentWriter,
  isMine,
}:ResType) => {
  const date = dailyCommentCreate.slice(0,10).replaceAll("-","/");
  const memberPath = useLoginUserStore(state=>state.userInfo.memberPath);

  return (
    <div>
      <div className={styles.comment_container}>
        <img 
          src={memberPath === null? basic_profile: memberPath} 
          className={styles.profile_picture} 
          alt="프사"/>
        <button className={styles.more_btn}>
          <div className={styles.content}>
            <p>{dailyCommentWriter}</p>
            <p>{dailyCommentBody}</p>
            <p>{date}</p>
          </div>
          {isMine && <div>
            <FiMoreVertical/>
          </div>}
        </button>
      </div>
      {/* <div className={styles.comment_container}>
          <div className={styles.content}>
            <p>삭제된 댓글입니다.</p>
          </div>
      </div> */}
    </div>
  );
};

export default CommentBox;