import React, { useEffect } from 'react';
import styles from "./signupPageText.module.scss";
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { useUserStore } from '@store/userStore';

interface IntroType{
  intro1?: string
  span: string
  intro2: string
}

interface ValidationType{
  text?: string;
  color?: string;
}
interface DuplicateTextType{
  text: string;
}
export const Intro = ({intro1, span, intro2}:IntroType)=>{
  return(
    <div className={styles.intro}>
      {intro1? <p>{intro1}</p>: <p><br/></p> }
      <p><span><div className={styles.text_deco}></div>{span}</span> {intro2}</p>
    </div>
  )
}
    
export const ValidationText = ({text, color}:ValidationType)=>{
  const setValidationErr = useUserStore((state)=>state.setValidationErr);
  useEffect(()=>{
    if(color === "green"){
    setValidationErr(false);
    }
    else{
      setValidationErr(true);
    }
  },[]);
  return(
      <div className={styles.validation_text}>
        {text? <BsFillCheckCircleFill className={color==="grey" ? styles.grey: 
          color==="red" ?styles.red: styles.green}/>: null}
        <p className={color==="grey" ? styles.grey: 
          color==="red" ?styles.red: styles.green}>{text}</p> 
      </div>
      )
}
    
export const DuplicationText = ({text}:DuplicateTextType)=>{
  return(
      <div className={styles.duplicate_text}>
        <BsFillCheckCircleFill/>
        <p>{text}</p> 
      </div>
      )
}