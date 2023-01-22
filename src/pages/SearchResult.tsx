import { SmallCard } from '@components/common/Card';
import oneRank from "@img/rank01.png"
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import styled from "@styles/searchResult.module.scss"
import { useSearchStore } from '@store/searchStore';

interface SearchList {
  dailyThumbnail : string
}

const SearchResult = () => {

  const searchList = useSearchStore((state)=>state.searchList);

  console.log(searchList)

  const location = useLocation();
  console.log(location);
  useEffect(()=>{
  },[]);
  return (
    <div className={styled.search_result_container}>
      <h2 className={styled.search_keyword}>#{decodeURI(location.search).slice(1)}</h2>
      <div className={styled.search_result_box}>
        {searchList.map((searchList:any) => {
          return  <Link to={`/detail/${searchList.dailyId}`}>
          <SmallCard img={searchList.dailyThumbnail}/>
        </Link>
        })}
     
     
      </div>
    </div>
  );
};

export default SearchResult;