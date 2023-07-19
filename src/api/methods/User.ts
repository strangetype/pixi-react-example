import { axiosApi } from 'api/config';

export default {
    userGet (params = {}) {
        return axiosApi.get('user',
            params
        );
    },
    block (id = null) {
        return axiosApi.put(`user/block/${id}`);
    },
    unBlock (id = null) {
        return axiosApi.put(`user/unblock/${id}`);
    },
    deleteUser (id = null) {
        return axiosApi.delete(`user/${id}`);
    }
};
