import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { dicePosition, panelPosition, parrotsPosition } from 'config/Hot Dice/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TextW } from 'components/Common/wrapper/TextW';
import { useApp } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { GAME_ACTION_TXT_BUTTON, GAME_RESULT_TXT, GAME_SKULL_TXT } from 'const/Hot Dice/textStyles';
import { useStoreComputed } from 'features/useComputed';

import { DEBOUNCE_TIME_ELEMENT, GAME_ID } from 'config/Common/settings';
import { GamesPlayMethods } from 'const/Common/GamesPlayMethods';
import { useStoreUserState } from 'store/Default/user/store_F';
import helper from 'utils/helper';
import { BUTTON_PLAY } from 'const/Hot Dice/PANEL_MAP';

import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { multiply } from 'utils/math/operators';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { delay } from 'utils/delay';
import { GamesStatus } from 'const/Common/GamesStatus';
import { AnimationButton_F } from 'config/Hot Dice/AnimationButton_F';
import { applyOrientation } from 'utils/applyOrientation';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { debounce } from 'utils/debounce';
import { KEY_SETTING_GROUP_GAME, KEY_SETTING_GROUP_PANEL_STAVOK } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { fractionDigits } from 'utils/fractionDigits';
import { GamesPlayButtons } from './enum/GamesPlayButtons';

