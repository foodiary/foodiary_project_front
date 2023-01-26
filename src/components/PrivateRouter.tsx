import React, { ReactElement } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AlertBox } from './common/AlertBox/AlertBox';

interface PrivateRouteProps {
  children ?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  // login : boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반디스 안해야만 접속 가능
}
const PrivateRouter = ({children}:PrivateRouteProps):React.ReactElement|null => {
  const token = localStorage.getItem("refresh_token");
  const navigate = useNavigate();
  if(!token){
    setTimeout(()=>navigate(-1),2000);
  }
  return (
    <div>
      {token? 
        <Outlet/> :
        <AlertBox text='로그인이 필요한 서비스입니다.' type={false}/>
      }
    </div>
  );
};

export default PrivateRouter;