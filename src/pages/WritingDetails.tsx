import React, { ChangeEvent, FormEvent } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "@utils/axiosConfig";
import { useState } from "react";
import styles from "@styles/writingDetails.module.scss";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiSend, FiMoreVertical } from "react-icons/fi";
import CommentBox from "@components/common/CommentBox/CommentBox";
import { useLoginUserStore } from "@store/loginUserStore";
import { AlertBox, WarnBox } from "@components/common/AlertBox/AlertBox";
import { HalfButton } from "@components/common/LoginButton/Button";
import { btnStateStore } from "@store/btnStateStore";

interface ResType {
  dailyBody: string;
  dailyComment: number;
  dailyCreate: string;
  dailyLike: number;
  dailyThumbnail: string;
  dailyTitle: string;
  dailyView: number;
  dailyWriter: string;
  memberId: number;
  userCheck: boolean; //본인이 쓴 글인지
}

const WritingDetails = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const id = pathname.slice(8); // 글 아이디
  console.log(id);
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  const [contents, setContents] = useState<ResType>();
  const [comments, setComments] = useState([]);

  const [value, setValue] = useState("");
  const [viewBtn, setViewBtn] = useState(false);

  const cancel = btnStateStore((state) => state.cancel);
  const setCancel = btnStateStore((state) => state.setCancel);

  const getContents = () => {
    axiosConfig
      .get(`/dailys/details`, {
        params: { dailyId: "1", memberId: memberId || "0" },
      })
      .then((res) => {
        console.log(res);
        setContents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const getComments = () => {
  //   const page = 1;
  //   axiosConfig
  //     .get(`/daily/comment`, { params: { dailyId: id, page: page } })
  //     .then((res) => {
  //       console.log(res);
  //       setComments(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    getContents();
    // getComments();
  }, []);

  const onModify = () => {
    setViewBtn((prev) => !prev);
  };

  const onWriteComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSendComment = () => {
    const data = {
      content: value,
      dailyId: id,
      memberId: memberId,
    };

    axiosConfig
      .post("/daily/comment", data)
      .then((res) => {
        console.log(res);
        console.log("성공");
        setValue("");
        // return(<AlertBox text='등록되었습니다' type={true}/>)
        return alert("완료");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // navigate("/daily/modify", {state:{
    //   content: commentContent,
    //   dailyId: dailyId,
    //   commentId: commentId,
    // }});
    console.log("수정버튼 클릭");
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCancel(false);
    setViewBtn(false);
    console.log("삭제ㅇㅇ"); //알럿창
  }

  const date = contents?.dailyCreate.slice(0,10).replaceAll("-",".");

  // const date = contents?.dailyCreate.slice(0, 10);
  return (
    <div className={styles.writing_detail}>
      <div className={styles.img}>
        <img src={contents?.dailyThumbnail} alt="첨부사진" />
      </div>

      <div className={styles.ranking_container}>
        <div className={styles.ranking}>Top 20</div>
        <div className={styles.ranking}>Top 20</div>
      </div>

      <div className={styles.writing_container}>
        <div className={styles.title_div}>
          <h2>{contents?.dailyTitle}</h2>
          {/* {contents?.userCheck? <button onClick={onModify}><FiMoreVertical/></button>: null} */}
          {contents?.userCheck && (
            <button onClick={onModify}>
              <FiMoreVertical />
            </button>
          )}
        </div>
        <p className={styles.created}>{date}</p>
        <p className={styles.writer}>{contents?.dailyWriter}</p>

        <div className={styles.people_res}>
          <div className={styles.res}>
            <MdOutlineRemoveRedEye />
            <p>{contents?.dailyView}</p>
          </div>
          <div className={styles.res}>
            <BsSuitHeart />
            <p>{contents?.dailyLike}</p>
          </div>
        </div>

        <div className={styles.contents}>
          <p>{contents?.dailyBody}</p>
        </div>
      </div>

      <div className={styles.input_comment}>
        <textarea
          maxLength={200}
          onChange={onWriteComment}
          value={value}
          placeholder={
            memberId ? "댓글을 작성해보세요!" : "회원만 작성 가능합니다"
          }
          disabled={memberId ? false : true}
        />
        <button onClick={onSendComment} className={styles.send_icon}>
          <FiSend />
        </button>
      </div>

      <div className={styles.comments_container}>
        {comments.length > 0 ? (
          comments.map((item) => {
            return (
              <CommentBox
                dailyCommentBody="코멘트내용"
                dailyCommentCreate="23/01/16"
                dailyCommentWriter="꺄르륵"
              />
            );
          })
        ) : (
          <p className={styles.empty_comment}>댓글이 없습니다</p>
        )}
      </div>
      {viewBtn && (
        <div className={styles.view_btn}>
          <div className={styles.black} onClick={onClick}>
            <HalfButton type="button" text="수정" />
          </div>
          <div className={styles.red} onClick={() => setCancel(true)}>
            <HalfButton type="button" text="삭제" />
          </div>
        </div>
      )}
      {cancel && (
        <form onSubmit={onSubmit}>
          <WarnBox text="정말 삭제하시겠습니까?" btn_txt="삭제" />
        </form>
      )}
    </div>
  );
};

export default WritingDetails;
