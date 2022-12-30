import styles from "../styles/mainPage.module.scss";

const MainPage = () => {
  return (
    <div className={styles.mainWrapper}>
      <p className={styles.mainText}>
        안녕하세요, 신소율님! 오늘 메뉴 어떠세요?
      </p>
    </div>
  );
};

export default MainPage;
