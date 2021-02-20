import api from './api';
import localStorage from './localStorage';

const auth = {

    async login(id, password) {
        try {
            const response = await api.post('/api/auth/signin', {
                username: id, password: password
            });
            if(response.status === 200) localStorage.login(response.data);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async register(values) {
        try {
            const response = await api.post('/api/auth/signup', { username: values.id, name: values.name, email: values.email, password: values.password, phonenumbers: values.phones});
            return response;
        } catch (responseError) {
            const { response } = responseError
            return response;
        }
    },
};

export default auth;