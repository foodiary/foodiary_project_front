import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import styles from "@styles/loginpage/signUp.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import { Intro } from '@pages/Form';
import { LoginButton } from '@components/common/Button';
import { useUserStore } from '@store/userStore';

const SignUpProfileImage = () => {
  const profileImg= useUserStore(state=>state.profileImg);
  const setProfileImg= useUserStore(state=>state.setProfileImg);
  const [img, setImg] = useState<File>();
  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    // setImg(e.target.files[0]); -> formData에 바로 올리면 됨
    // e.currentTarget.files[0]
    // const fileList = e.currentTarget.files;
    // console.log(fileList[0]);
    // console.log(e.target.files[0]);
  }
  const handleFile = (e:FormEvent)=>{
    e.preventDefault();
    // const blob = new Blob([new ArrayBuffer(data)],{type: 'image/jpg'});
  }
  return (
      <div className={styles.login_container}>
        <div className={styles.profile_container}>
          <Intro intro1={"대표 할"} span={"프로필 이미지를"} intro2={"입력해주세요."}/>
          <p className={styles.omit_p}>(생략가능)</p>
          
          <div className={styles.basic_profile}></div>
          
          <form onSubmit={handleFile}>
          <div className={styles.file_container}>
            <label htmlFor='file'>
              <div className={styles.camera_icon}></div>사진 등록하기
            </label>
            <input type="file" id='file' onChange={onFileChange}></input>
          </div>
          </form>
        </div>
        <LoginButton type="button" text='다음' active={true} url='/signup/profileMsg'/>
      </div>
  );
};

export default SignUpProfileImage;