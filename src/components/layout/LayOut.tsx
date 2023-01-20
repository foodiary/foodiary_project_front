import Header from '@components/common/Header/Header';
import LoginHeader from '@components/common/Header/LoginHeader';
import NavBar from '@components/common/NavBar/NavBar';
import { useAxiosInterceptor } from '@hook/useAxiosInterceptor';
import Loading from '@pages/Loading';
import React from 'react';
import { LayoutRouteProps, Outlet } from 'react-router-dom';
import styles from './layOut.module.scss';

export const MainLayOut = ({children}:LayoutRouteProps) => {
  useAxiosInterceptor();
  
  return (
    <div className={styles.layout}>
      <header>
        {/* <p>마이페이지</p> */}
        <Header/>
      </header>
      <main>
        {children || <Outlet/>}
        <Loading/>
      </main>
      <footer>
        <NavBar/>
      </footer>
    </div>
  );
};

export const LoginLayout = ({children}:LayoutRouteProps) => {
  return (
    <div className={styles.layout}>
      <LoginHeader/>
      <main className={styles.main}>
        {children || <Outlet/>}
      </main>
    </div>
  );
};