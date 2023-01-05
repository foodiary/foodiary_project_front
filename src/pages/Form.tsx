import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from "@styles/form.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import {useForm, useController, UseFormRegisterReturn, UseControllerProps, Controller, UseFormReset, FieldValues, UseFormResetField} from 'react-hook-form';
import { useUserStore } from '@store/userStore';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import { schema } from '../hook/validationYup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IntroType{
  intro1?: string
  span: string
  intro2: string
}
interface InputType{ 
  id: string; //아이디, 비번, 이메일 중 뭔지 
  type: string; // text, password 뭔지
  label: string; //아이디, 비번, 이메일 중 뭔지
  placeholder: string;
  // reg: UseFormRegister<FieldValues>
}
interface Props extends InputType {
  register?: UseFormRegisterReturn;
  reset?: UseFormResetField<FieldValues>;
  // control: UseControllerProps;
}
interface ValidationType{
  text: string;
}
export const Intro = ({intro1, span, intro2}:IntroType)=>{
  return(
    <div className={styles.intro}>
      <p>{intro1}</p> 
      {/* <div className={styles.text_deco}></div> */}
      <p><span><div className={styles.text_deco}></div>{span}</span> {intro2}</p>
    </div>
  )
}

export const Input = React.forwardRef((props:Props, ref)=>{
  const {watch, register, resetField, formState: { errors }} = 
    useForm({
      mode: "onChange",
      resolver: yupResolver(schema),     
    });
  const setId = useUserStore((state)=>state.setId);
  const setPwd = useUserStore((state)=>state.setPwd);
  const setNickName = useUserStore((state)=>state.setNickName);
  const setEmail = useUserStore((state)=>state.setEmail);
  // const [err, setErr] = useState(true);
  const setValidationErr = useUserStore((state)=>state.setValidationErr);

  const [view, setView] = useState(false);
  const [pwdType, setPwdType] = useState(props.type);

  const handleViewPwd = ()=>{
    setView(prev=>!prev);
  }

  useEffect(()=>{
    switch(props.id){
      case "id":
        setId(watch(props.id));
        setValidationErr(Boolean(errors.id));
        break;
      case "pwd":
        setPwd(watch(props.id));
        setValidationErr(Boolean(errors.pwd));
        break;
      case "email":
        setEmail(watch(props.id))
        setValidationErr(Boolean(errors.email));
        break;
      case "nickname":
        setNickName(watch(props.id))
        setValidationErr(Boolean(errors.nickname));
        break;
    }
  },[watch(props.id)]);

  useEffect(()=>{
    if(view){
      setPwdType("text");
    }
    else{
      setPwdType("password");
    }
  },[view]);
  // console.log(errors.pwd.);
  // console.log(Boolean(errors.pwd));
  return(
    <div className={styles.input_form}>
      <p>{props.label}</p>
      <input 
        type={props.type === "password"? pwdType: props.type}
        id={props.id}
        placeholder={props.placeholder}
        required
        {...register(props.id)}
        // {...props.register}
      />  
      {(props.type === "text"||"email") && watch(props.id) &&
        <button type='button' className={styles.init} onClick={()=>resetField(props.id)}>
            <MdOutlineCancel/>
        </button>
      }
      {props.type === "password" && watch(props.id) &&
        <button type='button' className={styles.view_pwd} onClick={handleViewPwd}>
            <IoMdEyeOff/>
        </button>
      }
      {/* {err? "error": "non-error"} */}
    </div>
  )
});
// export const Input = ({id, type, label, placeholder, reg}: InputType)=>{
//   const {register} = useForm({mode: "onChange"});
//   // const {field, fieldState} = useController({
//   //   name: "id", 
//   //   rules: {required: true}
//   // });
//   // const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
//   //   const {value, name} = e.target;
//   //   if(name==="id"){
//   //     setId(value);
//   //   }
//   //   else if(name==="pwd"){
//   //     setPwd(value);
//   //   }
//   // }
//   return(
//     <div className={styles.input_form}>
//       <p>{label}</p>
//       <input 
//         type={type}
//         id={id}
//         placeholder={placeholder}
//         required
        
//         // {...register(id)}
//         // onChange={onChange}
//           // ref={ref}
//         // {...props.register}
//       />  
//       {(type === "text"||"email")  && 
//         <button type='button' className={styles.init}>
//             <MdOutlineCancel/>
//         </button>
//       }
//       {type === "password" &&
//         <button type='button' className={styles.view_pwd}>
//                <IoMdEyeOff/>
//         </button>
//       }
//     </div>
//   )
    // }
    
export const ValidationText = ({text}:ValidationType)=>{
  const validationErr = useUserStore((state)=>state.validationErr);
    return(
      <>
        <div className={validationErr? styles.err: styles.no_err}>
          <BsFillCheckCircleFill/>
        </div>
        <p>{text}</p>
      </>
      )
    }