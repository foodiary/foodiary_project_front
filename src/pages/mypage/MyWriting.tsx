import React, { useRef } from 'react';
import styles from '@styles/mypage/myWriting.module.scss';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';
import { SmallCard } from '@components/common/Card';
import { Link } from 'react-router-dom';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface WritingRes{
  dailyThumbnail: string; //이미지
  dailyId: number; //글 아이디
}
const MyWriting = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const target = useRef<HTMLDivElement>(null);
  const writingList = useInfiniteScroll({target: target, url:`/member/post/daily/${memberId}`});
 
  return (
    <div className={styles.mywriting}>
      <div className={styles.title}>
        <DecoTitle title='하루 식단'/>
      </div>
      <div className={styles.card_container}>
        {writingList.items.length > 0 ? 
          writingList.items.map((item:WritingRes)=>{
            const url = `/detail/${item.dailyId}`;
            return(
              <Link to={url} 
                key={item.dailyId} 
                className={styles.card}>
                <SmallCard img={item.dailyThumbnail}/>
              </Link>
            )
          }): 
            <EmptyText text='내가 작성한 글이 없습니다.'/>
          }
      </div>
      {writingList.items.length>0 && 
          <div ref={target} className={styles.scroll_target}>
              <p>마지막 페이지입니다</p>
          </div>
        }
    </div>
  );
};

export default MyWriting;