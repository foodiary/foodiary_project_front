import React, { useEffect, useState } from "react";
import styles from "@styles/menuPage.module.scss";
import axiosConfig from "../core/apis/utils/axiosConfig";
import { useLoginUserStore } from "@store/loginUserStore";
import { AlertBox } from "@components/common/AlertBox/AlertBox";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";

const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface menuTypes {

}

const MenuPage = () => {
  const [menuList, setMenuList] = useState<any>([]);
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

  console.log(menuList);

  return (
    <section>
      {memberId !== 0 ?
      <div className={styles.menu}>
        <div className={styles.menu_title}>
          <DecoTitle title="식단"/>
        </div>

        <h2 className={styles.week_title}>1월 4주차</h2>
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
              <tr>
                <td rowSpan={2}>일</td>
                <td rowSpan={2}>22</td>
                <td className={styles.menu}>{menuList.menuSunLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuSunDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>월</td>
                <td rowSpan={2}>23</td>
                <td className={styles.menu}>{menuList.menuMonLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuMonDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>화</td>
                <td rowSpan={2}>24</td>
                <td className={styles.menu}>{menuList.menuTueLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuTueDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>수</td>
                <td rowSpan={2}>25</td>
                <td className={styles.menu}>{menuList.menuWedLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuWedDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>목</td>
                <td rowSpan={2}>26</td>
                <td className={styles.menu}>{menuList.menuThuLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuThuDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>금</td>
                <td rowSpan={2}>27</td>
                <td className={styles.menu}>{menuList.menuFriLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuFriDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>토</td>
                <td rowSpan={2}>28</td>
                <td className={styles.menu}>{menuList.menuSatLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuSatDinner}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>:
      <AlertBox text="로그인이 필요한 서비스입니다" type={false}/>
      }

    </section>
  );
};

export default MenuPage;
