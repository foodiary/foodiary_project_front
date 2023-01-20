import create from "zustand";

interface Err{
  err: string;
  setErr: (msg:Err['err'])=> void;
}

export const useErrorStore = create<Err>(set=>({
  err: "",
  setErr: (msg)=> set({err: msg}),
}))