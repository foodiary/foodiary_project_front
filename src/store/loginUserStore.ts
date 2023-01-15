import { object } from 'yup';
import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface User{
  memberLoginId: string; //로그인 아이디
  memberId: number; //api 요청시 필요한 멤버시퀀스
  memberEmail: string;
  memberNickName: string;
  memberPath: string; //이미지
  memberProfile: string; //프메
}

interface UserObj{
  userInfo: User;
}

interface SetUser{
  setUserInfo: (object: UserObj['userInfo'])=> void;
}

type UserPersist = (
  config: StateCreator<UserObj&SetUser>,
  options: PersistOptions<UserObj&SetUser>,
)=>StateCreator<UserObj&SetUser>

export const useLoginUserStore = create<UserObj&SetUser>(
  (persist as UserPersist)(
    (set) => ({

  userInfo: {
    memberId:0,
    memberEmail:"",
    memberLoginId: "",
    memberNickName: "",
    memberPath: "",
    memberProfile: "",
  },

  setUserInfo: (obj)=> set(()=>({userInfo: obj})),
}),
  {name: "LoginUserStore"}
));
