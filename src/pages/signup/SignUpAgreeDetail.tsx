import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpAgreeDetail = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const getItem = localStorage.getItem("checked");
  localStorage.setItem("checked", JSON.stringify(([getItem, state.id])));

  return (
    <div>
      <p>이용약관 동의</p>
      <p>이용약관 내용이 들어가는 곳입니당~~~~~~~~~~</p>
      <button>X</button>
    </div>
  );
};

export default SignUpAgreeDetail;