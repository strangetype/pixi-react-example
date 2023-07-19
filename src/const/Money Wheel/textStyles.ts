import { ITextStyle } from 'pixi.js';
import { TERMS_POPUP_CONTENT_WIDTH } from 'config/Money Wheel/positions';
import { applyOrientation } from 'utils/applyOrientation';

export const TXT_STYLE: Partial<ITextStyle> = {
    fontFamily: 'Dict700',
    fontSize: 32,
    fill: 0xffffff,
    align: 'center',
    lineJoin: 'round',
    lineHeight: 0
};

export const PANEL_BTN_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700',
    fontSize: 24
};

export const ACCOUNT_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700'
};

export const RULES_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700',
    fontSize: 16
};

export const TXT_COEF_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 18,
    fontFamily: 'Montserrat700',
    stroke: 0xff0000,
    strokeThickness: 4,
    letterSpacing: 1.5
};


export const BOLD_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xffffff,
    // stroke: 0x460419,
    // strokeThickness: 16,
    fontSize: 32
};

export const LOADING_TXT_STYLE: Partial<ITextStyle> = {
    ...BOLD_TXT_STYLE,
    fontSize: 36,
    fill: 0xFCF4EA,
    stroke: 0x885549,
    strokeThickness: 2
};

export const BET_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 28,
    fontFamily: 'Montserrat700',
    stroke: 0x0000ff,
    strokeThickness: 2
};


export const POPUP_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Dict700',
    fill: 0xffffff,
    fontSize: 24,
    wordWrap: true,
    wordWrapWidth: 160,
    lineHeight: 84
};

export const POPUP_BTN_TXT_STYLE2: Partial<ITextStyle> = {
    ...POPUP_BTN_TXT_STYLE,
    fontFamily: 'Dict700',
    fill: 0xffffff,
    fontSize: 24,
    strokeThickness: 0,
    wordWrap: false
};

export const POPUP_MSG_TXT_STYLE: Partial<ITextStyle> = {
    ...BOLD_TXT_STYLE,
    fontFamily: 'Montserrat400',
    fill: 0x89564D,
    fontSize: 24,
    wordWrap: true,
    wordWrapWidth: 350,
    lineHeight: 32
};


export const TERMS_TITLE_TXT_STYLE: Partial<ITextStyle> = {
    ...BOLD_TXT_STYLE,
    wordWrap: true,
    wordWrapWidth: 1e3
};

export const ACCOUNT_CURR_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat900',
    fill: 0x89564D,
    fontSize: 24
};

export const ACCOUNT_BALANCE_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700',
    fill: 0x89564D,
    fontSize: 24
};

export const TERMS_TXT_STYLE = () => <Partial<ITextStyle>>({
    ...TXT_STYLE,
    fontSize: 24,
    lineHeight: 24,
    fill: 0x89564D,
    fontFamily: 'Montserrat400',
    align: 'left',
    wordWrap: true,
    wordWrapWidth: TERMS_POPUP_CONTENT_WIDTH[applyOrientation()]
});

export const ONB_TXT_STYLE: Partial<ITextStyle> = {
    ...BOLD_TXT_STYLE,
    fontFamily: 'Montserrat400',
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 400,
    fontSize: 22
};
