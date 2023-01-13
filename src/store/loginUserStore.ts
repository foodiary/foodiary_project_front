import { object } from 'yup';
import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// object를 한번에 저장해서 접근하는 방법이 없을까...?
interface User{
  memberLoginId: string; //로그인 아이디
  memberId: number; //api 요청시 필요한 멤버시퀀스
  // pwd: string;
  memberEmail: string;
  memberNickName: string;
  memberPath: string; //이미지
  memberProfile: string; //프메

  // userInfo: object; //응답값 객체 전부 저장
}
interface UserObj{
  userInfo: User;
}
interface SetUser{
  // setMemberLoginId: (id:User['memberLoginId'])=>void;
  // setMemberId: (id:User['memberId'])=>void;

  // setMemberEmail: (email:User['memberEmail'])=>void;
  // setMemberNickName: (nickname:User['memberNickName'])=>void;
  // setMemberPath: (img:User['memberPath'])=>void;
  // setMemberProfile: (msg:User['memberProfile'])=>void;
  // userInfo: User;
  
  setUserInfo: (object: UserObj['userInfo'])=> void;
  // setUserInfo: (object: SetUser['userInfo'])=> void;

}

// export const useLoginUserStore = create<User &SetUser>(set => ({
//   memberLoginId: "", //로그인 아이디
//   memberId: 0, //api 요청시 필요한 멤버시퀀스
//   memberEmail: "",
//   memberNickName: "",
//   memberPath: "", //이미지
//   memberProfile: "", //프메


//   userInfo: {},
//   setMemberLoginId: (id)=> set(()=>({memberLoginId: id})),
//   setMemberId: (sid)=> set(()=>({memberId: sid})),

//   // setPwd: (pwd:User['pwd'])=>void;
//   setMemberEmail: (email)=> set(()=>({memberEmail: email})),
//   setMemberNickName: (nn)=> set(()=>({memberNickName: nn})),
//   setMemberPath: (img)=> set(()=>({memberPath: img})),
//   setMemberProfile: (msg)=> set(()=>({memberProfile: msg})),
//   // userInfo: '',

//   setUserInfo: (obj)=> set(()=>({userInfo: obj})),
// }));
type UserPersist = (
  config: StateCreator<UserObj&SetUser>,
  options: PersistOptions<UserObj&SetUser>,
)=>StateCreator<UserObj&SetUser>

// interface UserPersist{
//   config: StateCreator<User&SetUser>;
//   options: PersistOptions<User&SetUser>;
// }=>StateCreator<User&SetUser>

export const useLoginUserStore = create<UserObj&SetUser>(
  (persist as UserPersist)(
    (set) => ({
  // memberLoginId: "", //로그인 아이디
  // memberId: 0, //api 요청시 필요한 멤버시퀀스
  // memberEmail: "",
  // memberNickName: "",
  // memberPath: "", //이미지
  // memberProfile: "", //프메


  userInfo: {
    memberId:0,
    memberEmail:"",
    memberLoginId: "",
    memberNickName: "",
    memberPath: "",
    memberProfile: "",
  },
  // setMemberLoginId: (id)=> set(()=>({memberLoginId: id})),
  // setMemberId: (sid)=> set(()=>({memberId: sid})),

  // // setPwd: (pwd:User['pwd'])=>void;
  // setMemberEmail: (email)=> set(()=>({memberEmail: email})),
  // setMemberNickName: (nn)=> set(()=>({memberNickName: nn})),
  // setMemberPath: (img)=> set(()=>({memberPath: img})),
  // setMemberProfile: (msg)=> set(()=>({memberProfile: msg})),
  // userInfo: '',

  setUserInfo: (obj)=> set(()=>({userInfo: obj})),
}),
{name: "LoginUserStore"}
)
);
