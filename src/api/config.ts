import axios from 'axios-minified';
import { useStorePopupsState } from 'store/Default/popup/store_F';

export const axiosApi = axios.create({
    baseURL: 'https://gameprovider.staging.svc-cloud.com/',
    headers: {
        'Content-Type': 'application/json',
        'x-app-guid': 'game_client',
        'x-request-client-guid': '',
        'x-whence': '35',
        'x-user-id': '111111'
    }
});

axiosApi.interceptors.request.use(config => {
    config.headers['x-request-client-guid'] = Date.now();
    return config;
}, error => {
    Promise.reject(error);
});

axiosApi.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const { response: { data: { message = '' } = {} } = {} } = error;
    const code = parseInt(error.response && error.response.status);
    switch (code) {
    case 401:
        useStorePopupsState.setKey('ajaxError', {
            isShow: true,
            message: 'Token invalid Unauthorized, code 401'
        });
        break;
    case 404:
        useStorePopupsState.setKey('ajaxError', {
            isShow: true,
            message: 'Api code 404'
        });
        break;
    case 400:
    case 422:
        useStorePopupsState.setKey('ajaxError', {
            isShow: true,
            message
        });
        break;
    case 502:
    case 500:
    case 504:
        useStorePopupsState.setKey('ajaxError', {
            isShow: true,
            message: `Oops... api server code ${code}`
        });
        break;
    }
    return Promise.reject(error);
});
