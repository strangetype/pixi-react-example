import { io } from 'socket.io-client';

export const socket = {
    instance: null,
    init: function (token) {
        if (this.instance) {
            return;
        }
        this.instance = io('https://gameprovider.staging.svc-cloud.com/', {
            extraHeaders: {
                'x-language': 'ru',
                'x-authorization': token
            }
        });
    }
};
