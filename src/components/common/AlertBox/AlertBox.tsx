import React, { useEffect, useState } from 'react';
import styles from './alertBox.module.scss';
import {HalfButton, LoginButton} from '../LoginButton/Button';

interface AlertType{
  type: boolean; // x박스(false)인지 체크박스(true)인지
  text: string;
};
interface WarnType{
  text: string;
  // btn_txt: string;
  // type: 'button' | 'submit'; // 버튼 타입
};

export const AlertBox = ({type, text}:AlertType) => {
  const [timeout, setTimeOut] = useState(false); //true일때 꺼지면 됨
  // useEffect(()=>{
  //   setTimeout(()=>{setTimeOut(true)}, 2000);
  // },[]);
  setTimeout(()=>{setTimeOut(true)}, 2000);
  return (
    <div>
      {!timeout ?
        <div className={styles.modal_back}>
          <div className={styles.alert_box}>
            <div className={type? styles.check_icon: styles.x_icon}></div>
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
export const WarnBox = ({text}:WarnType)=>{
  const [cancle, setCancle] = useState(false);
  return(
    <>
    {!cancle && <div className={styles.modal_back}>
      <div className={styles.warn_box}>
        <div className={styles.warn_icon}></div>
        <p>{text}</p>
        <div className={styles.small_halfbtn}>
          <HalfButton btn_txt='확인' type='submit'/>
          <div onClick={()=>{setCancle(true)}}>
            <HalfButton btn_txt='취소' type='button'/>
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}
