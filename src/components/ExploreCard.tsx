import { useInfiniteScroll } from "@hook/useInfiniteScroll";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/explorePage.module.scss";
import { SmallCard } from "./common/Card";

interface ResType {
  dailyId: number;
  dailyThumbnail: string;
}
interface PropsType {
  url: string;
}
const ExploreCard = ({ url }: PropsType) => {
  const target = useRef<HTMLDivElement>(null);
  const dailyList = useInfiniteScroll({ target: target, url: url }).items;

  return (
    <div>
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
      <div ref={target} className={styles.scroll_target}></div>
    </div>
  );
};

export default ExploreCard;
