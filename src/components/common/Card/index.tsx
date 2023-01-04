import styled from "./card.module.scss";

const Card = () => {
  return (
    <div className={styled.cardWrapper}>
      <div className={styled.img} />
      <div className={styled.tagContainer}>
        <p className={styled.tag}>TOP 100</p>
      </div>
      <p className={styled.title}>
        백종원 만능소스장으로 실패없는 꼬막비빔밥 ㅁㅁㅁ
      </p>

      <div className={styled.userInfoContainer}>
        <div className={styled.user}>
          <p>배고픈밥풀</p>
        </div>
        <div className={styled.info}>
          <div className={styled.infoContents}>
            <div className={styled.infoDeco} />
            <p>48</p>
          </div>
          <div className={styled.infoContents}>
            <div className={styled.infoDeco} />
            <p>24</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
