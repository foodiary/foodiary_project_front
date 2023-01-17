import React, { FormEvent, useState } from 'react';
import styles from '@styles/writingPage.module.scss';
import { LoginButton } from '@components/common/LoginButton/Button';
import InputFile from '@components/common/InputFile/InputFile';
import { useImgFileStore } from '@store/fileStore';
import axiosConfig from '@utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useLoginUserStore } from '@store/loginUserStore';
import camera_icon from '@img/camera_icon.svg';

const WritingPage = () => {


// memberId*	integer($int32)
// 회원 시퀀스

// path*	string
// 이미지 경로1


  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [files, setFiles] = useState<File>();
  const fileURL = useImgFileStore(state=>state.fileURL);
  const img = useImgFileStore(state=>state.img);
  const [loading, setLoading] = useState(false);
  const memberLoginId = useLoginUserStore(state=>state.userInfo.memberLoginId);
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);

  console.log(fileURL, img);

  const onChange = (e:
    React.ChangeEvent<HTMLInputElement>&React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {name, value} = e.target;
    if(name === "title"){
      setTitle(value);
    }
    else if(name === "content"){
      setContent(value);
    }
  }
  const writeInfo={
    title: title,
    content: content,
    write: memberLoginId,
    memberId: memberId, 
  }

  let formData = new FormData();
  formData.append('dailyImage', img[0]);
  formData.append('dailyWrite', new Blob([JSON.stringify(writeInfo)], {
    type: "application/json"
  }));  

  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    console.log(title, content);
    // const headers = {"Content-Type": "multipart/form-data"};
    // e.preventDefault();
    // setLoading(true);
    // axiosConfig.post("/daily", formData ,{headers})
    //   .then(res=>{
    //     console.log(res);
    //     if(res){
    //       setLoading(false);
    //       setTimeout(()=>{navigate("/");},2000); //성공 알럿창 
    //       // navigate("/");
    //     }
    //     console.log("가입 완료");
    //     //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
    //   }).catch(err=>{
    //     console.log(err);
    //   })
  }

  return (
    <div>
      <div className={styles.write_container}>
        <p>하루 식단 글 작성</p>
        <input type="text" placeholder='제목' className={styles.title}
          name="title" onChange={onChange}/>
        <textarea 
          placeholder='오늘 하루 먹은 음식을 기록해보세요!'
          name='content'
          onChange={onChange}
        />
        <div className={styles.file}>
          <label htmlFor='file'>
            <img src={camera_icon} alt="카메라아이콘" className={styles.camera_icon}/>
            사진 등록하기
          </label>
          <InputFile multiple={true}/>
          {/* {fileURL?
            <img src={fileURL} alt="첨부파일" className={styles.attach_img}/>: null
          } */}
        </div>
        {fileURL?
            <img src={fileURL[0]} alt="첨부파일" className={styles.attach_img}/>: null
          }
      </div>
      <form onSubmit={onSubmit}>
          <LoginButton 
            text='작성 완료' 
            type='submit' 
            active={title && content ?true:false}/>
      </form>
    </div>
  );
};

export default WritingPage;