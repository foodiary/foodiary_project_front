import { useInfiniteScroll } from '@hook/useInfiniteScroll';
import { useLoginUserStore } from '@store/loginUserStore';
import React, { useRef } from 'react';
import styles from '@styles/mypage/myRecommend.module.scss';

const RecommendReload = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const target = useRef<HTMLDivElement>(null);
  const items = useInfiniteScroll({target: target, url:`/member/food/${memberId}`}).items;

  return (
    <div>
      <div className={styles.menu_list}>
        {/* {menuList.length > 0 ? 
          menuList.map((menu:ResType, index:number)=>{
            return(
              <div className={styles.menu} key={menu.memberFoodId}>
                <p>{menu.foodName}</p>
                  <ButtonComp
                    text={menu.memberFoodLike==="N"?
                    "Nope": "Good"}
                    btnStyle={menu.memberFoodLike==="N"?
                              buttonStyled.button : buttonStyled.buttonActive}
                    onClick={()=>onModifyState(menu.foodId, menu.memberFoodLike, index)}
                  />  
              </div>
            )
          }):
          <EmptyText text='내가 추천받은 메뉴가 없습니다.'/> */}
      {/* } */}
      </div>
      {/* {menuList.length > 0 && */}
        <div ref={target} className={styles.scroll_target}>
          {/* <p>마지막 페이지입니다</p> */}
        </div>
    </div>
  );
};

export default RecommendReload;