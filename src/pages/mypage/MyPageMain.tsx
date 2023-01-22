import React, { FormEvent, useEffect, useState } from 'react';
import {AiOutlineSetting} from 'react-icons/ai';
import {BiChevronRight} from 'react-icons/bi';
import styles from '@styles/mypage/myPageMain.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import basic_profile from '@img/basic_profile.png';
import myComments from '@img/myComments.png';
import myGood from '@img/myGood.png';
import myWriting from '@img/myWriting.png';
import myScrap from '@img/myScrap.png';
import { AlertBox, WarnBox } from '@components/common/AlertBox/AlertBox';
import { btnStateStore } from '@store/btnStateStore';
import { useLoginUserStore } from '@store/loginUserStore';
import axiosConfig from '../../core/apis/utils/axiosConfig';
import { useUpdateUser } from '@hook/useUpdateUser';
import {CgComment} from 'react-icons/cg';
import {TfiWrite} from 'react-icons/tfi';
import {BiBookBookmark, BiHeart} from 'react-icons/bi';

const MyPageMain = () => {
  useUpdateUser();

  const navigate = useNavigate();

  const userInfo = useLoginUserStore(state=>state.userInfo);
  const setUserInfo = useLoginUserStore(state=>state.setUserInfo);

  const [logout, setLogout] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  const cancel = btnStateStore(state=>state.cancel);
  const setCancel = btnStateStore(state=>state.setCancel);

  const clearUser = useLoginUserStore(state=>state.reset);

  const [alert, setAlert] = useState(false);

  useEffect(()=>{
    setLogout(false);
    setWithdraw(false);
    setCancel(false);
  },[]);

  const handleLogout = ()=>{
    setLogout(true);
    setWithdraw(false);
    setCancel(false);
  }
  const handleWithdraw = ()=>{
    setLogout(false);
    setWithdraw(true);
    setCancel(false);
  }
 
  const afterRes = ()=>{
    setAlert(true);
    localStorage.clear();
    clearUser();
    setTimeout(()=>{
      navigate("/");
      window.location.reload();
    },2000);
  }
  const onSubmit = (e:FormEvent)=>{
    e.preventDefault();
    console.log(withdraw);
    let url="";
    let METHOD = "";
    if(logout){
      url = '/auth/logout'
      METHOD = 'get';
    }
    else if(withdraw){
      url= `/member/${userInfo.memberId}`
      METHOD = 'delete';
    }
    console.log(url, METHOD);

    axiosConfig({
      method: METHOD,
      url: url,
    }).then(res=>{
      console.log(res);
      afterRes();
    }).catch(err=>{
      console.log(err);
    })

    // axiosConfig.delete(url).then(res=>{
    //   console.log(res);
    //   afterRes();
    // }).catch(err=>{
    //   console.log(err);
    // })
  }
  return (
    <div className={styles.mypage}>
      <div className={styles.profile_container}>

      {userInfo.memberId ?
        <>
        <img 
        src={userInfo.memberPath? userInfo.memberPath: basic_profile} 
        alt="기본이미지" 
        className={styles.profile_image}/>

        <div className={styles.user_info}>
          <p>{userInfo.memberNickName}</p>
          <p>{userInfo.memberEmail}</p>
        </div>

        <Link to="/mypage/setting">
          <div className={styles.setting}>
            <AiOutlineSetting/>
          </div>
        </Link>
        </>:
          <div className={styles.no_member}>
          <p>로그인이 필요합니다</p>
          <p>푸디어리와 함께 해요!</p>
          </div>}
      </div>
      

      <p className={styles.profile_msg}>
        {userInfo.memberProfile}
      </p>
      <div className={styles.myWriting_btns}>
        <div className={styles.link}>
          <Link to="/mypage/mywriting" className={styles.img} style={{'backgroundColor': '#03C75A'}}>
            <TfiWrite/>
            {/* <img src={myWriting} alt="이미지"/> */}
          </Link>
          <p>내가 쓴 글</p>
        </div>
        <div className={styles.link}>
          <Link to="/mypage/mycomments" className={styles.img} style={{'backgroundColor': '#FF007F'}}>
            <CgComment/>
            {/* <img src={myComments} alt="이미지"/> */}
          </Link>
          <p>내가 쓴 댓글</p>
        </div>
        <div className={styles.link}>
          <Link to="/mypage/mygood" className={styles.img} style={{'backgroundColor': 'pink'}}>
            <BiHeart/>

            {/* <img src={myGood} alt="이미지"/> */}
          </Link>
          <p>좋아요 글</p>
        </div>
        <div className={styles.link}>
          <Link to="/mypage/myscrap" className={styles.img} style={{'backgroundColor': 'rgb(106, 195, 246)'}}>
            <BiBookBookmark/>
            {/* <img src={myScrap} alt="이미지"/> */}
          </Link>
          <p>스크랩 글</p>
        </div>
      </div>

      <div className={styles.recommend_service}>
        <Link to="/mypage/myrecommend" className={styles.menu}>
          <p>나의 추천메뉴</p>
          <BiChevronRight/>
        </Link>
      </div>

      <div className={styles.customer_service}>
        <p className={styles.title}>고객센터</p>
        <Link to="/mypage/notice" className={styles.menu}>
          <p>공지사항</p>
          <BiChevronRight/>
        </Link>
        <Link to="/mypage/contact" className={styles.menu}>
          <p>1:1 문의하기</p>
          <BiChevronRight/>
        </Link>
        <Link to="/mypage/faq" className={styles.menu}>
          <p>FAQ</p>
          <BiChevronRight/>
        </Link>
      </div>

      { userInfo.memberId !== 0 &&
      <div className={styles.account_manage}>
        <p className={styles.title}>계정관리</p>
        <Link to="/member/password/change" className={styles.menu}>
          <p>비밀번호 변경</p>
          <BiChevronRight/>
        </Link>
        <button onClick={handleLogout}>로그아웃</button> 
        <button onClick={handleWithdraw}>탈퇴하기</button> {/*탈퇴하시겠습니까? 알럿창 */}
      </div>}
      {logout && !cancel &&
        <form className={styles.alert} onSubmit={onSubmit}>
          <WarnBox text='정말 로그아웃하시겠습니까?' btn_txt={'확인'}/>
        </form>}
      {withdraw && !cancel &&
        <form className={styles.alert} onSubmit={onSubmit}>
          <WarnBox text='정말 탈퇴하시겠습니까? *탈퇴시 재가입은 불가합니다*' btn_txt={'확인'}/>
        </form>}
      
      {alert && logout && 
        <div><AlertBox text='로그아웃 되었습니다.' type={true}/></div>
      }
      {alert && withdraw && 
        <div><AlertBox text='탈퇴 되셨습니다.' type={true}/></div>
      }
    </div>
  );
};

export default MyPageMain;