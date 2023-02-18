import Header from '@components/common/Header/Header';
import LoginHeader from '@components/common/Header/LoginHeader';
import NavBar from '@components/common/NavBar/NavBar';
import { useAxiosInterceptor } from '@hook/useAxiosInterceptor';
import React from 'react';
import { LayoutRouteProps, Outlet, useLocation } from 'react-router-dom';
import styles from './layOut.module.scss';
import { useLoadingStore } from '@store/loadingStore';
import {motion} from 'framer-motion';
import ScrollRestoration from '@components/ScrollRestoration';

export const MainLayOut = ({children}:LayoutRouteProps) => {
  useAxiosInterceptor();
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <header>
        <Header/>
      </header>
      <main>
        <motion.div
          key={location.pathname}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{
            duration: 0.3,
          }}>
          {children || <Outlet/>}
        </motion.div>
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
        <motion.div
          key={location.pathname}
          initial={{x: 100, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          exit={{x: -100, opacity: 0}}
          transition={{
            duration: 0.3,
          }}>
          {children || <Outlet/>}
        </motion.div>

      </main>
    </div>
  );
};