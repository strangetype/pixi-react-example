import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { positionButtonTopDevice } from 'utils/positionButtonTopDevice';

export type TResizablePosition = {
    x?: number, y?: number,
    cx?: number, cy?: number,
    l?: number, r?: number,
    t?: number, b?: number,
    cl?: number, cr?: number,
    ct?: number, cb?: number,
    ax?: number, ay?: number,
    w?: number,
    h?: number,
    full?: boolean,
    byWidth?: boolean,
    byHeight?: boolean,
    byMinSize?: boolean,
    byMaxSize?: boolean,
    cover?: boolean,
    contain?: boolean,
}

const w: number = 1280;
const h: number = 720;

export const bkgPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, cover: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.50, cover: true, w, h, full: true } as TResizablePosition
};

export const logoPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0, y: 170, cover: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0, y: 170, cover: true, w, h, full: true } as TResizablePosition
};

export const loadingPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -200, cover: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -80, cover: true, w, h, full: true } as TResizablePosition
};

export const panelPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -490, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -292, contain: true, w, h, full: true } as TResizablePosition
};

export const panelInfoPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -490, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -280, contain: true, w, h, full: true } as TResizablePosition
};

export const gamePortholePosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.46, contain: true, w, h, full: true } as TResizablePosition
};

export const winInfoPosition = () => ({
    [PORTRAIT]: { cx: 0.5, ct: 0, ...positionButtonTopDevice({ startMinY: 10, startMaxY: 55, startMaxX: 0, startMinX: 0 }), w: h, h: w, full: true, contain: true } as TResizablePosition,
    [LANDSCAPE]: { cx: -2, cy: -2, x: 45, y: 45, w, h, full: true } as TResizablePosition
});

export const homePosition = () => ({
    [PORTRAIT]: { cx: 0, cy: 0, ...positionButtonTopDevice(), w, h, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0, cy: 0, x: 45, y: 45, w, h, full: true } as TResizablePosition
});

export const rulesPosition = () => ({
    [PORTRAIT]: { cx: 1, cy: 0, ...positionButtonTopDevice({ startMaxX: -45, startMinX: -45 }), w, h, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0, cy: 0, x: 165, y: 45, w, h, full: true } as TResizablePosition
});

export const octopusPosition = {
    [PORTRAIT]: { cx: 0.37, cy: 0.37, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.45, cy: 0.4, contain: true, w, h, full: true } as TResizablePosition
};

export const mainPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.5, contain: true, w, h, full: true } as TResizablePosition
};

export const skipPosition = {
    [PORTRAIT]: { cx: 1, cy: 0, x: -100, y: 100, w, h, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 1, cy: 0, x: -120, y: 80, w, h, full: true } as TResizablePosition
};

export const onboardingPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -488, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -290, contain: true, w, h, full: true } as TResizablePosition
};

export const POPUP_CONTENT_SCROLL_WIDTH = {
    [PORTRAIT]: 430,
    [LANDSCAPE]: 740
};

export const POPUP_CONTENT_SCROLL_HEIGHT = {
    [PORTRAIT]: 600,
    [LANDSCAPE]: 320
};

export const POPUP_CURRENCY_ITEM_HEIGHT = {
    [PORTRAIT]: 70,
    [LANDSCAPE]: 70
};

export const POPUP_CURRENCY_ITEM_WIDTH = {
    [PORTRAIT]: 410,
    [LANDSCAPE]: 410
};
