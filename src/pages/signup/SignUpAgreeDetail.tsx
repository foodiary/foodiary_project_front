import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "@styles/loginpage/signUpAgree.module.scss";
import DecoTitle from '@components/common/DecoTitle/DecoTitle';

const SignUpAgreeDetail = () => {
  const {search} = useLocation();

  const checked = localStorage.getItem("checkedList");
  localStorage.setItem("checked", JSON.stringify(JSON.parse(checked!)));

  return (
    <div>
      <div className={styles.agreeDetail_title}>
        <DecoTitle title='이용약관 동의'/>
      </div>
      <p className={styles.agreeDetail_content}>
        이용약관 내용이 들어가는 곳입니당~~~~~~~~~~
      </p>
    </div>
  );
};

export default SignUpAgreeDetail;