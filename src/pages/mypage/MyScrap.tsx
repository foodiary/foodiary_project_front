import React, { useRef } from 'react';
import styles from '@styles/mypage/myGood.module.scss';
import EmptyText from '@components/common/Text/EmptyText';
import { useLoginUserStore } from '@store/loginUserStore';
import { SmallCard } from '@components/common/Card';
import { Link } from 'react-router-dom';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
  dailyId: 0;
  dailyThumbnail: string;
}

const MyScrap = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const target = useRef<HTMLDivElement>(null);
  const scrapList = useInfiniteScroll({target: target, url:`/member/scrap/daily/${memberId}`});

  return (
    <div className={styles.mywriting}>
      <div className={styles.title}>
        <DecoTitle title='내 스크랩'/>
      </div>

      <div className={styles.card_container}>
        {scrapList.items.length > 0 ? 
          scrapList.items.map((item:ResType)=>{
            return(
              <Link to="/daily/detail" className={styles.card}>
                <SmallCard img={item.dailyThumbnail}/>
              </Link>          
            )
          }):
            <EmptyText text='내가 스크랩한 글이 없습니다.'/>
        }
      </div>
      {scrapList.items.length>0 && 
        <div ref={target} className={styles.scroll_target}>
          <p>마지막 페이지입니다</p>
        </div>
      }
    </div>
  );
};

export default MyScrap;