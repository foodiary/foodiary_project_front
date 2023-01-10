import React from 'react';
import styles from '@styles/mypage/notice.module.scss';
import Header from '@components/common/Header/Header';

const NoticeDetail = () => {
  return (
    <div className={styles.notice_detail}>
      <Header/>
      <p className={styles.title}>내년에도 잘 부탁드려요! 10.0.0 업데이트 안내</p>
      <p className={styles.date}>22/12/15</p>
      <p className={styles.content}>톡 프로필에 친구들과 공감을 주고 받을 수 있는 
          새로운 스티커가 생겼어요!

          연속해서 계-속 공감을 보내고! 슬라이드 바를 움직여 공감 정도를 표시하고!
          내 프로필에 꼭 맞는 스티커와 함께, 공감을 보낼 때 나타나는 재밌는 효과도 확인하세요.
          참, 공감을 보낸 친구는 나만 확인할 수 있고, 친구의 공감 스티커를 꾹- 누르면, 공감 취소도 가능한 점, 참고하세요!
          앞으로 찾아올 더 다양한 공감 스티커, 많이 기대해주세요!

          채팅방 더보기 메뉴가 귀여운 아이콘으로 바뀌었어요.
          메뉴 최하단에서 새로워진 채팅방 설정 메뉴들을 확인해보세요!
          아 참, 모니터를 사수하고 싶은 직장인 분들에게 반가운 소식.
          드디어 채팅방 엑셀 테마가 최신화되었습니다!
          이제 회사에서 자연-스럽게 채팅방을 띄워보세요.
      </p>

    </div>
  );
};

export default NoticeDetail;