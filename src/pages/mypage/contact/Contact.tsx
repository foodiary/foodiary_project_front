import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from '@styles/mypage/contact.module.scss';
import clip_icon from '@img/clip_icon.svg';
import axiosConfig from '../../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import { HalfButton } from '@components/common/LoginButton/Button';
import { AlertBox, WarnBox } from '@components/common/AlertBox/AlertBox';
import MyContact from './MyContact';
import { btnStateStore } from '@store/btnStateStore';
import { useNavigate } from 'react-router-dom';
import {MdCancel} from 'react-icons/md';
import { useImgFileStore } from '@store/fileStore';
import InputFile from '@components/common/InputFile/InputFile';

const Contact = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId); //멤버시퀀스
  const navigate = useNavigate();

  const [write, setWrite] = useState(true); //탭 모드
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [length, setLength] = useState(0); //내용 길이
  const img = useImgFileStore(state=>state.img);
  const fileURL = useImgFileStore(state=>state.fileURL);
  const setFileURL = useImgFileStore(state=>state.setFileURL);

  // const FILE_SIZE_MAX_LIMIT = 3 * 1024 * 1024;  //3MB
  // const [img, setImg] = useState<File|string>(); //첨부파일
  // const [fileURL, setFileURL] = useState(""); //파일 미리보기

  const cancel = btnStateStore(state=>state.cancel); //작성취소의 취소
  const setCancel = btnStateStore(state=>state.setCancel); //작성취소의 취소

  const questionInfo = {
    memberId: memberId,
    questionContent: content,
    questionTitle: title,
  }
  let formData = new FormData();
  formData.append('memberImage', img!);
  formData.append('memberQuestionWriteResponseDto', new Blob([JSON.stringify(questionInfo)], {
    type: "application/json"
  }));
  
  const [alert, setAlert] = useState(false); //작성취소 알럿창
  const [forbidden, setForbidden] = useState(false); //내용이 비었을때 경고창

  useEffect(()=>{
    let id:ReturnType<typeof setTimeout>;
    if(forbidden){
      id = setTimeout(()=>setForbidden(false),2000);
      // return clearTimeout(id);
    }
    
  },[forbidden]);

  const onTitleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = e.target;
    setTitle(value);
  }
  const onContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
    setLength(value.length);
    setContent(value);
  }
  // const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const file = e.currentTarget.files![0];
  //   if(file.size > FILE_SIZE_MAX_LIMIT){
  //     setImg(undefined);
  //     // setErr(true);
  //     // alert("파일용량제한"); //경고문구로 변경하기
  //   }  
  //   else{
  //     // setErr(false);
  //     setFileURL(URL.createObjectURL(file));
  //     setImg(e.currentTarget.files![0]); 
  //   }
  //   e.target.value = "";
  // }

  const onCancel = ()=>{
    setCancel(false);
    setAlert(true);
  }

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    if(!title || !content){
      setForbidden(true);
      console.log("제출");
    }
    else{
      const headers = {"Content-Type": "multipart/form-data"};
      axiosConfig.post("/question", formData ,{headers})
        .then(res=>{
          console.log(res);
          if(res){
            window.alert("완료되었습니다");
          }
        }).catch(err=>{
          console.log(err);
      })
    }
  }
  const onWriteCancel = (e:FormEvent)=>{
    e.preventDefault();
    navigate("/mypage");
  }
  const onFileInit = ()=>{
    setFileURL("");

  }
  
  return (
    <div className={styles.mywriting}>
      <div className={`${styles.tab} ${styles.contact_tab}`}>
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
            <input type="text" maxLength={50} onChange={onTitleChange}
              placeholder="제목을 입력해주세요."/>
          </div>
          <div className={styles.content}>
            <p>문의 내용</p>
            <textarea maxLength={1000} onChange={onContentChange}
              placeholder="오류화면 캡쳐, PC 정보 제공과 함께 오류 현상을 자세히 기재해 주세요."/>
            <p className={styles.maxlength}>{length}/1000</p>

          </div>
          <div className={styles.file}>
            <p>파일 첨부</p>
            <label htmlFor='file'>
              <p className={styles.add_img}>+ 파일 첨부</p>
            </label>
            <InputFile/>
            {/* <input type="file" id='file'
              accept='.jpg, .jpeg, .png'
              onChange={onFileChange}
            /> */}
            <img src={clip_icon} alt="첨부파일"/>
          </div>
          {fileURL && 
            <div className={styles.preview_container}>
              <img alt='첨부사진' src={fileURL} className={styles.preview}/>
              <button onClick={onFileInit}>
                <MdCancel/>
              </button>
            </div>
          }
          <div className={styles.btn_container}>
            <form onClick={onSubmit} className={styles.red}>
              <HalfButton text='작성완료' type='submit'/>
            </form>
            <div onClick={onCancel} className={styles.black}>
              <HalfButton text='취소' type='button'/>
            </div>
          </div>
        </div>:
        <MyContact/>
      }
      {alert && !cancel &&
        <form onSubmit={onWriteCancel}>
          <WarnBox text='작성을 취소하시겠습니까?' btn_txt='예'/>
        </form>
      }
      {forbidden && <AlertBox text='내용을 작성해주세요' type={false}/>}
    </div>
  );
};

export default Contact;