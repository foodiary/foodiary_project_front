import React, { FormEvent, useState } from 'react';
import styles from "@styles/form.module.scss";
import { useNavigate } from 'react-router-dom';
import { WarnBox } from './AlertBox';
import { useUserStore } from '@store/userStore';

interface Button{
  text: string; //로그인, 확인, 다른방법~~
  type: 'button' | 'submit' ;
  url?: string;
  active?: boolean; //버튼 색 (회색, 주황색-true)
}
interface DupliButton{
  // url: string;
  // value: string; //id, pwd, email 등등
  active?: boolean;
}
interface HalfBtn extends Button{
  text2: string;
  type2: 'button' | 'submit' ;
  url2?: string;
}
interface AlertType{
  type: string;
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
export const HalfButton = ({text, text2, type, type2, url, url2}:HalfBtn)=>{
  const navigate = useNavigate();
  const [warn, setWarn] = useState(false);
  return (
    <div>
      <div className={styles.half_container}>
        <button
          type={type} 
          className={styles.half_btn}
          onClick={()=>{navigate(url!)}}
        >
          {text}
        </button>
        <button
          type={type2} 
          className={styles.half_btn}
          onClick={()=>{setWarn(true)}}
        >
          {text2}
        </button>
      </div>
    </div>
  );
}
export const DuplicateCheckBtn = ({active=false}:DupliButton)=>{
  // const value = useUserStore(state=>{state.{type}});

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