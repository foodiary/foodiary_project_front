import { SmallCard } from '@components/common/Card';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosConfig from '@utils/axiosConfig';

const SearchResult = () => {
  const location = useLocation();
  console.log(location);
  useEffect(()=>{
  },[]);
  return (
    <div>
      <SmallCard/>
      <SmallCard/>
    </div>
  );
};

export default SearchResult;