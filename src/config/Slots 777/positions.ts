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

const WEIGHT: number = 2560;
const HEIGHT: number = 1440;

export const bkgPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, cover: true, w: HEIGHT, h: WEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.5, cover: true, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const logoPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, contain: true, w: HEIGHT, h: WEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.8, contain: true, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const loadingPos = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, contain: true, w: HEIGHT, h: WEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.5, contain: true, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const mainPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, contain: true, w: HEIGHT, h: WEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.5, contain: true, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const panelPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, y: 0, contain: true, w: HEIGHT, h: 1.1 * WEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -HEIGHT / 6, contain: true, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const machinePosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, y: 0, contain: true, w: HEIGHT, h: 1.1 * WEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -HEIGHT / 6, contain: true, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const homePosition = {
    [PORTRAIT]: { cx: 0, cy: 0, x: -40, y: 40, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0, cy: 0, x: -40, y: 80, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const termsPosition = {
    [PORTRAIT]: { cx: 1, cy: 0, x: -45, y: 85, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 1, cy: 0, x: -45, y: 45, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const skipPosition = {
    [PORTRAIT]: { cx: 1, cy: 0, x: -80, y: 80, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 1, cy: 0, x: -100, y: 40, w: WEIGHT, h: HEIGHT, full: true } as TResizablePosition
};

export const ACC_POPUP_WIDTH = {
    [PORTRAIT]: 1000,
    [LANDSCAPE]: 1800
};

export const ACC_POPUP_HEIGHT = {
    [PORTRAIT]: 1400,
    [LANDSCAPE]: 620
};

export const ACC_POPUP_ITEM_WIDTH = {
    [PORTRAIT]: ACC_POPUP_WIDTH.portrait * 0.9,
    [LANDSCAPE]: ACC_POPUP_WIDTH.landscape * 0.49
};

export const ACC_POPUP_ITEM_HEIGHT = {
    [PORTRAIT]: 140,
    [LANDSCAPE]: 140
};

export const ACC_POPUP_ITEM_OFFSET = {
    [PORTRAIT]: (ACC_POPUP_WIDTH.portrait - ACC_POPUP_ITEM_WIDTH.portrait) / 2,
    [LANDSCAPE]: (ACC_POPUP_WIDTH.landscape / 2 - ACC_POPUP_ITEM_WIDTH.landscape) / 2
};

export const TERMS_POPUP_WIDTH = {
    [PORTRAIT]: 1000,
    [LANDSCAPE]: 1800
};

export const TERMS_POPUP_CONTENT_WIDTH = {
    [PORTRAIT]: TERMS_POPUP_WIDTH.portrait * 0.9,
    [LANDSCAPE]: TERMS_POPUP_WIDTH.landscape * 0.95
};

export const TERMS_POPUP_HEIGHT = {
    [PORTRAIT]: 1400,
    [LANDSCAPE]: 620
};

export const TERMS_POPUP_HEIGHT_V: number = 1400;
