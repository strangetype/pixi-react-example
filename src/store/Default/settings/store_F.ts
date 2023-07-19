import { map } from 'nanostores';

export const useStoreSettingsState = map({
    name: '',
    translations: {} as any,
    rules: null as any,
    chips: [],
    limits: { max_bet: null, min_bet: null },
    clientSettings: {},
    paramsUrl: {} as any,
    isResize: false,
});
