import React, { FormEvent } from 'react';
import styles from "@styles/loginpage/signUpAgree.module.scss";
import { useNavigate } from 'react-router-dom';
import { Intro } from '@pages/Form';
import { LoginButton } from '@components/common/Button';

const SignUpAgree = () => {
  // const navigate = useNavigate();

  // const onSubmit = (e:FormEvent)=>{
  //   e.preventDefault();
  //   navigate("/signup/form");
  // }
  return (
    <div>
      <div className={styles.login_container}>
        <Intro intro1={"함께 하기 위해,"} span={"약관동의"} intro2={"가 필요합니다!"}/>
        <form className={styles.agree_check}>
          <div>
            <input type="checkbox" id="cb1" name="all"/>
            <label htmlFor='cb1'>약관 전체 동의</label>
          </div>

          <div>
            <input type="checkbox" id="cb2" name="confirm"/>
            <label htmlFor='cb2'>이용약관 동의(필수)</label>
          </div>

          <div>
            <input type="checkbox" id="cb3" name="personal_info"/>
            <label htmlFor='cb3'>개인정보 수집 및 이용동의(필수) </label>
          </div>
          <div>
            <input type="checkbox" id="cb4" name="advertise"/>
            <label htmlFor='cb4'>E-mail 및 SMS 광고성 정보 수신동의(선택)</label>
            <p>다양한 프로모션 소식 및 신규 정보를 보내드립니다.</p>
          </div>
        </form>
        <LoginButton type='button' text='확인' url='/signup/id'/>
      </div>
    </div>
  );
};

export default SignUpAgree;