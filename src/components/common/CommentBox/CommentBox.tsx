import React, { FormEvent, useEffect, useState } from "react";
import styles from "./commentBox.module.scss";
import basic_profile from "@img/basic_profile.png";
import { FiMoreVertical } from "react-icons/fi";
import { useLoginUserStore } from "@store/loginUserStore";
import { btnStateStore } from "@store/btnStateStore";
import { HalfButton } from "../LoginButton/Button";
import { AlertBox, WarnBox } from "../AlertBox/AlertBox";
import axiosConfig from "@utils/axiosConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface ResType {
  dailyCommentBody: string;
  dailyCommentCreate: string;
  dailyCommentWriter: string;
  dailyCommentImg: string;
  dailyCommentId?: number;
  isMine?: boolean; // 댓글이 본인 것인지(true)
  commentMemberId?: number;
}

const CommentBox = ({
  dailyCommentBody,
  dailyCommentCreate,
  dailyCommentWriter,
  dailyCommentImg,
  dailyCommentId,
  isMine,
  commentMemberId,
}: ResType) => {
  const date = dailyCommentCreate.slice(0, 10).replaceAll("-", ".");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [viewBtn, setViewBtn] = useState(false);
  const [commentCancel, setCommentCancel] = useState(true);

  const cancel = btnStateStore((state) => state.cancel);
  const setCancel = btnStateStore((state) => state.setCancel);

  const memberId = useLoginUserStore((state) => state.userInfo.memberId);
  const dailyId = pathname.slice(8);

  useEffect(() => {
    setCancel(true);
    setCommentCancel(true);
  }, []);

  const onClick = () => {
    setViewBtn((prev) => !prev);
    setCancel(true);
    setCommentCancel(true);
  };
  const onAlert = () => {
    setCommentCancel(false);
    setCancel(false);
  };
  const onModifyComments = () => {
    navigate("/mypage/mycomments/edit", {
      state: {
        content: dailyCommentBody,
        dailyId: dailyId,
        commentId: dailyCommentId,
      },
    });
  };
  const onRemoveComment = (e: FormEvent) => {
    e.preventDefault();
    setCancel(true);
    setCommentCancel(true);
    setViewBtn(false);
    console.log("댓글 삭제");
    axiosConfig
      .delete(`/daily/comment/${dailyId}/${dailyCommentId}/${memberId}`)
      .then((res) => {
        console.log(res);
        setRemoveSuccess(true);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className={styles.comment_container}>
        <Link to={`/profile/${commentMemberId}`}>
          <img
            src={dailyCommentImg || basic_profile}
            className={styles.profile_picture}
            alt="프사"
          />
        </Link>
        <div className={styles.more_btn}>
          <div className={styles.content}>
            <p>{dailyCommentWriter}</p>
            <pre>{dailyCommentBody}</pre>
            <p>{date}</p>
          </div>
          {isMine && (
            <button onClick={onClick}>
              <FiMoreVertical />
            </button>
          )}
        </div>
      </div>
      {viewBtn && (
        <div className={styles.view_btn}>
          <div className={styles.black} onClick={onModifyComments}>
            <HalfButton type="button" text="댓글 수정" />
          </div>
          <div className={styles.red} onClick={onAlert}>
            <HalfButton type="button" text="댓글 삭제" />
          </div>
        </div>
      )}
      {!commentCancel && !cancel && (
        <form onSubmit={onRemoveComment}>
          <WarnBox text="정말 삭제하시겠습니까?" btn_txt="삭제" />
        </form>
      )}
      {removeSuccess && <AlertBox text="삭제되었습니다" type={true} />}
    </div>
  );
};

export default CommentBox;
