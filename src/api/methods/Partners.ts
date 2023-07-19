import { axiosApi } from 'api/config';

export default {
    profile (params = {}) {
        return axiosApi.get('partners/profile', {
            params
        });
    },
    email (params = {}) {
        return axiosApi.post('partners/email', {
            params
        });
    },
    pass (params = {}) {
        return axiosApi.post('partners/pass', {
            params
        });
    }
};
