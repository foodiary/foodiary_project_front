import { ButtonComp, buttonStyled } from "@components/common";
import { LargeCard, SmallCard } from "@components/common/Card";
import { useEffect, useRef } from "react";
import { useState } from "react";
import styles from "../styles/explorePage.module.scss";
import axiosConfig from "@utils/axiosConfig";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import { BsPencilFill } from "react-icons/bs";
import { useInfiniteScroll } from "@hook/useInfiniteScroll";

interface ResType {
  // dailyCreate: string;
  dailyId: number;
  dailyThumbnail: string;
  // dailyTitle: string;
}

const ExplorePage = () => {
  const [tab, setTab] = useState("0"); // 1달 1주 오늘
  let url = "";
  // const [url, setUrl] = useState("");
  const target = useRef<HTMLDivElement>(null);
  // let page = 1;
  // let items = [];

  // const items = useInfiniteScroll({target: target, url:url}).items;
  const page = useInfiniteScroll({target: target, url:url}).page;

  const [dailyList, setDailyList] = useState([]);

  const getDaily = () => {
    if (tab === "0") {
      url = "/dailys/month";
      // setUrl("/dailys/month");
    } else if (tab === "1") {
      url = "/dailys/week";
      // setUrl("/dailys/week");

    } else {
      url = "/dailys/today";
      // setUrl("/dailys/today");

    }
    // if(page !== 1){
      axiosConfig
      .get(url, { params: { page: page } })
      .then((res) => {
        console.log(res);
        setDailyList(prev=> prev.concat(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  };

  useEffect(() => {
    getDaily();
    // setDailyList(items);
  }, [tab]);

  return (
    <article className={styles.questWrapper}>
      <section className={styles.title}>
        <div className={styles.title_div}>
          <DecoTitle title="하루공유" />
        </div>
        <div className={styles.icon_box}>
          <Link to="/write" className={styles.search_icon}>
            <BsPencilFill />
          </Link>
          <Link to="/search" className={styles.search_icon}>
            <GoSearch />
          </Link>
        </div>
      </section>

      <div className={styles.btnDiv}>
        <ButtonComp
          text="1달"
          btnStyle={
            tab === "0" ? buttonStyled.buttonActive : buttonStyled.button
          }
          onClick={() => {
            setTab("0");
          }}
        />
        <ButtonComp
          text="1주"
          btnStyle={
            tab === "1" ? buttonStyled.buttonActive : buttonStyled.button
          }
          onClick={() => {
            setTab("1");
          }}
        />
        <ButtonComp
          text="오늘"
          btnStyle={
            tab === "2" ? buttonStyled.buttonActive : buttonStyled.button
          }
          onClick={() => {
            setTab("2");
          }}
        />
      </div>
      <section className={styles.dailySection}>
        <div className={styles.contents}>
          {dailyList.map((item: ResType, index) => {
            return (
              <Link
                to={`/explore/details`}
                state={{ list: dailyList.slice(index) }}
                key={item.dailyId}
              >
                <SmallCard img={item.dailyThumbnail} />
              </Link>
            );
          })}
        </div>
      </section>
      {dailyList.length>0 && 
          <div ref={target} className={styles.scroll_target}>
              <p>마지막 페이지입니다</p>
          </div>
      }
    </article>
  );
};

export default ExplorePage;
