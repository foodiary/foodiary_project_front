import { useImgFileStore } from "@store/fileStore";
import React, { useState } from "react";
import { AlertBox } from "../AlertBox/AlertBox";

interface FileOption {
  multiple?: boolean;
}
const InputFile = ({ multiple = false }: FileOption) => {
  const FILE_SIZE_MAX_LIMIT = 3 * 1024 * 1024; //3MB

  const fileURL = useImgFileStore((state) => state.fileURL);
  const setFileURL = useImgFileStore<any>((state) => state.setFileURL);
  const setImg = useImgFileStore<any>((state) => state.setImg);
  const img = useImgFileStore<any>((state) => state.img);
  const setIsThumbnail = useImgFileStore((state) => state.setIsThumbnail);

  const [err, setErr] = useState(false);
  const [fileArr, setFileArr] = useState<File[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files!;
    setErr(false);
    setIsThumbnail(true);

    let list = [];
    let urlList = [];
    console.log(`파일 사이즈: ${file[0].size}`); //byte 기준

    for (let i = 0; i < file.length; i++) {
      list.push(file[i]);
      urlList.push(URL.createObjectURL(file[i]));
    }
    setFileArr(list);
    console.log(urlList);

    if (file[0].size > FILE_SIZE_MAX_LIMIT) {
      setImg([]);
      setErr(true);
    } else {
      setErr(false);
      setFileURL([...fileURL, ...urlList]);
      setImg([...img, ...list]);
    }
    e.target.value = "";
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        multiple={multiple}
        onChange={onFileChange}
      ></input>
      {err && <AlertBox text="파일 사이즈는 3MB 이하입니다" type={false} />}
    </div>
  );
};

export default InputFile;
