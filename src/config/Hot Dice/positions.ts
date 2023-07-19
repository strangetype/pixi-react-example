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

const w: number = 1280;
const h: number = 720;

export const bkgPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, cover: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.50, cover: true, w, h, full: true } as TResizablePosition
};

export const mainPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.5, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0.5, contain: true, w, h, full: true } as TResizablePosition
};

export const girlPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -525, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -255, x: -20, cover: true, w, h, full: true } as TResizablePosition
};
export const boxPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -525, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -255, cover: true, w, h, full: true } as TResizablePosition
};
// попугай
export const parrotsPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -550, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -330, x: 25, contain: true, w, h, full: true } as TResizablePosition
};
// палка попугая
export const boardMastPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -550, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -135, contain: true, w, h, full: true } as TResizablePosition
};
// столб
export const mastPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0.45, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -320, contain: true, w, h, full: true } as TResizablePosition
};

export const foregroundPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -525, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -255, cover: true, w, h, full: true } as TResizablePosition
};

export const dicePosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -525, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -315, x: 25, contain: true, w, h, full: true } as TResizablePosition
};

export const panelPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 1, y: -525, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 1, y: -280, contain: true, w, h, full: true } as TResizablePosition
};

export const accountPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0, y: 85, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 1, cy: 0, x: -155, y: 45, w, h, full: true } as TResizablePosition
};

export const tableResultPosition = {
    [PORTRAIT]: { cx: 0.5, cy: 0, x: 0, y: 0, contain: true, w: h, h: w, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0.5, cy: 0, w, h, full: true } as TResizablePosition
};

export const homePosition = {
    [PORTRAIT]: { cx: 0, cy: 0, x: 45, y: 85, w, h, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0, cy: 0, x: 45, y: 45, w, h, full: true } as TResizablePosition
};

export const termsPosition = {
    [PORTRAIT]: { cx: 1, cy: 0, x: -45, y: 85, w, h, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 0, cy: 0, x: 165, y: 45, w, h, full: true } as TResizablePosition
};
export const skipPosition = {
    [PORTRAIT]: { cx: 1, cy: 0, x: 0, y: 0, w, h, full: true } as TResizablePosition,
    [LANDSCAPE]: { cx: 1, cy: 0, x: 0, y: 0, w, h, full: true } as TResizablePosition
};

export const POPUP_CONTENT_SCROLL_WIDTH = {
    [PORTRAIT]: 430,
    [LANDSCAPE]: 780
};

export const POPUP_CONTENT_SCROLL_HEIGHT = {
    [PORTRAIT]: 760,
    [LANDSCAPE]: 320
};

export const POPUP_CURRENCY_ITEM_HEIGHT = {
    [PORTRAIT]: 140,
    [LANDSCAPE]: 140
};

export const POPUP_CURRENCY_ITEM_WIDTH = {
    [PORTRAIT]: 410,
    [LANDSCAPE]: 410
};
