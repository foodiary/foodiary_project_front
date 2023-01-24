import React, { FormEvent, useEffect, useState } from 'react';
import styles from './commentBox.module.scss';
import basic_profile from '@img/basic_profile.png';
import {FiMoreVertical} from 'react-icons/fi';
import { useLoginUserStore } from '@store/loginUserStore';
import { btnStateStore } from '@store/btnStateStore';
import { HalfButton } from '../LoginButton/Button';
import { AlertBox, WarnBox } from '../AlertBox/AlertBox';
import axiosConfig from "@utils/axiosConfig";
import { useLocation, useNavigate } from 'react-router-dom';

interface ResType{
  dailyCommentBody: string;
  dailyCommentCreate: string;
  dailyCommentWriter: string;
  dailyCommentImg:string;
  dailyCommentId?: number;
  isMine?: boolean; // 댓글이 본인 것인지(true)
}

const CommentBox = ({
  dailyCommentBody,
  dailyCommentCreate,
  dailyCommentWriter,
  dailyCommentImg,
  dailyCommentId,
  isMine,
}:ResType) => {
  const date = dailyCommentCreate.slice(0,10).replaceAll("-",".");
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [viewBtn, setViewBtn] = useState(false);
  const cancel = btnStateStore((state) => state.cancel);
  const setCancel = btnStateStore((state) => state.setCancel);

  const memberId = useLoginUserStore((state) => state.userInfo.memberId);
  const dailyId = pathname.slice(8);

  useEffect(()=>{
    setCancel(true);
  },[]);

  console.log(cancel);
  const onClick = ()=>{
    setViewBtn(prev=>!prev);
  }
  const onModifyComments = ()=>{
    navigate('/mypage/mycomments/edit', {state: {
      content: dailyCommentBody,
      dailyId: dailyId,
      commentId: dailyCommentId,
    }});
  }
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCancel(true);
    setViewBtn(false);

    axiosConfig.delete(`/daily/comment/${dailyId}/${dailyCommentId}/${memberId}`)
    .then((res) => {
      console.log(res);
      setRemoveSuccess(true);
      setTimeout(()=>navigate(-1), 2000);
    }).catch(err=>{
      console.log(err);
    })

  }

  return (
    <div>
      <div className={styles.comment_container}>
        <img 
          src={dailyCommentImg || basic_profile} 
          className={styles.profile_picture} 
          alt="프사"/>
        <div className={styles.more_btn}>
          <div className={styles.content}>
            <p>{dailyCommentWriter}</p>
            <p>{dailyCommentBody}</p>
            <p>{date}</p>
          </div>
          {isMine && 
            <button onClick={onClick}>
              <FiMoreVertical/>
            </button>}
        </div>
      </div>
      {viewBtn && 
        <div className={styles.view_btn}>
          <div className={styles.black} onClick={onModifyComments}>
            <HalfButton type="button" text="수정" />
          </div>
          <div className={styles.red} onClick={() => setCancel(false)}>
            <HalfButton type="button" text="삭제" />
          </div>
        </div>
      }
      {!cancel && 
        <form onSubmit={onSubmit}>
          <WarnBox text="정말 삭제하시겠습니까?" btn_txt="삭제" />
        </form>
      }
      {removeSuccess &&
        <AlertBox text='삭제되었습니다' type={true}/>
      }
    </div>
  );
};

export default CommentBox;