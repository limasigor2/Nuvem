import { List } from 'antd/lib/form/Form';
import api from './api';
import localStorage from './localStorage';

const externalId = localStorage.getUser() ? localStorage.getUser().id : null;

const user = {

    async get(externalId) {
        try {
            const response = await api.get('/user/me', { params: { username: externalId } });
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async put(values) {
        let body = {
            ...values,
            externalId: externalId
        }
        try {
            const response = await api.put('user/me', body);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async List(page, size) {
        try {
            const response = await api.get('/list', { params: { page: page, size: size } });
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    }
};

export default user;