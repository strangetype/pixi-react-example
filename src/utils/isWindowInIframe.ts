export const isWindowInIframe = (): boolean => {
    try {
        return globalThis.self !== globalThis.top;
    } catch (e) {
        return true;
    }
};
