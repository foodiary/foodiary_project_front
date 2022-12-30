import React from "react";
import { BsSearch } from "react-icons/bs";
import { Outlet } from "react-router-dom";
// import '../styles/header.module.scss';
import "../../styles/header.scss";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header">
          <div className="main-logo">Foodiary</div>
          <div className="navbar">
            <p>랭킹</p>
            <p>식단</p>
            <p>레시피</p>
            <p>마이페이지</p>
          </div>
          <div className="profile">
            <button>
              <BsSearch />
            </button>
            <div>사진</div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
