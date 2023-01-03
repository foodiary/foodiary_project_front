import Header from '@components/common/Header';
import React from 'react';
import {AiOutlineSetting} from 'react-icons/ai';
import {BiChevronRight} from 'react-icons/bi';
import styles from '@styles/mypage/myPageMain.module.scss';
import { Link } from 'react-router-dom';

const MyPageMain = () => {
  return (
    <div className={styles.mypage}>
      <Header/>
      {/* <div className={styles.mypage}> */}
      <div className={styles.profile_container}>
        <div className={styles.profile_image}></div>
        <div className={styles.user_info}>
          <p>ffoodyy</p>
          <p>이메일</p>
        </div>
        {/* <div className={styles.setting}>
          <Link to="/"><AiOutlineSetting/></Link>
        </div> */}
          <Link to="/">
            <div className={styles.setting}>
              <AiOutlineSetting/>
            </div>
          </Link>
        {/* </div> */}
      </div>
      <p className={styles.profile_msg}>
        맛집투어만큼 만들기를 좋아하는 ffoodyyyyy
      </p>
      <div className={styles.myWriting_btns}>
        <div className={styles.myWriting}>
          <Link to="/mypage/mywriting"></Link>
          <p>내가 쓴 글</p>
        </div>
        <div className={styles.myComments}>
          <Link to="/mypage/mycomment"></Link>
          <p>내가 쓴 댓글</p>
        </div>
        <div className={styles.myGood}>
          <Link to="/mypage/mygood"></Link>
          <p>좋아요 글</p>
        </div>
        <div className={styles.myScrap}>
          <Link to="/mypage/myscrap"></Link>
          <p>스크랩 글</p>
        </div>
      </div>

      <div className={styles.customer_service}>
        <p>고객센터</p>
        <p>공지사항 <Link to="/"><BiChevronRight/></Link></p>
        <p>1:1 문의하기 <Link to="/"><BiChevronRight/></Link></p>
        <p>FAQ <Link to="/"><BiChevronRight/></Link></p>
      </div>

      <div className={styles.account_manage}>
        <p>계정관리</p>
        <button>로그아웃</button>
        <button>탈퇴하기</button>
      </div>

      {/* <div className={styles.myWriting_btns}>
        {btnList.map((title, index)=>{
          let name = `${btnImgList[index]}`;
          return(
            <div className={styles.btn}>
              <p>{title}</p>
            </div>
          )
        })}
      </div> */}
      {/* </div> */}
    </div>
  );
};

export default MyPageMain;