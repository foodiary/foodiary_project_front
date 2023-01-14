import React, { FormEvent, useEffect, useState } from 'react';
import styles from '@styles/mypage/myCommentsDetail.module.scss';
import {FiMoreVertical} from 'react-icons/fi';
import {AiOutlineHeart} from 'react-icons/ai';
import {FaRegBookmark} from 'react-icons/fa';
import { HalfAlertButton, HalfButton, LoginButton } from '@components/common/LoginButton/Button';
import {AlertBox, WarnBox} from '@components/common/AlertBox/AlertBox';
import basic_profile from '@img/basic_profile.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { btnStateStore } from '@store/btnStateStore';
import Input from '@components/common/Input/Input';
import CommentBox from '@components/common/CommentBox/CommentBox';
import axiosConfig from '@utils/axiosConfig';


const MyCommentsDetail = () => {
  const {pathname} = useLocation();
  const url = pathname.slice(26);

  const [viewBtn, setViewBtn] = useState(false);
  const cancel = btnStateStore(state=>state.cancel);
  const setCancel = btnStateStore(state=>state.setCancel);
  const memberId = 76; //저장된 멤버아이디
  const [dailyTitle, setDailyTitle] = useState("");
  const [like, setLike] = useState(0);
  const [scrap, setScrap] = useState(0);

  const [commentContent, setCommentContent] = useState("");
  const [writer, setWriter] = useState("");
  const [date, setDate] = useState("");
  const [dailyId, setDailyId] = useState(0);
  const [commentId, setCommentId] = useState(0);

  useEffect(()=>{
    setCancel(true);
    axiosConfig.get(`/member/comment/daily/${memberId}/${url}`)
    .then(res=>{
      const data = res.data;
      console.log(res);
      setDailyTitle(data.dailyTitle);
      setLike(data.dailyLike);
      setScrap(data.dailyScrap);
      setCommentContent(data.dailyCommentBody);
      setWriter(data.dailyCommentWriter);
      setDate(data.dailyCommentCreate);
      setDailyId(data.dailyId);
      setCommentId(data.dailyCommentId);

    }).catch(err=>console.log(err));
  },[]);



  const navigate = useNavigate();

  const onClick = (e:React.MouseEvent<HTMLDivElement>)=>{
    // console.log(e.currentTarget.innerText);
    navigate("/mypage/mycomments/edit", {state:{
      content: commentContent,
      dailyId: dailyId,
      commentId: commentId,
    }});
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    setCancel(true);
    setViewBtn(false);
    console.log("삭제ㅇㅇ"); //알럿창
    axiosConfig.delete(
      `/daily/comment/${dailyId}/${memberId}/${commentId}`)
    .then(res=>{
      console.log(res);
      setTimeout(()=>navigate(-1),2000);
      return(<AlertBox type={true} text='삭제되었습니다'/>)
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <div className={styles.comment_detail}>
      <div className={styles.writing}>
        <Link to={`/daily/details/${dailyId}`} className={styles.board_link}>
          {dailyTitle}
        </Link>
        <div className={styles.good_scrap}>
          <button><AiOutlineHeart/></button>
          <p>{like}</p>
          <button><FaRegBookmark/></button>
          <p>{scrap}</p>
        </div>
        <input type="text" id='comment' placeholder='댓글을 남겨보세요.'/>
        {/* <Input label= '' validate='no' id='comment' type='text' placeholder='댓글을 남겨보세요.'/>  */}
      </div>

      <div className={styles.comment_box} onClick={()=>{setViewBtn(prev=>!prev)}}>
        <CommentBox 
          dailyCommentWriter={writer} 
          dailyCommentBody={commentContent} 
          dailyCommentCreate={date}
          isMine={true}/>
      </div>
      {viewBtn && <div className={styles.view_btn}>
        <div className={styles.black} onClick={onClick}>
          <HalfButton type='button' text='수정'/>
        </div>
        <div className={styles.red} onClick={()=>{setCancel(false)}}>
          <HalfButton type='button' text='삭제'/>
        </div>
      </div>}
      {/* {viewBtn && <div className={styles.view_btn}>
        <HalfButton 
          type='button' 
          text='수정'
          url='/mypage/mycomments/detail/edit'
          type2='button'
          text2='삭제'/>
      </div>} */}
      {/* {!cancel && 
      <div onClick={onClick}>
        <WarnBox text='정말 삭제하시겠습니까?' btn_txt='삭제'/>
      </div>
      } */}
      {!cancel && 
      <form onSubmit={onSubmit}>
        <WarnBox text='정말 삭제하시겠습니까?' btn_txt='삭제'/>
      </form>
      }

    </div>
  );
};

export default MyCommentsDetail;