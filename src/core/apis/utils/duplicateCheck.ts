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
    return response;
  },
  (err) => {
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
