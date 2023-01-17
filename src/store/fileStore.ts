import create from 'zustand';

interface FileURL{
  fileURL: string[];
  setFileURL: (urls:string[])=>void;
  img: File[] | string;
  setImg: (fileList:File[] | string)=>void;
}

export const useImgFileStore = create<FileURL>(set => ({
  fileURL: [],
  setFileURL: (urls)=> set(()=>({fileURL: urls})),
  img: [],
  setImg: (fileList)=>set(()=>({img: fileList})),
}));
