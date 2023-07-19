import { useStoreSettingsState } from 'store/Default/settings/store_F';
import helper from 'utils/helper';

global.SETTING_SET = {};
export const useStoreGameGetters = {
    getSettingsAnimation ({
        groupConfig,
        configName
    }) {
        const { clientSettings = {} } = useStoreSettingsState.get();
        /* if (helper.isEmpty(global.SETTING_SET[groupConfig])) {
            global.SETTING_SET[groupConfig] = {};
        }

        global.SETTING_SET[groupConfig][configName] = 1; */
        return Number(!helper.isEmpty(clientSettings) && clientSettings[groupConfig] ? (clientSettings[groupConfig][configName] ?? 1) : 1);
    }
};
