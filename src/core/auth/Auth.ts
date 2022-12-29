const google_params = {
    client_id : process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile', // 구글에서 제공해주는 사용자의 정보 범위
  }
export const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${google_params.client_id}&response_type=${google_params.response_type}&redirect_uri=${google_params.redirect_uri}&scope=${google_params.scope}`;
const naver_params = {
  client_id: process.env.REACT_APP_NAVER_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_NAVER_REDIRECT_URI,
  response_type: 'code',
  state: "test" // 클라이언트측 임의의 값 넣으면 됨
}
export const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naver_params.client_id}&response_type=${naver_params.response_type}&redirect_uri=${naver_params.redirect_uri}&state=${naver_params.state}`;