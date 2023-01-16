import { ButtonComp, buttonStyled } from "@components/common";
import axiosConfig from "../core/apis/utils/axiosConfig";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled from "../styles/mainPage.module.scss";
import { useLoginUserStore } from "@store/loginUserStore";
import {GoSearch} from 'react-icons/go';
import { useNavigate } from "react-router-dom";
import dessert from '@img/dessert.png';
import { useUpdateUser } from "@hook/useUpdateUser";

const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface User{
  memberLoginId: string; //로그인 아이디
  memberId: number; //api 요청시 필요한 멤버시퀀스
  memberEmail: string;
  memberNickName: string;
  memberPath: string; //이미지
  memberProfile: string; //프메
}
const MainPage = () => {
  useUpdateUser();
  const navigate = useNavigate();
  const nickName = useLoginUserStore(state=>state.userInfo.memberNickName);

  const [userName, setUserName] = useState<string>("푸디어리");
  
  // const [daysBtn, setDaysBtn] = useState(days.month);
  const setUserInfo = useLoginUserStore((state)=>state.setUserInfo);
  const userInfo = useLoginUserStore((state)=>state.userInfo);
  const memberId = useLoginUserStore(state=>state.userInfo.memberId);

  useEffect(()=>{
    if(nickName){
      setUserName(nickName);
    }
  },[]);

  
  const [menuList, setMenuList] = useState([]);
  const [recommenu, setRecomMenu] = useState([]);
  const [value, setValue] = useState("");

  const recommendMenu = ()=>{ //랜덤메뉴추천
    let params = {};
    if(memberId){
      params = { memberId: memberId };
    }
    axiosConfig.get(`/food`, {params: params}).then(res=>{
      console.log(res);
      setRecomMenu(res.data);
    }).catch(err=>{
      console.log(err);
    });
  };
  const weekMenu = ()=>{ //일주일 식단 추천
    axiosConfig.get(`/food/menu/week`, {params: {memberId: memberId}})
    .then(res=>{
      console.log(res);
      setMenuList(res.data);
    }).catch(err=>{
      console.log(err);
    });
  }
  useEffect(() => {
    recommendMenu();
    weekMenu();
  }, []);

  const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const {value} = e.target;
    setValue(value);
  }

  const onFoodLike = ()=>{
    // axiosConfig.patch(`/food/like/${memberId}/${memberFoodId}`)
    // .then(res=>{
    //   console.log(res);
    //   return(alert("반영되었습니다")); //알럿박스로 바꾸기
    // }).catch(err=>{
    //   console.log(err);
    // });
  };

  const onFoodHate = ()=>{
    // axiosConfig.patch(`/food/hate/${memberId}/${memberFoodId}`)
    // .then(res=>{
    //   console.log(res);
    //   return(alert("반영되었습니다")); //알럿박스로 바꾸기
    // }).catch(err=>{
    //   console.log(err);
    // });
  }
  const onSearch = ()=>{
    let data = {};
    if(memberId){
      data = {
        keyword: value,
        memberId: memberId,
        page: 1
      }
    }
    else{
      data = {
        keyword: value,
        page: 1
      }
    }
    console.log(memberId, value);
    axiosConfig.post(`/search/daily/result`, data)
    .then(res=>{
      console.log(res);
      return(alert("검색")); //알럿박스로 바꾸기
      // navigate("/search/result");
    }).catch(err=>{
      console.log(err);
    });
  }
  return (
    <article className={styled.mainPageWrapper}>
      <section className={styled.mainPageTitleSection}>
        <h2 className={styled.title}>
          안녕하세요, {userName}님! <br /> 오늘 이 메뉴 어떠세요?{" "}
        </h2>
      </section>

      {/* 음식 아이콘이랑 카드 넣기 */}
      
      <section className={styled.recommendeSection}>
        <div className={styled.random_food}>
          <div className={styled.food_card}>
            딸기케이크
          </div>
          <img src={dessert} alt="랜덤음식"/>
        </div>
        
        <div className={styled.q_btn}>
          <p className={styled.recommend}>추천메뉴를 좋아하시나요?</p>

          <div className={styled.recommendedBtn}>
            <ButtonComp
              text="Good😘"
              btnStyle={buttonStyled.buttonActive}
              onClick={onFoodLike}
            />
            <ButtonComp
              text="No, thanks"
              btnStyle={buttonStyled.button}
              onClick={onFoodHate}
            />
          </div>
        </div>
      </section>

      <section className={styled.searchSection}>
        <input 
          placeholder="Fooriend의 다이어리를 검색해보세요!" 
          onChange={onChange}
        />
        <button onClick={onSearch}><GoSearch/></button>
      </section>
      
      <section>
        <div className={styled.main}>
          <div className={styled.main_title}>
            식단
            <div className={styled.text_deco}></div>
          </div>
          
          <h2>1월 2주차</h2>
              <div className={styled.week_menu}>
                <table>
                  <tr>
                    <td rowSpan={2}>Mon</td>
                    <td rowSpan={2}>1</td>
                    <td className={styled.menu}>☀️ 김치찌개</td>
                  </tr>
                  <tr>
                    <td className={styled.menu}>🌛 카레</td>
                  </tr>
                  
                </table>
              </div>
          {/* {menuList.map((item)=>{
            return(
              <div>
                <table>
                  <tr>
                    <td>월욜</td>
                    <td>음식</td>
                  </tr>
                </table>
              </div>
            )
          })} */}
        </div>
      </section>
    </article>
  );
};

export default MainPage;
