import React from 'react';
import { useEffect } from 'react';
import axiosConfig from '@utils/axiosConfig';
import { useState } from 'react';
import {GoSearch} from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const memberId = 1;
  const [value, setValue] = useState("");
  const page = 1;
  const navigate = useNavigate();
  // useEffect(()=>{
  //   axiosConfig.get('/search/daily',{
  //     params: {memberId: memberId,}
  //   }).then(res=>{
  //     console.log(res);
  //   }).catch(err=>{
  //     console.log(err);
  //   });
  // },[]);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value);
  };
  const onSearch = ()=>{
    axiosConfig.post('/search/daily/result',{
      keyword: value,
      // memberId: memberId,
      page: page,
    }).then(res=>{
      console.log(res);
      navigate(`/search/result?${value}`);
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div>
      <input 
        type="text" 
        placeholder='검색어를 입력하세요.' 
        onChange={onChange}/>
      <button onClick={onSearch}>
        <GoSearch/>
      </button>
    </div>
  );
};

export default Search;