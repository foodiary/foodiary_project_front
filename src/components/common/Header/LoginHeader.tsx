import React from 'react';
import { useNavigate } from 'react-router-dom';
import x_btn from '@img/x_btn.svg';
import go_back_btn from '@img/go_back_btn.svg';
import styles from './header.module.scss';

const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.login_header}>
      <button onClick={()=>{navigate(-1)}}>
        <img src={go_back_btn} alt='뒤로가기'/>
      </button>
      <button onClick={()=>{navigate("/")}}>
        <img src={x_btn} alt='창끄기'/>
      </button>
    </div>
  );
};

export default LoginHeader;