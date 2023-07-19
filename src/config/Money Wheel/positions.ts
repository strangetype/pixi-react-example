import { LANDSCAPE, PORTRAIT } from 'const/variable';

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

const w: number = 960;
const h: number = 540;

export const bkgPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, cover: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.5, cover: true, w, h, full: true } as TResizablePosition
};

export const chrPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -480, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 1, cy: 1, y: -270, x: -450, contain: true, w, h, full: true } as TResizablePosition
};

export const mainPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.5, contain: true, w, h, full: true } as TResizablePosition
};

export const panelPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -490, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -260, contain: true, w, h, full: true } as TResizablePosition
};

export const homePosition = {
    [PORTRAIT]: { cx: 1, cy: 0, x: -h / 2, y: w / 2 + 40, contain: true, w, h, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 1, cy: 0, x: -w / 2, y: h / 2, contain: true, w, h, full: true } as TResizablePosition
};

export const ACC_POPUP_WIDTH: number = 400;
export const ACC_POPUP_HEIGHT: number = 280;

export const TERMS_POPUP_WIDTH = {
    [PORTRAIT]: 360,
    [LANDSCAPE]: 780
};

export const TERMS_POPUP_CONTENT_WIDTH = {
    [PORTRAIT]: TERMS_POPUP_WIDTH[PORTRAIT] * 0.9,
    [LANDSCAPE]: TERMS_POPUP_WIDTH[LANDSCAPE] * 0.9
};

export const TERMS_POPUP_HEIGHT = {
    [PORTRAIT]: 680,
    [LANDSCAPE]: 320
};
