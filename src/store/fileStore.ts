import create from 'zustand';

interface FileURL{
  fileURL: string;
  setFileURL: (url:string)=>void;
  img: File | string;
  setImg: (file:File | string)=>void;
}

export const useImgFileStore = create<FileURL>(set => ({
  fileURL: "",
  setFileURL: (url)=> set(()=>({fileURL: url})),
  img: "",
  setImg: (file)=>set(()=>({img: file})),
}));
