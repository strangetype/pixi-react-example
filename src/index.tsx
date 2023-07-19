import React from 'react';
import ReactDOM from 'react-dom';
import 'style/index.css';
import * as PIXI from 'pixi.js';
import { Layouts_F } from 'layouts/Diamonds Slots/layouts_F';
import { GAME_ID, GAME_NAME } from 'config/Common/settings';
import { axiosApi } from 'api/config';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreSettingsActions } from 'store/Default/settings/actions_F';
import mitt from 'utils/mitt';
import appendLink from 'utils/appendLink';

(async function () {
    // eslint-disable-next-line no-undef
    console.log(`Версия приложения: ${__VERSION__}`);
    useStoreSettingsActions.parseUrl();
    const { paramsUrl: { lang = null, token = null } = {} } = useStoreSettingsState.get();

    try {
        if (lang && ['ru', 'en'].includes(lang.toLowerCase())) {
            appendLink(`${window.location.origin}/assets/fonts/fonts_${lang.toLowerCase()}.css`);
        } else {
            appendLink(`${window.location.origin}/assets/fonts/fonts_common.css`);
        }
    } catch (e) {
        console.log(e);
    }

    axiosApi.defaults.headers.common['x-language'] = lang ?? 'ru';
    token && (axiosApi.defaults.headers.common['x-token'] = token);
    // eslint-disable-next-line no-undef
    axiosApi.defaults.headers.common['x-game-id'] = GAME_ID;

    document.title = GAME_NAME;
    global.PIXI = PIXI;
    global.spine = await import(/* webpackChunkName: 'pixi-spine' */ 'pixi-spine');
    global.$emitter = mitt();
    ReactDOM.render(
        <React.StrictMode>
            <Layouts_F/>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();
