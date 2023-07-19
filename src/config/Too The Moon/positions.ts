import { DESKTOP, LANDSCAPE, PORTRAIT } from 'const/variable';
import { windowHeight, windowWidth } from 'utils/windowWidthHeight';

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

const deviceSize = {
    [DESKTOP]: {
        w: 1920,
        h: 1080
    },
    [LANDSCAPE]: {
        w: 720,
        h: 1280
    },
    [PORTRAIT]: {
        w: 720,
        h: 1280
    }
};

export const gridPosition = {
    [PORTRAIT]: {
        cx: 1,
        x: -44,
        ct: -2.26,
        w: deviceSize[PORTRAIT].w,
        h: deviceSize[PORTRAIT].h,
        byMinSize: true,
        byMaxSize: true,
        cover: true,
        full: true
    } as TResizablePosition,
    [LANDSCAPE]: {
        cx: 1,
        x: -44,
        ct: -1.755,
        w: deviceSize[LANDSCAPE].w,
        h: deviceSize[LANDSCAPE].h,
        byMinSize: true,
        byMaxSize: true,
        cover: true,
        full: true
    } as TResizablePosition,
    [DESKTOP]: {
        cx: 1,
        x: -22,
        ct: -1.755,
        w: deviceSize[DESKTOP].w,
        h: deviceSize[DESKTOP].h,
        full: true,
        cover: true
    } as TResizablePosition
};

export const gridTwoPosition = {
    [PORTRAIT]: {
        cx: 1,
        x: -44,
        ct: -2.85,
        w: deviceSize[PORTRAIT].w,
        h: deviceSize[PORTRAIT].h,
        byMinSize: true,
        byMaxSize: true,
        cover: true,
        full: true
    } as TResizablePosition,
    [LANDSCAPE]: {
        cx: 1,
        x: -44,
        cy: 0,
        w: deviceSize[LANDSCAPE].w,
        h: deviceSize[LANDSCAPE].h,
        byMinSize: true,
        byMaxSize: true,
        cover: true,
        full: true
    } as TResizablePosition,
    [DESKTOP]: {
        cx: 1,
        x: -22,
        cy: 0,
        w: deviceSize[DESKTOP].w,
        h: deviceSize[DESKTOP].h,
        full: true,
        cover: true
    } as TResizablePosition
};

export const buttonCoinPosition = {
    [PORTRAIT]: {
        cx: -0.02,
        cy: -0.05,
        w: deviceSize[PORTRAIT].w,
        h: deviceSize[PORTRAIT].h
    } as TResizablePosition,
    [LANDSCAPE]: {
        cx: 0.18,
        cy: -0.12,
        w: deviceSize[LANDSCAPE].w,
        h: deviceSize[LANDSCAPE].h
    } as TResizablePosition,
    [DESKTOP]: {
        cx: 0.42,
        cy: 0.08,
        contain: true,
        w: deviceSize[DESKTOP].w,
        h: deviceSize[DESKTOP].h,
        full: true
    } as TResizablePosition
};

export const barPosition = {
    [PORTRAIT]: {
        cx: 0.5,
        cy: 0.38,
        w: deviceSize[PORTRAIT].w,
        h: deviceSize[PORTRAIT].h,
        cover: true,
        full: true
    } as TResizablePosition,
    [LANDSCAPE]: {
        cx: 0.5,
        cy: 0.38,
        byMinSize: true,
        byMaxSize: true,
        contain: true,
        w: deviceSize[LANDSCAPE].w,
        h: deviceSize[LANDSCAPE].h,
        full: true
    } as TResizablePosition,
    [DESKTOP]: {
        cx: 0.5,
        x: 0,
        cb: 0,
        y: 100,
        contain: true,
        w: deviceSize[DESKTOP].w,
        h: deviceSize[DESKTOP].h,
        full: true
    } as TResizablePosition
};

export const windowWinPosition = {
    [PORTRAIT]: {
        cx: 0.5,
        cy: 0.27,
        w: deviceSize[PORTRAIT].w,
        h: deviceSize[PORTRAIT].h,
        full: true
    } as TResizablePosition,
    [LANDSCAPE]: {
        cx: 0.5,
        cy: 0.27,
        w: deviceSize[LANDSCAPE].w,
        h: deviceSize[LANDSCAPE].h,
        full: true
    } as TResizablePosition,
    [DESKTOP]: {
        cx: 0.5,
        x: 0,
        ct: -0.3,
        contain: true,
        w: deviceSize[DESKTOP].w,
        h: deviceSize[DESKTOP].h,
        full: true
    } as TResizablePosition
};

export const loadingPosition = {
    [PORTRAIT]: {
        cx: 0,
        cy: 0.4,
        w: deviceSize[PORTRAIT].w,
        h: deviceSize[PORTRAIT].h,
        cover: true,
        full: true
    } as TResizablePosition,
    [LANDSCAPE]: {
        cx: 0,
        cy: 0.4,
        w: deviceSize[LANDSCAPE].w,
        h: deviceSize[LANDSCAPE].h,
        contain: true,
        full: true
    } as TResizablePosition,
    [DESKTOP]: {
        cx: 0,
        cy: 0.5,
        byMinSize: true,
        byMaxSize: true,
        contain: true,
        w: deviceSize[DESKTOP].w,
        h: deviceSize[DESKTOP].h,
        full: true
    } as TResizablePosition
};
