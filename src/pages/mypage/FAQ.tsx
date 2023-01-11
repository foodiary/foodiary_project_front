import Header from '@components/common/Header/Header';
import { Intro } from '@components/common/Text/SignUpPageText';
import React, { useEffect, useState } from 'react';
import styles from '@styles/mypage/faq.module.scss';
import top_arrow from '@img/top_arrow.svg';
import axiosConfig from '../../core/apis/utils/axiosConfig';

interface FAQ{
  faqContent: string;
  faqId: number;
  faqTitle: string;
}
const FAQ = () => {
  const [open, setOpen] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const page = 1;

  useEffect(()=>{
    // axiosConfig.get('/faq',{params: {page: page}}).then(res=>{
    //   console.log(res);
    //   setFaqList(res.data);
    //   setOpen(res.data);
    // }).catch(err=>{
    //   console.log(err);
    // })
  },[]);
  const toggleAnswer = (e:React.MouseEvent<HTMLButtonElement>)=>{
    console.log(e.target);
  }
  return (
    <div>
      <div className={styles.faq_container}>
        <Intro span="FAQ" intro2=''/>

        <div className={styles.board}>
          {/* {faqList.map((item:FAQ)=>{
            const faqId = String(item.faqId).padStart(2, "0");
            return(
              <>
              <button className={styles.q_container} onClick={()=>{setOpen(prev=>!prev)}}>
                <p className={styles.num}>{faqId}</p>
                <p className={styles.title}>{item.faqTitle}</p>
                <button>
                  <img src={top_arrow} alt="화살표"/>
                </button>
              </button>
              {open && <p className={styles.content}>{item.faqContent}</p>}
              </>
            )
          })} */}
          {faqList.map((item:FAQ, index:number)=>{
            const faqId = String(item.faqId).padStart(2, "0");
            return(
              <>
              <button className={styles.q_container} onClick={toggleAnswer}>
                <p className={styles.num}>{faqId}</p>
                <p className={styles.title}>{item.faqTitle}</p>
                <button>
                  <img src={top_arrow} alt="화살표"/>
                </button>
              </button>
              {open && <p className={styles.content}>{item.faqContent}</p>}
              </>
            )
          })}
          {/* <select>
            <option value={"첫번째"}>하이</option>
          </select>
          <select>
            <option value={"두번째"}>두번째</option>
          </select> */}
        </div>
      </div>
    </div>
  );
};

export default FAQ;