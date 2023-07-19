import {
    KEY_PANEL_BUTTON_CHIPS_1,
    KEY_PANEL_BUTTON_CHIPS_2,
    KEY_PANEL_BUTTON_CHIPS_3,
    KEY_PANEL_BUTTON_CHIPS_4,
    KEY_PANEL_BUTTON_CHIPS_5,
    KEY_PANEL_BUTTON_D2,
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_INPUT_CLEAR,
    KEY_PANEL_BUTTON_MAX,
    KEY_PANEL_BUTTON_MIN,
    KEY_PANEL_BUTTON_PLAY,
    KEY_PANEL_BUTTON_SELECT_BALANCE,
    KEY_PANEL_BUTTON_X2
} from 'const/Common/KEYS_BUTTONS';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import {
    ACCOUNT_TXT_STYLE,
    BET_BTN_TXT_STYLE,
    CHANGE_BET_TXT_STYLE,
    CHIPS_TXT_STYLE,
    TXT_INPUT_PANEL_STYLE
} from './textStyles';

export const PANEL_BUTTONS = [
    {
        key: KEY_PANEL_BUTTON_MIN,
        slot: 'btn3_1',
        spineDataKey: 'btn3',
        style: CHANGE_BET_TXT_STYLE,
        keyTranslation: 'button_text.min'
    },
    {
        key: KEY_PANEL_BUTTON_MAX,
        slot: 'btn3_4',
        spineDataKey: 'btn3',
        style: CHANGE_BET_TXT_STYLE,
        keyTranslation: 'button_text.max'
    },
    {
        key: KEY_PANEL_BUTTON_X2,
        slot: 'btn3_2',
        spineDataKey: 'btn3',
        style: CHANGE_BET_TXT_STYLE,
        text: 'X*2'
    },
    {
        key: KEY_PANEL_BUTTON_D2,
        slot: 'btn3_3',
        spineDataKey: 'btn3',
        style: CHANGE_BET_TXT_STYLE,
        text: 'X/2'

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_1,
        slot: 'btn7',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 0

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_2,
        slot: 'btn7_1',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 1

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_3,
        slot: 'btn7_2',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 2

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_4,
        slot: 'btn7_3',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 3

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_5,
        slot: 'btn7_4',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 4

    },
    {
        key: KEY_PANEL_BUTTON_INPUT,
        slot: 'input',
        spineDataKey: 'input',
        style: TXT_INPUT_PANEL_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_INPUT_CLEAR,
        slot: 'btn4',
        spineDataKey: 'btn4'

    },
    {
        key: KEY_PANEL_BUTTON_SELECT_BALANCE,
        slot: 'currency_btn',
        spineDataKey: 'currency_btn',
        style: ACCOUNT_TXT_STYLE,
        props: {
            [PORTRAIT]: { x: -26, y: 0 },
            [LANDSCAPE]: { x: -26, y: 0 }
        }

    },
    {
        key: KEY_PANEL_BUTTON_PLAY,
        slot: 'btn5',
        spineDataKey: 'btn6',
        style: BET_BTN_TXT_STYLE,
        keyTranslation: 'bet'

    }
];
