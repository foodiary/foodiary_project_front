import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Intro } from '@components/common/Text/SignUpPageText';
import Header from '@components/common/Header/Header';
import arrow_icon from '@img/arrow_icon.svg';
import styles from '@styles/mypage/myRecommend.module.scss';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { ButtonComp, buttonStyled } from '@components/common';
import { useDebounce } from '@hook/useDebounce';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
  foodId: number;
  foodName: number;
  memberFoodId: number;
  memberFoodLike: string;
  memberId: number;
}

const MyRecommend = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  // const page = 1;
  const [menuList, setMenuList] = useState([]);
  const [res, setRes] = useState(false); 
  const target = useRef<HTMLDivElement>(null);
  const items = useInfiniteScroll({target: target, url:`/member/food/${memberId}`});
  // let menuList : ResType;

  const getMyPreference = ()=>{
    axiosConfig.get(`/member/food/${memberId}`,{
      params: {page: items.page},
    }).then(res=>{
      setMenuList(res.data);
    })
  }

  useEffect(()=>{
    // getMyPreference();
    setMenuList(items.items);
  },[items.items]);

  useEffect(()=>{
    getMyPreference();
    setRes(false);
  },[res]);

  const onModifyState = async(foodId: number, memberFoodLike:string)=>{
    let url = '';

    if(memberFoodLike==="Y"){
      url = '/food/hate';
    }
    else{
      url = '/food/like';
    }  
    await axiosConfig.post(url, {
      memberId: memberId,
      foodId: foodId,
    }).then(res=>{
      console.log(res);
      setRes(true);
    }).catch(err=>{
      console.log(err);
    })
  }

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
                <ButtonComp
                  text={menu.memberFoodLike==="N"?
                  "Nope": "Good"}
                  btnStyle={menu.memberFoodLike==="N"?
                            buttonStyled.button : buttonStyled.buttonActive}
                  onClick={()=>onModifyState(menu.foodId, menu.memberFoodLike)}
                />        
              </div>
            )
          }):
          <EmptyText text='내가 추천받은 메뉴가 없습니다.'/>
      }
      </div>
      {menuList.length > 0 &&
        <div ref={target} className={styles.scroll_target}>
          <p>마지막 페이지입니다</p>
        </div>
      }

    </div>
  );
};

export default MyRecommend;