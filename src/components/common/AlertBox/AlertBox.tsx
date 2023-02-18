import React, { useState } from 'react';
import styles from './alertBox.module.scss';
import {HalfAlertButton} from '../LoginButton/Button';
import { btnStateStore } from '@store/btnStateStore';
import {FiAlertTriangle, FiCheckCircle} from 'react-icons/fi';
import {AnimatePresence, motion} from 'framer-motion';

interface AlertType{
  type: boolean; // x박스(false)인지 체크박스(true)인지
  text: string;
};
interface WarnType{
  text: string;
  btn_txt: string;
};

export const AlertBox = ({type, text}:AlertType) => {
  const [timeout, setTimeOut] = useState(false); 
  setTimeout(()=>{setTimeOut(true)}, 1000);
  return (
    <div>
      {!timeout ?
        <div className={styles.modal_back}>
          <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration: 0.3}}
            className={`${styles.alert_box}`}>
            {type?
              <div className={styles.check_icon}>
                <FiCheckCircle/>
              </div>:
              <div className={styles.alert_icon}>
                <FiAlertTriangle/>
              </div>
            }
            <p>{text}</p>
          </motion.div>
        </div>: null
      }
    </div>
  );
};

export const WarnBox = ({text, btn_txt}:WarnType)=>{
  const setCancel = btnStateStore(state=>state.setCancel);

  return(
    <>
    <div className={styles.modal_back}>
      <AnimatePresence>
      <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        exit={{opacity:0}}
        transition={{duration: 0.3}}
        className={styles.warn_box}>
        <div className={styles.alert_icon}>
          <FiAlertTriangle/>
        </div>
        <p>{text}</p>
        <div className={styles.small_halfbtn}>
          <div className={styles.red}>
            <HalfAlertButton btn_txt={btn_txt} type='submit'/>
          </div>
          <div onClick={()=>{setCancel(true)}} className={styles.black}>
            <HalfAlertButton btn_txt='취소' type='button'/>
          </div>
        </div>
      </motion.div>
      </AnimatePresence>
    </div>
    </>
  )
}
