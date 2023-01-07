import { useState } from "react";
import styled from "../styles/QuestPage.module.scss";

const QuestPage = () => {
  const [tab, setTab] = useState("0");
  return (
    <article className={styled.questWrapper}>
      <div className={styled.titleDiv}>
        <h3 className={tab === "0" ? styled.activeTitle : styled.title}>
          레시피
        </h3>
        <h3 className={tab === "1" ? styled.activeTitle : styled.title}>
          하루식단
        </h3>

        <input
          className={styled.searchIcon}
          type="button"
          onClick={() => {
            console.log("test");
          }}
        />
      </div>
      {tab === "0" && <section className={styled.recipeSection}></section>}
      {<section></section>}
    </article>
  );
};

export default QuestPage;
