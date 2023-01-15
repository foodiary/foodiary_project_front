import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers:{
    "ngrok-skip-browser-warning": "12345",
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    console.log(`인터셉트 응답: ${response}`);
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
    if (err.response.status === 401) {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");

      if (accessToken) {
        localStorage.removeItem("access_token");
        // return;
      }
      try{
        const {data} = await axios.post('/member/reissue', {
          accessToken, refreshToken
        });
        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        config.headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);
        return await axios(config);

      } catch(err){
        return err;
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
