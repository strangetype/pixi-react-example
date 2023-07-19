import { ITextStyle } from 'pixi.js';
import { applyOrientation } from 'utils/applyOrientation';
import { POPUP_CONTENT_SCROLL_WIDTH } from 'config/Scratch Card/positions';

export const TXT_STYLE: Partial<ITextStyle> = {
    fontFamily: 'Rubik400',
    fontSize: 48,
    fill: 0x2D231C,
    align: 'center'
};

/*
*
* Panel View Button
* */

export const CHIPS_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 22,
    fontFamily: 'Rubik700',
    fill: '#FCF8D5'
};

export const BUTTON_TXT_HOTKEYS: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 22,
    fontFamily: 'Rubik700'
};

export const BUTTON_TXT_PLAY_GAME: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 26,
    fill: '#FEFDFB',
    fontFamily: 'Rubik700',
    wordWrap: true,
    wordWrapWidth: 300,
    lineHeight: 24
};

export const INPUT_TXT_SUMMA: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 26,
    fill: '#D7FECD',
    fontFamily: 'Rubik700'
};

export const SELECT_TXT_BALANCED: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 26,
    fill: '#D7FECD',
    fontFamily: 'Rubik700'
};

/*
* End
* */

/*
* Action Games
* */

export const GAME_COEFFICIENT_RULES_TXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 30,
    fontFamily: 'Rubik400',
    lineJoin: 'round',
    lineHeight: 0,
    align: 'left',
    fill: '#F2E7D9'
};

export const GAME_RESULT_TXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 26,
    fontFamily: 'Rubik700',
    lineJoin: 'round',
    lineHeight: 26,
    wordWrap: true,
    wordWrapWidth: 320
};

export const GAME_RULES_TABLE_TXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 27,
    fontFamily: 'Rubik700',
    lineJoin: 'round',
    lineHeight: 0,
    wordWrap: false
};

/*
* End
* */

/*
* Popups MINI interactive
* */

export const POPUP_MIN_BODY_TXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 32,
    fontFamily: 'Rubik700',
    fontVariant: 'small-caps',
    fill: '#111110',
    wordWrap: true,
    wordWrapWidth: 450,
    lineHeight: 36
};

export const POPUP_MIN_TXT_BUTTON_ONE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 28,
    fontFamily: 'Rubik700',
    fontVariant: 'small-caps',
    fill: '#D7FECD',
    wordWrap: true
};

export const POPUP_MIN_TXT_BUTTON_TWO: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 28,
    fontFamily: 'Rubik700',
    fontVariant: 'small-caps',
    fill: '#FEFDFB',
    wordWrap: true
};

/*
* End
* */

/*
* Popups BIG
* */

export const POPUP_BIG_TITLE_TXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 44,
    fill: '#FFEB92',
    fontFamily: 'Rubik700',
    fontVariant: 'small-caps'
};

export const POPUP_BIG_RULES_TXT = () => <Partial<ITextStyle>>({
    ...TXT_STYLE,
    fontSize: 28,
    lineHeight: 32,
    fontFamily: 'Rubik700',
    align: 'left',
    wordWrap: true,
    wordWrapWidth: POPUP_CONTENT_SCROLL_WIDTH[applyOrientation()] - 20
});

export const POPUP_BIG_TXT_BUTTON_ONE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 26,
    fontFamily: 'Rubik700',
    fontVariant: 'small-caps',
    fill: '#FEFDFB',
    wordWrap: true
};

export const POPUP_BIG_TXT_CURRENCY: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 22,
    fontFamily: 'Rubik700'
};

/*
* End
* */

/*
* Onboarding
* */
export const ONBOARDING_TEXT_INFO: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 38,
    wordWrapWidth: 390,
    fontFamily: 'Rubik700',
    fontVariant: 'small-caps',
    fill: '#FFEB92',
    strokeThickness: 4,
    wordWrap: true
};

export const ONBOARDING_BUTTON_SKIP: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 24,
    fill: '#FEFDFB',
    fontFamily: 'Rubik700',
    wordWrap: true,
    wordWrapWidth: 300,
    lineHeight: 24
};

/*
* End
* */
export const LOADING_TEXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 14,
    wordWrapWidth: 380,
    fontFamily: 'Rubik700',
    fontVariant: 'small-caps',
    fill: '#FFED47',
    strokeThickness: 1,
    wordWrap: true
};
