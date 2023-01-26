import { SmallCard } from '@components/common/Card';
import oneRank from "@img/rank01.png"
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';
import styled from "@styles/searchResult.module.scss"
import { useSearchStore } from '@store/searchStore';
import EmptyText from '@components/common/Text/EmptyText';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';
import { useLoginUserStore } from '@store/loginUserStore';

interface SearchList {
  dailyThumbnail : string
}

const SearchResult = () => {
  const location = useLocation();
  console.log(location);
  
  const searchWord = decodeURI(location.search).slice(1);
  const target = useRef<HTMLDivElement>(null);
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  const data = {
    keyword: searchWord,
      memberId: memberId,
      page: 1, //page
  }
  const result = useInfiniteScroll({target: target, url:'/search/daily/result', mode: "post", data: data}).items;
  // const [result, setResult] = useState([]);

  // console.log(keyword);

  // const onSearch = ()=>{
  //   axiosConfig.post('/search/daily/result',{
  //     keyword: searchWord,
  //     memberId: memberId,
  //     page: 1, //page
  //   })//여기까지만 주면?
  //   .then(res=>{
  //     // console.log(keywordId)
  //     setResult(res.data);
  //   }).catch(err=>{
  //     console.log(err);
  //   })
  // }

  // const searchList = useSearchStore((state)=>state.searchList);

  // console.log(searchList)

  // useEffect(()=>{
  //   onSearch();
  // },[]);

  return (
    <div className={styled.search_result_container}>
      <h2 className={styled.search_keyword}>#{decodeURI(location.search).slice(1)}</h2>
      
      {result.length>0 ? <div className={styled.search_result_box}>
        {result.map((searchList:any) => {
          return  (
            <Link to={`/detail/${searchList.dailyId}`} key={searchList.dailyId}>
              <SmallCard img={searchList.dailyThumbnail}/>
            </Link>
          )
        })}
      </div>:
      <EmptyText text='검색 결과가 없습니다'/>
      }
      {/* {keyword.length>0 &&  */}
          <div ref={target} className={styled.scroll_target}>
              {/* <p>마지막 페이지입니다</p> */}
          </div>
        {/* } */}
    </div>
  );
};

export default SearchResult;