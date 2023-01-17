import React, { useCallback, useEffect, useState } from 'react';
import { Intro } from '@components/common/Text/SignUpPageText';
import Header from '@components/common/Header/Header';
import arrow_icon from '@img/arrow_icon.svg';
import styles from '@styles/mypage/myRecommend.module.scss';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { useLoginUserStore } from '@store/loginUserStore';
import EmptyText from '@components/common/Text/EmptyText';
import DecoTitle from '@components/common/DecoTitle/DecoTitle';
import { ButtonComp, buttonStyled } from '@components/common';

interface ResType{
  foodId: number;
  foodName: number;
  memberFoodId: number;
  memberFoodLike: string;
  memberId: number;
}
interface BtnType{
  idx: number;
  bool: string;
}
const MyRecommend = () => {
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);
  const page = 1;
  const [menuList, setMenuList] = useState([]);
  const [newState, setNewState] = useState(""); //N, Y

  const [btnState, setBtnState] = useState<BtnType[]>([]); //false가 Nope

  const getMyPreference = ()=>{
    axiosConfig.get(`/member/food/${memberId}`,{
      params: {page: page},
    }).then(res=>{
      setMenuList(res.data);
      console.log(res);
    })
  }

  useEffect(()=>{
    getMyPreference();
  },[]);

  useCallback(()=>{
    getMyPreference();
  },[newState]);

  let url = "";
  const onModifyState = (index:number, memberId: number, memberFoodId: number)=>{
    
    console.log(index);
    // axiosConfig.patch(url)
    // .then(res=>{
    //   console.log(res);
    //   // setNewState(true);

    // }).catch(err=>{
    //   console.log(err);
    // })
  }
  console.log(btnState);
  return (
    <div className={styles.recommend}>
      <div className={styles.title}>
        <DecoTitle title='나의 추천 메뉴'/>
      </div>      
      <p className={styles.explain}>버튼을 눌러 상태값을 변경해보세요!</p>
      <img src={arrow_icon} alt="화살표"/>
      <div className={styles.menu_list}>
        {menuList.length > 0 ? 
          menuList.map((menu:ResType, index:number)=>{
            
            // {(menu.memberFoodLike==="N" && btnState === false) ? 
            //   url = `/food/like/${memberId}/${menu.memberFoodId}`: 
            //   url = `/food/hate/${memberId}/${menu.memberFoodId}`
            // }
            return(
              <div className={styles.menu} key={menu.memberFoodId}>
                <p>{menu.foodName}</p>
                <button>
                    <ButtonComp
                      text={menu.memberFoodLike==="N"?
                           "Nope": "Good"}
                      btnStyle={menu.memberFoodLike==="N"?
                               buttonStyled.button : buttonStyled.buttonActive}
                      onClick={()=>onModifyState(index, memberId, menu.memberFoodId)}
                    />                  
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