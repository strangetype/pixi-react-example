import { ITextStyle } from 'pixi.js';
import { TERMS_POPUP_CONTENT_WIDTH } from 'config/Slots 777/positions';
import { applyOrientation } from 'utils/applyOrientation';
import { LANDSCAPE } from 'const/variable';

export const TXT_STYLE: Partial<ITextStyle> = {
    fontFamily: 'SeldomScene400',
    fontSize: 64,
    fill: 0xffffff,
    align: 'center',
    lineJoin: 'round',
    lineHeight: 0
};

export const TXT_RULE_MUL_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xAFE7FF,
    fontSize: 42
};

export const TXT_RULE_MUL_STYLE_WIN: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0xFFFFFF,
    fontSize: 42
};
export const TXT_RULE_MUL_STYLE_PANEL = () => <Partial<ITextStyle>> ({
    ...TXT_STYLE,
    fill: 0xAFE7FF,
    fontSize: applyOrientation() === LANDSCAPE ? 42 : 20
});

export const WIN_LOSE_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fill: 0x60D9FF,
    fontSize: 48,
    wordWrap: true,
    wordWrapWidth: 700
};

export const TXT_MAX_WIN_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'SeldomScene400',
    fill: 0xCCFFA4,
    fontSize: 44,
    lineHeight: 42,
    wordWrap: true,
    wordWrapWidth: 350
};

export const CHIPS_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: ['SeldomScene400']
};

export const CHANGE_BET_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'SeldomScene400',
    fill: 0xCCFFA4
};

export const ACCOUNT_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'SeldomScene400'
};

export const ACCOUNT_TXT_STYLE_BALANCE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'SeldomScene400',
    fontSize: 45
};

export const BOLD_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'SeldomScene400',
    fill: 0xffffff,
    fontSize: 32
};

export const LOADING_TXT_STYLE: Partial<ITextStyle> = {
    ...BOLD_TXT_STYLE,
    fontSize: 55
};

export const BET_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 44,
    fontFamily: 'SeldomScene400',
    fill: 0xFF8B20
};

export const TXT_INPUT_PANEL_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontSize: 34,
    fill: 0xCCFFA4,
    align: 'center'
};

export const POPUP_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...TXT_STYLE,
    fontFamily: 'SeldomScene400',
    fill: 0x47FF43,
    fontSize: 48,
    wordWrap: true,
    wordWrapWidth: 160
};

export const POPUP_BTN_TXT_DANGER_STYLE: Partial<ITextStyle> = {
    ...POPUP_BTN_TXT_STYLE,
    fill: 0xFF2323
};

export const ONB_SKIP_BTN_TXT_STYLE: Partial<ITextStyle> = {
    ...POPUP_BTN_TXT_STYLE,
    fontFamily: 'SeldomScene400',
    fontSize: 45,
    fill: 0xF2DCFF
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
    fontFamily: 'HelveticaMedium400',
    fill: 0xffffff,
    fontSize: 64
};

export const TERMS_TXT_STYLE = () => <Partial<ITextStyle>>({
    ...TXT_STYLE,
    fontSize: 54,
    lineHeight: 58,
    fill: 0x60D9FF,
    fontFamily: 'HelveticaMedium400',
    align: 'left',
    wordWrap: true,
    wordWrapWidth: TERMS_POPUP_CONTENT_WIDTH[applyOrientation()]
});

export const TERMS_TITLE_TXT_STYLE: Partial<ITextStyle> = {
    ...TERMS_TXT_STYLE(),
    fontFamily: 'SeldomScene400',
    fill: 0xffffff,
    fontSize: 96,
    lineHeight: 96
};

export const TERMS_TITLE_TXT_STYLE_HTP: Partial<ITextStyle> = {
    ...TERMS_TXT_STYLE(),
    fontFamily: 'SeldomScene400',
    fill: 0xffffff,
    fontSize: 96,
    wordWrap: true,
    wordWrapWidth: 1200
};

export const ONB_TXT_STYLE: Partial<ITextStyle> = {
    ...BOLD_TXT_STYLE,
    fill: 0xC8F8FF,
    fontFamily: 'SeldomScene400',
    align: 'center',
    wordWrap: true,
    wordWrapWidth: 1200,
    fontSize: 48
};
