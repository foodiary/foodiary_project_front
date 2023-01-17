import React from 'react';
import styles from '@styles/loading.module.scss';
import { HashLoader } from 'react-spinners';

// type Loading = {loading: boolean};
const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.hash}><HashLoader color='#ff4e16' size={100} /></div>
      <p className={styles.loading_txt}>잠시만 기다려주세요</p>
    </div>
  );
};

export default Loading;