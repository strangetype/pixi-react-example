import {
    BUTTON_TXT_HOTKEYS,
    BUTTON_TXT_PLAY_GAME,
    CHIPS_TXT_STYLE,
    INPUT_TXT_SUMMA,
    SELECT_TXT_BALANCED
} from 'const/Scratch Card/textStyles';
import {
    KEY_PANEL_BUTTON_CHIPS_1,
    KEY_PANEL_BUTTON_CHIPS_2,
    KEY_PANEL_BUTTON_CHIPS_3,
    KEY_PANEL_BUTTON_CHIPS_4,
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

export const PANEL_BUTTONS = [
    {
        key: KEY_PANEL_BUTTON_CHIPS_1,
        slot: 'slot_chip1',
        spineDataKey: 'dynamic_button-chip1',
        chipKey: 0,
        style: CHIPS_TXT_STYLE,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_2,
        slot: 'slot_chip2',
        spineDataKey: 'dynamic_button-chip1',
        chipKey: 1,
        style: CHIPS_TXT_STYLE
    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_3,
        slot: 'slot_chip3',
        spineDataKey: 'dynamic_button-chip1',
        chipKey: 2,
        style: CHIPS_TXT_STYLE
    },
    {
        key: KEY_PANEL_BUTTON_CHIPS_4,
        slot: 'slot_chip4',
        spineDataKey: 'dynamic_button-chip1',
        chipKey: 3,
        style: CHIPS_TXT_STYLE
    },

    {
        key: KEY_PANEL_BUTTON_MIN,
        slot: 'slot_min',
        keyTranslation: 'button_text.min',
        spineDataKey: 'dynamic_button-min',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            }
        }
    },

    {
        key: KEY_PANEL_BUTTON_MAX,
        slot: 'slot_max',
        keyTranslation: 'button_text.max',
        spineDataKey: 'dynamic_button-min',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            }
        }
    },

    {
        key: KEY_PANEL_BUTTON_X2,
        text: 'X*2',
        slot: 'slot_x2',
        spineDataKey: 'dynamic_button-min',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_D2,
        text: 'X/2',
        slot: 'slot_d2',
        spineDataKey: 'dynamic_button-min',
        style: BUTTON_TXT_HOTKEYS,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_INPUT,
        slot: 'slot_imput',
        spineDataKey: 'dynamic_input-bet',
        style: INPUT_TXT_SUMMA,
        props: {
            [PORTRAIT]: {
                scale: {
                    x: 1,
                    y: 1
                }
            },
            [LANDSCAPE]: {
                scale: {
                    x: 1,
                    y: 1
                }
            }
        },
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.45
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.45
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_SELECT_BALANCE,
        slot: 'slot_currency',
        spineDataKey: 'dynamic_button-select-currency',
        style: SELECT_TXT_BALANCED,
        propsText: {
            [PORTRAIT]: {
                anchor: {
                    x: 0.5,
                    y: 0.45
                }
            },
            [LANDSCAPE]: {
                anchor: {
                    x: 0.5,
                    y: 0.45
                }
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_INPUT_CLEAR,
        slot: 'slot_clear',
        spineDataKey: 'dynamic_button-clear',
        props: {
            [PORTRAIT]: {
                x: 0,
                y: -10
            },
            [LANDSCAPE]: {
                x: 0,
                y: -10
            }
        }
    },
    {
        key: KEY_PANEL_BUTTON_PLAY,
        slot: 'slot_play',
        keyTranslation: 'bet',
        spineDataKey: 'dynamic_button-play',
        style: BUTTON_TXT_PLAY_GAME,
        props: {
            [PORTRAIT]: {
                scale: {
                    x: 1,
                    y: 1
                }
            },
            [LANDSCAPE]: {
                scale: {
                    x: 1,
                    y: 1
                }
            }
        }
    }
];
