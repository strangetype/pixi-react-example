import { useStoreSettingsState } from 'store/Default/settings/store_F';

export const isTestGame = () => {
    const { paramsUrl: { test = null } = {} } = useStoreSettingsState.get();
    // eslint-disable-next-line no-undef
    return test != null || Boolean(__DEV__);
};
