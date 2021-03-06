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

            const response = await api.post('/file/upload', formData, config);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async get(fileName) {
        try {
            const response = await api.get(
                `/file/download${fileName}`, {
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
            const response = await api.get("/file/list");
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    },

    async delete(fileName) {
        try {
            const response = await api.delete(`/file/delete${fileName}`);
            return response;
        } catch (responseError) {
            const { response } = responseError;
            return response;
        }
    }
}

export default file;