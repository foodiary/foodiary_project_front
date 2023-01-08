import { useUserStore } from "@store/userStore";
import axios from "axios";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// const id = useUserStore(state=>state.id);
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers:{
    "Access-Control-Allow-Origin": "*",
  }
});

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       config.headers = {
//         Authorization: `Bearer ${token}`,
//       };
//     }

//     return config;
//   },
//   (err) => Promise.reject(err)
// );

instance.interceptors.response.use(
  (response) => {
    console.log("인터셉트 성공");
    return response;
  },
  (err) => {
    Promise.reject(err);
    if(err.response.status === 400){
      console.log("중복입니다");
    }
    
    // if (err.response.status === 401) {
    //   const token = localStorage.getItem("access_token");
    //   if (token) {
    //     localStorage.removeItem("access_token");
    //     return;
    //   }
    //   return;
    // }
  }
);

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

export default instance;
