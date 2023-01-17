import React, { useEffect, useState } from 'react';
import InputFile from '../InputFile/InputFile';
import styles from './writingForm.module.scss';
import clip_icon from '@img/clip_icon.svg';
import {MdCancel} from 'react-icons/md';
import { HalfButton } from '../LoginButton/Button';
import { useImgFileStore } from '@store/fileStore';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axiosConfig from '@utils/axiosConfig';
import { useWritingFormStore } from '@store/writingFormStore';
import { useLoginUserStore } from '@store/loginUserStore';
import { btnStateStore } from '@store/btnStateStore';
import { AlertBox, WarnBox } from '../AlertBox/AlertBox';
import { useNavigate } from 'react-router-dom';

// 글쓰기, 문의하기 글쓰기, 글 수정하기에 사용되는 폼 

interface Form{
  writingTitle: string;
  writingContent: string;
  //이미지
}

interface PropsType{
  maxLength?: number; //최대 제한 글자(내용부분)
  edit?: boolean; //수정 모드인지 -> 이걸로 통신 메쏘드 결정
  storedTitle?: string; //수정할때 타이틀 가져오기
  storedContent?: string; //수정할때 내용 가져오기
  label?: string; //'문의내용' / '내용' 라벨 구분
  url?: string; //서버 api
  existingPath?: string;
}

const WritingForm = ({
  storedTitle, 
  storedContent,
  maxLength,
  url,
  existingPath,
  edit=false,
  label='내용'
}:PropsType) => {

  const {register, handleSubmit, watch, reset} = useForm<Form>({
    mode: "onChange",
    defaultValues:{
      writingTitle: storedTitle? storedTitle: "",
      writingContent: storedContent? storedContent: "",
    }
  });

  const [length, setLength] = useState(0); //내용 길이
  const navigate = useNavigate();

  const img = useImgFileStore(state=>state.img);
  const setImg = useImgFileStore(state=>state.setImg);

  const fileURL = useImgFileStore(state=>state.fileURL);
  const setFileURL = useImgFileStore(state=>state.setFileURL);

  const setTitle = useWritingFormStore(state=>state.setTitle);
  const setContent = useWritingFormStore(state=>state.setContent);

  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const [removeExistingImg, setRemoveExistingImg] = useState(false);

  const [forbidden, setForbidden] = useState(false); //글, 내용 작성해주세요

  const cancel = btnStateStore(state=>state.cancel); //작성취소의 취소
  const setCancel = btnStateStore(state=>state.setCancel); //작성취소의 취소
  const [alert, setAlert] = useState(false); //작성취소 알럿창

  const onFileInit = ()=>{
    setFileURL("");
    setImg("");
  }

  console.log(img);

  const onSubmit = (data:Form)=>{
    console.log(data.writingTitle);
    // setTitle(data.writingTitle);
    // setContent(data.writingContent);
    const writeInfo = {
      memberId: memberId,
      questionContent: data.writingContent,
      questionTitle: data.writingTitle,
      questionPath: existingPath, //없으면 빈값
    }
    let formData = new FormData();
    if(img){
      formData.append('memberImage', img);
    }
    formData.append('memberQuestionWriteResponseDto', new Blob([JSON.stringify(writeInfo)], {
      type: "application/json"
    }));

    if(!watch('writingTitle') || !watch('writingContent')){
      setForbidden(true);
      console.log("제출");
    }
    else{
      const headers = {"Content-Type": "multipart/form-data"};
      axiosConfig({
        url : url,
        method : edit? 'patch': 'post',
        data : formData,
        headers : headers,
      }).then(res=>{
        console.log(res);
        setFileURL("");
        setImg("");

      }).catch(err=>{
        console.log(err);
      })
      // axiosConfig(

      //   (url!, formData ,{headers})
      //   .then(res=>{
      //     console.log(res);
      //     if(res){
      //       window.alert("완료되었습니다");
      //     }
      //   }).catch(err=>{
      //     console.log(err);
      // })
    }

  }
  const onCancel = ()=>{
    setCancel(false);
    setAlert(true);
    console.log('취소');
  }
  useEffect(()=>{
    setLength((watch('writingContent')).length);
  },[watch('writingContent')]);

  return (
    <div className={styles.writing_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <p>제목</p>
          <input 
            type="text" 
            id='writing_title'
            {...register('writingTitle')}
            maxLength={50} 
            required
            placeholder="제목을 입력해주세요."/>
      </div>

      <div className={styles.content}>
        <p>{label}</p>
        <div className={styles.textarea_container}>
          <textarea 
            maxLength={maxLength} 
            required
            {...register('writingContent')}
            placeholder="오류화면 캡쳐, PC 정보 제공과 함께 오류 현상을 자세히 기재해 주세요."
          />
          <p className={styles.maxlength}>{length}/{maxLength}</p>
        </div>
      </div>

      <div className={styles.file}>
        <p>파일 첨부</p>
        <label htmlFor='file'>
          <p className={styles.add_img}>+ 파일 첨부</p>
        </label>
        <InputFile/>
        <img src={clip_icon} alt="첨부파일"/>
      </div>

      {existingPath && !removeExistingImg && 
        <div className={styles.preview_container}>
          <img alt='수정시기존사진' src={existingPath} className={styles.preview}/>
          <button onClick={()=>setRemoveExistingImg(true)}>
            <MdCancel/>
          </button>
        </div>
      }
      {fileURL && 
        <div className={styles.preview_container}>
          <img alt='첨부사진' src={fileURL} className={styles.preview}/>
          <button onClick={onFileInit}>
            <MdCancel/>
          </button>
        </div>
      }

      <div className={styles.btn_container}>
        <div className={styles.red}>
          <HalfButton text={edit? '수정완료': '작성완료'} type='submit'/>
        </div>
        <div className={styles.black}>
          <HalfButton text='취소' type='button' onClick={onCancel}/>
        </div>
      </div>      
    </form>
      

      {alert && !cancel &&
        <form onSubmit={()=>navigate('/')}>
          <WarnBox text='작성을 취소하시겠습니까?' btn_txt='예'/>
        </form>
      }
      {forbidden && <AlertBox text='내용을 작성해주세요' type={false}/>}
    </div>

  );
};

export default WritingForm;