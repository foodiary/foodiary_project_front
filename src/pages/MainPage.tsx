import { ButtonComp, buttonStyled, Card } from "@components/common";
import { useState } from "react";
import styled from "../styles/mainPage.module.scss";

const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

{
  /* <div className={styled.recommendedBtn}>
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
</div> */
}

const MainPage = () => {
  const [userName, setUserName] = useState("jetom");

  return (
    <article className={styled.mainPageWrapper}>
      <section>
        <h2>안녕하세요, {userName}님! 오늘 메뉴 어떠세요? </h2>
      </section>
    </article>
  );
};

export default MainPage;
