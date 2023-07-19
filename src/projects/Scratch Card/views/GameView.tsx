import { Graphics, useApp } from '@inlet/react-pixi';
import { gamePortholePosition, panelInfoPosition, panelPosition, winInfoPosition } from 'config/Scratch Card/positions';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { TextStyle } from 'pixi.js';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { TextW } from 'components/Common/wrapper/TextW';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreComputed } from 'features/useComputed';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { GAME_ID } from 'config/Common/settings';
import { GamesPlayMethods } from 'const/Common/GamesPlayMethods';
import { delay } from 'utils/delay';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { GAME_COEFFICIENT_RULES_TXT, GAME_RESULT_TXT, GAME_RULES_TABLE_TXT } from 'const/Scratch Card/textStyles';

const GameView = () => {
    const app = useApp();
    const [configCoefficient, setConfigCoefficient] = useState([]);
    const [gameFieldInstance, setGameFieldInstance] = useState({} as any);
    const [gamePortholeInstance, setGamePortholeInstance] = useState({} as any);

    const accountUpdate = useRef({});
    const gridPlayGameCache = useRef([]);
    const gridPlayGameCacheWin = useRef([]);
    const clickCurrent = useRef(0);
    const { playGame } = useStoreGamesActions;
    const { translations } = useStoreSettingsState.get();

    const informationMap = {
        0: {
            skinName: 'coral',
            coefficient: 'x2',
            slot: 'slot_icon1',
            props: {
                [PORTRAIT]: {
                    x: 50,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 47,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        1: {
            skinName: 'shell_1',
            coefficient: 'x4',
            slot: 'slot_icon2',
            props: {
                [PORTRAIT]: {
                    x: 50,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 47,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        2: {
            skinName: 'shell_2',
            coefficient: 'x6',
            slot: 'slot_icon3',
            props: {
                [PORTRAIT]: {
                    x: 50,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 47,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        3: {
            skinName: 'ancor',
            coefficient: 'x8',
            slot: 'slot_icon4',
            props: {
                [PORTRAIT]: {
                    x: 55,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 47,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        4: {
            skinName: 'sea_star',
            coefficient: 'x10',
            slot: 'slot_icon7',
            props: {
                [PORTRAIT]: {
                    x: 50,
                    y: 2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 38,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        5: {
            skinName: 'dagger',
            coefficient: 'x15',
            slot: 'slot_icon8',
            props: {
                [PORTRAIT]: {
                    x: 50,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 38,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        6: {
            skinName: 'bottle',
            coefficient: 'x20',
            slot: 'slot_icon5',
            props: {
                [PORTRAIT]: {
                    x: 46,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 38,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        7: {
            skinName: 'coin',
            coefficient: 'x30',
            slot: 'slot_icon6',
            props: {
                [PORTRAIT]: {
                    x: 50,
                    y: -2,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 38,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        },
        8: {
            skinName: 'perle',
            coefficient: 'x50',
            slot: 'slot_icon9',
            props: {
                [PORTRAIT]: {
                    x: 50,
                    scale: {
                        x: 1,
                        y: -1
                    }
                },
                [LANDSCAPE]: {
                    x: 38,
                    scale: {
                        x: 1,
                        y: -1
                    }
                }
            }
        }
    };

    const groupIcons = useMemo(() => {
        return configCoefficient.map(item => {
            const itemIcon = informationMap[item.id];
            itemIcon.coefficient = item.multiplier;

            return {
                spineDataKey: 'icons_panel',
                parentSlotName: itemIcon.slot,
                iconsOptions: [
                    {
                        skin: {
                            [PORTRAIT]: itemIcon.skinName,
                            [LANDSCAPE]: itemIcon.skinName
                        },
                        props: {
                            [PORTRAIT]: {
                                x: 0,
                                scale: {
                                    x: 1,
                                    y: -1
                                }
                            },
                            [LANDSCAPE]: {
                                x: 0,
                                scale: {
                                    x: 1,
                                    y: -1
                                }
                            }
                        }
                    },
                    /* {
                        skin: {
                            [PORTRAIT]: item.skinName,
                            [LANDSCAPE]: item.skinName
                        },
                        props: {
                            [PORTRAIT]: {
                                x: 10,
                                scale: {
                                    x: 0.9,
                                    y: -0.9
                                }
                            },
                            [LANDSCAPE]: {}
                        }
                    },
                    {
                        skin: {
                            [PORTRAIT]: item.skinName,
                            [LANDSCAPE]: item.skinName
                        },
                        props: {
                            [PORTRAIT]: {
                                x: 90,
                                scale: {
                                    x: 0.9,
                                    y: -0.9
                                }
                            },
                            [LANDSCAPE]: {}
                        }
                    }, */
                    {
                        text: 'TextW',
                        coefficient: 'x' + itemIcon.coefficient,
                        anchor: [-0.5, 0.5],
                        props: itemIcon.props
                    }
                ]
            };
        });
    }, [configCoefficient]);

    const groupGames = useMemo(() => {
        let row = -1;
        let indexY = -1;
        return [...new Array(9)].map((_, index) => ({
            slot: `slot_icon_seaweed${index + 1}`,
            cellY: (() => {
                if (index % 3 === 0) {
                    indexY = 0;
                    return indexY;
                } else {
                    indexY++;
                    return indexY;
                }
            })(),
            rowX: (() => {
                if (index % 3 === 0) {
                    row++;
                    return row;
                } else {
                    return row;
                }
            })()
        }));
    }, []);

    useEffect(() => {
        const computedStoreSetting = useStoreComputed(useStoreSettingsState, [{ key: 'rules', init: true }],
            ({
                rules = {}
            }) => {
                const { multipliers = [] } = rules as any;

                if (multipliers.length) {
                    setConfigCoefficient(multipliers);
                }
            });

        const computedStore = useStoreComputed(useStoreGamesState, ['isGaming'],
            ({
                isGaming
            }) => {
                onIsGaming(isGaming);
            });

        setTimeout(_ => {
            useStoreGamesState.setKey('textInfo', translations.rules_start);
        });

        global.$emitter.on('Scratch-Card_zIndex_gamePorthole', async ({ zIndex = 1 }) => {
            gamePortholeInstance.zIndex = zIndex;
        });

        return () => {
            computedStoreSetting.cancel();
            computedStore.cancel();
            global.$emitter.off('Scratch-Card_zIndex_gamePorthole');
        };
    }, [gameFieldInstance]);

    const refInstanceGameField = useCallback((state, key) => {
        if (state && !(key in gameFieldInstance)) {
            setGameFieldInstance(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [gameFieldInstance]);

    const refInstanceGamePorthole = useCallback((state, key) => {
        setGamePortholeInstance(state);
    }, [gamePortholeInstance]);

    const startAnimationCircle = async () => {
        for (const key in gameFieldInstance) {
            if (key.includes('circle')) {
                gameFieldInstance[key].visible = true;
            }
        }
    };

    const stopAnimationCircle = () => {
        for (const key in gameFieldInstance) {
            if (key.includes('circle')) {
                gameFieldInstance[key].visible = false;
            }
        }
    };

    const checkAllOpenedCell = () => {
        for (const key in gameFieldInstance) {
            if (!gameFieldInstance[key].$opened) {
                return false;
            }
        }
        return true;
    };

    const refreshAllCellGame = () => {
        for (const key in gameFieldInstance) {
            delete gameFieldInstance[key].$opened;
            if (key.includes('circle')) {
                gameFieldInstance[key].visible = false;
            }
            if (key.includes('icon')) {
                gameFieldInstance[key].skeleton.setSkin(null);
                gameFieldInstance[key].skeleton.setSlotsToSetupPose();
            }

            if (key.includes('seaweed')) {
                gameFieldInstance[key].state.setAnimation(0, 'loop_wiggle', true);
            }
        }
        clickCurrent.current = 0;
    };

    const checkWinCellGame = () => {
        gridPlayGameCacheWin.current.forEach(({ cells = [] }) => {
            if (cells.every(keyItem => {
                return gameFieldInstance[`${keyItem.x}/${keyItem.y}/icon`].$opened;
            })) {
                cells.forEach(keyItem => {
                    gameFieldInstance[`${keyItem.x}/${keyItem.y}/circle`].visible = true;
                });
            }
        });
    };

    const clickCellGameOpen = async (rowX, cellY) => {
        const { isGaming } = useStoreGamesState.get();
        if (!isGaming) {
            return;
        }

        const keyParrent = ['circle', 'icon', 'seaweed'];
        const key = `${rowX}/${cellY}/`;

        const iconSkinName = informationMap[gridPlayGameCache.current[rowX][cellY].id].skinName;
        clickCurrent.current += 1;

        if (clickCurrent.current !== 0) {
            stopAnimationCircle();
        }

        global.$emitter.emit('Scratch-Card_onboarding_next');

        if (keyParrent.every(keyItem => {
            return !gameFieldInstance[key + keyItem].$opened;
        })) {
            gameFieldInstance[key + keyParrent[2]].state.setAnimation(0, 'hide', false);
            gameFieldInstance[key + keyParrent[1]].skeleton.setSkinByName(iconSkinName);
            // gameFieldInstance[key + keyParrent[0]].visible = true;

            gameFieldInstance[key + keyParrent[0]].$opened = true;
            gameFieldInstance[key + keyParrent[1]].$opened = true;
            gameFieldInstance[key + keyParrent[2]].$opened = true;

            if (gridPlayGameCacheWin.current.length) {
                checkWinCellGame();
            }
        }

        if (checkAllOpenedCell()) {
            const { winnings = null } = useStoreGamesState.get();
            const { currency_code: currencyCode } = useStoreUserGetters.getActiveAccount();
            await delay(1000);
            if (winnings) {
                useStorePopupsState.setKey('win', {
                    isShow: true,
                    message: `${translations['popup.you_won']}\n${winnings} ${currencyCode}`
                });
                useStoreUserActions.updateAccount(accountUpdate.current);
                useStoreGamesState.setKey('textInfo', translations.rules_activ_take_win);
                global.$emitter.emit('Scratch-Card_octopus', { isWin: true });
            } else if (winnings != null) {
                useStorePopupsState.setKey('isShowLose', true);
                useStoreGamesState.setKey('textInfo', translations.rules_activ_take_loss);
                global.$emitter.emit('Scratch-Card_octopus', { isWin: false });
            }
            useStoreGamesState.setKey('isGaming', false);
        }
    };

    const onIsGaming = async (isGaming = false) => {
        if (isGaming) {
            refreshAllCellGame();
            const { input } = useStoreGamesState.get();
            const { activeIdAccount } = useStoreUserState.get();

            useStoreGamesActions.changeBalance({ summa: input, minus: true });

            useStoreGamesState.setKey('isGamingAnimation', true);

            try {
                await playGame({
                    account_id: activeIdAccount,
                    game_id: GAME_ID,
                    method: GamesPlayMethods.prepare,
                    sum: parseFloat(input)
                });

                /*
               {
    "multiplier": 6,
    "combinations": [
        {
            "cells": [
                {
                    "x": 0,
                    "y": 2,
                    "id": 2
                },
                {
                    "x": 1,
                    "y": 2,
                    "id": 2
                },
                {
                    "x": 2,
                    "y": 2,
                    "id": 2
                }
            ],
            "multiplier": 6
        }
    ],
    "grid": [
        [
            {
                "x": 0,
                "y": 0,
                "id": 4
            },
            {
                "x": 0,
                "y": 1,
                "id": 4
            },
            {
                "x": 0,
                "y": 2,
                "id": 2
            }
        ],
        [
            {
                "x": 1,
                "y": 0,
                "id": 7
            },
            {
                "x": 1,
                "y": 1,
                "id": 5
            },
            {
                "x": 1,
                "y": 2,
                "id": 2
            }
        ],
        [
            {
                "x": 2,
                "y": 0,
                "id": 0
            },
            {
                "x": 2,
                "y": 1,
                "id": 6
            },
            {
                "x": 2,
                "y": 2,
                "id": 2
            }
        ]
    ]
}
                * */
                const {
                    board: {
                        grid = [],
                        combinations = []
                        //  multiplier = 0
                    },
                    account = {},
                    winnings = 0
                } = await playGame({
                    game_id: GAME_ID,
                    method: GamesPlayMethods.roll
                });
                accountUpdate.current = account;
                useStoreGamesState.setKey('winnings', winnings);
                gridPlayGameCache.current = grid;
                gridPlayGameCacheWin.current = combinations;
                startAnimationCircle();
                useStoreGamesState.setKey('textInfo', translations.rules_activ);
            } catch (e) {
                const { input } = useStoreGamesState.get();
                useStoreGamesActions.changeBalance({ summa: input, plus: true });
                useStoreGamesState.setKey('winnings', null);
                useStoreGamesState.setKey('isGaming', false);
            }
        } else {
            useStoreGamesState.setKey('isGamingAnimation', false);
        }
    };

    const drawCircle = useCallback(g => {
        g.clear();
        g.beginFill(15849029, 0.01);
        g.drawRoundedRect(
            -55,
            -55,
            110,
            110,
            110
        );
        g.endFill();
    }, []);

    return (
        <>
            <SpineW
                position={panelPosition}
                spineDataKey="dynamic_panel_anchor"
            >
                <SpineW
                    appProvider={app}
                    parentSlotName="slot_result-win"
                    spineDataKey="dynamic_result-win_center"
                >
                    <TextW
                        parentSlotName="slot_text"
                        store={useStoreGamesState}
                        storeKey="textInfo"
                        style={new TextStyle(GAME_RESULT_TXT)}
                        anchor={[0.5, 0.5]}
                        scale={[1, 1]}
                        isResizeText={0.995}
                    />
                </SpineW>
            </SpineW>

            <SpineW
                position={winInfoPosition}
                spineDataKey="dynamic_result-win_center"
            >
                <TextW
                    parentSlotName="slot_text"
                    store={useStoreGamesState}
                    storeKey="textInfo"
                    style={new TextStyle(GAME_RESULT_TXT)}
                    anchor={[0.5, 0.5]}
                    scale={[1, -1]}
                    isResizeText={0.995}
                />
            </SpineW>

            <SpineW
                position={panelInfoPosition}
                spineDataKey="panel2_center"
                props={{
                    [PORTRAIT]: {
                        zIndex: 1
                    },
                    [LANDSCAPE]: {
                        zIndex: 1
                    }
                }}
            >
                <TextW
                    text={translations.rules_table}
                    parentSlotName="slot_text"
                    scale={[1, -1]}
                    props={{
                        [PORTRAIT]: {
                            anchor: {
                                x: 0.5,
                                y: 0.5
                            }
                        },
                        [LANDSCAPE]: {
                            anchor: {
                                x: 0.48,
                                y: 0.5
                            }
                        }
                    }}
                    style={new TextStyle(GAME_RULES_TABLE_TXT)}
                />
            </SpineW>

            <SpineW
                position={panelInfoPosition}
                spineDataKey="panel2_anchor_center"
                props={{
                    [PORTRAIT]: {
                        zIndex: 1
                    },
                    [LANDSCAPE]: {
                        zIndex: 1
                    }
                }}
            >
                {groupIcons.map(group => {
                    return (
                        <ContainerW
                            key={group.parentSlotName}
                            appProvider={app}
                            parentSlotName={group.parentSlotName}
                        >
                            {
                                group.iconsOptions.map((item, index) => {
                                    if (item.text === 'TextW') {
                                        return (
                                            <TextW
                                                text={item.coefficient}
                                                style={new TextStyle(GAME_COEFFICIENT_RULES_TXT)}
                                                props={item.props}
                                                anchor={item.anchor}
                                            />
                                        );
                                    }
                                    return (
                                        <SpineW
                                            key={index}
                                            appProvider={app}
                                            spineDataKey={group.spineDataKey}
                                            {...item}
                                            animations={[
                                                { name: 'show', initial: true }
                                            ]}
                                        >
                                        </SpineW>
                                    );
                                })
                            }
                        </ContainerW>
                    );
                })}

            </SpineW>
            <ContainerW
                appProvider={app}
                position={gamePortholePosition}
                instanceCallback={refInstanceGamePorthole}
            >
                <SpineW
                    appProvider={app}
                    spineDataKey="porthole_center"
                />
                <SpineW
                    appProvider={app}
                    spineDataKey="porthole_center_anchar"
                    props={{
                        [PORTRAIT]: {
                            y: 370
                        },
                        [LANDSCAPE]: {
                            y: 380
                        }
                    }}
                >
                    {groupGames.map(item => {
                        return (
                            <ContainerW
                                appProvider={app}
                                parentSlotName={item.slot}
                            >
                                <SpineW
                                    appProvider={app}
                                    spineDataKey="circle_Win"
                                    props={{
                                        [PORTRAIT]: {
                                            visible: false,
                                            x: 2,
                                            y: -2
                                        },
                                        [LANDSCAPE]: {
                                            x: 10,
                                            y: 5,
                                            visible: false
                                        }
                                    }}
                                    scale={[1, -1]}
                                    animations={[
                                        { name: 'rotation', loop: true }
                                    ]}
                                    instanceCallback={(e) => refInstanceGameField(e, `${item.rowX}/${item.cellY}/circle`)}
                                />

                                <SpineW
                                    appProvider={app}
                                    spineDataKey="icons"
                                    skin={{
                                        [PORTRAIT]: null,
                                        [LANDSCAPE]: null
                                    }}
                                    scale={[0.95, -0.95]}
                                    props={{
                                        [PORTRAIT]: {
                                            y: 0
                                        },
                                        [LANDSCAPE]: {
                                            x: 10,
                                            y: 5
                                        }
                                    }}
                                    animations={[
                                        { name: 'show', initial: true }
                                    ]}
                                    instanceCallback={(e) => refInstanceGameField(e, `${item.rowX}/${item.cellY}/icon`)}
                                />

                                <SpineW
                                    appProvider={app}
                                    spineDataKey="seaweed"
                                    props={{
                                        [PORTRAIT]: {
                                            y: 0
                                        },
                                        [LANDSCAPE]: {
                                            x: 10,
                                            y: 5
                                        }
                                    }}
                                    scale={[1, -1]}
                                    animations={[
                                        { name: 'show', initial: true },
                                        { name: 'loop_wiggle', loop: true }
                                    ]}
                                    instanceCallback={(e) => refInstanceGameField(e, `${item.rowX}/${item.cellY}/seaweed`)}
                                />

                                <Graphics
                                    draw={drawCircle}
                                    interactive={true}
                                    pointerup={() => clickCellGameOpen(item.rowX, item.cellY)}
                                />
                            </ContainerW>
                        );
                    })}
                </SpineW>

            </ContainerW>
        </>
    );
};

export default GameView;
