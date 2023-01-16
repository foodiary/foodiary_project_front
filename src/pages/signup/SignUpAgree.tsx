import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useRef, useState } from 'react';
import styles from "@styles/loginpage/signUpAgree.module.scss";
import { Link, useNavigate } from 'react-router-dom';
import { Intro } from '@components/common/Text/SignUpPageText';
import { LoginButton } from '@components/common/LoginButton/Button';
import { useUserStore } from '@store/userStore';
import {AiFillCheckCircle, AiOutlineCheckCircle} from 'react-icons/ai';
import {BsChevronRight} from 'react-icons/bs';

const SignUpAgree = () => {
  const navigate = useNavigate();
  const setChoiceTerms = useUserStore(state=>state.setChoiceTerms);
  const setRequiredTerms= useUserStore(state=>state.setRequiredTerms);

  const [checkedList, setCheckedList] = useState<string[]>([]);
  useEffect(()=>{
    if(localStorage.getItem("checked")){
      setCheckedList(JSON.parse(localStorage.getItem("checked")!));
    }
  },[]);

  const idArr = ['cb1', 'cb2', 'cb3', 'cb4'];
  const [allChecked, setAllChecked] = useState(false);
  const [next, setNext] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleAllCheck = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setAllChecked(prev=>!prev);
    if(!allChecked){
      setCheckedList(idArr);
      // navigate("/signup/agree/detail");
    }
    else{
      setCheckedList([]);
    }
  }
  const handleCheck = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const checked = e.target.checked; 
    const id = e.target.id;
    if(checked){
      setCheckedList(prev=>[...prev, id]);
      // navigate("/signup/agree/detail", {
      //   state: {
      //     id: id,
      //   }
      // });
    }
    else{
      if(checkedList.includes(id)){
        setCheckedList(checkedList.filter((item)=> id !== item));
      }
    }
  }
  useEffect(()=>{
    if(checkedList.includes("cb2") && checkedList.includes("cb3")){
      setNext(true);
    }
    else{
      setNext(false);
    }
    localStorage.setItem("checkedList", JSON.stringify(checkedList));
    console.log(checkedList);
  },[checkedList]);
  
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    if(checkedList.includes("cb4")){
      setChoiceTerms("Y");
    }
    else{
      setChoiceTerms("N");
    }
    setRequiredTerms("Y");
    navigate("/signup/id");
  }
  const clickedRef = useRef<HTMLInputElement>(null);

  return (
      <div>
        <Intro intro1={"함께 하기 위해,"} span={"약관동의가"} intro2={"필요합니다!"}/>
        <form className={styles.agree_check} onSubmit={onSubmit}>
          <div className={`${styles.text_container} ${styles.underline}`}>
            <input type="checkbox" id="cb1" name="all" 
              checked={checkedList.length === idArr.length ? true : false}
              onChange={handleAllCheck}
            />
            <label htmlFor='cb1' onClick={()=>setChecked(prev=>!prev)}>
              <div className={styles.check_btn} >
                {checkedList.length === idArr.length ? <AiFillCheckCircle/>: <AiOutlineCheckCircle/>}
              </div>
              <p>약관 전체 동의</p>
            </label>
          </div>

          <div className={styles.agree_container}>
            <div className={styles.text_container}>
              <input type="checkbox" id="cb2" name="confirm" 
                checked={checkedList.includes('cb2') ? true : false}
                onChange={handleCheck}
              />
              <label htmlFor='cb2' onClick={()=>setChecked(prev=>!prev)}>
                <div className={styles.check_btn}>
                  {checkedList.includes('cb2')? <AiFillCheckCircle/>: <AiOutlineCheckCircle/>}
                </div>
                <p>이용약관 동의(필수)</p>
              </label>
            </div>
            <Link to="/signup/agree/detail?1" className={styles.agree_detail}>
              <BsChevronRight/>
            </Link>
          </div>

          <div className={styles.agree_container}>
          <div className={styles.text_container}>
            <input type="checkbox" id="cb3" name="personal_info" 
              checked={checkedList.includes('cb3') ? true : false}
              onChange={handleCheck}/>
            <label htmlFor='cb3' onClick={()=>setChecked(prev=>!prev)}> 
              <div className={styles.check_btn}>
                {checkedList.includes('cb3') ? <AiFillCheckCircle/>: <AiOutlineCheckCircle/>}
              </div>
              <p>개인정보 수집 및 이용동의(필수)</p> 
            </label>
          </div>
            <Link to="/signup/agree/detail?2" className={styles.agree_detail}>
              <BsChevronRight/>
            </Link>
          </div>

          <div className={styles.agree_container}>
          <div className={`${styles.text_container} ${styles.bottom}`}>
            <input type="checkbox" id="cb4" name="advertise" 
              checked={checkedList.includes('cb4') ? true : false}
              onChange={handleCheck}/>
            <label htmlFor='cb4' onClick={()=>setChecked(prev=>!prev)}>
              <div className={styles.check_btn}>
                {checkedList.includes('cb4') ? <AiFillCheckCircle/>: <AiOutlineCheckCircle/>}
              </div>
              <p>E-mail 및 SMS 광고성 정보 수신동의(선택)</p>
            </label>
            <p className={styles.more}>다양한 프로모션 소식 및 신규 정보를 보내드립니다.</p>
          </div>
            <Link to="/signup/agree/detail?3" className={styles.agree_detail}>
              <BsChevronRight/>
            </Link>
          </div>
        {/* </form> */}

        <LoginButton type='submit' text='확인' 
          // url={next?'/signup/id':undefined} 
          active={next?true:false}/>
      </form>

      </div>
  );
};

export default SignUpAgree;