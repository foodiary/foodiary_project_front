import { HalfButton, LoginButton } from '@components/common/LoginButton/Button';
import Header from '@components/common/Header/Header';
import styles from '@styles/mypage/myPageSetting.module.scss';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import pen_icon from '@img/pen_icon.svg';
import basic_profile from '@img/basic_profile.svg';
import { AlertBox, WarnBox } from '@components/common/AlertBox/AlertBox';
import { btnStateStore } from '@store/btnStateStore';
import { useLoginUserStore } from '@store/loginUserStore';
import { useUserStore } from '@store/userStore';
import axiosConfig from '../../../core/apis/utils/axiosConfig';

const MyPageSetting = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(state);
  const [viewBtn, setViewBtn] = useState(false);

  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const [basicImg, setBasicImg] = useState(false);

  const cancel = btnStateStore(state=>state.cancel);
  const setCancel = btnStateStore(state=>state.setCancel);

  const userInfo = useLoginUserStore(state=>state.userInfo);
  const setUserInfo = useLoginUserStore(state=>state.setUserInfo);

  const [newNickName, setNewNickName] = useState("");
  const [newProfileMsg, setNewProfileMsg] = useState("");

  // let newNickName ="";
  // let newProfileMsg = "";
  // const newNickName = useUserStore(state=>state.newNickName);
  useEffect(()=>{
    if(state){
      if(state.nickName){
        setNewNickName(state.nickName);
      }
      else{
        setNewProfileMsg(state.msg);
      }
    }
  },[]);

  

  // const newProfileMsg = useUserStore(state=>state.newProfileMsg);
  // const setNewNickName = useUserStore(state=>state.setNewNickName);
  // const setNewProfileMsg = useUserStore(state=>state.setNewProfileMsg);

  const [img, setImg] = useState<File>();

  const [modify, setModify] = useState(false);
  // const [, setFileURL] = useState(""); //파일 미리보기

  // useEffect(()=>{
  //   setNewProfileMsg("");
  //   setNewNickName("");
  // },[]);

  const onClick = ()=>{
    setCancel(false);
    setAlert(true);
  }

  // useEffect(()=>{
  //   if(modify){
  //     axiosConfig.get(`/member/${userInfo.memberId}`)
  //     .then(res=>{
  //       console.log(res);
  //       setUserInfo(res.data);
  //     })
  //   }
    
  // },[modify]);

  const onModifyImg = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const img = e.currentTarget.files![0];
    // console.log(img);
    // setImg(e.currentTarget.files![0]);
    console.log(img);
    let formData = new FormData();
    formData.append('memberImage', img!);
    const headers = {"Content-Type": "multipart/form-data"};

    axiosConfig.patch(`/member/image/${userInfo.memberId}`, formData, {headers})
    .then(res=>{
      console.log(res);
      setModify(true);
      return(<AlertBox type={true} text='변경되었습니다'/>)
    }).catch(err=>{
      console.log(err);
    })
    e.target.value = "";
  }
  console.log(modify);
  const removeImg = ()=>{
    setCancel(true);
    setViewBtn(false);
    setBasicImg(true);

    axiosConfig.delete(`/member/image/${userInfo.memberId}`)
    .then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    const nickName = newNickName? newNickName: userInfo.memberNickName;
    const profile = newProfileMsg? newProfileMsg : userInfo.memberProfile;

    axiosConfig.patch(`/member/${userInfo.memberId}`, {
      nickName: nickName,
      profile: profile,
    }).then(res=>{
      console.log(res);
      setSuccess(true);
      setTimeout(()=>{navigate('/mypage')},2000);

    }).catch(err=>{
      console.log(err);
    })
  }

  const clickRef = useRef<HTMLInputElement>(null);

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
              <label htmlFor='img'>
                <div onClick={()=>clickRef.current?.click()}>
                  <HalfButton text='수정' type='button'/>
                </div>
              </label>
              <input type="file" id='img' ref={clickRef} onChange={onModifyImg}/>
              {/* <div onClick={onModifyImg}>
                <HalfButton text='수정' type='button'/>
              </div> */}
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

      {success && <AlertBox text='프로필이 변경되었습니다' type={true}/>}
    </div>
  );
};

export default MyPageSetting;