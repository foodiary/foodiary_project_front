import Header from '@components/common/Header/Header';
import { Intro } from '@components/common/Text/SignUpPageText';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '@styles/mypage/faq.module.scss';
import top_arrow from '@img/top_arrow.svg';
import axiosConfig from '../../core/apis/utils/axiosConfig';

interface FAQ{
  faqContent: string;
  faqId: number;
  faqTitle: string;
}
const FAQ = () => {
  const [open, setOpen] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const page = 1;

  const getFAQ = useCallback(()=>{
    axiosConfig.get('/faq',{params: {page: page}}).then(res=>{
      console.log(res);
      setFaqList(res.data);
    }).catch(err=>{
      console.log(err);
    })
  },[]);

  useEffect(()=>{
    getFAQ();
  },[]);
  const [clicked, setClicked] = useState(0); //클릭된 인덱스
  const onTitleClick = (index:number)=>{
    setClicked(index);
    setOpen(prev=>!prev);
  }

  return (
    <div>
      <div className={styles.faq_container}>
        <Intro span="FAQ" intro2=''/>

        <div className={styles.board}>
          {faqList.map((item:FAQ, index:number)=>{
            const faqId = String(item.faqId).padStart(2, "0");
            const active = (index === clicked) ? styles.active: '';

            return(
              <>
              <button className={styles.q_container} key={index} onClick={()=>{onTitleClick(index);}}>
                <p className={styles.num}>{faqId}</p>
                <p className={styles.title}>{item.faqTitle}</p>
                {/* <button> */}
                  <img src={top_arrow} alt="화살표"/>
                {/* </button> */}
              </button>
              {open && 
                <p className={`${styles.content} ${active}`}>{item.faqContent}</p>}
              </>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;