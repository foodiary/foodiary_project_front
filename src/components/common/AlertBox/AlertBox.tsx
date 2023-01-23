import React, { useEffect, useState } from 'react';
import styles from './alertBox.module.scss';
import {HalfAlertButton, HalfButton, LoginButton} from '../LoginButton/Button';
import { btnStateStore } from '@store/btnStateStore';
import {FiAlertTriangle, FiCheckCircle} from 'react-icons/fi';

interface AlertType{
  type: boolean; // x박스(false)인지 체크박스(true)인지
  text: string;
};
interface WarnType{
  text: string;
  btn_txt: string;
};

export const AlertBox = ({type, text}:AlertType) => {
  const [timeout, setTimeOut] = useState(false); //true일때 꺼지면 됨
  setTimeout(()=>{setTimeOut(true)}, 2000);
  return (
    <div>
      {!timeout ?
        <div className={styles.modal_back}>
          <div className={styles.alert_box}>
            {type?
              <div className={styles.check_icon}>
                <FiCheckCircle/>
              </div>:
              <div className={styles.alert_icon}>
                <FiAlertTriangle/>
              </div>
            }
            <p>{text}</p>
          </div>
        </div>: null
      }
    </div>
  );
};

// export const WarnBox = ({text, btn_txt, type}:WarnType)=>{
//   const [view, setView] = useState(true);
//   return(
//     <div className={styles.modal_back}>
//       <div className={styles.warn_box}>
//         <div className={styles.warn_icon}></div>
//         <p>{text}</p>
//         <div className={styles.small_halfbtn}>
//           <HalfButton 
//             text={btn_txt}
//             text2='취소'
//             type= {type}
//             type2='button'/>
//         </div>
//       </div>
//     </div>
//   )
// }
export const WarnBox = ({text, btn_txt}:WarnType)=>{
  // const [cancle, setCancle] = useState(false);
  const setCancel = btnStateStore(state=>state.setCancel);

  return(
    <>
    <div className={styles.modal_back}>
      <div className={styles.warn_box}>
        {/* <div className={styles.warn_icon}></div> */}
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
      </div>
    </div>
    </>
  )
}
