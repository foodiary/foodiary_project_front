import React, { useEffect, useState } from 'react';
import { Intro } from '@components/common/Text/SignUpPageText';
import Header from '@components/common/Header/Header';
import arrow_icon from '@img/arrow_icon.svg';
import styles from '@styles/mypage/myRecommend.module.scss';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';

interface ResType{
  foodId: number;
  foodName: number;
  memberFoodId: number;
  memberFoodLike: string;
  memberId: number;
}
const MyRecommend = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const page = 1;
  const [menuList, setMenuList] = useState([]);

  useEffect(()=>{
    axiosConfig.get(`/member/food/${memberId}`,{
      params: {page: page},
    }).then(res=>{
      setMenuList(res.data);
      console.log(res);
    })
  },[]);
  console.log(Boolean(menuList));
  return (
    <div className={styles.recommend}>
      <div className={styles.title}>
        <DecoTitle title='나의 추천 메뉴'/>
      </div>      
      <p className={styles.explain}>버튼을 눌러 상태값을 변경해보세요!</p>
      <img src={arrow_icon} alt="화살표"/>
      <div className={styles.menu_list}>
        {menuList.length > 0 ? 
          menuList.map((menu:ResType)=>{
            return(
              <div className={styles.menu} key={menu.memberFoodId}>
                <p>{menu.foodName}</p>
                <button>
                  {menu.memberFoodLike==="N"?
                  "Nope": "Good"}
                </button>
              </div>
            )
          }):
          <EmptyText text='내가 추천받은 메뉴가 없습니다.'/>
      }

      </div>
    </div>
  );
};

export default MyRecommend;