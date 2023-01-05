import Header from '@components/common/Header';
import React from 'react';
import { LayoutRouteProps, Outlet } from 'react-router-dom';
import styles from './layOut.module.scss';

const LayOut = ({children}:LayoutRouteProps) => {
  return (
    <div className={styles.layout}>
      <Header/>
      <main>
        {children || <Outlet/>}
      </main>
    </div>
  );
};

export default LayOut;