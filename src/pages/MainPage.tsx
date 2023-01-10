import { ButtonComp, buttonStyled } from "@components/common";
import axiosConfig from "../core/apis/utils/axiosConfig";

import { useCallback, useEffect, useState } from "react";
import styled from "../styles/mainPage.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";

const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MainPage = () => {
  const [userName, setUserName] = useState<string>("jetom");
  const [tabMenu, setTabMenu] = useState<string>("0");
  const [recipeTab, setRecipeTab] = useState<string>("0");

  const [getRank, setGetRank] = useState([]);

  const getMonth = useCallback(async () => {
    try {
      const res: any = await axiosConfig.get("/rank/month");
      setGetRank(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getMonth();
  }, []);

  return (
    <article className={styled.mainPageWrapper}>
      <section className={styled.mainPageTitleSection}>
        <h2 className={styled.title}>
          안녕하세요, {userName}님! <br /> 오늘 메뉴 어떠세요?{" "}
        </h2>
      </section>

      <section className={styled.recommendeSection}>
        <p className={styled.recommende}>추천메뉴를 좋아하시나요?</p>

        <div className={styled.recommendedBtn}>
          <ButtonComp
            text="Good😘"
            btnStyle={buttonStyled.buttonActive}
            onClick={() => {
              console.log("test");
            }}
          />
          <ButtonComp
            text="No, thanks"
            btnStyle={buttonStyled.button}
            onClick={() => {
              console.log("test");
            }}
          />
        </div>
      </section>

      <section className={styled.searchSection}>
        <input placeholder="장칼국수 레시피를 검색해보세요!" />
      </section>

      <section className={styled.rankingSection}>
        <div className={styled.tabMenuContents}>
          <h3
            className={
              tabMenu === "0"
                ? `${styled.rankingActiveTitle}`
                : `${styled.rankingTitle}`
            }
          >
            랭킹
            <span
              className={
                tabMenu === "0"
                  ? `${styled.rankingActiveTitle}`
                  : `${styled.displayNone}`
              }
            >
              👑
            </span>
          </h3>
          <h3
            className={
              tabMenu === "1"
                ? `${styled.rankingActiveTitle}`
                : `${styled.rankingTitle}`
            }
          >
            식단
            <span
              className={
                tabMenu === "1"
                  ? `${styled.rankingActiveTitle}`
                  : `${styled.displayNone}`
              }
            >
              🍱
            </span>
          </h3>
        </div>

        {tabMenu === "0" && (
          <div className={styled.rankingContents}>
            <div className={styled.dayBtn}>
              <ButtonComp
                text="1 달"
                btnStyle={buttonStyled.buttonActive}
                onClick={() => {
                  console.log("test");
                }}
              />
              <ButtonComp
                text="1 주"
                btnStyle={buttonStyled.button}
                onClick={() => {
                  console.log("test");
                }}
              />
            </div>

            <div>
              <Swiper
                modules={[Scrollbar]}
                speed={500}
                spaceBetween={24}
                slidesPerView={"auto"}
                scrollbar={{ draggable: true, dragSize: 300 }}
              >
                {getRank.map((recipe) => (
                  <SwiperSlide key={recipe}></SwiperSlide>
                ))}
                {[1, 2, 3, 4, 5].map((slide, idx) => (
                  <SwiperSlide key={idx}>1</SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </section>

      <section className={styled.recipeSection}>
        <div className={styled.tabMenuContents}>
          <h3
            className={
              recipeTab === "0"
                ? `${styled.rankingActiveTitle}`
                : `${styled.rankingTitle}`
            }
          >
            랭킹
          </h3>
          <h3
            className={
              recipeTab === "1"
                ? `${styled.rankingActiveTitle}`
                : `${styled.rankingTitle}`
            }
          >
            식단
          </h3>
        </div>
        <div className={styled.recipeContents}></div>
      </section>
    </article>
  );
};

export default MainPage;
