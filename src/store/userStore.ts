import create from 'zustand';

interface User{
  id: string;
  pwd: string;
  email: string;
  nickName: string;
  profileImg: string;
  profileMsg: string;
  validationErr: boolean;
}
interface SetUser{
  setId: (id:User['id'])=>void;
  setPwd: (pic:User['pwd'])=>void;
  setEmail: (email:User['email'])=>void;
  setNickName: (email:User['nickName'])=>void;
  setValidationErr: (err:boolean)=>void;
  // setInfo: (type:string, value:string)=>void;
  // setInfo: (type:User[{type}], value:string)=>void;

}
export const useUserStore = create<User&SetUser>(set => ({
  id: "",
  pwd: "",
  email: "",
  nickName: "",
  profileImg: "",
  profileMsg: "",
  validationErr: true,
  
  setId: (id)=> set(()=>({id: id})),
  setPwd: (pwd)=> set(()=>({pwd: pwd})),
  setEmail: (em)=> set(()=>({email: em})),
  setNickName: (name)=> set(()=>({nickName: name})),
  setValidationErr: (err)=>set({validationErr:err}),
}));
