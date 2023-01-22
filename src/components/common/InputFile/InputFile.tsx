import { useImgFileStore } from '@store/fileStore';
import React, { useState } from 'react';
import { AlertBox } from '../AlertBox/AlertBox';

interface FileOption{
  multiple?: boolean;
}
const InputFile = ({multiple=false}:FileOption) => {
  const FILE_SIZE_MAX_LIMIT = 3 * 1024 * 1024;  //3MB

  const setFileURL = useImgFileStore(state=>state.setFileURL);
  const setImg = useImgFileStore(state=>state.setImg);
  const setIsThumbnail = useImgFileStore(state => state.setIsThumbnail)

  const [err, setErr] = useState(false);
  const [fileArr, setFileArr] = useState<File[]>([])

  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.currentTarget.files!;
    setErr(false);
    setIsThumbnail(true)

    let list = [];
    let urlList = [];
    console.log(file);

    for(let i=0; i < file.length; i++){
      list.push(file[i]);
      urlList.push(URL.createObjectURL(file[i]));
    }
    setFileArr(list);
    console.log(urlList);

    if(file[0].size > FILE_SIZE_MAX_LIMIT){
      setImg([]);
      setErr(true);
    }
    else{
      setErr(false);
      setFileURL(urlList);
      setImg(list); 
    }
    e.target.value = "";
  }

  return (
    <div>
      <input type="file" id='file' 
        accept='.jpg, .jpeg, .png'
        multiple= {multiple}
        onChange={onFileChange}>
      </input>
      {err && <AlertBox text='파일 사이즈는 3MB 이하입니다' type={false}/>}
    </div>
  );
};

export default InputFile;