import React, { ChangeEvent, FormEvent, useRef } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "@utils/axiosConfig";
import { useState } from "react";
import styles from "@styles/writingDetails.module.scss";
import { BsSuitHeart, BsSuitHeartFill, BsBookmark, BsFillBookmarkFill, BsBookmarkFill } from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiSend, FiMoreVertical } from "react-icons/fi";
import CommentBox from "@components/common/CommentBox/CommentBox";
import { useLoginUserStore } from "@store/loginUserStore";
import { AlertBox, WarnBox } from "@components/common/AlertBox/AlertBox";
import { HalfButton } from "@components/common/LoginButton/Button";
import { btnStateStore } from "@store/btnStateStore";
import {TbCrown} from 'react-icons/tb';

interface ResType {
  dailyBody: string;
  dailyComment: number;
  dailyCreate: string;
  dailyLike: number;
  dailyImageList: string[];
  dailyTitle: string;
  dailyView: number;
  dailyWriter: string;
  memberId: number;
  monRank: boolean;
  weekRank: boolean;
  scrapCheck: boolean;
  likeCheck: boolean;
  userCheck: boolean; //본인이 쓴 글인지
}

const WritingDetails = () => {
  const navigate = useNavigate();
  const target = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();
  const id = pathname.slice(8); // 글 아이디
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  const [contents, setContents] = useState<ResType>();
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(0)

  const [value, setValue] = useState("");
  const [viewBtn, setViewBtn] = useState(false);

  const [alertCancel, setAlertCancel] = useState(true);
  const cancel = btnStateStore((state) => state.cancel);
  const setCancel = btnStateStore((state) => state.setCancel);
  const [success, setSuccess] = useState(false);

  // const [like, setLike] = useState(0);
  // const [likeFill, setLikeFill] = useState(false);
  // console.log(comments)

  useEffect(()=>{
    setCancel(true);
    setAlertCancel(true);
  },[]);

  const getContents = () => {
    axiosConfig
      .get(`/dailys/details`, {
        params: { dailyId: id, memberId: memberId || "0" },
      })
      .then((res) => {
        console.log(res);
        setContents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getComments = () => {
    const page = 1;
    axiosConfig
      .get(`/dailys/comment`, { params: { dailyId: id, memberId: memberId ,page: page } })
      .then((res) => {
        console.log(res);
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDailyLike = () => {
    axiosConfig.post(`/daily/like/${id}/${memberId}`).then((res) => {
      setRefetch(prev => prev+1)
      // setLike(prev=>prev+1);
      // alert("좋아요 완료")
    }).catch((err) =>{
      console.log(err)
    })
  }

  useEffect(() => {
    getContents();
    getComments();
  }, [refetch]);

  const onModify = () => {
    setViewBtn((prev) => !prev);
    setCancel(true);
    setAlertCancel(true);
  };

  const onWriteComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const onSendComment = () => {
    setSuccess(false);

    const data = {
      content: value,
      dailyId: id,
      memberId: memberId,
    };

    axiosConfig
      .post("/daily/comment", data)
      .then((res) => {
        setRefetch(prev => prev+1)
        setValue("");
        setSuccess(true); // 댓글 등록완료
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/modify/${id}`);
  };
  const onRemoveSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCancel(true);
    setAlertCancel(true);
    setViewBtn(false);
    console.log('글 삭제')
    axiosConfig.delete(`/daily/${id}/${memberId}`).then((res) => {
      console.log(res)
      navigate("/explore")
    })
  }
  const onScrap = ()=>{
    axiosConfig.post(`/daily/scrap/${id}/${memberId}`)
    .then((res) => {
      console.log(res);
    })  
  }
  // const moveScroll = ()=>{
  //   const element = useRef<HTMLDivElement>(null);
  //   element.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: 'center',
  //   })
  // }
  const date = contents?.dailyCreate.slice(0,10).replaceAll("-",".");
  console.log(`글: ${alertCancel}`);
  // const date = contents?.dailyCreate.slice(0, 10);
  return (
    <div className={styles.writing_detail}>
      <div className={styles.img}>
        <img src={contents?.dailyImageList[0]} alt="첨부사진" />
      </div>

      <div className={styles.ranking_container}>
        {/* <div className={styles.ranking}>
          <TbCrown color="gold"/> Month Top 20
        </div>
        <div className={styles.ranking}>
          <TbCrown color="gold"/> Week Top 20
        </div> */}

        {contents?.monRank && 
          <div className={styles.ranking}><TbCrown color="gold"/> Month Top 20</div>}
        {contents?.weekRank && 
          <div className={styles.ranking}><TbCrown color="gold"/> Week Top 20</div>}
      </div>

      <button onClick={onScrap} className={styles.scrap_btn}>
          {contents?.scrapCheck? <BsBookmarkFill/>: <BsBookmark/>}
      </button>
      
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
        {/* <p className={styles.created}>{date}</p> */}
        <p className={styles.writer}>{contents?.dailyWriter}</p>

        <div className={styles.people_res}>
          <div className={styles.res}>
            <MdOutlineRemoveRedEye />
            <p>{contents?.dailyView}</p>
          </div>
          <div className={styles.res}>
            <button type="button" onClick={onDailyLike}>
              {contents?.likeCheck? <BsSuitHeartFill/> : <BsSuitHeart />}
            </button>
            <p>{contents?.dailyLike}</p>
            {/* <p>{like}</p> */}

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

      {success && <AlertBox text="댓글이 등록되었습니다" type={true}/>}

      <div className={styles.comments_container}>
        {comments.length > 0 ? (
          comments.map((item:any) => {
            console.log(item)
            return (
              <CommentBox
                dailyCommentImg={item.memberImage}
                dailyCommentBody={item.dailyCommentBody}
                dailyCommentCreate={item.dailyCommentCreate.slice(0,10)}
                dailyCommentWriter={item.dailyCommentWriter}
                dailyCommentId = {item.dailyCommentId}
                isMine = {item.userCheck}
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
          <div className={styles.red} onClick={() => {setCancel(false); setAlertCancel(false)}}>
            <HalfButton type="button" text="삭제" />
          </div>
        </div>
      )}
      {!cancel && !alertCancel && (
        <form onSubmit={onRemoveSubmit}>
          <WarnBox text="정말 삭제하시겠습니까?" btn_txt="삭제" />
        </form>
      )}
    </div>
  );
};

export default WritingDetails;