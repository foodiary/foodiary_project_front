import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollRestoration = () => {
  const {pathname} = useLocation();
  console.log(window.scrollY);
  useEffect(()=>{
    // window.scrollTo({
    //   top:0,
    //   behavior: 'smooth',
    // });
    window.scrollTo(0, 0);
  },[pathname]);

  return null;
};

export default ScrollRestoration;