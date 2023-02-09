import React, { useEffect, useRef, useState } from "react";
import arrow_icon from "@img/arrow_icon.svg";
import styles from "@styles/mypage/myRecommend.module.scss";
import axiosConfig from "../../core/apis/utils/axiosConfig";
import { useLoginUserStore } from "@store/loginUserStore";
import EmptyText from "@components/common/Text/EmptyText";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import { ButtonComp, buttonStyled } from "@components/common";
import { useInfiniteScroll } from "@hook/useInfiniteScroll";

interface ResType {
  foodId: number;
  foodName: number;
  memberFoodId: number;
  memberFoodLike: string;
  memberId: number;
}

const MyRecommend = () => {
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);
  const [menuList, setMenuList] = useState([]);
  const [idx, setIdx] = useState(0);
  const target = useRef<HTMLDivElement>(null);

  const items = useInfiniteScroll({
    target: target,
    url: `/member/food/${memberId}`,
  }).items;

  useEffect(() => {
    setMenuList(items);
  }, [items]);

  const getMyPreference = () => {
    setMenuList([]);
    axiosConfig
      .get(`/member/food/${memberId}`, { params: { page: 1 } })
      .then((res) => {
        console.log(res);
        setMenuList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const onModifyState = async (
    foodId: number,
    memberFoodLike: string,
    index: number
  ) => {
    let url = "";

    if (memberFoodLike === "Y") {
      url = "/food/hate";
    } else {
      url = "/food/like";
    }
    await axiosConfig
      .post(url, {
        memberId: memberId,
        foodId: foodId,
      })
      .then((res) => {
        window.location.reload();
        setIdx(index);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.recommend}>
      <div className={styles.title}>
        <DecoTitle title="나의 추천 메뉴" />
      </div>
      <p className={styles.explain}>버튼을 눌러 상태값을 변경해보세요!</p>
      <img src={arrow_icon} alt="화살표" />
      <div className={styles.menu_list}>
        {menuList.length > 0 ? (
          menuList.map((menu: ResType, index: number) => {
            return (
              <div className={styles.menu} key={menu.memberFoodId}>
                <p>{menu.foodName}</p>
                <ButtonComp
                  text={menu.memberFoodLike === "N" ? "Nope" : "Good"}
                  btnStyle={
                    menu.memberFoodLike === "N"
                      ? buttonStyled.button
                      : buttonStyled.buttonActive
                  }
                  onClick={() =>
                    onModifyState(menu.foodId, menu.memberFoodLike, index)
                  }
                />
              </div>
            );
          })
        ) : (
          <EmptyText text="내가 추천받은 메뉴가 없습니다." />
        )}
      </div>
      <div ref={target} className={styles.scroll_target}></div>
    </div>
  );
};

export default MyRecommend;
