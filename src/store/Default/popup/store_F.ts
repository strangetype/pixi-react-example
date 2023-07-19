import { map } from 'nanostores';

export const useStorePopupsState = map({
    isShowExit: false,
    isShowRules: false,
    win: {
        isShow: false,
        message: '' as any
    },
    isShowLose: false,
    warningSummaMin: {
        isShow: false,
        message: '' as any
    },
    warningSummaMax: {
        isShow: false,
        message: '' as any
    },
    isShowAccounts: false,
    isShowLowBalance: false,
    isShowOnboarding: false,
    isShowNetworkError: false,
    isShowNetworkConnection: false,
    isShowNativeLoading: false,
    ajaxError: {
        isShow: false,
        message: '' as any
    },
    isKeyBoard: false
});
