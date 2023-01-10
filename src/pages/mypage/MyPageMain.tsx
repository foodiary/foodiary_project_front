import React from 'react';
import {AiOutlineSetting} from 'react-icons/ai';
import {BiChevronRight} from 'react-icons/bi';
import styles from '@styles/mypage/myPageMain.module.scss';
import { Link } from 'react-router-dom';
import Header from '@components/common/Header/Header';
import basic_profile from '@img/basic_profile.svg';
import myComments from '@img/myComments.png';
import myGood from '@img/myGood.png';
import myWriting from '@img/myWriting.png';
import myScrap from '@img/myScrap.png';

const MyPageMain = () => {
  return (
    <div className={styles.mypage}>
      <Header/>
      {/* <div className={styles.mypage}> */}
      <div className={styles.profile_container}>
        {/* <div className={styles.profile_image}></div> */}
        <img src={basic_profile} alt="기본이미지" className={styles.profile_image}/>
        <div className={styles.user_info}>
          <p>ffoodyy</p>
          {/* <p>ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹ</p> */}
          <p>이메일</p>
        </div>
        {/* <div className={styles.setting}>
          <Link to="/"><AiOutlineSetting/></Link>
        </div> */}
          <Link to="/mypage/setting">
            <div className={styles.setting}>
              <AiOutlineSetting/>
            </div>
          </Link>
        {/* </div> */}
      </div>
      <p className={styles.profile_msg}>
        맛집투어만큼 만들기를 좋아하는 ffoodyyyyy
        {/* ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ */}
      </p>
      <div className={styles.myWriting_btns}>
        <div className={styles.myWriting}>
          <Link to="/mypage/mywriting">
            <img src={myWriting} alt="이미지"/>
          </Link>
          <p>내가 쓴 글</p>
        </div>
        <div className={styles.myComments}>
          <Link to="/mypage/mycomment">
            <img src={myComments} alt="이미지"/>
          </Link>
          <p>내가 쓴 댓글</p>
        </div>
        <div className={styles.myGood}>
          <Link to="/mypage/mygood">
            <img src={myGood} alt="이미지"/>

          </Link>
          <p>좋아요 글</p>
        </div>
        <div className={styles.myScrap}>
          <Link to="/mypage/myscrap">
            <img src={myScrap} alt="이미지"/>
          </Link>
          <p>스크랩 글</p>
        </div>
      </div>

      <div className={styles.recommend_service}>
        <Link to="/" className={styles.menu}>
          <p>나의 추천메뉴</p>
          <BiChevronRight/>
        </Link>
      </div>

      <div className={styles.customer_service}>
        <p className={styles.title}>고객센터</p>
        <Link to="/" className={styles.menu}>
          <p>공지사항</p>
          <BiChevronRight/>
        </Link>
        <Link to="/" className={styles.menu}>
          <p>1:1 문의하기</p>
          <BiChevronRight/>
        </Link>
        <Link to="/" className={styles.menu}>
          <p>FAQ</p>
          <BiChevronRight/>
        </Link>
      </div>

      <div className={styles.account_manage}>
        <p className={styles.title}>계정관리</p>
        <Link to="/" className={styles.menu}>
          <p>비밀번호 변경</p>
          <BiChevronRight/>
        </Link>
        <button >로그아웃</button>
        <button>탈퇴하기</button>
      </div>

    </div>
  );
};

export default MyPageMain;