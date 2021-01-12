import axios from 'axios';

const api = axios.create({
    baseUrl: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use( async (config) => {
    const auth = localStorage.getItem('VALIDC');
    if(auth){
        console.log(auth);
    }
    return config;
});

export default api;