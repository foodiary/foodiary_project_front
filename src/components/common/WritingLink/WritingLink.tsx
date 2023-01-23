import React from 'react';
import { Link } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';
import styles from './writingLink.module.scss';

interface PropType{
  url: string;
  text1: string;
  text2: string;
  isAnswer?: string;
  state?: object;
  onClick?: ()=>void;
}
const WritingLink = ({url, text1, text2, state, isAnswer, onClick}:PropType) => {
  return (
    <div>
      <Link to={url} state={state} className={styles.container}>
        <div className={styles.content}> {/*넘길때 ??? */}
          <p className={styles.title}>{text1}</p>
          {isAnswer? 
            <div className={styles.contact_case}>
              <p className={isAnswer.includes("답변완료") ? styles.point: ""}>{isAnswer}</p>
              <p>{text2}</p>
            </div>:
          <p className={styles.text2}>{text2}</p>
          }
          {/* <p>{text2}</p> */}
        </div>
        <button onClick={onClick}>
          <BiChevronRight/>
        </button>
      </Link>
    </div>
  );
};

export default WritingLink;