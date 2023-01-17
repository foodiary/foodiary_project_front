import { useImgFileStore } from '@store/fileStore';
import React, { useState } from 'react';

interface FileOption{
  multiple?: boolean;
}
const InputFile = ({multiple}:FileOption) => {
  const FILE_SIZE_MAX_LIMIT = 3 * 1024 * 1024;  //3MB

  const setFileURL = useImgFileStore(state=>state.setFileURL);
  const setImg = useImgFileStore(state=>state.setImg);

  // const [img, setImg] = useState<File>();
  // const [img, setImg] = useState<Blob | string>();
  // const [fileURL, setFileURL] = useState(""); //파일 미리보기
  const [err, setErr] = useState(false);
  const [fileArr, setFileArr] = useState<File[]>([])
  // console.log(fileArr);

  const onFileChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.currentTarget.files!;
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
      // setImg(undefined);
      setImg([]);

      // setErr(true);
      alert("파일용량제한"); //경고문구로 변경하기
    }
    else{
      // setErr(false);
      setFileURL(urlList);
      setImg(list); //-> formData에 바로 올리면 됨
    }
    e.target.value = "";
    // console.log(e.currentTarget.files![0].size);
  }
  const initFile = ()=>{
    setFileURL([]);
    // setImg(undefined);
    setImg([]);
  }
  return (
    <div>
      <input type="file" id='file' 
        accept='.jpg, .jpeg, .png'
        multiple={true}
        onChange={onFileChange}>
      </input>
    </div>
  );
};

export default InputFile;