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
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import { GoSearch } from "react-icons/go";
import { useUpdateUser } from "@hook/useUpdateUser";
import { AlertBox } from "@components/common/AlertBox/AlertBox";
import { useSearchStore } from "@store/searchStore";
import { IoReloadCircleSharp } from "react-icons/io5";
import {AiOutlineReload} from 'react-icons/ai';
import { BsTrophyFill } from "react-icons/bs";
import {AnimatePresence, motion} from 'framer-motion';
import menu_board from "@img/menu_board.svg";
import 'animate.css';

interface ResType {
  dailyId: number;
  dailyThumbnail: string;
  dailyTitle: string;
}

interface RandomFoodType {
  foodCategory: String | undefined;
  foodId: Number;
  foodName: String;
}

const MainPage = () => {
  useUpdateUser();
  const navigate = useNavigate();
  const nickName = useLoginUserStore((state) => state.userInfo.memberNickName);
  const setSearchList = useSearchStore((state) => state.setSearchList);
  const [userName, setUserName] = useState<string>("푸디어리");
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);
  const [forbidden, setForbidden] = useState(false);

  const [alert, setAlert] = useState(false); //음식추천버튼누를때

  useEffect(() => {
    if (nickName) {
      setUserName(nickName);
    }
  }, []);

  const [recommenu, setRecomMenu] = useState<RandomFoodType>();
  const [value, setValue] = useState("");

  const recommendMenu = () => {
    setAlert(false);
    setForbidden(false);
    //랜덤메뉴추천
    let params = {};
    if (memberId) {
      params = { memberId: memberId };
    }
    axiosConfig
      .get(`/food`, { params: params })
      .then((res) => {
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
    axiosConfig
      .post(`/food/like`, {
        foodId: recommenu?.foodId,
        memberId: memberId,
      })
      .then((res) => {
        setAlert(true);
        setTimeout(recommendMenu, 1000);
      })
      .catch((err) => {
        console.log(err);
        setAlert(false);
      });
  };

  const onFoodHate = () => {
    axiosConfig
      .post(`/food/hate`, {
        foodId: recommenu?.foodId,
        memberId: memberId,
      })
      .then((res) => {
        setAlert(true);
        setTimeout(recommendMenu, 1000);
      })
      .catch((err) => {
        console.log(err);
        setAlert(false);
      });
  };

  const onSearch = () => {
    navigate(`/search/result?${value}`);
  };

  const [rankingList, setRankingList] = useState<any>([]);
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
        setRankingList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRankList();
  }, [month]);

  const onForbidden = () => {
    setForbidden(true);
    setTimeout(() => setForbidden(false), 1000);
    setTimeout(recommendMenu, 1000);
  };
  return (
    <article className={styled.mainPageWrapper}>
      <section className={styled.mainPageTitleSection}>
        <h2 className={styled.title}>
          안녕하세요, <br /> {nickName || "푸디어리"}님! <br /> 오늘 이 메뉴
          어떠세요?{" "}
        </h2>
      </section>

      <section className={styled.recommendeSection}>
        <div className={styled.random_food}>
          <div className={styled.food_card}>
            <img src={menu_board} alt="랜덤추천" />
            <motion.button 
              whileHover={{
                rotate: 360,
                transition: {duration: 0.5}
              }}
              onClick={recommendMenu} 
              className={styled.reloadFood}>
              {/* <IoReloadCircleSharp /> */}
              <AiOutlineReload fontSize={18}/>
            </motion.button>
            {/* <p className="animate__animated animate__flipInX"> */}
            <p>
              {recommenu?.foodName}
            </p>
          </div>
          <motion.div 
            initial={{y: 10, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            className={styled.food_icon}>
            {getRandomFoodImg(recommenu?.foodCategory) || (
              <img src={etcFood} alt="랜덤음식" />
            )}
          </motion.div>
        </div>

        <div className={styled.q_btn}>
          <p className={styled.recommend}>추천메뉴를 좋아하시나요?</p>

          <div className={styled.recommendedBtn}>
            <ButtonComp
              text="Good😘"
              btnStyle={buttonStyled.buttonActive}
              onClick={memberId ? onFoodLike : onForbidden}
            />
            <ButtonComp
              text="No, thanks"
              btnStyle={buttonStyled.button}
              onClick={memberId ? onFoodHate : onForbidden}
            />
          </div>
        </div>
      </section>
      {forbidden && (
        <div>
          <AlertBox text="로그인 후 이용하실 수 있습니다" type={false} />
        </div>
      )}

      <form className={styled.searchSection}>
        <input placeholder="검색어를 입력해주세요." onChange={onChange} />
        <button type="submit" onClick={onSearch}>
          <GoSearch />
        </button>
      </form>

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
              rankingList.map((item: ResType, index: number) => {
                return (
                  <Link to={`/detail/${item.dailyId}`}>
                    <AnimatePresence>
                    <motion.div 
                      key={rankingList}
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      exit={{opacity: 0, transition:{duration:0}}}
                      whileHover={{scale:1.02, transition: {duration:0.3}}}
                      className={styled.rank_card_container}>
                      <img src={item.dailyThumbnail} alt="" />
                      <div>
                        {index === 0 && (
                          <BsTrophyFill color="gold" fontSize={30} />
                        )}
                        {index === 1 && (
                          <BsTrophyFill color="silver" fontSize={30} />
                        )}
                        {index === 2 && (
                          <BsTrophyFill color="#CD7F32" fontSize={30} />
                        )}
                      </div>
                      <p>{item.dailyTitle}</p>
                    </motion.div>
                    </AnimatePresence>
                  </Link>
                );
              })
            ) : (
              <EmptyText text="랭킹이 없습니다" />
            )}
          </div>
        </div>
      </section>
      {alert && <AlertBox text="등록되었습니다" type={true} />}
    </article>
  );
};

export default MainPage;
