import React, { ChangeEvent, FormEvent, useRef } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosConfig from "@utils/axiosConfig";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@styles/writingDetails.module.scss";
import {
  BsSuitHeart,
  BsSuitHeartFill,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiSend, FiMoreVertical } from "react-icons/fi";
import CommentBox from "@components/common/CommentBox/CommentBox";
import { useLoginUserStore } from "@store/loginUserStore";
import { AlertBox, WarnBox } from "@components/common/AlertBox/AlertBox";
import { HalfButton } from "@components/common/LoginButton/Button";
import { btnStateStore } from "@store/btnStateStore";
import { TbCrown } from "react-icons/tb";
import { useInfiniteScroll } from "@hook/useInfiniteScroll";
import Slider from "react-slick";
import ScrollRestoration from "@components/ScrollRestoration";

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
  const userInfo = useLoginUserStore(state=>state.userInfo);
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  const [contents, setContents] = useState<ResType>();
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(0);

  const [value, setValue] = useState("");
  const [viewBtn, setViewBtn] = useState(false);

  const [alertCancel, setAlertCancel] = useState(true);
  const cancel = btnStateStore((state) => state.cancel);
  const setCancel = btnStateStore((state) => state.setCancel);
  const [success, setSuccess] = useState(false);
  const [forbidden, setForbidden] = useState(false);

  const [likeCheck, setLikeCheck] = useState(false); //내가 좋아요를 했는지
  const [likeCount, setLikeCount] = useState(0); // 이 글의 좋아요 갯수
  const [scrapCheck, setScrapCheck] = useState(false);

  // const [newComment, setNewComment] = useState<any>([]);

  useEffect(() => {
    setCancel(true);
    setAlertCancel(true);
    getContents();
  }, [refetch]);

  useEffect(()=>{
    // getComments();
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
        const data = res.data;
        setContents(data);
        setLikeCount(data.dailyLike);
        setLikeCheck(data.likeCheck);
        setScrapCheck(data.scrapCheck);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const params = {
    dailyId: id,
    memberId: memberId,
  };
  const items = useInfiniteScroll({
    target: target,
    url: `/dailys/comment`,
    params: params,
  }).items;
  // const reloadRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setComments(items);
  }, [items]);

  // const getNewComments = () => {
  //   // const page = 1;
  //   setComments([]);
  //   axiosConfig
  //     .get(`/dailys/comment`, {
  //       params: { dailyId: id, memberId: memberId, page: 1 },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setComments(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const onDailyLike = () => {
    if (memberId === 0) {
      setForbidden(true);
      setTimeout(() => setForbidden(false), 1000);
    }
    axiosConfig
      .post(`/daily/like/${id}/${memberId}`)
      .then((res) => {
        // setRefetch(prev => prev+1)
        // getContents();
        console.log(res);
        setLikeCheck(prev=>!prev);
        setLikeCount((prev)=>likeCheck===true?prev-1: prev+1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   // getContents();
  //   getComments();
  // }, [refetch]);

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

    // const now = new Date();

    // const newItem = {
    //   dailyCommentImg: userInfo.memberPath,
    //   dailyCommentBody: value,
    //   dailyCommentCreate: now,
    //   dailyCommentWriter: userInfo.memberNickName,
    //   isMine: true,
    // }
    axiosConfig
      .post("/daily/comment", data)
      .then((res) => {
        console.log(res);
        // setRefetch(prev => prev+1)
        // getComments();
        setValue("");
        setSuccess(true); // 댓글 등록완료
        setTimeout(()=> window.location.reload(),1000);
        // setNewComment([...newComment, newItem])
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
    axiosConfig.delete(`/daily/${id}/${memberId}`).then((res) => {
      console.log(res);
      navigate("/explore");
    });
  };

  const onScrap = () => {
    if (memberId === 0) {
      setForbidden(true);
      setTimeout(() => setForbidden(false), 1000);
    }
    axiosConfig.post(`/daily/scrap/${id}/${memberId}`)
    .then((res) => {
      console.log(res);
      setScrapCheck(prev=>!prev);
      // setRefetch((prev) => prev + 1);

    });
  };
  // const moveScroll = ()=>{
  //   const element = useRef<HTMLDivElement>(null);
  //   element.current?.scrollIntoView({
  //     behavior: "smooth",
  //     block: 'center',
  //   })
  // }
  // const date = contents?.dailyCreate.slice(0,10).replaceAll("-",".");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={styles.writing_detail}>
      <div className={styles.slickBox}>
        <Slider {...settings}>
          {contents?.dailyImageList.map((el, index) => {
            return <img src={el} key={index} alt="첨부사진" />;
          })}
        </Slider>
      </div>

      <div className={styles.ranking_container}>
        {contents?.monRank && (
          <div className={styles.ranking}>
            <TbCrown color="gold" /> Month Top 20
          </div>
        )}
        {contents?.weekRank && (
          <div className={styles.ranking}>
            <TbCrown color="gold" /> Week Top 20
          </div>
        )}
      </div>

      <div className={styles.writing_container}>
        <div className={styles.title_div}>
          <h2>{contents?.dailyTitle}</h2>

          {/* {contents?.userCheck? <button onClick={onModify}><FiMoreVertical/></button>: null} */}
          {contents?.userCheck && (
            <div className={styles.btnBox}>
              <button onClick={onModify}>
                <FiMoreVertical />
              </button>
            </div>
          )}
        </div>
        {/* <p className={styles.created}>{date}</p> */}

        <div className={styles.writer_profile}>
          <Link to={`/profile/${contents?.memberId}`}>
            <p className={styles.writer}>{contents?.dailyWriter}</p>
          </Link>
        </div>

        <div className={styles.people_res}>
          <div className={styles.res}>
            <MdOutlineRemoveRedEye />
            <p>{contents?.dailyView}</p>
          </div>

          <div className={styles.res}>
            <button type="button" onClick={onDailyLike}>
              {/* {contents?.likeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />} */}
              {likeCheck ? <BsSuitHeartFill /> : <BsSuitHeart />}
            </button>
            {/* <p>{contents?.dailyLike}</p> */}
            <p>{likeCount}</p>
          </div>
          <button onClick={onScrap} className={styles.scrap_btn}>
            {/* {contents?.scrapCheck ? <BsBookmarkFill /> : <BsBookmark />} */}
            {scrapCheck ? <BsBookmarkFill /> : <BsBookmark />}
          </button>
        </div>

        <div className={styles.contents}>
          <pre>
            <p>{contents?.dailyBody}</p>
          </pre>
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
        <button
          type="submit"
          onClick={onSendComment}
          className={styles.send_icon}
        >
          <FiSend />
        </button>
      </div>
      <div className={styles.comment_count}>
        <p>
          댓글 <span>{contents?.dailyComment}</span>
        </p>
      </div>
      {success && <AlertBox text="댓글이 등록되었습니다" type={true} />}

      <div className={styles.comments_container}>
        {comments.length > 0 ? (
          comments.map((item: any) => {
            return (
              <CommentBox
                dailyCommentImg={item.memberImage}
                dailyCommentBody={item.dailyCommentBody}
                dailyCommentCreate={item.dailyCommentCreate.slice(0, 10)}
                dailyCommentWriter={item.dailyCommentWriter}
                dailyCommentId={item.dailyCommentId}
                isMine={item.userCheck}
                commentMemberId={item.memberId}
              />
            );
          })
        ) 
        : (
          <p className={styles.empty_comment}>댓글이 없습니다</p>
        )}
      </div>

      {/* {newComment.length > 0 && 
          newComment.map((item:any)=>{
            return (
              <CommentBox
                dailyCommentImg={item.dailyCommentImg}
                dailyCommentBody={item.dailyCommentBody}
                dailyCommentCreate={item.dailyCommentCreate}
                dailyCommentWriter={item.dailyCommentWriter}
                isMine={item.isMine}
              />
            );
          })
      } */}
        

      <div ref={target} className={styles.scroll_target}></div>

      {viewBtn && (
        <div className={styles.view_btn}>
          <div className={styles.black} onClick={onClick}>
            <HalfButton type="button" text="수정" />
          </div>
          <div
            className={styles.red}
            onClick={() => {
              setCancel(false);
              setAlertCancel(false);
            }}
          >
            <HalfButton type="button" text="삭제" />
          </div>
        </div>
      )}
      {!cancel && !alertCancel && (
        <form onSubmit={onRemoveSubmit}>
          <WarnBox text="정말 삭제하시겠습니까?" btn_txt="삭제" />
        </form>
      )}
      {forbidden && <AlertBox text="회원만 가능합니다" type={false} />}
    </div>
  );
};

export default WritingDetails;
