import React from 'react';
import styles from '@styles/loading.module.scss';
import { HashLoader } from 'react-spinners';
import { useLoadingStore } from '@store/loadingStore';

// type Loading = {loading: boolean};
const Loading = () => {
  const loading = useLoadingStore(state=>state.loading);

  return (
    <>
    {loading && 
      <>
        <div className={styles.modal_back}>
          <div className={styles.loading}>
          <div className={styles.hash}><HashLoader color='#FF007F' size={100} /></div>
          <p className={styles.loading_txt}>잠시만 기다려주세요</p>
          </div>
        </div>
      </>
    }
    </>
  );
};

export default Loading;