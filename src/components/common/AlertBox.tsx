import React from 'react';
import styles from './alertBox.module.scss';
import { HalfButton } from './Button';

interface AlertType{
  type: boolean; // x박스(false)인지 체크박스(true)인지
  text: string;
};

export const AlertBox = ({type, text}:AlertType) => {
  return (
    <div>
      {type ?
        <div className={styles.modal_back}>
          <div className={styles.alert_box}>
            <div className={styles.check_icon}></div>
            <p>{text}</p>
          </div>
        </div>:
        <div className={styles.modal_back}>
          <div className={styles.alert_box}>
            <div className={styles.x_icon}></div>
            <p>{text}</p>
          </div>
        </div>
      }
    </div>
  );
};

export const WarnBox = ()=>{
  return(
    <div className={styles.modal_back}>
      <div className={styles.warn_box}>
        <div className={styles.warn_icon}></div>
        <p>정말 삭제하시겠습니까?</p>
        <div className={styles.small_halfbtn}>
          <HalfButton 
            text='삭제' 
            text2='취소'
            type='button'
            type2='submit'/>
        </div>
      </div>
    </div>
  )
}
