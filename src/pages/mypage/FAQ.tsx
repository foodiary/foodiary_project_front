import Header from '@components/common/Header/Header';
import { Intro } from '@components/common/Text/SignUpPageText';
import React, { useState } from 'react';
import styles from '@styles/mypage/faq.module.scss';
import top_arrow from '@img/top_arrow.svg';

const FAQ = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className={styles.faq_container}>
        <Header/>
        <Intro span="FAQ" intro2=''/>

        <div className={styles.board}>
          
          <button className={styles.q_container}>
            <p className={styles.num}>01</p>
            <p className={styles.question}>질문 제목</p>
            <button onClick={()=>{setOpen(prev=>!prev)}}><img src={top_arrow} alt="화살표"/></button>
            {open && <p>질문에 대한 답</p>}
          </button>
          <div className={styles.q_container}>
            <p className={styles.num}>02</p>

            <button className={styles.question}> {/*넘길때 ??? */}
              <p>질문 제목</p>
              {/* {open && <p>질문에 대한 답</p>} */}
            </button>
            <button onClick={()=>{setOpen(prev=>!prev)}}><img src={top_arrow} alt="화살표"/></button>
            {open && <p>질문에 대한 답</p>}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;