import React from 'react';
import { Link } from 'react-router-dom';
import {BiChevronRight} from 'react-icons/bi';
import styles from './writingLink.module.scss';

interface PropType{
  url: string;
  text1: string;
  text2: string;
  state?: object;
  onClick?: ()=>void;
}
const WritingLink = ({url, text1, text2, state, onClick}:PropType) => {
  return (
    <div>
      <Link to={url} state={state} className={styles.container}>
        <div className={styles.content}> {/*넘길때 ??? */}
          <p>{text1}</p>
          <p className={text2==="답변완료"? styles.text2: ""}>{text2}</p>
        </div>
        <button onClick={onClick}>
          <BiChevronRight/>
        </button>
      </Link>
    </div>
  );
};

export default WritingLink;