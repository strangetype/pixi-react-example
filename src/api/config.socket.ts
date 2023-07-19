import { io } from 'socket.io-client';

export const socket = {
    instance: null,
    init: function (token = null) {
        if (this.instance == null || token == null) {
            return;
        }
        this.instance = io('', {
            extraHeaders: {
                'x-language': 'ru',
                'x-authorization': token
            }
        });
    }
};
