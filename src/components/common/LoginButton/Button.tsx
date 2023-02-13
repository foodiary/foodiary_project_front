import React, { FormEvent, useEffect, useState } from 'react';
import styles from "./button.module.scss";
import { useNavigate } from 'react-router-dom';
import { WarnBox } from '@components/common/AlertBox/AlertBox';
import { useUserStore } from '@store/userStore';

interface Button{
  text: string; //로그인, 확인, 다른방법~~
  type: 'button' | 'submit' ;
  url?: string;
  active?: boolean; //버튼 색 (회색, 주황색-true)
}
interface DupliButton{
  active?: boolean;
}

interface HalfBtn{
  text: string; //버튼 텍스트
  type: 'button' | 'submit' ;
  onClick?: ()=>void;
  disabled?: boolean;
}
interface HalfAlertBtn{
  btn_txt?: string;
  type?: 'button' | 'submit' ;
}

export const LoginButton = ({text, type, url, active=false}:Button) => {
  const navigate = useNavigate();

  return (
    <div>
      {type === "button" ?
        <button
          type={type} 
          className={active? `${styles.login_btn_active}`: `${styles.login_btn}`}
          onClick={()=>{navigate(url!)}}
          disabled={active?false:true}>
          {text}
        </button>:

        <button
          type="submit"
          className={active? `${styles.login_btn_active}`: `${styles.login_btn}`}
          disabled={active?false:true}>
          {text}
        </button>
    }
    </div>
  );
};
export const HalfButton = ({text, type, onClick, disabled}:HalfBtn)=>{
  return (
    <div>
      <div className={styles.half_container}>
        <button
          type={type} 
          className={styles.half_btn}
          onClick={onClick}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    </div>
  );
}
export const HalfAlertButton = ({btn_txt, type}:HalfAlertBtn)=>{
  return (
    <div>
      <div className={styles.half_alert_container}>
         <button
          type={type} 
          className={styles.half_alert_btn}>
          {btn_txt}
        </button>
      </div>
    </div>
  );
}
export const DuplicateCheckBtn = ({active=false}:DupliButton)=>{
  const setValidationErr = useUserStore((state)=>state.setValidationErr);
  useEffect(()=>{
    setValidationErr(true);
  },[]);
  return(
    <div>
        <button 
          type="submit" 
          disabled={active? false: true}
          className={styles.dupliCheck_btn}>
            중복확인
        </button>
    </div>
  )
}
