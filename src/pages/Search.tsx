import React from 'react';
import styled from "@styles/search.module.scss"
import { useEffect } from 'react';
import axiosConfig from '@utils/axiosConfig';
import { useState } from 'react';
import {GoSearch} from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useLoginUserStore } from '@store/loginUserStore';
import { useSearchStore } from '@store/searchStore';


const Search = () => {
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);
  const setSearchList = useSearchStore((state)=>state.setSearchList);
  const [keyword, setKeyword] = useState<any>()
  const [value, setValue] = useState("");
  const page = 1;
  const navigate = useNavigate();


  useEffect(()=>{
    axiosConfig.get('/search/daily',{
      params: {memberId: memberId,}
    }).then(res=>{
      setKeyword(res.data);
    }).catch(err=>{
      console.log(err);
    });
  },[]);

  console.log(keyword)

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

      alert("검색어와 일치하는 게시글이 없습니다.")
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
          {keyword?.map((keyword:any) => {
            return (
              <li>
                <div>
                  <button id={keyword.keyword} onClick={onSearch}>{keyword.keyword}</button>
                  <button>X</button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default Search;