import { useCallback, useEffect, useRef, useState } from "react"
import axiosConfig from '@utils/axiosConfig';

interface TargetType{
  target: React.RefObject<HTMLDivElement>;
  url: string;
}
export const useInfiniteScroll = ({target, url}:TargetType)=>{
  const [items, setItems] = useState([]);
 
  const [page, setPage] = useState(1);
  const [ing, setIng] = useState(false);
  const preventRef = useRef(false);

  const getData = useCallback(async()=>{
    console.log(`${page} 데이터 불러오기`);
    setIng(true); //setloading
    const res = await axiosConfig.get(url,{params:{page: page}})
    if(res.data){
      setItems(prev=>prev.concat(res.data));
      preventRef.current = true;
    }
    else{
      console.log(res); //에러
    }
    setIng(false);
  },[page]);

  useEffect(()=>{
    const observer = new IntersectionObserver(onIntersect, {threshold: 1});
    if(target.current){
      observer.observe(target.current);
      return ()=>{observer.disconnect()}
    }
  },[]);

  useEffect(()=>{
    getData();
  },[page]);

  const onIntersect = ((entries:IntersectionObserverEntry[])=>{ //콜백함수
    if(entries[0].isIntersecting && preventRef.current){
      preventRef.current = false;
      setPage(prev=>prev+1);
    }
  })

  // useEffect(()=>{
  //   let observer:IntersectionObserver;
    
  //   if(target?.current && items.length>0){
  //     console.log('target이 바뀜');
  //     console.log(`에러는?: ${err}`);

  //     const onIntersect = async([entry]:IntersectionObserverEntry[], observer:IntersectionObserver)=>{ //콜백함수
  //       if(entry.isIntersecting){
  //         if(err){
  //           observer.unobserve(entry.target);
  //         }
  //         else{
  //           observer.unobserve(entry.target);
  //           await getData();
  //           if(!ing){
  //             return items;
  //           }
  //           observer.observe(entry.target);
  //         }
          
  //       }
  //     }
      
  //     observer = new IntersectionObserver(onIntersect, {threshold: 1});
  //     observer.observe(target.current);
  //   }
  //     return ()=> observer && observer.disconnect();
    
  // },[target.current, page]);
  
  return items;
}