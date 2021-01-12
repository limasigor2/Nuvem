import api from './api';

const auth = {

    async login(id, password) {
        try {
            const response = await api.post('/auth/signin', {
                username: id, password: password
            });
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async register(values) {
        try {
            const response = await api.post('/auth/signup', { username: values.id, name: values.name, email: values.email, password: values.password });
            return response;
        } catch (responseError) {
            const { response } = responseError
            return response;
        }
    }
};

export default auth;