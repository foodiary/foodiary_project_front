import React, { useEffect, useState } from 'react';
import InputFile from '../InputFile/InputFile';
import styles from './contactForm.module.scss';
import clip_icon from '@img/clip_icon.svg';
import {MdCancel} from 'react-icons/md';
import { HalfButton } from '../LoginButton/Button';
import { useImgFileStore } from '@store/fileStore';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface Form{
  contactTitle: string;
  contactContent: string;
}

interface PropsType{
  storedTitle: string;
  storedContent: string;
}
const ContactForm = ({storedTitle, storedContent}:PropsType) => {
  const {register, handleSubmit} = useForm<Form>();


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [length, setLength] = useState(0); //내용 길이

  useEffect(()=>{
    setTitle(storedTitle);
    setContent(storedContent);
  },[]);

  const img = useImgFileStore(state=>state.img);
  const fileURL = useImgFileStore(state=>state.fileURL);
  const setFileURL = useImgFileStore(state=>state.setFileURL);

  const onTitleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = e.target;
    setTitle(value);
  }
  const onContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {value} = e.target;
    setLength(value.length);
    setContent(value);
  }
  const onFileInit = ()=>{
    setFileURL("");
  }

  const onSubmit:SubmitHandler<Form> = (data)=>{
    console.log(data);
  }
  return (
    <div className={styles.contact_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.contact_title}>
        <p>제목</p>
          <input 
            type="text" 
            id='contact_title'
            {...register('contactTitle')}
            maxLength={50} 
            // onChange={onTitleChange}
            // value = {title}
            placeholder="제목을 입력해주세요."/>
      </div>

      <div className={styles.content}>
        <p>문의 내용</p>
          <textarea 
            maxLength={1000} 
            onChange={onContentChange}
            value = {content}
            placeholder="오류화면 캡쳐, PC 정보 제공과 함께 오류 현상을 자세히 기재해 주세요."/>
          <p className={styles.maxlength}>{length}/1000</p>
      </div>

      <div className={styles.file}>
        <p>파일 첨부</p>
        <label htmlFor='file'>
          <p className={styles.add_img}>+ 파일 첨부</p>
        </label>
        <InputFile/>
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
      <button type='submit'>제출</button>
      </form>
      {/* <div className={styles.btn_container}>
        <form onClick={onSubmit} className={styles.red}>
          <HalfButton text='작성완료' type='submit'/>
        </form>
        <div onClick={onCancel} className={styles.black}>
          <HalfButton text='취소' type='button'/>
        </div>
      </div> */}
    </div>

      // {alert && !cancel &&
      //   <form onSubmit={onWriteCancel}>
      //     <WarnBox text='작성을 취소하시겠습니까?' btn_txt='예'/>
      //   </form>
      // }
      // {forbidden && <AlertBox text='내용을 작성해주세요' type={false}/>}
  );
};

export default ContactForm;