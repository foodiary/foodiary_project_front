import React from 'react';
import styles from "@styles/form.module.scss";

interface IntroType{
  intro1: string
  span: string
  intro2: string
}
interface InputType{ 
  id: string; //아이디, 비번, 이메일 중 뭔지 
  type: string; // text, password 뭔지
  label: string; //아이디, 비번, 이메일 중 뭔지
  placeholder: string;
}
export const Intro = ({intro1, span, intro2}:IntroType)=>{
  return(
    <div className={styles.intro}>
      <p>{intro1}</p>
      <p><span><div className={styles.text_deco}></div>{span}</span>{intro2}</p>
      {/* <div className={styles.text_deco}></div> */}
    </div>
  )
}
export const Input = ({id, type, label, placeholder}: InputType)=>{
  // const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  //   const {value, name} = e.target;
  //   if(name==="id"){
  //     setId(value);
  //   }
  //   else if(name==="pwd"){
  //     setPwd(value);
  //   }
  // }
  return(
    <div className={styles.input_form}>
      <p>{label}</p>
      <input 
        type={type}
        id={id}
        placeholder={placeholder}
        required
        // onChange={onChange}
          // ref={ref}
        // {...props.register}
      />  
      
    </div>
  )
  }