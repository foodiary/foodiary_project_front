import create from "zustand";


interface Search{
    searchList: string[];
    setSearchList: (state:Search['searchList'])=> void;
  }


export const useSearchStore = create<Search>(set=>({
    searchList: [],
    setSearchList: (state:string[])=>set({searchList:state}),
  }))