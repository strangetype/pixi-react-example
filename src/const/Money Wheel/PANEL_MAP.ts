import { BET_BTN_TXT_STYLE, PANEL_BTN_STYLE } from 'const/Money Wheel/textStyles';
import {
    KEY_PANEL_BUTTON_CHIPS_1,
    KEY_PANEL_BUTTON_CHIPS_2,
    KEY_PANEL_BUTTON_CHIPS_3,
    KEY_PANEL_BUTTON_CHIPS_4,
    KEY_PANEL_BUTTON_CHIPS_5, KEY_PANEL_BUTTON_CHIPS_6,
    KEY_PANEL_BUTTON_D2,
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_MAX,
    KEY_PANEL_BUTTON_MIN,
    KEY_PANEL_BUTTON_PLAY,
    KEY_PANEL_BUTTON_X2
} from 'const/Common/KEYS_BUTTONS';

export const PANEL_BUTTONS = [
    {
        key: KEY_PANEL_BUTTON_MIN,
        slot: 'btn7',
        keyTranslation: 'button_text.min',
        spineDataKey: 'btn7',
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_X2,
        text: 'X*2',
        slot: 'btn8',
        spineDataKey: 'btn7',
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_D2,
        text: 'X/2',
        slot: 'btn9',
        spineDataKey: 'btn7',
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_MAX,
        slot: 'btn10',
        keyTranslation: 'button_text.max',
        spineDataKey: 'btn7',
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_1,
        slot: 'btn1',
        spineDataKey: 'btn1',
        chipKey: 0,
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_2,
        slot: 'btn2',
        spineDataKey: 'btn1',
        chipKey: 1,
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_3,
        slot: 'btn3',
        spineDataKey: 'btn1',
        chipKey: 2,
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_4,
        slot: 'btn4',
        spineDataKey: 'btn1',
        chipKey: 3,
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_5,
        slot: 'btn5',
        spineDataKey: 'btn1',
        chipKey: 4,
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_6,
        slot: 'btn6',
        spineDataKey: 'btn1',
        chipKey: 5,
        style: PANEL_BTN_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_PLAY,
        slot: 'btn12',
        keyTranslation: 'bet',
        spineDataKey: 'btn12',
        chipsKey: 6,
        style: BET_BTN_TXT_STYLE
    },
    {
        key: KEY_PANEL_BUTTON_INPUT,
        slot: 'btn11',
        keyTranslation: '',
        spineDataKey: 'btn11',
        style: BET_BTN_TXT_STYLE
    }
];
