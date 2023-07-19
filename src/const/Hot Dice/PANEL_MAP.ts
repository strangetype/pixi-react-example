import {
    BUTTON_TXT_HOTKEYS,
    BUTTON_TXT_PLAY_GAME,
    CHIPS_TXT_STYLE,
    INPUT_TXT_SUMMA,
    SELECT_TXT_BALANCED
} from 'const/Hot Dice/textStyles';
import {
    KEY_PANEL_BUTTON_CHIPS_1,
    KEY_PANEL_BUTTON_CHIPS_2,
    KEY_PANEL_BUTTON_CHIPS_3,
    KEY_PANEL_BUTTON_CHIPS_4,
    KEY_PANEL_BUTTON_CHIPS_5,
    KEY_PANEL_BUTTON_CHIPS_6,
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

export const SELECT_BALANCE_BUTTON = {
    key: KEY_PANEL_BUTTON_SELECT_BALANCE,
    slot: 'btn14',
    spineDataKey: 'btn14',
    style: SELECT_TXT_BALANCED
};

export const BUTTON_PLAY = {
    key: KEY_PANEL_BUTTON_PLAY,
    slot: 'btn13',
    keyTranslation: 'bet',
    spineDataKey: 'btn13',
    style: BUTTON_TXT_PLAY_GAME
};

export const PANEL_BUTTONS = [
    {
        key: KEY_PANEL_BUTTON_CHIPS_1,
        slot: 'v_bet1',
        spineDataKey: 'btn_bet',
        chipKey: 0,
        style: CHIPS_TXT_STYLE,
        decorations: [{
            spineDataKey: 'coin_bet1',
            slot: 'coin_1'
        }]

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_2,
        slot: 'v_bet2',
        spineDataKey: 'btn_bet',
        chipKey: 1,
        style: CHIPS_TXT_STYLE,
        decorations: [{
            spineDataKey: 'coin_bet2',
            slot: 'coin_2'
        }]
    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_3,
        slot: 'v_bet3',
        spineDataKey: 'btn_bet',
        chipKey: 2,
        style: CHIPS_TXT_STYLE,
        decorations: [{
            spineDataKey: 'coin_bet3',
            slot: 'coin_3'
        }]
    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_4,
        slot: 'v_bet4',
        spineDataKey: 'btn_bet',
        chipKey: 3,
        style: CHIPS_TXT_STYLE,
        decorations: [{
            spineDataKey: 'coin_bet4',
            slot: 'coin_4'
        }]
    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_5,
        slot: 'v_bet5',
        spineDataKey: 'btn_bet',
        chipKey: 4,
        style: CHIPS_TXT_STYLE,
        decorations: [{
            spineDataKey: 'coin_bet5',
            slot: 'coin_5'
        }]

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_6,
        slot: 'v_bet6',
        spineDataKey: 'btn_bet',
        chipKey: 5,
        style: CHIPS_TXT_STYLE,
        decorations: [{
            spineDataKey: 'coin_bet6',
            slot: 'coin_6'
        }
        ]
    },

    {
        key: KEY_PANEL_BUTTON_MIN,
        slot: 'btn10_1',
        keyTranslation: 'button_text.min',
        spineDataKey: 'btn10',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_X2,
        text: 'X*2',
        slot: 'btn10_2',
        spineDataKey: 'btn10',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_D2,
        text: 'X/2',
        slot: 'btn10_3',
        spineDataKey: 'btn10',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_MAX,
        slot: 'btn10_4',
        keyTranslation: 'button_text.max',
        spineDataKey: 'btn10',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.6
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_INPUT,
        slot: 'btn5',
        spineDataKey: 'btn5',
        style: INPUT_TXT_SUMMA,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.6,
                    y: 0.45
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.6,
                    y: 0.45
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_INPUT_CLEAR,
        slot: 'btn7_norm',
        spineDataKey: 'btn7',
        notState: true
    }
];
