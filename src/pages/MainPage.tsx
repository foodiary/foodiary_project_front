import React from "react";
import { ButtonComp, buttonStyled } from "@components/common";
import axiosConfig from "../core/apis/utils/axiosConfig";

import { ChangeEvent, useEffect, useState } from "react";
import styled from "../styles/mainPage.module.scss";
import { useLoginUserStore } from "@store/loginUserStore";
import { GoSearch } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import dessert from "@img/dessert.png";
import EmptyText from "@components/common/Text/EmptyText";
import { SmallCard } from "@components/common/Card";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";

interface ResType {
  recipeComment: number;
  recipeId: number;
  recipeLike: number;
  recipePath1: string;
  recipeTitle: string;
  recipeView: number;
  recipeWriter: string;
}
// 레시피 -> 데일리로 변경하기

const MainPage = () => {
  const navigate = useNavigate();
  const nickName = useLoginUserStore((state) => state.userInfo.memberNickName);

  const [userName, setUserName] = useState<string>("푸디어리");

  // const [daysBtn, setDaysBtn] = useState(days.month);
  const memberId = 76;

  useEffect(() => {
    if (nickName) {
      setUserName(nickName);
    }
  }, []);

  useEffect(() => {
    const getRanking = async () => {
      const result = await axiosConfig.get(
        "https://7d61-211-58-204-152.jp.ngrok.io/rank/month"
      );
      console.log(result);
    };
    getRanking();
  }, []);

  const [menuList, setMenuList] = useState([]);
  const [recommenu, setRecomMenu] = useState([]);
  const [value, setValue] = useState("");

  const recommendMenu = () => {
    //랜덤메뉴추천
    let params = {};
    if (memberId) {
      params = { memberId: memberId };
    }
    axiosConfig
      .get(`/food`, { params: params })
      .then((res) => {
        console.log(res);
        setRecomMenu(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const weekMenu = () => {
    //일주일 식단 추천
    axiosConfig
      .get(`/food/menu/week`, { params: { memberId: memberId } })
      .then((res) => {
        console.log(res);
        setMenuList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    recommendMenu();
    weekMenu();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const onFoodLike = () => {
    // axiosConfig.patch(`/food/like/${memberId}/${memberFoodId}`)
    // .then(res=>{
    //   console.log(res);
    //   return(alert("반영되었습니다")); //알럿박스로 바꾸기
    // }).catch(err=>{
    //   console.log(err);
    // });
  };

  const onFoodHate = () => {
    // axiosConfig.patch(`/food/hate/${memberId}/${memberFoodId}`)
    // .then(res=>{
    //   console.log(res);
    //   return(alert("반영되었습니다")); //알럿박스로 바꾸기
    // }).catch(err=>{
    //   console.log(err);
    // });
  };
  const onSearch = () => {
    let data = {};
    if (memberId) {
      data = {
        keyword: value,
        memberId: memberId,
        page: 1,
      };
    } else {
      data = {
        keyword: value,
        page: 1,
      };
    }
    console.log(memberId, value);
    axiosConfig
      .post(`/search/daily/result`, data)
      .then((res) => {
        console.log(res);
        return alert("검색"); //알럿박스로 바꾸기
        // navigate("/search/result");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [rankingList, setRankingList] = useState([]);
  const [month, setMonth] = useState(true);
  let url = "";

  const getRankList = () => {
    if (month) {
      url = "/rank/month";
    } else {
      url = "/rank/week";
    }
    axiosConfig
      .get(url)
      .then((res) => {
        console.log(res);
        setRankingList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRankList();
  }, [month]);
  return (
    <article className={styled.mainPageWrapper}>
      <section className={styled.mainPageTitleSection}>
        <h2 className={styled.title}>
          안녕하세요, {nickName || "푸디어리"}님! <br /> 오늘 이 메뉴 어떠세요?{" "}
        </h2>
      </section>

      {/* 음식 아이콘이랑 카드 넣기 */}

      <section className={styled.recommendeSection}>
        <div className={styled.random_food}>
          <div className={styled.food_card}>딸기케이크</div>
          <img src={dessert} alt="랜덤음식" />
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
        <button onClick={onSearch}>
          <GoSearch />
        </button>
      </section>

      <section>
        <div className={styled.ranking}>
          <div className={styled.title}>
            <DecoTitle title="랭킹" />
          </div>
          <div className={styled.tab}>
            <ButtonComp
              text={"1달"}
              btnStyle={month ? buttonStyled.buttonActive : buttonStyled.button}
              onClick={() => setMonth(true)}
            />
            <ButtonComp
              text={"1주"}
              btnStyle={month ? buttonStyled.button : buttonStyled.buttonActive}
              onClick={() => setMonth(false)}
            />
          </div>

          <div className={styled.card_container}>
            {rankingList.length > 0 ? (
              rankingList.map((item: ResType) => {
                return (
                  <Link to={`/detail/${item.recipeId}`}>
                    <SmallCard img={item.recipePath1} />
                  </Link>
                );
              })
            ) : (
              <EmptyText text="랭킹이 없습니다" />
            )}
          </div>
        </div>
      </section>
    </article>
  );
};

export default MainPage;
