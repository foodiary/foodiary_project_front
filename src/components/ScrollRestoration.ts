import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = () => {
  const {pathname} = useLocation();
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior: 'smooth',
    });
  },[pathname]);

  return null;
};

export default ScrollRestoration;