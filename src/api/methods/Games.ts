import { axiosApi } from 'api/config';

export default {
    get (params = {}) {
        return axiosApi.get('games',
            { params }
        );
    },
    create (params = {}) {
        return axiosApi.post('games',
            params
        );
    },
    info (params = {}, headers = {}) {
        return axiosApi.get('games/info', {
            params,
            ...headers
        });
    },
    deleteGame (id = null) {
        return axiosApi.delete(`games/${id}`);
    },
    play (params = {}, headers = {}) {
        return axiosApi.post('games/play',
            params,
            headers
        );
    },
    updateSettings (params = {}, config = {}) {
        return axiosApi.put('games/settings',
            params,
            config
        );
    },
    translation () {
        return axiosApi.get('v2/translations');
    }
};
