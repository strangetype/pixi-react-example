import { ITextStyle } from 'pixi.js';
import { TERMS_POPUP_CONTENT_WIDTH } from 'config/Diamonds Slots/positions';
import { applyOrientation } from 'utils/applyOrientation';

export const TXT_STYLE: Partial<ITextStyle> = {
    fontFamily: 'Montserrat400',
    fontSize: 32,
    fill: 0x2D231C,
    align: 'center',
    lineJoin: 'round',
    lineHeight: 0
};

export const TXT_RULE_MUL_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700',
    fill: 0xffffff,
    fontSize: 32
};

export const TXT_MAX_WIN_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700',
    fill: 0xCCFFA4,
    fontSize: 44,
    lineHeight: 42,
    wordWrap: true,
    wordWrapWidth: 350
};

export const CHIPS_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700'
};

export const CHANGE_BET_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700',
    fill: 0xCCFFA4
};

export const ACCOUNT_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xCCFFA4
};

export const BOLD_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xffffff,
    fontSize: 32
};

export const LOADING_TXT_STYLE: Partial<ITextStyle> = {
    ...BOLD_TXT_STYLE,
    fontSize: 64
};

export const BET_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 42,
    fill: 0xffffff,
    fontFamily: 'Montserrat700',
    wordWrap: true,
    wordWrapWidth: 400
};

export const TXT_INPUT_PANEL_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 34,
    fill: 0xCCFFA4,
    align: 'center'
};

export const POPUP_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'Montserrat700',
    fill: 0x31261E,
    fontSize: 24,
    wordWrap: true,
    wordWrapWidth: 80
};

export const ONB_SKIP_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...POPUP_BTN_TXT_STYLE,
    fontSize: 22
};

export const POPUP_MSG_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xCCFFA4,
    fontSize: 32,
    wordWrap: true,
    wordWrapWidth: 400
};

export const ACCOUNT_BALANCE_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xCCFFA4,
    fontSize: 32
};

export const TERMS_TXT_STYLE = () => <Partial<ITextStyle>>({
    ...TXT_STYLE,
    fontSize: 28,
    lineHeight: 32,
    fill: 0xFFFFFF,

    align: 'left',
    wordWrap: true,
    wordWrapWidth: TERMS_POPUP_CONTENT_WIDTH[applyOrientation()]
});

export const TERMS_TITLE_TXT_STYLE: Partial<ITextStyle> = {
    ...TERMS_TXT_STYLE(),
    fontFamily: 'Montserrat700',
    fill: 0xCCC696,
    fontSize: 42
};

export const ONB_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xffffff,
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 500,
    fontSize: 32
};
