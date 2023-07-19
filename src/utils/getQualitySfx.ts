import {windowHeight, windowWidth} from 'utils/windowWidthHeight';

export const getQualitySfx = () => {
    const sfx: { width: number, sfx: string } = [
        { width: 321, sfx: '@1' },
        { width: 376, sfx: '@2' },
        { width: 415, sfx: '@3' },
        { width: Infinity, sfx: '@4' }
    ].find((sfx: { width: number, sfx: string }) => {
        return sfx.width > Math.min(windowWidth(), windowHeight());
    });
    return sfx ? sfx.sfx : '';
};
