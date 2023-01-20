import React from 'react';
import styles from './emptyText.module.scss';

interface PropType{
  text: string;
}
const EmptyText = ({text}:PropType) => {

  return (
    <div className={styles.empty_container}>
      <p className={styles.empty}>{text}</p>
    </div>
  );
};

export default EmptyText;