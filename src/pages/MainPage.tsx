import React from "react";
import { ButtonComp, buttonStyled } from "@components/common";
import axiosConfig from "../core/apis/utils/axiosConfig";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "../styles/mainPage.module.scss";
import { useLoginUserStore } from "@store/loginUserStore";
import { Link, useNavigate } from "react-router-dom";
import dessert from "@img/dessert.png";
import japaneseFood from "@img/japanese_food.png";
import koreanFood from "@img/korean_food.png";
import westernFood from "@img/western_food.png";
import chineseFood from "@img/chinese_food.png";
import etcFood from "@img/etc.png";
import stewFood from "@img/stew.png";
import schoolFood from "@img/school_food.png";
import EmptyText from "@components/common/Text/EmptyText";
import { SmallCard } from "@components/common/Card";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import { GoSearch } from "react-icons/go";
import { useUpdateUser } from "@hook/useUpdateUser";
import { useLoadingStore } from "@store/loadingStore";

interface ResType {
  recipeComment: number;
  dailyId: number;
  recipeLike: number;
  dailyPath1: string;
  dailyTitle: string;
  recipeView: number;
  recipeWriter: string;
}
// 레시피 -> 데일리로 변경하기

interface RandomFoodType {
  foodCategory: String | undefined;
  foodId: Number;
  foodName: String;
}

interface User {
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
  const nickName = useLoginUserStore((state) => state.userInfo.memberNickName);

  const [userName, setUserName] = useState<string>("푸디어리");

  // const [daysBtn, setDaysBtn] = useState(days.month);
  const setUserInfo = useLoginUserStore((state) => state.setUserInfo);
  const userInfo = useLoginUserStore((state) => state.userInfo);
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  useEffect(() => {
    if (nickName) {
      setUserName(nickName);
    }
  }, []);

  const [recommenu, setRecomMenu] = useState<RandomFoodType>();
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

  const getRandomFoodImg = (cate: String | undefined) => {
    if (cate === "일식") {
      return <img src={japaneseFood} alt="랜덤음식" />;
    } else if (cate === "양식") {
      return <img src={westernFood} alt="랜덤음식" />;
    } else if (cate === "중식") {
      return <img src={chineseFood} alt="랜덤음식" />;
    } else if (cate === "분식") {
      return <img src={schoolFood} alt="랜덤음식" />;
    } else if (cate === "찜탕찌개") {
      return <img src={stewFood} alt="랜덤음식" />;
    } else if (cate === "카페디저트") {
      return <img src={dessert} alt="랜덤음식" />;
    } else if (cate === "백반, 면, 죽") {
      return <img src={koreanFood} alt="랜덤음식" />;
    } else if (cate === "기타") {
      return <img src={etcFood} alt="랜덤음식" />;
    }
  };

  useEffect(() => {
    recommendMenu();
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
          <div className={styled.food_card}>{recommenu?.foodName}</div>
          {getRandomFoodImg(recommenu?.foodCategory) || (
            <img src={etcFood} alt="랜덤음식" />
          )}
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
                console.log(item);
                return (
                  <Link to={`/detail/${item.dailyId}`}>
                    <SmallCard img={item.dailyPath1} />
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
