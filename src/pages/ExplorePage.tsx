import { ButtonComp, buttonStyled } from "@components/common";
import { LargeCard, SmallCard } from "@components/common/Card";
import { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/explorePage.module.scss";
import axiosConfig from '@utils/axiosConfig';
import {GoSearch} from 'react-icons/go';
import { Link } from "react-router-dom";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";

interface ResType{
  // dailyCreate: string;
  dailyId: number;
  dailyPath: string;
  // dailyTitle: string;
}

const ExplorePage = () => {
  const [tab, setTab] = useState("0"); // 1달 1주 오늘
  let url = "";
  let page = 1;

  const [dailyList, setDailyList] = useState([]);

  const getDaily = ()=>{
    if(tab === "0"){ url = '/dailys/month' }
    else if(tab === "1"){ url = '/dailys/week' }
    else{ url = '/dailys/today'}

    axiosConfig.get(url, {params:{page: page}}).then(res=>{
      console.log(res);
      setDailyList(res.data);
    }).catch(err=>{
      console.log(err);
    });
  }

  useEffect(()=>{
    getDaily();
  },[tab]);

  return (
    <article className={styles.questWrapper}>
      <section className={styles.title}>
        <div className={styles.title_div}>
          <DecoTitle title="하루식단"/>
        </div>
        <Link to="/search" className={styles.search_icon}>
          <GoSearch/>
        </Link>
      </section>

      <div className={styles.btnDiv}>
        <ButtonComp
          text="1달"
          btnStyle={tab ==="0"? buttonStyled.buttonActive : buttonStyled.button}
          onClick={() => {
            setTab("0");
          }}
        />
        <ButtonComp
          text="1주"
          btnStyle={tab ==="1"? buttonStyled.buttonActive : buttonStyled.button}
          onClick={() => {
            setTab("1");
          }}
        />
        <ButtonComp
          text="오늘"
          btnStyle={tab ==="2"? buttonStyled.buttonActive : buttonStyled.button}
          onClick={() => {
            setTab("2");
          }}
        />
      </div>
      {/* {tab === "0" && ( */}
        <section className={styles.dailySection}>
          <div className={styles.contents}>
            {dailyList.map((item:ResType, index)=>{
              return(
                <Link 
                  to={`/explore/details`} 
                  state={{list: dailyList.slice(index)}}
                  key={item.dailyId}>
                  <SmallCard img={item.dailyPath}/>
                </Link>
              )
            })}
          </div>
        </section>
      {/* )} */}
      {/* {tab === "1" && (
        <section className={styles.dailyDietSection}>
          <div className={styles.dailyDietContents}></div>
        </section>
      )}
      {
        <section>
          <LargeCard />
          <LargeCard />
          <LargeCard />
          <LargeCard />
        </section>
      } */}
    </article>
  );
};

export default ExplorePage;
