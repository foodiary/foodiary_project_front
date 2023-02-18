import React from "react";
import styled from "@styles/search.module.scss";
import { useEffect } from "react";
import axiosConfig from "@utils/axiosConfig";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLoginUserStore } from "@store/loginUserStore";

interface ResType {
  keyword: string;
  keywordId: number;
}
const Search = () => {
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);
  const [keyword, setKeyword] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const getMySearch = () => {
    axiosConfig
      .get("/search/daily", {
        params: { memberId: memberId },
      })
      .then((res) => {
        setKeyword(res.data);
      })
      .catch((err) => {
        console.log(err);
        setKeyword([]);
      });
  };
  useEffect(() => {
    getMySearch();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    const keywordId = event.currentTarget.id;
    navigate(`/search/result?${value || keywordId}`);
  };

  const onRemove = (keywordId: number) => {
    axiosConfig
      .delete(`/search/daily/delete/${memberId}/${keywordId}`)
      .then((res) => {
        getMySearch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styled.search_container}>
      <form className={styled.serach_box}>
        <input
          type="text"
          placeholder="검색어를 입력하세요."
          onChange={onChange}
        />
        <button type="submit" onClick={onSearch}>
          <GoSearch />
        </button>
      </form>
      <div className={styled.recent_search_box}>
        <h2>최근 검색어</h2>
        <ul className={styled.recent_search_list}>
          {keyword.map((keyword: ResType) => {
            return (
              <li>
                <div>
                  <button id={keyword.keyword} onClick={onSearch}>
                    {keyword.keyword}
                  </button>
                  <button onClick={() => onRemove(keyword.keywordId)}>
                    <MdOutlineCancel />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Search;
