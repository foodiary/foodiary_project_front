import React, { useState } from 'react';
import styles from "@styles/form.module.scss";
import { useNavigate } from 'react-router-dom';

interface Button{
  text?: string; //로그인, 확인, 다른방법~~
  type: 'button' | 'submit' ;
  url?: string;
}
interface AlertType{
  type: string;
}
export const LoginButton = ({text, type, url}:Button) => {
  const navigate = useNavigate();
  // const handleSubmit = (url:string)=>{
  //   console.log("서버통신")
  // }
  return (
    <div>
      {type === "button" ?
        <button
          type={type} 
          className={styles.login_btn}
          onClick={()=>{navigate(url!)}}
        >
          {text}
        </button>:
        <button
          type={type} 
          className={styles.login_btn}
        >
        {text}
      </button>}
    </div>
  );
};
export const DuplicateCheckBtn = ({type}:Button)=>{
  return(
    <div>
      <button type={type} className={styles.dupliCheck_btn}>중복확인</button>
    </div>
  )
}
export const AlertBox = ({type}:AlertType)=>{
  const [alert, setAlert] = useState(false);
  return(
    <>
      {alert && 
        type==="err" ? 
          <div className={styles.err_alert}>
            <button className={styles.x_circle} onClick={()=>setAlert(false)}></button>
            <p>아이디 또는 비밀번호를 다시 확인해주세요</p>
          </div>:
          <div className={styles.err_alert}>
            <button className={styles.x_circle} onClick={()=>setAlert(false)}></button>
            <p>인증메일이 재발송되었습니다</p>
          </div>
      }
    </>
  )
}
