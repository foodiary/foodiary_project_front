import create from 'zustand';

interface Btn{
  cancel: boolean;// 취소를 눌럿을때 true
  logout: boolean;
  withdraw: boolean;
}
interface setBtn{
  setCancel: (bool: Btn['cancel'])=>void;
  setLogout: (bool: Btn['logout'])=>void;
  setWithdraw: (bool: Btn['withdraw'])=>void;

}

export const btnStateStore = create<Btn&setBtn>(set=>({
  cancel: false,
  logout: false,
  withdraw: false,
  setCancel: (bool)=>set(()=>({cancel: bool})),
  setLogout: (bool)=>set(()=>({logout: bool})),
  setWithdraw: (bool)=>set(()=>({withdraw: bool})),

}))