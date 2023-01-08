import axios from "axios";
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // baseURL: "https://b68c-182-220-207-61.jp.ngrok.io", //서버
  headers:{
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Credentials':"true"
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    console.log("인터셉트");
    console.log(`인터셉트 응답: ${response.config}`);
    return response;
  },
  (err) => {
    if (err.response.status === 401) {
      const token = localStorage.getItem("access_token");
      if (token) {
        localStorage.removeItem("access_token");
        return;
      }
      return;
    }
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
