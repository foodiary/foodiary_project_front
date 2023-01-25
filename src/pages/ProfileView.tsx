import { SmallCard } from "@components/common/Card";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import axiosConfig from "@core/apis/utils/axiosConfig";
import styles from "@styles/profileView.module.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileView = () => {
  useEffect(() => {
    axiosConfig
      .get(`/member/search/${116}`, {
        params: { memberId: 116, page: 1 },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className={styles.profileView_container}>
      <div className={styles.profile_box}>
        <img src="" alt="" />
        <p className={styles.nickname}>닉네임</p>
        <p className={styles.profile_message}>상태메세지</p>
      </div>
      <DecoTitle title="하루공유" />
      <div className={styles.item_container}>
        <Link
          to={`/explore/details`}
          //   state={{ list: dailyList.slice(index) }}
          //   key={item.dailyId}
        >
          <SmallCard />
        </Link>
      </div>
    </div>
  );
};

export default ProfileView;
