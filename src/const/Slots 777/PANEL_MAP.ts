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
import {
    ACCOUNT_TXT_STYLE,
    ACCOUNT_TXT_STYLE_BALANCE,
    BET_BTN_TXT_STYLE,
    CHIPS_TXT_STYLE
} from './textStyles';

const KEY_PANEL_BUTTON_SELECT_BALANCE_ARROW = 'KEY_PANEL_BUTTON_SELECT_BALANCE_ARROW';

export const PANEL_BUTTONS = [
    {
        key: KEY_PANEL_BUTTON_CHIPS_1,
        slot: 'btn7_1',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 0,
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_2,
        slot: 'btn7_2',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 1,
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_3,
        slot: 'btn7_3',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 2,
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_4,
        slot: 'btn7_4',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 3,
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_5,
        slot: 'btn7_5',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 4,
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_6,
        slot: 'btn7_6',
        spineDataKey: 'btn7',
        style: CHIPS_TXT_STYLE,
        chipKey: 5,
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_MIN,
        slot: 'btn4_1',
        spineDataKey: 'btn4',
        style: CHIPS_TXT_STYLE,
        keyTranslation: 'button_text.min',
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_MAX,
        slot: 'btn4_4',
        spineDataKey: 'btn4',
        style: CHIPS_TXT_STYLE,
        keyTranslation: 'button_text.max',
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_X2,
        slot: 'btn4_2',
        spineDataKey: 'btn4',
        style: CHIPS_TXT_STYLE,
        text: 'X*2',
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_D2,
        slot: 'btn4_3',
        spineDataKey: 'btn4',
        style: CHIPS_TXT_STYLE,
        text: 'X/2',
        position: {
            [PORTRAIT]: {
                y: -12
            },
            [LANDSCAPE]: {
                y: -12
            }
        }

    },
    {
        key: KEY_PANEL_BUTTON_INPUT,
        slot: 'btn10',
        spineDataKey: 'btn10',
        style: ACCOUNT_TXT_STYLE

    },
    {
        key: KEY_PANEL_BUTTON_INPUT_CLEAR,
        slot: 'btn11',
        spineDataKey: 'btn11',
        props: {
            [PORTRAIT]: { x: -250, y: 0 },
            [LANDSCAPE]: { x: -250, y: 0 }
        }
    },
    {
        key: KEY_PANEL_BUTTON_PLAY,
        slot: 'btn2',
        spineDataKey: 'btn1',
        style: BET_BTN_TXT_STYLE,
        keyTranslation: 'bet'

    },
    {
        key: KEY_PANEL_BUTTON_SELECT_BALANCE,
        slot: 'btn9',
        spineDataKey: 'btn9',
        style: ACCOUNT_TXT_STYLE_BALANCE,
        props: {
            [PORTRAIT]: { x: -20, y: -12 },
            [LANDSCAPE]: { x: -20, y: -12 }
        }
    },
    {
        key: KEY_PANEL_BUTTON_SELECT_BALANCE_ARROW,
        slot: 'btn15_arrow',
        spineDataKey: 'btn15_arrow'
    }
];
