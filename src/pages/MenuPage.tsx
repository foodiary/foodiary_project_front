import React, { useEffect, useState } from "react";
import styles from "@styles/menuPage.module.scss";
import axiosConfig from "../core/apis/utils/axiosConfig";
import { useLoginUserStore } from "@store/loginUserStore";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";

const MenuPage = () => {
  const [menuList, setMenuList] = useState<any>([]);
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  useEffect(() => {
    weekMenu();
  }, []);

  const getSunday = (d: any) => {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day === 1 ? -6 : 0);
    return new Date(d.setDate(diff));
  };

  const sunDate = getSunday(new Date());

  const year = sunDate.getFullYear();
  const month = (sunDate.getMonth() + 1).toString().padStart(2, "0");
  const day = sunDate.getDate().toString().padStart(2, "0");

  const getDay = (day: number) => {
    let dateSun = new Date(sunDate);

    dateSun.setDate(dateSun.getDate() + day);
    return dateSun
      .toLocaleDateString()
      .replaceAll(".", " ")
      .slice(-3)
      .replace(" ", "0")
      .slice(0, 2);
  };

  const sunday = `${year}-${month}-${day}`;

  const weekMenu = () => {
    //일주일 식단 추천
    axiosConfig
      .get(`/food/menu/week`, {
        params: { memberId: memberId, date: sunday },
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
      <div className={styles.menu}>
        <div className={styles.menu_title}>
          <DecoTitle title="식단" />
        </div>

        <h2 className={styles.week_title}>{`${
          sunDate.getMonth() + 1
        }월 4주차`}</h2>
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
                <td style={{ color: "red" }} rowSpan={2}>
                  일
                </td>
                <td style={{ color: "red" }} rowSpan={2}>
                  {getDay(0)}
                </td>
                <td className={styles.menu}>{menuList.menuSunLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuSunDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>월</td>
                <td rowSpan={2}>{getDay(1)}</td>
                <td className={styles.menu}>{menuList.menuMonLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuMonDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>화</td>
                <td rowSpan={2}>{getDay(2)}</td>
                <td className={styles.menu}>{menuList.menuTueLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuTueDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>수</td>
                <td rowSpan={2}>{getDay(3)}</td>
                <td className={styles.menu}>{menuList.menuWedLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuWedDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>목</td>
                <td rowSpan={2}>{getDay(4)}</td>
                <td className={styles.menu}>{menuList.menuThuLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuThuDinner}</td>
              </tr>
              <tr>
                <td rowSpan={2}>금</td>
                <td rowSpan={2}>{getDay(5)}</td>
                <td className={styles.menu}>{menuList.menuFriLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuFriDinner}</td>
              </tr>
              <tr>
                <td style={{ color: "blue" }} rowSpan={2}>
                  토
                </td>
                <td style={{ color: "blue" }} rowSpan={2}>
                  {getDay(6)}
                </td>
                <td className={styles.menu}>{menuList.menuSatLunch}</td>
              </tr>
              <tr>
                <td className={styles.menu}>{menuList.menuSatDinner}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* :
      <AlertBox text="로그인이 필요한 서비스입니다" type={false}/>
      } */}
    </section>
  );
};

export default MenuPage;
