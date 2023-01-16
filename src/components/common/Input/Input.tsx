import React, { useEffect, useState } from 'react';
import styles from "./input.module.scss";
import {MdOutlineCancel} from 'react-icons/md';
import {IoMdEyeOff} from 'react-icons/io';
import {useForm, useController, UseFormRegisterReturn, UseControllerProps, Controller, UseFormReset, FieldValues, UseFormResetField, FieldError} from 'react-hook-form';
import { useUserStore } from '@store/userStore';
import { schema } from '../../../hook/validationYup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationText } from '../Text/SignUpPageText';

interface InputType{ 
  id: string; //아이디, 비번, 이메일 중 뭔지 
  type: string; // text, password 뭔지
  label: string; //아이디, 비번, 이메일 중 뭔지
  placeholder: string;
  // reg: UseFormRegister<FieldValues>
}
interface Props extends InputType {
  text?: string; // 유효성검사 텍스트
  validate?: string; //유효성검사 하는지? 
  // register?: UseFormRegisterReturn;
  // control: UseControllerProps;
}

const Input = React.forwardRef((props:Props, ref)=>{
  const {watch, register, resetField, formState: { errors }} = 
    useForm({
      mode: "onChange",
      resolver: yupResolver(schema),     
    });

  const setId = useUserStore((state)=>state.setId);
  const setPwd = useUserStore((state)=>state.setPwd);
  const setMorePwd = useUserStore((state)=>state.setMorePwd);
  const setNickName = useUserStore((state)=>state.setNickName);
  const setEmail = useUserStore((state)=>state.setEmail);
  const setValidationErr = useUserStore((state)=>state.setValidationErr);
  const setMailAuth = useUserStore((state)=>state.setMailAuth);

  let errMsg = errors[props.id]?.message
  let inputValue:string = watch(props.id);
  let valueLength = inputValue?.length;

  const [view, setView] = useState(false); //패스워드 뷰하는지
  const [pwdType, setPwdType] = useState(props.type);  //뷰했을때 패스워드 타입변경
  const handleViewPwd = ()=>{
    setView(prev=>!prev);
  }

  const handleInputValueChange = ()=>{
    switch(props.id){
      case "id":
        setId(inputValue);
        break;
      case "pwd":
        setPwd(inputValue);
        break;
      case "more_pwd":
        setMorePwd(inputValue);
        break;
      case "email":
        setEmail(inputValue);
        break;
      case "nickname":
        setNickName(inputValue);
        break;
      case "mailauth":
        setMailAuth(inputValue);
    }
    // console.log(errMsg);
    // if((valueLength > 0) && (errMsg === undefined)){
    //   console.log("불린 바꿈 폴스");
    //   setValidationErr(false);
    // }
    // else{
    //   console.log("불린 바꿈 트루");
    //   setValidationErr(true);
    // }
  }
  useEffect(()=>{
    handleInputValueChange();
  },[inputValue]);

  // console.log(`인풋길이: ${valueLength}`);
  useEffect(()=>{
    if(view){
      setPwdType("text");
    }
    else{
      setPwdType("password");
    }
  },[view]);
  
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
      {(props.type === "text"||"email") && inputValue &&
        <button type='button' className={styles.init} onClick={()=>resetField(props.id)}>
            <MdOutlineCancel/>
        </button>
      }
      {props.type === "password" && inputValue &&
        <button type='button' className={styles.view_pwd} onClick={handleViewPwd}>
            <IoMdEyeOff/>
        </button>
      }

      {props.validate ? null:
        <div className={styles.validation}>
          {(valueLength === 0 || valueLength === undefined) && 
            <ValidationText text={props.text} color="grey"/>}
          {errMsg && (valueLength !== 0) && <ValidationText text= {String(errMsg)} color="red"/> }
          {(valueLength > 0) && !errMsg && 
            <ValidationText text={props.text} color="green"/>
          }
        </div>}
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
    export default Input;