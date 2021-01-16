import axios from 'axios';

const api = axios.create({
    baseUrl: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(async (config) => {
    const auth = localStorage.getItem('VALIDC');
    console.log(auth);
    if (auth) {
        if (auth) {
            const { accessToken } = JSON.parse(auth);
            let bearerToken = `Bearer ${accessToken}`;
            console.log(bearerToken);
            const tmpConfig = config;
            if (accessToken) {
              tmpConfig.headers.Authorization = bearerToken;
            }
          }
    }
    return config;
});

export default api;