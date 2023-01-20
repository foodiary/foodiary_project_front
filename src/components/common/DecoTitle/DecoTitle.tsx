import React from 'react';
import styles from './decoTitle.module.scss';

type Title = {title: string};

const DecoTitle = ({title}:Title) => {
  return (
    <div className={styles.main_title}>
        {title}
      <div className={styles.text_deco}></div>
    </div>
  );
};

export default DecoTitle;