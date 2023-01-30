import { SmallCard } from "@components/common/Card";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import axiosConfig from "@core/apis/utils/axiosConfig";
import basic_profile from "@img/basic_profile.png";
import styles from "@styles/profileView.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface myProfileTypes {
  memberNickName: string;
  memberPath: string;
  memberProfile: string;
}

const ProfileView = () => {
  const memberId = useParams().id;
  const [myProfile, setMyProfile] = useState<myProfileTypes>();
  const [myDailyList, setMyDailyList] = useState([]);

  useEffect(() => {
    axiosConfig
      .get(`/member/search/${memberId}`, {
        params: { memberId: memberId, page: 1 },
      })
      .then((res) => {
        setMyDailyList(res.data.memberDailyResponseDtos);
        setMyProfile(res.data.memberProfileResponseDtos);
        console.log(res);
      });
  }, []);

  return (
    <div className={styles.profileView_container}>
      <div className={styles.profile_box}>
        <img src={myProfile?.memberPath || basic_profile} alt="" />
        <p className={styles.nickname}>{myProfile?.memberNickName}</p>
        <p className={styles.profile_message}>{myProfile?.memberProfile}</p>
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
