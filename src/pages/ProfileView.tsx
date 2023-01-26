import { SmallCard } from "@components/common/Card";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import axiosConfig from "@core/apis/utils/axiosConfig";
import styles from "@styles/profileView.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ProfileView = () => {
  const memberId = useParams().id;
  const [myDailyList, setMyDailyList] = useState([]);

  useEffect(() => {
    axiosConfig
      .get(`/member/search/${memberId}`, {
        params: { memberId: memberId, page: 1 },
      })
      .then((res) => {
        setMyDailyList(res.data);
        console.log(res);
      });
  }, []);

  console.log(memberId);

  return (
    <div className={styles.profileView_container}>
      <div className={styles.profile_box}>
        <img src="" alt="" />
        <p className={styles.nickname}>닉네임</p>
        <p className={styles.profile_message}>상태메세지</p>
      </div>
      <DecoTitle title="하루공유" />
      <div className={styles.item_container}>
        {myDailyList.map((item: any) => {
          return (
            <Link
              to={`/detail/${item.dailyId}`}
              //   state={{ list: dailyList.slice(index) }}
              key={item.dailyId}
            >
              <SmallCard img={item.dailyThumbnail} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileView;
