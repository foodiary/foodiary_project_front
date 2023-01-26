import { SmallCard } from '@components/common/Card';
import React, { useRef } from 'react';
import styles from '@styles/mypage/myGood.module.scss';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';
import { Link } from 'react-router-dom';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
    dailyId: 0;
    dailyThumbnail: string;
}

const MyGood = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const target = useRef<HTMLDivElement>(null);
  const likeList = useInfiniteScroll({target: target, url:`/member/like/${memberId}`});

  return (
    <div className={styles.mywriting}>
      <div className={styles.title}>
        <DecoTitle title='좋아요 글'/>
      </div>

      <div className={styles.card_container}>
        {likeList.items.length > 0 ? likeList.items.map((item:ResType)=>{
          return(
            <Link to={`/detail/${item.dailyId}`} className={styles.card}>
              <SmallCard img={item.dailyThumbnail}/>
            </Link>
          )
        }):
            <EmptyText text='내가 좋아요한 글이 없습니다.'/>
        }
      </div>
      {/* {likeList.items.length>0 &&  */}
        <div ref={target} className={styles.scroll_target}>
          {/* <p>마지막 페이지입니다</p> */}
        </div>
      {/* } */}
    </div>
  );
};

export default MyGood;