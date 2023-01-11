import Card from '@components/common/Card';
import React, { useState } from 'react';
import styles from '@styles/mypage/contact.module.scss';
import Header from '@components/common/Header/Header';
import clip_icon from '@img/clip_icon.svg';
import { Link } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';

const Contact = () => {
  const [write, setWrite] = useState(true);
  const [length, setLength] = useState(0);
  const [img, setImg] = useState<File>();

  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
    setLength(value.length);
  }
  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setImg(e.currentTarget.files![0]);
  }
  return (
    <div className={styles.mywriting}>
      <Header/>
      <div className={styles.tab}>
        <button 
          className={write? styles.active: styles.non_active}
          onClick={()=>{setWrite(true)}}
        >
          1:1 문의하기
          {write && <div className={styles.text_deco}></div>}
        </button>
        <button 
          className={!write? styles.active: styles.non_active}
          onClick={()=>{setWrite(false)}}
        >
          문의내역 확인
          {!write && <div className={styles.text_deco}></div>}
        </button>
      </div>

      {write? 
      <div className={styles.contact_container}>
        <div className={styles.title}>
          <p>제목</p>
          <input type="text" maxLength={50}
            placeholder="제목을 입력해주세요."/>
        </div>
        <div className={styles.content}>
          <p>문의 내용</p>
          <textarea maxLength={1000} onChange={onChange}
            placeholder="오류화면 캡쳐, PC 정보 제공과 함께 오류 현상을 자세히 기재해 주세요."/>
          <p className={styles.maxlength}>{length}/1000</p>

        </div>
        <div className={styles.file}>
          <p>파일 첨부</p>
          <label htmlFor='file'>
            <p className={styles.add_img}>+ 파일 첨부</p>
          </label>
          <input type="file" id='file'
            accept='.jpg, .jpeg, .png'
            onChange={onFileChange}
          />
          <img src={clip_icon} alt="첨부파일"/>
        </div>
      </div>:
        <div className={styles.board}>
        <Link to="/mypage/contact/detail" className={styles.comment_container}>
          <div className={styles.comment}> {/*넘길때 ??? */}
            <p>문의 제목이 들어가는 공간입니다.</p>
            <div className={styles.status}>
              <p className={styles.state}>답변대기</p>
              <p>2022.12.30</p>
            </div>
          </div>
          <BiChevronRight/>
        </Link>

        <Link to="/mypage/contact/detail" className={styles.comment_container}>
        <div className={styles.comment}> {/*넘길때 ??? */}
            <p>문의 제목이 들어가는 공간입니다.</p>
            <div className={styles.status}>
              <p className={styles.state}>답변완료</p>
              <p>2022.12.30</p>
            </div>
          </div>
          <BiChevronRight/>
        </Link>
      </div>
      }
    </div>
  );
};

export default Contact;