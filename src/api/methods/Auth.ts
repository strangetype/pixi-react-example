import { axiosApi } from 'api/config';

export default {
    login (params = {}) {
        return axiosApi.post('auth/login',
            params
        );
    },
    user (params = {}) {
        return axiosApi.post('auth/user',
            params
        );
    }
};
