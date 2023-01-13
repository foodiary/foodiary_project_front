import { HalfButton, LoginButton } from '@components/common/LoginButton/Button';
import Header from '@components/common/Header/Header';
import styles from '@styles/mypage/myPageSetting.module.scss';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import pen_icon from '@img/pen_icon.svg';
import basic_profile from '@img/basic_profile.svg';
import { WarnBox } from '@components/common/AlertBox/AlertBox';
import { btnStateStore } from '@store/btnStateStore';
import { useLoginUserStore } from '@store/loginUserStore';
import { useUserStore } from '@store/userStore';
import axiosConfig from '../../../core/apis/utils/axiosConfig';

const MyPageSetting = () => {
  const navigate = useNavigate();
  const [viewBtn, setViewBtn] = useState(false);
  const [alert, setAlert] = useState(false);
  const [basicImg, setBasicImg] = useState(false);
  const cancel = btnStateStore(state=>state.cancel);
  const setCancel = btnStateStore(state=>state.setCancel);

  // const {memberLoginId, memberId, memberEmail, memberPath, memberProfile, memberNickName} = useLoginUserStore();
  const userInfo = useLoginUserStore(state=>state.userInfo);
  const profileMsg = useUserStore(state=>state.profileMsg);
  const setProfileMsg = useUserStore(state=>state.setProfileMsg);
  const newNickName = useUserStore(state=>state.newNickName);
  const newProfileMsg = useUserStore(state=>state.newProfileMsg);
  // console.log(memberLoginId, memberEmail, memberPath, memberProfile, memberNickName);
  // useEffect(()=>{
  //   setProfileMsg("");
  // },[]);

  const onClick = ()=>{
    setCancel(false);
    setAlert(true);
  }

  const onModifyImg = ()=>{
    navigate("/member/img/change");
  }
  const removeImg = ()=>{
    setCancel(true);
    setViewBtn(false);
    setBasicImg(true);
    console.log("이미지 삭제 기본이미지로 대체");
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    console.log("제출");
    // axiosConfig.patch(`/member/${memberId}`, {
    //   nickName: newNickName,
    //   profile: newProfileMsg,
    // }).then(res=>{
    //   console.log(res);
    // }).catch(err=>{
    //   console.log(err);
    // })
    //서버에 수정된 프로필 전체 내용 넘기기
  }
  return (
    <div className={styles.profile}>
      <div className={styles.profile_container}>
        {basicImg? 
          <img src={basic_profile} alt="기본이미지"/>:
          <img src={userInfo.memberPath? userInfo.memberPath: basic_profile} alt="기본이미지" 
            className={styles.profile_img}/>
        }

        <div className={styles.user_nickname}>
          <p>{newNickName? newNickName: userInfo.memberNickName}</p>
        </div>

        <div className={styles.user}>
          <div className={styles.info}>
            <p>아이디</p>
            <p>{userInfo.memberLoginId}</p>
          </div>
          <div className={styles.info}>
            <p>이메일</p>
            <p>{userInfo.memberEmail}</p>
          </div>
        </div>

        <p className={styles.profile_msg}>
          {newProfileMsg? newProfileMsg : userInfo.memberProfile}
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
              <div onClick={onModifyImg}><HalfButton text='수정' type='button'/></div>
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