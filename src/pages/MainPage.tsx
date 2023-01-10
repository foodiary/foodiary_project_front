import { ButtonComp, buttonStyled } from "@components/common";
import axiosConfig from "../core/apis/utils/axiosConfig";

import { useCallback, useEffect, useState } from "react";
import styled from "../styles/mainPage.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import { IRankMonth } from "types";
import { MediumCard } from "@components/common/Card";

enum days {
  month = "0",
  week = "1",
}

const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MainPage = () => {
  const [userName, setUserName] = useState<string>("jetom");
  const [tabMenu, setTabMenu] = useState<string>("0");
  const [daysBtn, setDaysBtn] = useState(days.month);
  const [recipeTab, setRecipeTab] = useState<string>("0");

  const [getRank, setGetRank] = useState([]);
  const [getWeekRank, setGetWeekRank] = useState([]);

  const getMonth = useCallback(async () => {
    try {
      const res = await axiosConfig.get("/rank/month");
      setGetRank(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getWeek = useCallback(async () => {
    try {
      const res = await axiosConfig.get("/rank/week");
      setGetWeekRank(res.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getMonth();
    getWeek();
  }, []);

  console.log(getWeekRank, "test");

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

        <div className={styled.dayBtn}>
          <ButtonComp
            text="1 달"
            btnStyle={
              daysBtn === days.month
                ? buttonStyled.buttonActive
                : buttonStyled.button
            }
            onClick={() => {
              setDaysBtn(days.month);
            }}
          />
          <ButtonComp
            text="1 주"
            btnStyle={
              daysBtn === days.week
                ? buttonStyled.buttonActive
                : buttonStyled.button
            }
            onClick={() => {
              setDaysBtn(days.week);
            }}
          />
        </div>

        {tabMenu === "0" && (
          <>
            <div className={styled.rankingContents}>
              <Swiper
                modules={[Scrollbar]}
                spaceBetween={24}
                scrollbar={{
                  draggable: true,
                  dragSize: 100,
                }}
                style={{ paddingBottom: "20px" }}
              >
                {daysBtn === days.month
                  ? getRank.map((recipe: IRankMonth) => (
                      <SwiperSlide key={recipe.recipeId}>
                        <MediumCard
                          img={recipe.recipePath1}
                          title={recipe.recipeTitle}
                          info
                          userId={recipe.recipeWriter}
                          like={recipe.recipeLike}
                          comment={recipe.recipeComment || "0"}
                          tag="TOP 20"
                        />
                      </SwiperSlide>
                    ))
                  : getWeekRank.map((recipe: IRankMonth) => (
                      <SwiperSlide key={recipe.recipeId}>
                        <MediumCard
                          img={recipe.recipePath1}
                          title={recipe.recipeTitle}
                          info
                          userId={recipe.recipeWriter}
                          like={recipe.recipeLike}
                          comment={recipe.recipeComment || "0"}
                          tag="TOP 20"
                        />
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>
            <div>
              <div className={styled.recipeSection}>
                <div className={styled.recipeTitle}>
                  <h3
                    className={
                      recipeTab === "0"
                        ? `${styled.rankingActiveTitle}`
                        : `${styled.rankingTitle}`
                    }
                  >
                    레시피
                  </h3>
                  <h3
                    className={
                      recipeTab === "1"
                        ? `${styled.rankingActiveTitle}`
                        : `${styled.rankingTitle}`
                    }
                  >
                    하루식단
                  </h3>
                </div>

                {recipeTab === "0" && (
                  <div className={styled.recipeContents}></div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </article>
  );
};

export default MainPage;
