import create from 'zustand';

interface User{
  id: string;
  pwd: string;
  more_pwd: string;
  email: string;
  nickName: string;
  profileImg: File | string;
  // profileImg: Blob | string;
  profileMsg: string;

  choiceTerms: string; // Y or N
  requiredTerms: string;

  checkedList: string[];
  validationErr: boolean;
  mailauth: string;

  duplicationErr: boolean;
  oauthLogin: boolean;

  newProfileMsg: string;
  newNickName: string;
  newProfileImg: File | string;
}
interface SetUser{
  setId: (id:User['id'])=>void;
  setPwd: (pwd:User['pwd'])=>void;
  setMorePwd: (morePwd:User['more_pwd'])=>void;
  setEmail: (email:User['email'])=>void;
  setNickName: (nickname:User['nickName'])=>void;
  setProfileImg: (img:User['profileImg'])=>void;
  setProfileMsg: (msg:User['profileMsg'])=>void;

  setChoiceTerms: (choiceTerms:User['choiceTerms'])=>void;
  setRequiredTerms: (requiredTerms:User['requiredTerms'])=>void;
  setCheckedList: (item:User['checkedList'])=>void

  setValidationErr: (err:boolean)=>void;
  setMailAuth: (mailauth:User['mailauth'])=>void;
  // setInfo: (type:string, value:string)=>void;
  // setInfo: (type:User[{type}], value:string)=>void;
  setDuplicationErr: (duplicationErr:User['duplicationErr'])=>void;
  setOAuthLogin: (oauthLogin:User['oauthLogin'])=>void;

  setNewProfileMsg: (newmsg:User['newProfileMsg'])=>void;
  setNewNickName: (newnn:User['newNickName'])=>void;
  setNewProfileImg: (newimg:User['newProfileImg'])=>void;
}
export const useUserStore = create<User&SetUser>(set => ({
  id: "",
  pwd: "",
  more_pwd: "",
  email: "",
  nickName: "",
  profileImg: "",
  profileMsg: "",

  choiceTerms: "N",
  requiredTerms: "N",
  checkedList: [],

  validationErr: true,
  mailauth: "",

  duplicationErr: false,
  oauthLogin: false,

  newProfileMsg: "",
  newNickName: "",
  newProfileImg: "",

  setId: (id)=> set(()=>({id: id})),
  setPwd: (pwd)=> set(()=>({pwd: pwd})),
  setMorePwd: (more_pwd)=> set(()=>({more_pwd: more_pwd})),
  setEmail: (em)=> set(()=>({email: em})),
  setNickName: (name)=> set(()=>({nickName: name})),
  setProfileImg: (img)=> set(()=>({profileImg: img})),
  setProfileMsg: (msg)=> set(()=>({profileMsg: msg})),

  setChoiceTerms: (bool)=> set(()=>({choiceTerms: bool})),
  setRequiredTerms: (bool)=> set(()=>({requiredTerms: bool})),
  setCheckedList: (item)=> set(()=>({checkedList: item})),

  setValidationErr: (err)=>set({validationErr:err}),
  setMailAuth: (num)=>set(()=>({mailauth:num})),
  setDuplicationErr: (bool)=>set(()=>({duplicationErr:bool})),
  setOAuthLogin: (bool)=>set(()=>({oauthLogin:bool})),

  setNewProfileMsg: (msg)=>set(()=>({newProfileMsg:msg})),
  setNewNickName: (name)=>set(()=>({newNickName: name})),
  setNewProfileImg: (img)=>set(()=>({newProfileImg:img})),
}));
