import helper from 'utils/helper';

export const useStoreComputed = (store, keys = [], callback = Function()) => {
    const storeValues = store.get() ?? {};

    keys.forEach(item => {
        for (const key in storeValues) {
            if (typeof item === 'object' && item.init && item.key === key && !helper.isEmpty(storeValues[key])) {
                callback({
                    stepKey: key,
                    [key]: storeValues[key]
                });
                break;
            }
        }
    });

    const unbindListener = store.subscribe((dataStore, changed) => {
        if (!keys.includes(changed)) return;
        callback({
            stepKey: changed,
            [changed]: dataStore[changed]
        });
    });

    return {
        cancel: unbindListener
    };
};
