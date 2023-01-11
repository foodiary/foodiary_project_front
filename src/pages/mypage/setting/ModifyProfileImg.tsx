import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import { Intro, ValidationText } from '@components/common/Text/SignUpPageText';
import { LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import { useNavigate } from 'react-router-dom';
import camera_icon from '@img/camera_icon.svg';
import basic_profile from '@img/basic_profile.svg';
import axiosConfig from '../../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';

const ModifyProfileImg = () => {
  const navigate = useNavigate();
  // const setNewProfileImg= useUserStore(state=>state.setNewProfileImg);
  const memberId = useLoginUserStore(state=>state.memberId);
  const memberProfile = useLoginUserStore(state=>state.memberProfile);

  const FILE_SIZE_MAX_LIMIT = 3 * 1024 * 1024;  //3MB
  const [img, setImg] = useState<File>();

  const [fileURL, setFileURL] = useState(""); //파일 미리보기
  const [err, setErr] = useState(false);

  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.currentTarget.files![0];
    if(file.size > FILE_SIZE_MAX_LIMIT){
      setImg(undefined);
      setErr(true);
      // alert("파일용량제한"); //경고문구로 변경하기
    }
    else{
      setErr(false);
      setFileURL(URL.createObjectURL(file));
      setImg(e.currentTarget.files![0]); //-> formData에 바로 올리면 됨
    }
    e.target.value = "";
    // console.log(e.currentTarget.files![0].size);
  }
  const handleFile = (e:FormEvent)=>{
    e.preventDefault();
    // axiosConfig.patch(`/member/image/${memberId}`,{
    //   memberImage:img,
    // }).then(res=>{
    //   console.log(res);
    // }).catch(err=>{
    //   console.log(err);
    // })
    navigate('/mypage/setting');
  }
  const initFile = ()=>{
    setFileURL('');
    setImg(undefined);
  }
  console.log(img);
  console.log(fileURL);
  return (
      <div>
        <div className={styles.profile_container}>
          <Intro intro1={"변경할"} span={"프로필 이미지를"} intro2={"입력해주세요."}/>          
          {fileURL?
            <>
              <img alt='첨부사진' src={fileURL} className={styles.preview}/>
              <div className={styles.text}><ValidationText text='png/jpeg/jpg 용량 3MB 이하' color={err? 'red': 'green'}/></div>
            </>:
            <>
              <img alt='원래사진' src={memberProfile} className={styles.basic_profile}/>
              <div className={styles.text}><ValidationText text='png/jpeg/jpg 용량 3MB 이하' color='grey'/></div>
            </>
          }

          <form onSubmit={handleFile}>
            <div className={styles.file_container}>
              <label htmlFor='file'>
                {img === undefined ? 
                  <>
                    <img src={camera_icon} alt="카메라아이콘" className={styles.camera_icon}/>
                    <p>사진 등록하기</p>
                  </>:
                  <>
                    <p>{img?.name}</p>
                  </>
                }
              </label>
              <input type="file" id='file' 
                accept='.jpg, .jpeg, .png'
                onChange={onFileChange}>
              </input>
            </div>
            {fileURL && 
              <button type='button' className={styles.init} onClick={initFile}>
                <MdOutlineCancel/>
              </button>}
            <LoginButton type="submit" text='확인' active={true}/>
          </form>
        </div>
      </div>
  );
};

export default ModifyProfileImg;