import { SmallCard } from '@components/common/Card';
import oneRank from "@img/rank01.png"
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import styled from "@styles/searchResult.module.scss"

const SearchResult = () => {
  const location = useLocation();
  console.log(location);
  useEffect(()=>{
  },[]);
  return (
    <div className={styled.search_result_container}>
      <h2 className={styled.search_keyword}>#{decodeURI(location.search).slice(1)}</h2>
      <div className={styled.search_result_box}>
      <Link to={`/detail/1`}>
        <SmallCard img={oneRank}/>
      </Link>
      <Link to={`/detail/1`}>
        <SmallCard img={oneRank}/>
      </Link>
      <Link to={`/detail/1`}>
        <SmallCard img={oneRank}/>
      </Link>
      </div>
    </div>
  );
};

export default SearchResult;