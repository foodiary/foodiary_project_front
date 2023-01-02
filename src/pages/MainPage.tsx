import { ButtonComp, buttonStyled, Card } from "@components/common";
import { useState } from "react";
import styled from "../styles/mainPage.module.scss";

const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MainPage = () => {
  const [userName, setUserName] = useState("신소율");

  return (
    <>
      <article className={styled.mainWrapper}>
        <section className={styled.mainTextContainer}>
          <div>
            <p className={styled.mainText}>안녕하세요, {userName}님!</p>
            <p className={styled.mainText}>오늘 메뉴 어떠세요?</p>
          </div>

          <div className={styled.recommendedContainer}>
            <p className={styled.recommended}>추천메뉴를 좋아하시나요?</p>

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
          </div>
        </section>

        <div>그림~~~~</div>
      </article>

      <div className={styled.inputSection}>
        <input
          placeholder="장칼국수 레시피를 검색해보세요!"
          className={styled.input}
        />
      </div>

      <article className={styled.noBgContentsWrapper}>
        <section className={styled.noBgContentsContainer}>
          <div className={styled.titleDiv}>
            <p className={styled.contentsText}>
              랭킹 <span className={styled.contentsEmoji}>👑</span>
            </p>

            <button className={styled.moreContents}>
              {`더 많은 컨텐츠 보러가기 ->`}
            </button>
          </div>

          <div className={styled.rankingContants}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
      </article>

      <article className={styled.noBgContentsWrapper}>
        <section className={styled.noBgContentsContainer}>
          <div className={styled.titleDiv}>
            <p className={styled.contentsText}>
              식단 <span className={styled.contentsEmoji}>🍱</span>
            </p>
          </div>
          <table className={styled.calendarTableWrapper}>
            {DATE.map((date) => (
              <th key={date} className={styled.calendarTableTh}>
                {date}
              </th>
            ))}
          </table>
        </section>
      </article>

      <article className={styled.recipeWrapper}>
        <section className={styled.recipeContainer}>
          <div className={styled.titleDiv}>
            <p className={styled.contentsText}>실시간 하루식단 / 레시피</p>

            <button className={styled.moreContents}>
              {`더 많은 컨텐츠 보러가기 ->`}
            </button>
          </div>

          <div className={styled.rankingContants}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
      </article>
    </>
  );
};

export default MainPage;
