import React, { useRef } from 'react';
import styled from "@styles/search.module.scss"
import { useEffect } from 'react';
import axiosConfig from '@utils/axiosConfig';
import { useState } from 'react';
import {GoSearch} from 'react-icons/go';
import {MdOutlineCancel} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useLoginUserStore } from '@store/loginUserStore';
import { useSearchStore } from '@store/searchStore';
import { AlertBox } from '@components/common/AlertBox/AlertBox';
import { useInfiniteScroll } from '@hook/useInfiniteScroll';

interface ResType{
  keyword: string;
  keywordId: number;
}
const Search = () => {
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);
  const setSearchList = useSearchStore((state)=>state.setSearchList);
  // const [keyword, setKeyword] = useState([]);
  const [value, setValue] = useState("");
  const page = 1;
  const navigate = useNavigate();

  const target = useRef<HTMLDivElement>(null);
  const keyword = useInfiniteScroll({target: target, url:'/search/daily'});

  // const getMySearch = ()=>{
  //   axiosConfig.get('/search/daily',{
  //     params: {memberId: memberId,}
  //   }).then(res=>{
  //     setKeyword(res.data);
  //   }).catch(err=>{
  //     console.log(err);
  //   });
  // }
  // useEffect(()=>{
  //   getMySearch();
  // },[]);

  // console.log(keyword)

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
  };
  const onSearch = (event : React.MouseEvent<HTMLButtonElement>)=>{
    const keywordId = event.currentTarget.id
    axiosConfig.post('/search/daily/result',{
      keyword: value || keywordId,
      memberId: memberId,
      page: page,
    }).then(res=>{
      console.log(keywordId)
      setSearchList(res.data);
      navigate(`/search/result?${value || keywordId}`);
    }).catch(err=>{
      setSearchList([]);
      navigate(`/search/result?${value || keywordId}`);
    })
  }

  const onRemove = (keywordId: number)=>{
    axiosConfig.delete(`/search/daily/delete/${memberId}/${keywordId}`)
    .then(res=>{
      console.log(res);
      // getMySearch();
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className={styled.search_container}>
      <div className={styled.serach_box}>
        <input 
          type="text" 
          placeholder='검색어를 입력하세요.' 
          onChange={onChange}/>
        <button onClick={onSearch}>
          <GoSearch/>
        </button>
      </div>
      <div className={styled.recent_search_box}>
        <h2>최근 검색어</h2>
        <ul className={styled.recent_search_list}>
          {keyword.items?.map((keyword:ResType) => {
            return (
              <li>
                <div>
                  <button id={keyword.keyword} onClick={onSearch}>
                    {keyword.keyword}
                  </button>
                  <button onClick={()=>onRemove(keyword.keywordId)}>
                    <MdOutlineCancel/>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      {keyword.items.length>0 && 
          <div ref={target} className={styled.scroll_target}>
              <p>마지막 페이지입니다</p>
          </div>
        }
    </div>
  );
};

export default Search;