import Header from '@components/common/Header/Header';
import styles from '@styles/mypage/contact.module.scss';
import React, { FormEvent, useEffect, useState } from 'react';
import answer_icon from '@img/answer_icon.svg';
import { useNavigate } from 'react-router';
import {Link, useLocation} from 'react-router-dom';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '@utils/axiosConfig';
import {FiMoreVertical} from 'react-icons/fi';
import { btnStateStore } from '@store/btnStateStore';
import { HalfButton } from '@components/common/LoginButton/Button';
import { AlertBox, WarnBox } from '@components/common/AlertBox/AlertBox';

interface ResType{
  answerContent: string;
  answerCreate: string;
  answerTitle: string;
  questionContent: string;
  questionCreate: string;
  questionTitle: string;
  questionAnswerYn: string;
  questionPath: string;
}
interface Obj{
  resobj: ResType
}
const ContactDetail = () => {
  const [write, setWrite] = useState(false);
  const navigate = useNavigate();
  const {search} = useLocation();
  
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const [res, setRes] = useState<ResType>();
  const [viewBtn, setViewBtn] = useState(false);

  const cancel = btnStateStore(state=>state.cancel);
  const setCancel = btnStateStore(state=>state.setCancel);

  useEffect(()=>{
    setCancel(true);
    axiosConfig.get(`/question/${memberId}/${search.slice(1)}`)
    .then(res=>{
      console.log(res);
      setRes(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[]);


  const onClick = (e:React.MouseEvent<HTMLDivElement>)=>{
    navigate(`/mypage/contact/edit?${search.slice(1)}`);
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    setCancel(true);
    setViewBtn(false);

    axiosConfig.delete(`/question/${memberId}/${search.slice(1)}`)
    .then(res=>{
      console.log(res);
      setTimeout(()=>navigate(-1), 2000);
      return(<AlertBox text='삭제되었습니다' type={true}/>)
    }).catch(err=>{
      console.log(err);
    })
  }
console.log(viewBtn, cancel);
  return (
    <div className={styles.mywriting}>
      <div className={`${styles.tab} ${styles.contact_tab}`}>
        <button 
          className={write? styles.active: styles.non_active}
          onClick={()=>{navigate('/mypage/contact')}}
        >
          1:1 문의하기
          {/* {write && <div className={styles.text_deco}></div>} */}
        </button>
        <button 
          className={styles.active}
        >
          문의내역 확인
          <div className={styles.text_deco}></div>
        </button>
      </div>

    <div className={styles.detail}>
      <div className={styles.detail_container}>
        <div className={styles.detail_text}>
          <p className={styles.detail_title}>
            {res?.questionTitle}
          </p>
          <p className={styles.detail_content}>
            {res?.questionContent}
          </p>
          <div className={styles.status}>
            <p className={styles.state}>
              {res?.questionAnswerYn==="Y"? "답변완료": "답변대기"}
            </p>
            <p>{res?.questionCreate.slice(2,10).replaceAll("-","/")}</p>
          </div>
        </div>
        {res?.questionAnswerYn==="N" && 
          <button className={styles.more} onClick={()=>setViewBtn(prev=>!prev)}>
            <FiMoreVertical/>
          </button>
        }
      </div>
      {res?.questionPath && 
      <div className={styles.attach_file}>
        <img src={res?.questionPath} alt='첨부사진'/>
      </div>
      }
      {res?.answerTitle && 
        <div className={styles.answer_container}>
          <p className={styles.detail_title}>
            <img src={answer_icon} alt="화살표"/>
            {res?.answerTitle}
          </p>
          <p className={styles.detail_content}>
            {res?.answerContent}
          </p>
        </div>}

      </div>

      {viewBtn && <div className={styles.view_btn}>
        <Link to={`/mypage/contact/edit?${search.slice(1)}`} 
          className={styles.black}
          state={{
            title: res?.questionTitle,
            content: res?.questionContent,
            // existingPath: res.
          }}
        >
          <HalfButton type='button' text='수정'/>
        </Link>
        <div className={styles.red} onClick={()=>setCancel(false)}>
          <HalfButton type='button' text='삭제'/>
        </div>
      </div>}
      {!cancel && 
      <form onSubmit={onSubmit}>
        <WarnBox text='정말 삭제하시겠습니까?' btn_txt='삭제'/>
      </form>
      }

    </div>
  );
};

export default ContactDetail;