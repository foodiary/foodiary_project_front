import { ButtonComp, buttonStyled } from "@components/common";
import { FeedCard, SmallCard } from "@components/common/Card";
import { useState } from "react";
import styled from "../styles/QuestPage.module.scss";

const QuestPage = () => {
  const [tab, setTab] = useState("1");
  return (
    <article className={styled.questWrapper}>
      <div className={styled.titleDiv}>
        <h3 className={tab === "0" ? styled.activeTitle : styled.title}>
          레시피
        </h3>
        <h3 className={tab === "1" ? styled.activeTitle : styled.title}>
          하루식단
        </h3>

        <button
          className={styled.searchIcon}
          onClick={() => {
            console.log("test");
          }}
        />
      </div>
      <div className={styled.btnDiv}>
        <ButtonComp
          text="1달"
          btnStyle={buttonStyled.buttonActive}
          onClick={() => {
            console.log("test");
          }}
        />
        <ButtonComp
          text="1주"
          btnStyle={buttonStyled.button}
          onClick={() => {
            console.log("test");
          }}
        />
        <ButtonComp
          text="오늘"
          btnStyle={buttonStyled.button}
          onClick={() => {
            console.log("test");
          }}
        />
      </div>
      {tab === "0" && (
        <section className={styled.recipeSection}>
          <div className={styled.contents}>
            <SmallCard />
            <SmallCard />
            <SmallCard />
            <SmallCard />
          </div>
        </section>
      )}
      {tab === "1" && (
        <section className={styled.dailyDietSection}>
          <div className={styled.dailyDietContents}>
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
        </section>
      )}
      {<section></section>}
    </article>
  );
};

export default QuestPage;
