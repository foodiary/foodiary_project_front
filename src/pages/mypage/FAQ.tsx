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

interface ClickObj{
  index: number;
  open: boolean;
}
// interface Clicked{
//   clickedList: ClickObj;
// }
const FAQ = () => {
  const target = useRef<HTMLDivElement>(null);
  const faqList = useInfiniteScroll({target: target, url:'/faq'}).items;

  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(0); //클릭된 인덱스
  // const [clicked, setClicked] = useState<Clicked>(); //클릭된 인덱스
  const [clickedList, setClickedList] = useState<number[]>([]);

  const [list, setList] = useState([]);
  // [{index: 0, open: false}]
  console.log(`클릭됨: ${clickedList}`);
  const onTitleClick = (index:number)=>{
    // if(clickedList.includes(index)){
    //   setClickedList(clickedList.filter((item)=> index !== item));
    //   setOpen(prev=>!prev);
    // }

    setOpen(prev=>!prev);

    // setClickedList(prev=>[...prev, index]);
    // setOpen(true);
  }

  return (
    <div>
      <div className={styles.faq_container}>
        <div className={styles.title}>
          <DecoTitle title='FAQ'/>
        </div>

        <div className={styles.board}>
          {faqList.length > 0 ?
            faqList.map((item:FAQ, index:number)=>{
              const faqId = String(item.faqId).padStart(2, "0");
              const active = (index === clicked) ? styles.active: '';
              // const active = (clickedList.includes(index)) ? styles.active: '';
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
          <div ref={target} className={styles.scroll_target}></div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;