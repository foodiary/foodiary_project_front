import React, { useRef, useState } from 'react';
import styles from '@styles/mypage/faq.module.scss';
import top_arrow from '@img/top_arrow.svg';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import EmptyText from '@components/common/Text/EmptyText';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
  faqContent: string;
  faqId: number;
  faqTitle: string;
}

const FAQ = () => {
  const target = useRef<HTMLDivElement>(null);
  const faqList = useInfiniteScroll({target: target, url:'/faq'}).items;

  const [clickedList, setClickedList] = useState<number[]>([]);

  const onTitleClick = (index:number)=>{
    if(clickedList.includes(index)){
      setClickedList(clickedList.filter((item)=> index !== item));
    }
    else{
      setClickedList(prev=>[...prev, index]);
    }
  }

  return (
    <div>
      <div className={styles.faq_container}>
        <div className={styles.title}>
          <DecoTitle title='FAQ'/>
        </div>

        <div className={styles.board}>
          {faqList.length > 0 ?
            faqList.map((item:ResType, index:number)=>{
              const faqId = String(item.faqId).padStart(2, "0");
              const active = (clickedList.includes(index)) ? styles.active: '';
              return(
                <div key={index}>
                  <button className={styles.q_container} onClick={()=>{onTitleClick(index);}}>
                    <p className={styles.num}>{faqId}</p>
                    <p className={styles.q_title}>{item.faqTitle}</p>
                      <img src={top_arrow} alt="화살표"/>
                  </button>
                  <p className={`${styles.content} ${active}`}>{item.faqContent}</p>
                </div>
              )
            }):
            <EmptyText text='등록된 질문이 없습니다'/>
          }
          <div ref={target} className={styles.scroll_target}></div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;