import { getSuggestedQuery } from '@testing-library/react';
import api from './api';

const validate = {
    async post(file, user, name, justification) {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('motivo', justification);
        formData.append('username', user);
        formData.append('filename', name);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await api.post('/validate/', formData, config);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async get(userName, fileName) {
        try {
            const response = await api.get("/validate/list", { params: { username: userName, filename: fileName }});
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    }
}

export default validate;