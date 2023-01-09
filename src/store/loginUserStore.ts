import create from 'zustand';

interface User{
  id: string;
  // pwd: string;
  email: string;
  nickName: string;
  profileImg: File | string;
  profileMsg: string;

}
interface SetUser{
  setId: (id:User['id'])=>void;
  // setPwd: (pwd:User['pwd'])=>void;
  setEmail: (email:User['email'])=>void;
  setNickName: (nickname:User['nickName'])=>void;
  setProfileImg: (img:User['profileImg'])=>void;
  setProfileMsg: (msg:User['profileMsg'])=>void;
}

export const useLoginUserStore = create<User&SetUser>(set => ({
  id: "",
  // pwd: "",
  email: "",
  nickName: "",
  profileImg: "",
  profileMsg: "",

  setId: (id)=> set(()=>({id: id})),
  // setPwd: (pwd)=> set(()=>({pwd: pwd})),
  setEmail: (em)=> set(()=>({email: em})),
  setNickName: (name)=> set(()=>({nickName: name})),
  setProfileImg: (img)=> set(()=>({profileImg: img})),
  setProfileMsg: (msg)=> set(()=>({profileMsg: msg})),
}));
