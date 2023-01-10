import React, { useState } from 'react';
import styles from '@styles/mypage/myCommentsDetail.module.scss';
import Header from '@components/common/Header/Header';
import {FiMoreVertical} from 'react-icons/fi';
import {AiOutlineHeart} from 'react-icons/ai';
import {FaRegBookmark} from 'react-icons/fa';
import { HalfButton, LoginButton } from '@components/common/LoginButton/Button';
import {AlertBox, WarnBox} from '@components/common/AlertBox/AlertBox';
import { Input } from '@pages/Form';
import basic_profile from '@img/basic_profile.svg';
import { Link } from 'react-router-dom';

const MyCommentsDetail = () => {
  const [viewBtn, setViewBtn] = useState(false);
  return (
    <div className={styles.comment_detail}>
      <Header/>
      <div className={styles.writing}>
        <button className={styles.board_link}>오늘 다이어터 하루 식단 구경하세용</button>
        <div className={styles.good_scrap}>
          <button><AiOutlineHeart/></button>
          <p>10</p>
          <button><FaRegBookmark/></button>
          <p>10</p>
        </div>
        <Input id='comment' type='text' placeholder='댓글을 남겨보세요.'/> 
      </div>

      <div className={styles.comment_container}>
        <img src={basic_profile} className={styles.profile_picture} alt="프사"/>
        <button className={styles.more_btn} onClick={()=>{setViewBtn(prev=>!prev)}}>
          <div className={styles.content}>
            <p>dieat</p>
            <p>아 맛잘알 인정입니다;</p>
            <p>2022.12.31</p>
          </div>
          <div>
            <FiMoreVertical/>
          </div>
        </button>
      </div>
      <div className={styles.comment_container}>
          <div className={styles.content}>
            <p>삭제된 댓글입니다.</p>
          </div>
      </div>

      {/* {viewBtn && <div className={styles.view_btn}>
        <HalfButton 
          type='button' 
          text='수정'
          url='/mypage/mycomments/detail/edit'
          type2='button'
          text2='삭제'/>
      </div>} */}
      {/* <WarnBox/> */}

      {/* <AlertBox text='아이디 또는 비밀번호를 다시 확인해주세요.' type={false}/> */}
      {/* <div className={styles.modal_back}>
        <AlertBox text='인증메일이 재발송되었습니다' type={true}/>
      </div> */}

    </div>
  );
};

export default MyCommentsDetail;