export const checkWebview = () => {
    return (global.webkit && global.webkit.messageHandlers && global.webkit.messageHandlers.WebView) || window.navigator.userAgent.toLowerCase().includes('wv') as any as boolean;
};
