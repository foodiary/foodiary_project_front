import { ButtonComp, buttonStyled, Card } from "@components/common";
import { useState } from "react";
import styled from "../styles/mainPage.module.scss";

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
                btnStyle={buttonStyled.button}
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

      <article className={styled.rankingWrapper}>
        <section className={styled.rankingContainer}>
          <div className={styled.titleDiv}>
            <p className={styled.rankingText}>
              랭킹 <span className={styled.rankingEmoji}>👑</span>
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
    </>
  );
};

export default MainPage;
