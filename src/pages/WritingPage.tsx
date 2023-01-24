import React, { FormEvent, useEffect, useState } from 'react';
import styles from '@styles/writingPage.module.scss';
import { LoginButton } from '@components/common/LoginButton/Button';
import InputFile from '@components/common/InputFile/InputFile';
import { useImgFileStore } from '@store/fileStore';
import axiosConfig from '@utils/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginUserStore } from '@store/loginUserStore';
import camera_icon from '@img/camera_icon.svg';

interface WritingPageProps {
  edit : boolean
}

interface ResType {
  dailyBody: string;
  dailyComment: number;
  dailyCreate: string;
  dailyLike: number;
  dailyImageList: string[];
  dailyTitle: string;
  dailyView: number;
  dailyWriter: string;
  memberId: number;
  userCheck: boolean; //본인이 쓴 글인지
}

const WritingPage = ({edit}:WritingPageProps) => {



// memberId*	integer($int32)
// 회원 시퀀스

// path*	string
// 이미지 경로1


  const navigate = useNavigate();
  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  // const [files, setFiles] = useState<File>();
  const fileURL = useImgFileStore(state=>state.fileURL);
  const img = useImgFileStore(state=>state.img);
  const [loading, setLoading] = useState(false);
  const memberLoginId = useLoginUserStore(state=>state.userInfo.memberLoginId);
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const [contents, setContents] = useState<ResType>();
const isThumbnail = useImgFileStore(state => state.isThumbnail)
  const id = useParams().id

  console.log(isThumbnail)

  const getContents = () => {
    axiosConfig
      .get(`/dailys/details`, {
        params: { dailyId: id, memberId: memberId },
      })
      .then((res) => {
        console.log(res);
        setContents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getContents()
  },[])

  console.log(title, content)


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
  formData.append('thumbnail', img[0]);
  formData.append('dailyWrite', new Blob([JSON.stringify(writeInfo)], {
    type: "application/json"
  }));  




  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    const headers = {"Content-Type": "multipart/form-data"};
    setLoading(true);
    axiosConfig.post("/daily", formData ,{headers})
      .then(res=>{
        console.log(res);
        if(res){
          setLoading(false);
          navigate("/explore");
        }
        //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
      }).catch(err=>{
        console.log(err);
      })
  }

  const editWriteInfo={
    title: title || contents?.dailyTitle,
    content: content || contents?.dailyBody,
    thumbnailYn : isThumbnail,
    deletePath : [contents?.dailyImageList[0]],
    // thumbnailPath : img[0]
  }

  let editFormData = new FormData();
  editFormData.append("dailyEdit", new Blob([JSON.stringify(editWriteInfo)], {
    type: "application/json"
  }))
  editFormData.append('dailyImage', img[0]);

  const onEdit = (e:FormEvent)=>{
    e.preventDefault();
    const headers = {"Content-Type": "multipart/form-data"};
    setLoading(true);
    axiosConfig.post(`/daily/${id}/${memberId}`, editFormData ,{headers})
      .then(res=>{
        console.log(res);
        if(res){
          setLoading(false);
          navigate(`/detail/${id}`);
        }
        //성공이면 그대로 , 실패면(중복) 넘어가면 안됨
      }).catch(err=>{
        console.log(err);
      })
  }

  return (
    <div>
     
      <form onSubmit={edit ? onEdit : onSubmit} encType="multipart/form-data">
      <div className={styles.write_container}>
        <p>하루 식단 글 {edit ? "수정" : "작성"}</p>
        <input type="text" placeholder='제목' className={styles.title}
          name="title" onChange={onChange} value={title || contents?.dailyTitle}/>
        <textarea 
          placeholder='오늘 하루 먹은 음식을 기록해보세요!'
          name='content'
          onChange={onChange}
          value={content || contents?.dailyBody}
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
        {fileURL.length > 0?
            <img src={fileURL[0] || contents?.dailyImageList[0]} alt="첨부파일" className={styles.attach_img}/>: null
          }
      </div>
          <LoginButton 
            text='작성 완료' 
            type='submit' 
            active={edit || title && content ?true:false}/>
      </form>
    </div>
  );
};

export default WritingPage;