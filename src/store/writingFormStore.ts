import create from "zustand";

interface FormType{
  title: string;
  content: string;
  setTitle: (str:FormType['title'])=>void;
  setContent: (str:FormType['content'])=>void;
}

export const useWritingFormStore = create<FormType>(set=>({
  title: "",
  content: "",
  setTitle: (str)=>set(()=>({title: str})),
  setContent: (str)=>set(()=>({content: str})),
}));