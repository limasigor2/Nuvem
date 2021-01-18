import { Upload } from 'antd';
import api from './api';

const file = {
    async upload(asset) {
        let formData = new FormData();
        formData.append('file', asset);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await api.post('/uploadFile', formData, config);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async get(fileName) {
        try {
            const response = await api.get(
                `/downloadFile${fileName}`, {
                Accept: 'application/pdf', responseType: 'arraybuffer'
            });
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async getFiles() {
        try {
            const response = await api.get("/files");
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async delete(fileName) {
        try {
            const response = await api.delete(`/delete${fileName}`);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    }
}

export default file