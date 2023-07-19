import { DESKTOP, LANDSCAPE, PORTRAIT } from 'const/variable';
import { isMobile } from 'utils/isMobile';

export const applyOrientation = () => {
    // const isMobileDevice = window.matchMedia('only screen and (max-width: 760px)').matches;
    if (isMobile()) {
        if (window.innerHeight > window.innerWidth) {
            return PORTRAIT;
        } else {
            return LANDSCAPE;
        }
    } else {
        // eslint-disable-next-line no-undef,eqeqeq
        return __SUPPORT_DESKTOP__ == 'true'
            ? (window.innerHeight > window.innerWidth) ? PORTRAIT : LANDSCAPE
            : DESKTOP;
    }
};
console.log(applyOrientation());
