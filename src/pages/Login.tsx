import React, { useState } from 'react';
import {FcGoogle} from 'react-icons/fc';
import {SiNaver} from 'react-icons/si';
import {googleAuthUrl, naverAuthUrl} from '@core/auth/Auth';

const Login = () => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  // const [nickName, setNickName] = useState("");
  const [toggle, setToggle] = useState(false);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {value, name} = e.target;
    if(name==="id"){
      setId(value);
    }
    else{
      setPwd(value);
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }
  const handleAuthGoogle =()=>{
    window.location.assign(googleAuthUrl);
  }
  const handleAuthNaver =()=>{
    window.location.assign(naverAuthUrl);
  }
  return (
    <div>
      <button onClick={()=>setToggle(prev=>!prev)}>
        {toggle? "Sign Up": "Login"}
      </button>
      {toggle? <h1>Login</h1>: <h1>Sign Up</h1>}

      <form onSubmit={onSubmit}>
        <input type="email" 
          placeholder='ID' 
          onChange={onChange}
          name="id"
        />
        <input type="password" 
          placeholder='PASSWORD' 
          onChange={onChange}
          name="pwd"
        />
        <button type='submit'>제출</button>
      </form> 
      <button onClick={handleAuthGoogle}>
        <FcGoogle/>
      </button>
      <button onClick={handleAuthNaver}>
        <SiNaver/>
      </button>
    </div>
  );
};

export default Login;