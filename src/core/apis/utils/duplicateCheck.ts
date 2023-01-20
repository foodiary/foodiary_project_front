import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers:{
    "Access-Control-Allow-Origin": "*",
  }
});

instance.interceptors.response.use(
  (response) => {
    console.log("인터셉트 성공");
    return response;
  },
  (err) => {
    // Promise.reject(err);
    if(err.response.status === 400){
      console.log(`인터셉트에서: ${err.response.data.msg}`);
    }
    return Promise.reject(err);
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
