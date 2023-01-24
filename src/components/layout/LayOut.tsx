import Header from '@components/common/Header/Header';
import LoginHeader from '@components/common/Header/LoginHeader';
import NavBar from '@components/common/NavBar/NavBar';
import { useAxiosInterceptor } from '@hook/useAxiosInterceptor';
import Loading from '@pages/Loading';
import React, { useRef } from 'react';
import { LayoutRouteProps, Outlet, useLocation } from 'react-router-dom';
import styles from './layOut.module.scss';
import {CSSTransition, Transition, TransitionGroup} from 'react-transition-group';
import './transition.css';
import { useLoadingStore } from '@store/loadingStore';

const TIMEOUT = 300;
export const MainLayOut = ({children}:LayoutRouteProps) => {
  useAxiosInterceptor();
  const location = useLocation();
  const loading = useLoadingStore(state=>state.loading);

  return (
    <div className={styles.layout}>
      <header>
        <Header/>
      </header>
      <main>
        {children || <Outlet/>}
        {/* {loading && <Loading/> } */}
        {/* <TransitionGroup className='transition-group'>
          <CSSTransition
            key={location.pathname}
            timeout={{
              enter: TIMEOUT,
              exit: TIMEOUT,
            }}
            classNames='fade'>
            {children || <Outlet/>}
          </CSSTransition>
        </TransitionGroup> */}
      </main>
      <footer>
        <NavBar/>
      </footer>
    </div>
  );
};

export const LoginLayout = ({children}:LayoutRouteProps) => {
  useAxiosInterceptor();
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <LoginHeader/>
      <main className={styles.main}>
        {/* <TransitionGroup className='transition-group'>
          <CSSTransition
            key={location.pathname}
            timeout={{
              enter: TIMEOUT,
              exit: TIMEOUT,
            }}
            classNames='fade'>
            {children || <Outlet/>}
          </CSSTransition>
        </TransitionGroup> */}
        {children || <Outlet/>}
      </main>
    </div>
  );
};