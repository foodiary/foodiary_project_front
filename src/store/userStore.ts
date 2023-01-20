import create from 'zustand';

interface User{
  id: string;
  pwd: string;
  more_pwd: string;
  email: string;
  nickName: string;
  profileImg: File | string; // null일까?
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

  emailYn: string; // 중복확인 값: Y인지 N인지
  loginYn: string; //아이디
  nickNameYn: string;
  passwordYn: string; //비번 검사 했는지?

  memberId: number; //시퀀스값 초기 저장
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
  setDuplicationErr: (duplicationErr:User['duplicationErr'])=>void;
  setOAuthLogin: (oauthLogin:User['oauthLogin'])=>void;

  setNewProfileMsg: (newmsg:User['newProfileMsg'])=>void;
  setNewNickName: (newnn:User['newNickName'])=>void;
  setNewProfileImg: (newimg:User['newProfileImg'])=>void;

  setEmailYn: (str:User['emailYn'])=>void;
  setLoginYn: (str:User['loginYn'])=>void;
  setNickNameYn: (str:User['nickNameYn'])=>void;
  setPasswordYn: (str:User['passwordYn'])=>void;

  setMemberId: (num: User['memberId'])=>void;
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

  emailYn: "",
  loginYn: "",
  nickNameYn: "",
  passwordYn: "",

  memberId: 0,

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

  setEmailYn: (str)=>set(()=>({emailYn: str})),
  setLoginYn: (str)=>set(()=>({loginYn: str})),
  setNickNameYn: (str)=>set(()=>({nickNameYn: str})),
  setPasswordYn: (str)=>set(()=>({passwordYn: str})),
  
  setMemberId: (num)=>set(()=>({memberId: num})),
}));
