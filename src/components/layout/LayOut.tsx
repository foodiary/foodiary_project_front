import Header from '@components/common/Header/Header';
import LoginHeader from '@components/common/Header/LoginHeader';
import NavBar from '@components/common/NavBar/NavBar';
import React from 'react';
import { LayoutRouteProps, Outlet } from 'react-router-dom';
import styles from './layOut.module.scss';

export const MainLayOut = ({children}:LayoutRouteProps) => {
  return (
    <div className={styles.layout}>
      <header>
        {/* <p>마이페이지</p> */}
        <Header/>
      </header>
      <main>
        {children || <Outlet/>}
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