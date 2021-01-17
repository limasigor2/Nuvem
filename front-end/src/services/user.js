import api from './api';

const user = {

    async get(username) {
        try {
            const response = await api.get('/user/me', { params: { username: username } });
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async put(values) {
        try {
            const response = await api.put('/user/me', values);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async list(page, size) {
        try {
            const response = await api.get('/user/list', { params: { page: page, size: size } });
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async getByUsername(username) {
        try {
            const response = await api.get(`/user/${username}`);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async edit(values) {
        try {
            const response = await api.put(`/user/${values.externalId}`, values);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async delete(externalId) {
        try {
            const response = await api.delete(`/user/${externalId}`);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    }
};

export default user;