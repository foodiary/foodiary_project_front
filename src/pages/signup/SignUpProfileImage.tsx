import React, { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import { Intro, ValidationText } from '@components/common/Text/SignUpPageText';
import { LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import { useNavigate } from 'react-router-dom';
import camera_icon from '@img/camera_icon.svg';
import basic_profile from '@img/basic_profile.png';
import { useImgFileStore } from '@store/fileStore';
import InputFile from '@components/common/InputFile/InputFile';

const SignUpProfileImage = () => {
  const navigate = useNavigate();
  const setProfileImg= useUserStore(state=>state.setProfileImg);
  const img = useImgFileStore(state=>state.img);
  const setImg = useImgFileStore(state=>state.setImg);

  const fileURL = useImgFileStore(state=>state.fileURL);
  const setFileURL = useImgFileStore(state=>state.setFileURL);

  // const FILE_SIZE_MAX_LIMIT = 3 * 1024 * 1024;  //3MB

  // const [img, setImg] = useState<File>();
  // const [img, setImg] = useState<Blob | string>();

  // const [fileURL, setFileURL] = useState(""); //파일 미리보기
  const [err, setErr] = useState(false);

  // const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const file = e.currentTarget.files![0];
  //   if(file.size > FILE_SIZE_MAX_LIMIT){
  //     setImg(undefined);
  //     setErr(true);
  //     // alert("파일용량제한"); //경고문구로 변경하기
  //   }
  //   else{
  //     setErr(false);
  //     setFileURL(URL.createObjectURL(file));
  //     setImg(e.currentTarget.files![0]); //-> formData에 바로 올리면 됨
  //   }
  //   e.target.value = "";
  //   // console.log(e.currentTarget.files![0].size);
  // }
  const handleFile = (e:FormEvent)=>{
    e.preventDefault();
    setProfileImg(img[0]);
    navigate('/signup/profileMsg', {state: fileURL[0]});
    // const blob = new Blob([new ArrayBuffer(data)],{type: 'image/jpg'});
  }
  const initFile = ()=>{
    setFileURL([]);
    setImg('');
  }
  console.log(img);
  console.log(fileURL);
  return (
      <div>
        <div className={styles.profile_container}>
          <Intro intro1={"대표 할"} span={"프로필 이미지를"} intro2={"입력해주세요."}/>
          <p className={styles.omit_p}>(생략가능)</p>
          
          {fileURL[0]?
            <>
              <img alt='첨부사진' src={fileURL[0]} className={styles.preview}/>
              <div className={styles.text}><ValidationText text='png/jpeg/jpg 용량 3MB 이하' color={err? 'red': 'green'}/></div>
            </>:
            <>
              <img alt='기본이미지' src={basic_profile} className={styles.basic_profile}/>
              <div className={styles.text}><ValidationText text='png/jpeg/jpg 용량 3MB 이하' color='grey'/></div>
            </>
          }

          <form onSubmit={handleFile}>
            <div className={styles.file_container}>
              <label htmlFor='file'>
                <img src={camera_icon} alt="카메라아이콘" className={styles.camera_icon}/>
                <p>사진 등록하기</p>
              </label>
              <InputFile/>
            </div>
            {fileURL[0] && 
              <button type='button' className={styles.init} onClick={initFile}>
                <MdOutlineCancel/>
              </button>}
            <LoginButton type="submit" text='다음' active={true}/>
          </form>
        </div>
      </div>
  );
};

export default SignUpProfileImage;