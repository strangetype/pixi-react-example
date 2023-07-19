import { ITextStyle } from 'pixi.js';
import { applyOrientation } from 'utils/applyOrientation';
import { POPUP_CONTENT_SCROLL_WIDTH } from 'config/Hot Dice/positions';

export const TXT_STYLE: Partial<ITextStyle> = {
    fontFamily: 'Montserrat400',
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
    fontSize: 30,
    fontFamily: 'Montserrat700'
};

export const BUTTON_TXT_HOTKEYS: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 30,
    fontFamily: 'Montserrat700'
};

export const BUTTON_TXT_PLAY_GAME: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 27,
    fontFamily: 'Montserrat700',
    wordWrap: true,
    wordWrapWidth: 300,
    lineHeight: 24
};

export const INPUT_TXT_SUMMA: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 34,
    fontFamily: 'Montserrat700'
};

export const SELECT_TXT_BALANCED: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 30,
    fontFamily: 'Montserrat700'
};

/*
* End
* */

/*
* Action Games
* */

export const GAME_ACTION_TXT_BUTTON: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 21,
    fontFamily: 'Montserrat700',
    lineJoin: 'round',
    lineHeight: 0,
    wordWrap: true,
    wordWrapWidth: 155,
    fill: '#FFDA92',
    strokeThickness: 5
};

export const GAME_RESULT_TXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 26,
    fontFamily: 'Montserrat700',
    lineJoin: 'round',
    lineHeight: 26,
    wordWrap: true,
    wordWrapWidth: 350,
    fill: '#E2B763'
};

export const GAME_SKULL_TXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 86,
    fontFamily: 'Montserrat700',
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
    fontFamily: 'Montserrat700',
    fontVariant: 'small-caps',
    fill: '#FFDA92',
    wordWrap: true,
    wordWrapWidth: 450,
    lineHeight: 36
};

export const POPUP_MIN_TXT_BUTTON_ONE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 28,
    fontFamily: 'Montserrat700',
    fontVariant: 'small-caps',
    wordWrap: true
};

export const POPUP_MIN_TXT_BUTTON_TWO: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 28,
    fontFamily: 'Montserrat700',
    fontVariant: 'small-caps',
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
    fontSize: 52,
    fontFamily: 'Montserrat700',
    fontVariant: 'small-caps'
};

export const POPUP_BIG_RULES_TXT = () => <Partial<ITextStyle>>({
    ...TXT_STYLE,
    fontSize: 28,
    lineHeight: 32,
    fontFamily: 'Montserrat700',
    align: 'left',
    wordWrap: true,
    wordWrapWidth: POPUP_CONTENT_SCROLL_WIDTH[applyOrientation()] - 20
});

export const POPUP_BIG_TXT_BUTTON_ONE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 26,
    fontFamily: 'Montserrat700',
    fontVariant: 'small-caps',
    fill: '#E2B763',
    strokeThickness: 5,
    wordWrap: true
};

export const POPUP_BIG_TXT_CURRENCY: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 32,
    fontFamily: 'Montserrat700'
};

/*
* End
* */

/*
* Onboarding
* */
export const ONBOARDING_TEXT_INFO: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 28,
    wordWrapWidth: 370,
    fontFamily: 'Montserrat700',
    fontVariant: 'small-caps',
    fill: '#F5CD7F',
    strokeThickness: 5,
    wordWrap: true
};

export const ONBOARDING_BUTTON_SKIP: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 24,
    fontFamily: 'Montserrat700',
    wordWrap: true,
    wordWrapWidth: 300,
    lineHeight: 24
};

/*
* End
* */
export const LOADING_TEXT: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 34,
    wordWrapWidth: 380,
    fontFamily: 'Montserrat700',
    fontVariant: 'small-caps',
    fill: '#F0C849',
    strokeThickness: 5,
    wordWrap: true
};
