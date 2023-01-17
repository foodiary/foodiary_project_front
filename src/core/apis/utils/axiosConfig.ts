import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Referrer-Policy"] = "no-referrer-when-downgrade";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
  },
  // timeout: 20000
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        // Authorization: accessToken,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {

    console.log('인터셉트 응답:' + response.data);

    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const refreshExpired = response.data.refreshTokenExpirationMinutes;

    if(accessToken && refreshToken){
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("refresh_expired", refreshExpired);
    }

    return response;
  },
  async (err) => {
    const config = err.config;
    console.log(`인터셉트 에러: ${err}`);
    if(err){
      return Promise.reject(err);
    }
    //액세스토큰 만료 시
    if (err.response.status === 401) {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (accessToken) {
        localStorage.removeItem("access_token");
        // return;
      }

      try {
        const headers = { Refresh: `${refreshToken}` };
        const { data } = await axios.get("/auth/reissue", { headers }); //refresh로 access 토큰 재발급
        console.log(data);
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken; //??

        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);
        return await axios(config);
      } catch (err) {
        return Promise.reject(err);
      }
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
