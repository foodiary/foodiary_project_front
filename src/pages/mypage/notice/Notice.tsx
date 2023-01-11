import React, { useState } from 'react';
import styles from '@styles/mypage/myComments.module.scss';
import Header from '@components/common/Header/Header';
import { Link } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';
import { Intro } from '@components/common/Text/SignUpPageText';

const Notice= () => {

  return (
    <div className={styles.mycomments}>
      <Header/>
      <Intro span="공지사항" intro2=''/>

      <div className={styles.board}>
        <Link to="/mypage/notice/detail" className={styles.comment_container}>
          <div className={styles.comment}> {/*넘길때 ??? */}
            <p>내년에도 잘 부탁드려요! 10.0.0 업데이트 안내</p>
            <p>22/12/15</p>
          </div>
          <BiChevronRight/>
        </Link>

        <Link to="/mypage/notice/detail" className={styles.comment_container}>
          <div className={styles.comment}>
            <p>데이터센터 화재로 인한 카카오톡 서비스 장애</p>
            <p>22/12/15</p>
          </div>
          <BiChevronRight/>
        </Link>

        <Link to="/mypage/notice/detail" className={styles.comment_container}>
          <div className={styles.comment}>
            <p>카카오톡 장애로 불편을 드려 죄송합니다.</p>
            <p>22/12/15</p>
          </div>
          <BiChevronRight/>
        </Link>
        <Link to="/mypage/notice/detail" className={styles.comment_container}>
          <div className={styles.comment}>
            <p>완연해진 가을에 찾아온 9.9.5 업데이트 안내</p>
            <p>22/12/15</p>
          </div>
          <BiChevronRight/>
          </Link>
      </div>
    </div>
  );
};

export default Notice;