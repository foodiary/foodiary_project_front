import { HalfButton, LoginButton } from '@components/common/LoginButton/Button';
import Header from '@components/common/Header/Header';
import styles from '@styles/mypage/myPageSetting.module.scss';
import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import pen_icon from '@img/pen_icon.svg';
import basic_profile from '@img/basic_profile.svg';
import { WarnBox } from '@components/common/AlertBox/AlertBox';
import { btnStateStore } from '@store/btnStateStore';

const MyPageSetting = () => {
  const [viewBtn, setViewBtn] = useState(false);
  const [alert, setAlert] = useState(false);
  const cancel = btnStateStore(state=>state.cancel);
  const setCancel = btnStateStore(state=>state.setCancel);

  const onClick = ()=>{
    setCancel(false);
    setAlert(true);
  }
  const removeImg = ()=>{
    setCancel(true);
    setViewBtn(false);
    console.log("이미지 삭제 기본이미지로 대체");
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    //서버에 수정된 프로필 전체 내용 넘기기
  }
  return (
    <div className={styles.profile}>
      <Header/> 
      <div className={styles.profile_container}>
        <img src={basic_profile} alt="기본이미지" className={styles.profile_img}/>

        <div className={styles.user_nickname}>
          <p>ffoodyy</p>
        </div>

        <div className={styles.user}>
          <div className={styles.info}>
            <p>아이디</p>
            <p>ffoodyy</p>
          </div>
          <div className={styles.info}>
            <p>이메일</p>
            <p>ffoodyy@gmail.com</p>
          </div>
        </div>

        <p className={styles.profile_msg}>
          맛집투어만큼 만들기를 좋아하는 ffoodyyyyy
        </p>    
      </div>
      
      <div className={styles.btn_set}>
        <button onClick={()=>{setViewBtn(true)}} className={styles.modify_btn}>
          <img src={pen_icon} alt="프로필이미지 수정"/>
        </button>
      
        <Link to='/member/nickname/change' className={styles.modify_btn}>
          <img src={pen_icon} alt="닉네임 수정"/>
        </Link>
        <Link to='/member/msg/change' className={styles.modify_btn}>
          <img src={pen_icon} alt="프로필메세지 수정"/>
        </Link>
      </div>

      {viewBtn ?
        <div className={styles.modal_back}>
          <div className={styles.btn_container}>
            <div className={styles.black}>
              {/* <label htmlFor='img'>
                dkgkgk
                <div><HalfButton text='수정' type='button'/></div>
              </label>
              <input type="file" id='img'/> */}
              <HalfButton text='수정' type='button'/>
            </div>
            <div className={styles.red} onClick={onClick}>
              <HalfButton text='삭제' type='submit'/>
            </div>
          </div>
          {alert && !cancel &&
            <form onSubmit={removeImg}>
              <WarnBox text='정말 삭제하시겠습니까?' btn_txt='삭제'/>
            </form>}
          </div>:
        <form className={styles.btn} onSubmit={onSubmit}>
          <LoginButton type='submit' text='완료' active={true}/>
        </form>

      }
    </div>
  );
};

export default MyPageSetting;