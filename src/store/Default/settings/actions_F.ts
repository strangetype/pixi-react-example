import { parse } from 'utils/parseUrl';
import Games from 'api/methods/Games';
import { GAME_ID } from 'config/Common/settings';
import { useStoreSettingsState } from 'store/Default/settings/store_F';

export const useStoreSettingsActions = {
    async getTranslation () {
        try {
            const { data = [] } = await Games.translation();

            const _translations = {};

            data.forEach(item => {
                _translations[item.key] = item.translation;
            });

            useStoreSettingsState.setKey('translations', _translations);
        } catch (e) {
            console.log(e);
        }
    },
    parseUrl () {
        const { params } = parse(window.location.href);
        useStoreSettingsState.setKey('paramsUrl', params);
    },
    isCN () {
        const { params: { lang = '' } = {} as any } = parse(window.location.href);
        return lang.toLowerCase() === 'cn';
    },
    async saveApi (settings) {
        try {
            await Games.updateSettings({
                game_id: GAME_ID,
                settings
            });
        } catch (e) {
            return Promise.reject(e);
        }
    }
};
