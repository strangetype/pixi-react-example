import { isWindowInIframe } from 'utils/isWindowInIframe';

export const windowWidth = () => {
    if (isWindowInIframe()) {
        return document.body.clientWidth;
    } else {
        return (window.outerWidth || window.innerWidth || document.body.clientWidth);
    }
};

export const windowHeight = () => {
    if (isWindowInIframe()) {
        return document.body.clientHeight;
    } else {
        return (window.outerHeight || window.innerHeight || document.body.clientHeight);
    }
};
