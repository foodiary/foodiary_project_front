import React, { useEffect, useState } from "react";
import styles from "@styles/menuPage.module.scss";
import axiosConfig from "../core/apis/utils/axiosConfig";
import { useLoginUserStore } from "@store/loginUserStore";
import { AlertBox } from "@components/common/AlertBox/AlertBox";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";

const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MenuPage = () => {
  const [menuList, setMenuList] = useState([]);
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  useEffect(() => {
    weekMenu();
  }, []);


  const weekMenu = () => {
    //일주일 식단 추천
    axiosConfig
      .get(`/food/menu/week`, {
        params: { memberId: memberId, date: "2023-01-22"},
      })
      .then((res) => {
        console.log(res);
        setMenuList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(new Date("2023-01-16"));

  return (
    <section>
      {/* {memberId !== 0 ? */}
      <div className={styles.menu}>
        <div className={styles.menu_title}>
          <DecoTitle title="식단"/>
        </div>

        <h2 className={styles.week_title}>1월 2주차</h2>
        <div className={styles.week_menu}>
          <table>
            <thead className={styles.table_head}>
              <tr>
                <td>요일</td>
                <td>일</td>
                <td>음식</td>
              </tr>
            </thead>
            <tbody>
              {DATE.map((day, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td rowSpan={2}>{day}</td>
                      <td rowSpan={2}>{index + 1}</td>
                      <td className={styles.menu}>☀️ 김치찌개</td>
                    </tr>
                    <tr>
                      <td className={styles.menu}>🌛 카레</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* {menuList.map((item) => {
        return (
          <div>
            <table>
              <tr>
                <td>월욜</td>
                <td>음식</td>
              </tr>
            </table>
          </div>
        );
      })} */}
      </div>
      {/* :
      <AlertBox text="로그인이 필요한 서비스입니다" type={false}/>
      } */}

    </section>
  );
};

export default MenuPage;