const GameView = () => {
    const app = useApp();
    const [animationGameActionButtons, setAnimationGameActionButtons] = useState({} as any);
    const [animationGameActionFires, setAnimationGameActionFires] = useState({} as any);
    const [playGameButtonState, setPlayGameButtonState] = useState(null as any);
    const [animationParrotsState, setAnimationParrotsState] = useState(null as any);
    const [animationDiceRState, setAnimationDiceRState] = useState(null as any);
    const [animationDiceLState, setAnimationDiceLState] = useState(null as any);
    const [animationSkullState, setAnimationSkullState] = useState(null as any);
    const [textSkullState, setTextSkullState] = useState({} as any);
    const diceRInstance = useRef(null as any);
    const diceLInstance = useRef(null as any);
    const version = useRef(0);
    const isWinButton = useRef(false);
    const diceRandLCache = useRef({} as any);
    const stepsHistory = useRef([] as any);
    const { playGame } = useStoreGamesActions;
    const { clickKeyButton } = useStorePopupsActions;
    const { translations, rules: { multipliers: rulesMultipliers = [] } = {} } = useStoreSettingsState.get();

    const actionGameButtons = [
        {
            id: 1,
            text: translations['button_text.over'],
            slot: 'btn12_1',
            key: GamesPlayButtons.greater,
            props: {
                [PORTRAIT]: {
                    //    x: -10,
                    //  y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    //     x: -10,
                    //   y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        {
            id: 2,
            text: translations['button_text.under'],
            slot: 'btn12_2',
            key: GamesPlayButtons.less,
            props: {
                [PORTRAIT]: {
                    //  x: -10,
                    // y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    //   x: -10,
                    //  y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        {
            id: 3,
            text: translations['button_text.over_equal'],
            slot: 'btn12_3',
            key: GamesPlayButtons.greaterOrEqual,
            props: {
                [PORTRAIT]: {
                    //  x: -10,
                    //  y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    // x: -10,
                    // y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        {
            id: 4,
            text: translations['button_text.under_equal'],
            slot: 'btn12_4',
            key: GamesPlayButtons.lessOrEqual,
            props: {
                [PORTRAIT]: {
                    // x: -5,
                    // y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    // x: -5,
                    //  y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        }
    ];

    const stateRef = useCallback((state, key) => {
        if (state) {
            switch (key) {
            case 'parrots':
                setAnimationParrotsState(state);
                break;
            case 'dice_r':
                setAnimationDiceRState(state);
                break;
            case 'dice_l':
                setAnimationDiceLState(state);
                break;
            case 'btn_skull':
                setAnimationSkullState(state);
                break;
            case BUTTON_PLAY.spineDataKey:
                setPlayGameButtonState(state);
                break;
            }
        }
    }, []);

    const stateActionGamesButtonRef = useCallback((state, key) => {
        if (state && !(key in animationGameActionButtons)) {
            setAnimationGameActionButtons(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [animationGameActionButtons]);

    const stateActionGamesFireRef = useCallback((state, key) => {
        if (state && !(key in animationGameActionFires)) {
            setAnimationGameActionFires(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [animationGameActionFires]);

    const stateTextSkullStateRef = useCallback((state, key) => {
        if (state && !(key in textSkullState)) {
            setTextSkullState(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [textSkullState]);

    const activeAnimationStartGame = () => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
            if (applyOrientation() === LANDSCAPE) {
                if (version.current !== 1) {
                    await animationDiceRState?.setAnimation(0, 'h/hide', false, {
                        configName: 'скрытие кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    });
                    await animationDiceLState?.setAnimation(0, 'h/hide', false, {
                        configName: 'скрытие кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    });
                }
                await Promise.all([
                    animationParrotsState?.setAnimation(0, 'dice-roll', false, {
                        configName: 'попугай бросок кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    }),
                    animationDiceRState?.setAnimation(0, 'h/show2', false, {
                        configName: 'показать кубики цифры',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    }),
                    animationDiceLState?.setAnimation(0, 'h/show2', false, {
                        configName: 'показать кубики цифры',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    })
                ]);
                animationParrotsState?.setAnimation(0, 'state_game/loop_eye-blink', true, {
                    configName: 'попугай маргает глазами',
                    groupConfig: KEY_SETTING_GROUP_GAME
                });
            } else {
                if (version.current !== 1) {
                    await animationDiceRState?.setAnimation(0, 'v/hide', false, {
                        configName: 'скрытие кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    });
                    await animationDiceLState?.setAnimation(0, 'v/hide', false, {
                        configName: 'скрытие кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    });
                }
                await Promise.all([
                    animationParrotsState?.setAnimation(0, 'dice-roll', false, {
                        configName: 'попугай бросок кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    }),
                    animationDiceRState?.setAnimation(0, 'v/show', false, {
                        configName: 'показать кубики цифры',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    }),
                    animationDiceLState?.setAnimation(0, 'v/show', false, {
                        configName: 'показать кубики цифры',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    })
                ]);
                animationParrotsState?.setAnimation(0, 'state_game/loop_eye-blink', true,
                    { configName: 'попугай маргает глазами', groupConfig: KEY_SETTING_GROUP_GAME });
            }
            return resolve(true);
        });
    };

    const setSkinDiceRL = ({ diceRNumber = 1, diceLNumber = 1 } = {}) => {
        diceRandLCache.current = { diceRNumber, diceLNumber };
        diceRInstance.current.skeleton.setSkinByName(`v/${diceRNumber}`);
        diceLInstance.current.skeleton.setSkinByName(`v/${diceLNumber}`);
    };

    const showAnimationDiceNumberGame = () => {
        return Promise.all([
            animationDiceRState?.setAnimation(0, 'v/show2', false, {
                configName: 'показать кубики цифры',
                groupConfig: KEY_SETTING_GROUP_GAME
            }),
            animationDiceLState?.setAnimation(0, 'v/show2', false, {
                configName: 'показать кубики цифры',
                groupConfig: KEY_SETTING_GROUP_GAME
            })
        ]);
    };

    const activeButtonsGames = (availableChoices = []) => {
        for (const key in animationGameActionButtons) {
            animationGameActionButtons[key].$isBlock = true;
            animationGameActionButtons[key].setAnimation(0, 'loop4', true);
            animationGameActionFires[key] && (animationGameActionFires[key].visible = false);
        }
        setTimeout(_ => {
            availableChoices.forEach(key => {
                delete animationGameActionButtons[key].$isBlock;
                animationGameActionButtons[key].setAnimation(0, 'loop2', true);
                animationGameActionFires[key] && (animationGameActionFires[key].visible = true);
            });
        }, 100);
    };

    const activeSkullLevel = ({ level = 0, reset = false }) => {
        if (reset) {
            [...new Array(5)].forEach(async (_, index) => {
                animationSkullState.setAnimation(0, `loop_lvl/hide${index + 1}`, false);
            });

            [...new Array(9)].forEach((_, level) => {
                textSkullState[`level${level}`] && (textSkullState[`level${level}`].style.fill = 0x2D231C);
                textSkullState[`level${level}`] && (textSkullState[`level${level}`].style.strokeThickness = 0);
                textSkullState[`level${level}`] && (textSkullState[`level${level}`].y = 0);
            });
            return;
        }
        [...new Array(level + 1)].forEach(async (_, level) => {
            animationSkullState.setAnimation(0, `loop_lvl/show${level + 1}`, false);
            animationSkullState.setAnimation(0, `loop_lvl/loop${level + 1}`, true);

            if (level !== 0 && level % 2 === 0) {
                textSkullState[`level${level - 2}`].style.fill = '#FFAA43';
                textSkullState[`level${level - 2}`].style.strokeThickness = 16;
                textSkullState[`level${level - 2}`].y = -12;
            }
        });
    };

    const checkPlayButton = ({ level = null, currencyCode = '', bet = 0, reset = false }) => {
        if (level != null && rulesMultipliers[level] !== 0) {
            // @ts-ignore
            useStoreGamesState.setKey('playButtonText', `${translations['button_text.take']}` + ' \n ' + `${fractionDigits(multiply(bet, rulesMultipliers[level]), 2, 2)} ${currencyCode}`);
            delete playGameButtonState.$isBlock;
            isWinButton.current = true;
            playGameButtonState.setAnimation(0, 'loop2', true);
            useStoreGamesState.setKey('textInfo', translations.rules_activ_take);
        } else if (reset || (level != null && rulesMultipliers[level] === 0)) {
            // @ts-ignore
            useStoreGamesState.setKey('playButtonText', translations[BUTTON_PLAY.keyTranslation]);
            if (reset) {
                delete playGameButtonState.$isBlock;
                playGameButtonState.setAnimation(0, 'loop2', true);
            } else {
                playGameButtonState.$isBlock = true;
                playGameButtonState.setAnimation(0, AnimationButton_F.disabled, true);
            }
            isWinButton.current = false;
        }
    };

    useEffect(() => {
        (async () => {
            activeButtonsGames();
            const { activeSession } = useStoreUserState.get();
            if (helper.isEmpty(activeSession)) {
                await delay(100);
                useStoreGamesState.setKey('textInfo', translations.rules_start);
                return;
            }

            if (helper.isEmpty(animationGameActionButtons)) {
                activeButtonsGames();
                return;
            }

            if (helper.isEmpty(activeSession.board)) {
                await playGame({
                    game_id: GAME_ID,
                    method: GamesPlayMethods.cancel
                });
                return;
            }
            useStoreGamesState.setKey('isPanelDisabled', true);
            useStoreGamesState.setKey('isGaming', true);
            useStoreGamesState.setKey('textInfo', translations.rules_activ);
            const {
                bet = 0,
                currency = '',
                board: {
                    dicesToBeat: [diceR, diceL] = [],
                    availableChoices = [],
                    history = []
                } = {},
                version: versionApi,
                level
            } = activeSession;
            version.current = versionApi;
            useStoreGamesState.setKey('input', fractionDigits(bet, 2, 2));

            setSkinDiceRL({ diceRNumber: diceR, diceLNumber: diceL });
            await showAnimationDiceNumberGame();
            activeButtonsGames(availableChoices);
            activeSkullLevel({ level });
            checkPlayButton({ level, bet, currencyCode: currency });

            const { dicesToBeat = [], newDices = [] } = history.length > 0 ? history[history.length - 1] : {};
            stepsHistory.current = history.length > 0 ? [
                ...dicesToBeat,
                ...newDices
            ] : [
                diceR,
                diceL
            ];

            global.$emitter.emit('HotDice_gameTableResult', {
                steps: [diceR, diceL],
                history,
                init: true
            });
        })();
    }, [animationGameActionButtons, version.current, playGameButtonState, animationGameActionFires]);

    const onIsGaming = async ({ isGaming = true, userAction = null } = {}) => {
        if (isGaming) {
            useStoreGamesState.setKey('isGamingAnimation', true);
            useStoreGamesState.setKey('isPanelDisabled', true);
            global.$emitter.emit('HotDice_onboarding', { action: 'hide' });
            playGameButtonState.$isBlock = true;
            playGameButtonState.setAnimation(0, AnimationButton_F.disabled, true);
            const { input } = useStoreGamesState.get();
            const { activeIdAccount, activeSession } = useStoreUserState.get();
            useStoreGamesState.setKey('textInfo', '');

            animationParrotsState?.setAnimation(0, 'state_game/flapping_wings', true, {
                configName: 'попугай махание крыльями',
                groupConfig: KEY_SETTING_GROUP_GAME
            });
            /*
          {
    "session": {
        "id": 28,
        "userId": 8,
        "partnerId": 1,
        "gameId": 18,
        "status": "active",
        "bet": 10,
        "currency": "EUR",
        "precision": 2,
        "payoutRate": 0.98,
        "level": 5,
        "winnings": 0,
        "board": {
            "history": [
                {
                    "win": true,
                    "level": 0,
                    "choice": "less",
                    "newDices": [
                        1,
                        5
                    ],
                    "dicesToBeat": [
                        5,
                        6
                    ]
                },
                {
                    "win": true,
                    "level": 1,
                    "choice": "less_or_equal",
                    "newDices": [
                        3,
                        3
                    ],
                    "dicesToBeat": [
                        1,
                        5
                    ]
                },
                {
                    "win": true,
                    "level": 2,
                    "choice": "less_or_equal",
                    "newDices": [
                        1,
                        4
                    ],
                    "dicesToBeat": [
                        3,
                        3
                    ]
                },
                {
                    "win": true,
                    "level": 3,
                    "choice": "greater",
                    "newDices": [
                        5,
                        4
                    ],
                    "dicesToBeat": [
                        1,
                        4
                    ]
                },
                {
                    "level": 4,
                    "dicesToBeat": [
                        5,
                        4
                    ],
                    "choice": "less",
                    "newDices": [
                        6,
                        2
                    ],
                    "win": true
                }
            ],
            "dicesToBeat": [
                6,
                2
            ],
            "availableChoices": [
                "less",
                "greater_or_equal"
            ]
        },
        "version": 6,
        "expiresAt": "2022-12-07T11:50:06.616Z",
        "createdAt": "2022-12-07T07:50:06.617Z",
        "updatedAt": "2022-12-07T08:21:47.013Z",
        "deletedAt": null,
        "account": {
            "id": 1,
            "currency_code": "EUR",
            "balance": 32274.02
        }
    }
}

{
    "session": {
        "id": 152,
        "userId": 8,
        "partnerId": 1,
        "gameId": 18,
        "status": "closed",
        "bet": 1,
        "currency": "EUR",
        "precision": 2,
        "payoutRate": 0.98,
        "level": 10,
        "winnings": 30,
        "board": {
            "history": [
                {
                    "win": true,
                    "level": 0,
                    "choice": "greater",
                    "newDices": [
                        4,
                        5
                    ],
                    "dicesToBeat": [
                        1,
                        1
                    ]
                },
                {
                    "win": true,
                    "level": 1,
                    "choice": "less",
                    "newDices": [
                        1,
                        2
                    ],
                    "dicesToBeat": [
                        4,
                        5
                    ]
                },
                {
                    "win": true,
                    "level": 2,
                    "choice": "greater",
                    "newDices": [
                        4,
                        1
                    ],
                    "dicesToBeat": [
                        1,
                        2
                    ]
                },
                {
                    "win": true,
                    "level": 3,
                    "choice": "greater",
                    "newDices": [
                        3,
                        6
                    ],
                    "dicesToBeat": [
                        4,
                        1
                    ]
                },
                {
                    "win": true,
                    "level": 4,
                    "choice": "less",
                    "newDices": [
                        6,
                        2
                    ],
                    "dicesToBeat": [
                        3,
                        6
                    ]
                },
                {
                    "win": true,
                    "level": 5,
                    "choice": "less",
                    "newDices": [
                        3,
                        4
                    ],
                    "dicesToBeat": [
                        6,
                        2
                    ]
                },
                {
                    "win": true,
                    "level": 6,
                    "choice": "greater_or_equal",
                    "newDices": [
                        4,
                        2
                    ],
                    "dicesToBeat": [
                        3,
                        4
                    ]
                },
                {
                    "win": true,
                    "level": 7,
                    "choice": "greater",
                    "newDices": [
                        2,
                        3
                    ],
                    "dicesToBeat": [
                        4,
                        2
                    ]
                },
                {
                    "win": true,
                    "level": 8,
                    "choice": "greater",
                    "newDices": [
                        2,
                        6
                    ],
                    "dicesToBeat": [
                        2,
                        3
                    ]
                },
                {
                    "level": 9,
                    "dicesToBeat": [
                        2,
                        6
                    ],
                    "choice": "less",
                    "newDices": [
                        1,
                        5
                    ],
                    "win": true
                }
            ],
            "dicesToBeat": [
                1,
                5
            ],
            "availableChoices": [
                "less_or_equal",
                "greater"
            ]
        },
        "version": 11,
        "expiresAt": "2022-12-15T12:16:05.393Z",
        "createdAt": "2022-12-15T08:16:05.393Z",
        "updatedAt": "2022-12-15T08:17:29.356Z",
        "deletedAt": null,
        "account": {
            "id": 1,
            "currency_code": "EUR",
            "balance": 32174.98
        }
    }
}
                * */

            if (stepsHistory.current.length === 4) {
                stepsHistory.current = [stepsHistory.current[2], stepsHistory.current[3], null, null];
                global.$emitter.emit('HotDice_gameTableResult', {
                    steps: stepsHistory.current
                });
            }

            try {
                if ((helper.isEmpty(activeSession) && !userAction)) {
                    const { version: versionApi = 0 } = await playGame({
                        account_id: activeIdAccount,
                        game_id: GAME_ID,
                        method: GamesPlayMethods.prepare,
                        sum: parseFloat(input)
                    });
                    version.current = versionApi;
                }

                global.$emitter.emit('HotDice_gameTableResultChoice', {
                    choice: userAction
                });

                const session = await playGame(helper.clearObject({
                    game_id: GAME_ID,
                    method: GamesPlayMethods.roll,
                    choice: userAction,
                    version: version.current
                }));

                const {
                    bet = 0,
                    currency = '',
                    board: {
                        dicesToBeat: [diceR, diceL] = [],
                        availableChoices = [],
                        history = []
                    } = {},
                    status,
                    level,
                    winnings,
                    currency: currencyCode,
                    version: versionApi,
                    account = {}
                } = session;

                version.current = versionApi;
                useStoreUserState.setKey('activeSession', { ...session });
                activeAnimationStartGame();
                await delay((version.current === 1 ? 0 : 600) + 1000 * useStoreGameGetters.getSettingsAnimation({
                    groupConfig: KEY_SETTING_GROUP_GAME,
                    configName: 'задержка появлениеями кубиков'
                }));
                setSkinDiceRL({ diceRNumber: diceR, diceLNumber: diceL });
                await showAnimationDiceNumberGame();

                useStoreGamesState.setKey('textInfo', translations.rules_activ);

                const { dicesToBeat = [], newDices = [] } = history.length > 0 ? history[history.length - 1] : {};
                stepsHistory.current = history.length > 0 ? [
                    ...dicesToBeat,
                    ...newDices
                ] : [
                    diceR,
                    diceL
                ];

                global.$emitter.emit('HotDice_gameTableResult', {
                    steps: stepsHistory.current,
                    history
                });

                if (status === GamesStatus.CLOSED && winnings === 0) {
                    global.$emitter.emit('HotDice_gameTableResultChoice', {
                        choice: userAction,
                        isGameOver: true
                    });
                    global.$emitter.emit('HotDice_onboarding', {
                        action: 'show',
                        steps: [
                            diceR,
                            diceL
                        ],
                        isWin: false
                    });

                    await delay(1000 * useStoreGameGetters.getSettingsAnimation({
                        groupConfig: KEY_SETTING_GROUP_GAME,
                        configName: 'задержка появлениеями попапа'
                    }));
                    await animationDiceRState?.setAnimation(0, 'v/hide', false, {
                        configName: 'скрытие кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    });
                    await animationDiceLState?.setAnimation(0, 'v/hide', false, {
                        configName: 'скрытие кубиков',
                        groupConfig: KEY_SETTING_GROUP_GAME
                    });
                    await delay(800);
                    useStorePopupsState.setKey('isShowLose', true);
                    useStoreGamesState.setKey('isGaming', false);
                    checkPlayButton({ reset: true });
                    version.current = 0;
                    useStoreGamesState.setKey('textInfo', translations.rules_start);
                    stepsHistory.current = [];
                    const { isShowOnboarding } = useStorePopupsState.get();
                    if (!isShowOnboarding) {
                        global.$emitter.emit('HotDice_gameTableResult', {
                            clear: true
                        });
                    }
                } else if (status === GamesStatus.CLOSED && winnings > 0) {
                    global.$emitter.emit('HotDice_gameTableResultChoice', {
                        choice: userAction,
                        isWin: true
                    });

                    useStorePopupsState.setKey('win', {
                        isShow: true,
                        message: `${translations['popup.you_won']}\n${fractionDigits(winnings, 2, 2)} ${currencyCode}`
                    });
                    useStoreUserActions.updateAccount(account);
                    useStoreGamesState.setKey('isGaming', false);
                    useStoreGamesState.setKey('textInfo', `${translations.your_win} ${fractionDigits(winnings, 2, 2)} ${currencyCode}`);
                    stepsHistory.current = [];
                    const { isShowOnboarding } = useStorePopupsState.get();
                    if (!isShowOnboarding) {
                        global.$emitter.emit('HotDice_gameTableResult', {
                            clear: true
                        });
                    }
                } else {
                    global.$emitter.emit('HotDice_gameTableResultChoice', {
                        choice: userAction,
                        isWin: true
                    });
                    global.$emitter.emit('HotDice_onboarding', {
                        action: 'show',
                        steps: stepsHistory.current,
                        isWin: true
                    });
                    activeSkullLevel({ level });
                    activeButtonsGames(availableChoices);
                    checkPlayButton({ level, bet, currencyCode: currency });
                }
                useStoreGamesState.setKey('isGamingAnimation', false);
            } catch (e) {
                console.error(e);
                animationParrotsState?.setAnimation(0, 'v/state_game/flapping_wings', false, {
                    configName: 'попугай махание крыльями',
                    groupConfig: KEY_SETTING_GROUP_GAME
                });
                useStoreGamesState.setKey('isGaming', false);
                useStoreGamesState.setKey('isGamingAnimation', false);
                // useStoreGamesState.setKey('isGamingAnimation', false);
                useStoreGamesState.setKey('textInfo', translations.rules_start);
                stepsHistory.current = [];
                global.$emitter.emit('HotDice_gameTableResult', {
                    clear: true
                });
            }
        } else {
            useStoreUserState.setKey('activeSession', {});
            activeButtonsGames();
            stepsHistory.current = [];
            activeSkullLevel({ reset: true });
            checkPlayButton({ reset: true });
            await animationDiceRState?.setAnimation(0, 'v/hide', false, {
                configName: 'скрытие кубиков',
                groupConfig: KEY_SETTING_GROUP_GAME
            });
            await animationDiceLState?.setAnimation(0, 'v/hide', false, {
                configName: 'скрытие кубиков',
                groupConfig: KEY_SETTING_GROUP_GAME
            });
            useStoreGamesState.setKey('isPanelDisabled', false);
            version.current = 0;
        }
    };

    const clickActionButton = (name) => {
        const { isGamingAnimation } = useStoreGamesState.get();
        if (isGamingAnimation) {
            return;
        }

        activeButtonsGames();

        onIsGaming({ userAction: name });
    };

    const clickPlayButton = () => {
        if (isWinButton.current) {
            clickTakeSum();
        } else {
            clickKeyButton(BUTTON_PLAY.key);
        }
    };

    const clickTakeSum = () => {
        const { isGamingAnimation } = useStoreGamesState.get();
        if (isGamingAnimation) {
            return;
        }
        // @ts-ignore
        useStorePopupsState.setKey('isShowTakeSum', true);
    };

    useEffect(() => {
        const computedStore = useStoreComputed(useStoreGamesState, ['isGaming'],
            ({
                isGaming
            }) => {
                onIsGaming({ isGaming });
            });

        return () => {
            computedStore.cancel();
        };
    }, [animationGameActionButtons, diceRInstance, diceLInstance, animationGameActionFires]);

    useEffect(() => {
        const resize = debounce(() => {
            setSkinDiceRL(diceRandLCache.current);

            //  animationParrotsState?.setAnimation(0, 'transition', false, { timeScale: -1 });
        }, DEBOUNCE_TIME_ELEMENT);

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [animationParrotsState]);

    return (
        <>
            <ContainerW position={parrotsPosition}>
                <SpineW
                    spineDataKey="parrots"
                    animations={[
                        {
                            name: 'transition',
                            initial: true,
                            groupConfig: KEY_SETTING_GROUP_GAME,
                            configName: 'попугай взлетает после загрузки'
                        },
                        {
                            name: 'state_game/loop_eye-blink',
                            loop: true,
                            groupConfig: KEY_SETTING_GROUP_GAME,
                            configName: 'попугай маргает глазами'
                        }
                    ]}
                    animationStateCallback={stateRef}
                />
            </ContainerW>
            <ContainerW position={dicePosition}>
                <SpineW
                    instanceCallback={(value) => {
                        diceRInstance.current = value;
                    }}
                    spineDataKey="dice_l"
                    skin={{
                        [PORTRAIT]: 'v/1',
                        [LANDSCAPE]: 'h/1_h'
                    }}
                    animations={[
                        { name: 'h/loop2', loop: true }
                    ]}
                    animationStateCallback={stateRef}
                />
                <SpineW
                    instanceCallback={(value) => {
                        diceLInstance.current = value;
                    }}
                    spineDataKey="dice_r"
                    skin={{
                        [PORTRAIT]: 'v/1',
                        [LANDSCAPE]: 'h/1_h'
                    }}
                    animations={[
                        { name: 'h/loop2', loop: true }
                    ]}
                    animationStateCallback={stateRef}
                />
            </ContainerW>
            <ContainerW position={panelPosition} zIndex={2}>
                <SpineW
                    spineDataKey="btn_skull"
                    animations={[
                        { name: 'show', initial: true }
                    ]}
                    props={{
                        [PORTRAIT]: {
                            x: 1
                        },
                        [LANDSCAPE]: {
                            x: 2
                        }
                    }}
                    animationStateCallback={stateRef}
                >
                    <TextW
                        parentSlotName="text_skull_1"
                        text="x2"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.55, 1.5]}
                        keyState="level0"
                        instanceCallback={stateTextSkullStateRef}
                    />
                    <TextW
                        parentSlotName="text_skull_2"
                        text="x4"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.55, 1.5]}
                        keyState="level2"
                        instanceCallback={stateTextSkullStateRef}
                    />
                    <TextW
                        parentSlotName="text_skull_3"
                        text="x7"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.55, 1.5]}
                        keyState="level4"
                        instanceCallback={stateTextSkullStateRef}
                    />
                    <TextW
                        parentSlotName="text_skull_4"
                        text="x13"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.55, 1.5]}
                        keyState="level6"
                        instanceCallback={stateTextSkullStateRef}
                    />
                    <TextW
                        parentSlotName="text_skull_5"
                        text="x30"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.55, 1.5]}
                        keyState="level8"
                        instanceCallback={stateTextSkullStateRef}
                    />
                </SpineW>

                <SpineW
                    spineDataKey="btn_anchor"
                >
                    <ContainerW
                        appProvider={app}
                        parentSlotName="btn_result"
                        scale={[1, -1]}
                    >

                        <SpineW
                            appProvider={app}
                            spineDataKey="btn_result"
                            animations={[
                                {
                                    name: 'show',
                                    groupConfig: KEY_SETTING_GROUP_PANEL_STAVOK,
                                    configName: 'кнопка показать',
                                    initial: true
                                }
                            ]}
                        />

                        <TextW
                            store={useStoreGamesState}
                            storeKey="textInfo"
                            style={new TextStyle(GAME_RESULT_TXT)}
                            anchor={[0.5, 0.55]}
                            isResizeText={0.995}
                        />

                    </ContainerW>

                    <ContainerW
                        appProvider={app}
                        parentSlotName={BUTTON_PLAY.slot}
                        scale={[1, -1]}
                    >

                        <SpineW
                            appProvider={app}
                            spineDataKey={BUTTON_PLAY.spineDataKey}
                            animations={[
                                {
                                    name: 'show',
                                    groupConfig: KEY_SETTING_GROUP_PANEL_STAVOK,
                                    configName: 'кнопка показать',
                                    initial: true
                                }
                            ]}
                            pointerup={{
                                emit: () => clickPlayButton()
                            }}
                            animationStateCallback={stateRef}
                        />

                        <TextW
                            text={translations[BUTTON_PLAY.keyTranslation]}
                            store={useStoreGamesState}
                            storeKey='playButtonText'
                            style={new TextStyle(BUTTON_PLAY.style)}
                            anchor={[0.5, 0.55]}
                            isResizeText={0.995}
                        />

                    </ContainerW>

                    {
                        actionGameButtons.map(button => {
                            return (
                                <ContainerW
                                    appProvider={app}
                                    parentSlotName={button.slot}
                                    props={button.props}
                                >
                                    <SpineW
                                        appProvider={app}
                                        spineDataKey="btn_more"
                                        animations={[
                                            {
                                                name: 'show',
                                                groupConfig: KEY_SETTING_GROUP_PANEL_STAVOK,
                                                configName: 'кнопка показать',
                                                initial: true
                                            },
                                            { name: 'loop4', loop: true }
                                        ]}
                                        keyState={button.key}
                                        animationStateCallback={stateActionGamesButtonRef}
                                        pointerup={{ emit: () => clickActionButton(button.key) }}
                                    >
                                        <TextW
                                            parentSlotName="t8"
                                            text={button.text}
                                            style={new TextStyle(GAME_ACTION_TXT_BUTTON)}
                                            anchor={[0.5, 0.5]}
                                            scale={[1, -1]}
                                        />

                                        <SpineW
                                            spineDataKey="dynamic_light"
                                            appProvider={app}
                                            animations={[
                                                {
                                                    name: 'loop_fire-pulse',
                                                    loop: true
                                                }
                                            ]}
                                            props={{
                                                [PORTRAIT]: {
                                                    x: 14,
                                                    visible: false
                                                },
                                                [LANDSCAPE]: {
                                                    x: -8,
                                                    visible: false
                                                    //  y: 2,
                                                }
                                            }}
                                            keyState={button.key}
                                            instanceCallback={stateActionGamesFireRef}
                                        >
                                        </SpineW>
                                    </SpineW>

                                </ContainerW>
                            );
                        })
                    }
                </SpineW>

            </ContainerW>
        </>
    );
};

export default GameView;
