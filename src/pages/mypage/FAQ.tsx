import Header from '@components/common/Header/Header';
import { Intro } from '@components/common/Text/SignUpPageText';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import styles from '@styles/mypage/faq.module.scss';
import top_arrow from '@img/top_arrow.svg';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import EmptyText from '@components/common/Text/EmptyText';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';
import { useLoadingStore } from '@store/loadingStore';

interface FAQ{
  faqContent: string;
  faqId: number;
  faqTitle: string;
}
const FAQ = () => {
  // const [target, setTarget] = useState(null);
  const target = useRef<HTMLDivElement>(null);

  const items = useInfiniteScroll({target: target, url:'/faq'});
  // useEffect(()=>{
  //   console.log(items);
  // },[items]);

  const [open, setOpen] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const loading = useLoadingStore(state=>state.loading);

  // useEffect(()=>{
  //   axiosConfig.get('/faq',{params: {page: 3}}).then(res=>{
  //     console.log(res);
  //     // setFaqList(res.data);
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // },[]);

  // useEffect(()=>{
  //   getFAQ();
  // },[]);
  const [clicked, setClicked] = useState(0); //클릭된 인덱스
  const onTitleClick = (index:number)=>{
    setClicked(index);
    setOpen(prev=>!prev);
  }

  return (
    <div>
      <div className={styles.faq_container}>
        <div className={styles.title}>
          <DecoTitle title='FAQ'/>
        </div>

        <div className={styles.board}>
          {items.length>0?
            items.map((item:FAQ, index:number)=>{
              const faqId = String(item.faqId).padStart(2, "0");
              const active = (index === clicked) ? styles.active: '';

              return(
                <div key={index}>
                  <button className={styles.q_container} onClick={()=>{onTitleClick(index);}}>
                    <p className={styles.num}>{faqId}</p>
                    <p className={styles.q_title}>{item.faqTitle}</p>
                      <img src={top_arrow} alt="화살표"/>
                  </button>
                  {open && 
                    <p className={`${styles.content} ${active}`}>{item.faqContent}</p>}
                </div>
              )
            }):
            <EmptyText text='등록된 질문이 없습니다'/>
          }
          <div  ref={target} className={styles.scroll_target}>
            <p>마지막 페이지입니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;