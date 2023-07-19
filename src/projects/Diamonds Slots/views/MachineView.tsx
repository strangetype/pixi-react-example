import { AppProvider, useApp } from '@inlet/react-pixi';
import { useCallback, useEffect, useState } from 'react';
import { TextStyle } from 'pixi.js';
import { RULES_SLOTS_MAP, SLOTS_MAP } from 'config/Diamonds Slots/games';
import { TXT_MAX_WIN_STYLE, TXT_RULE_MUL_STYLE } from 'const/Diamonds Slots/textStyles';
import { useStoreComputed } from 'features/useComputed';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { TextW } from 'components/Common/wrapper/TextW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { GAME_ID } from 'config/Common/settings';
import { machinePosition } from 'config/Diamonds Slots/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { GamesPlayMethods } from 'const/Common/GamesPlayMethods';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { fractionDigits } from 'utils/fractionDigits';

const ICONS_SCALE_X: number = 1;
const ICONS_SCALE: number = 2.5;
const ICONS_Y: number = -150 * ICONS_SCALE;
const ICONS_DIS_X_H: number = 8;
const ICONS_DIS_X_V: number = -4;

const MachineView = () => {
    const app = useApp();
    const [rulesDataX, setRulesDataX] = useState({});
    const [animationSlotMachine, setAnimationSlotMachine] = useState({
        slotMachine: null
    });
    const { playGame } = useStoreGamesActions;
    const { translations } = useStoreSettingsState.get();
    let accountUpdate = {};

    const onLine = async (line = []) => {
        const keySlots = [
            'slotOne',
            'slotTwo',
            'slotThree'
        ];

        line.forEach((completeIndex, index) => {
            animationSlotMachine[keySlots[index]].setAnimation(0, SLOTS_MAP[completeIndex] + '/hide', false,
                { groupConfig: 'автомат', configName: 'слот кручение ' + index, timeout: index * 300 });
        });

        useStoreGamesState.setKey('isGaming', false);
    };

    const onIsGaming = async (isGaming = false) => {
        if (isGaming) {
            const { input } = useStoreGamesState.get();
            const { activeIdAccount } = useStoreUserState.get();

            useStoreGamesActions.changeBalance({ summa: input, minus: true });

            useStoreGamesState.setKey('isGamingAnimation', true);
            animationSlotMachine.slotMachine.clearTracks();
            await Promise.all([
                animationSlotMachine.slotMachine.setAnimation(0, 'show1', false, {
                    groupConfig: 'автомат',
                    configName: 'рычаг: нажать'
                }),
                animationSlotMachine.slotMachine.addAnimation(0, 'loop4', true, 0, {
                    groupConfig: 'автомат',
                    configName: 'рычаг: нажать'
                })
            ]);

            const keySlots = [
                'slotOne',
                'slotTwo',
                'slotThree'
            ];
            keySlots.forEach((key: string) => {
                [...new Array(3)].forEach((_, index) => {
                    animationSlotMachine[key].setAnimation(0, 'loop', true, {
                        groupConfig: 'автомат',
                        configName: 'слот кручение ' + index
                    });
                    animationSlotMachine[key].timeScale = ((3 + index) / 5) * useStoreGameGetters.getSettingsAnimation({
                        groupConfig: 'автомат',
                        configName: 'слот кручение ' + index
                    });
                });
            });
            try {
                await playGame({
                    account_id: activeIdAccount,
                    game_id: GAME_ID,
                    method: GamesPlayMethods.prepare,
                    sum: parseFloat(input)
                });
                const {
                    board: {
                        line = []
                    },
                    account = {},
                    winnings = 0
                } = await playGame({
                    game_id: GAME_ID,
                    method: GamesPlayMethods.roll
                });
                useStoreGamesState.setKey('winnings', winnings);
                onLine(line);
                accountUpdate = {
                    ...account
                };
            } catch (e) {
                console.error(e);
                const { input } = useStoreGamesState.get();
                useStoreGamesActions.changeBalance({ summa: input, plus: true });
                onLine([7, 7, 7]);
                useStoreGamesState.setKey('winnings', null);
                useStoreGamesState.setKey('isGaming', false);
            }
        } else {
            await animationSlotMachine.slotMachine.setAnimation(0, 'loop2', false, {
                groupConfig: 'автомат',
                configName: 'машина: молния'
            });
            await animationSlotMachine.slotMachine.setAnimation(0, 'show2', false, {
                groupConfig: 'автомат',
                configName: 'рычаг: отжать'
            });

            animationSlotMachine.slotMachine.setAnimation(0, 'loop1', false, {
                groupConfig: 'автомат',
                configName: 'рычаг: отжать'
            });

            const { winnings = null } = useStoreGamesState.get();
            const { currency_code: currencyCode } = useStoreUserGetters.getActiveAccount();
            if (winnings) {
                useStorePopupsState.setKey('win', {
                    isShow: true,
                    message: `${translations['popup.you_won']}\n${fractionDigits(winnings, 2, 2)} ${currencyCode}`
                });
                useStoreUserActions.updateAccount(accountUpdate);
            } else if (winnings != null) {
                useStorePopupsState.setKey('isShowLose', true);
            }

            winnings != null && useStoreGamesState.setKey('textInfo', `${translations.your_win} ${fractionDigits(winnings, 2, 2)} ${currencyCode}`);
            useStoreGamesState.setKey('isGamingAnimation', false);
        }
    };

    useEffect(() => {
        const computedStore = useStoreComputed(useStoreGamesState, ['isGaming'],
            ({
                stepKey,
                isGaming,
                line
            }) => {
                onIsGaming(isGaming);
            });

        const computedStoreSetting = useStoreComputed(useStoreSettingsState, [{ key: 'rules', init: true }],
            ({
                rules = []
            }) => {
                const _rulesData = {};
                if (rules.length) {
                    rules.forEach((item, index) => {
                        _rulesData[index] = {
                            text: 'x' + item.multiplier.toString(),
                            visible: {},
                            animations: []
                        };
                        item.symbols.forEach((element, jIndex) => {
                            if (element) {
                                _rulesData[index].visible[jIndex] = true;
                                _rulesData[index].animations = [
                                    { name: SLOTS_MAP[parseFloat(element)] + '/show', initial: true, delay: 300 * index },
                                    { name: SLOTS_MAP[parseFloat(element)] + '/loop', loop: true, delay: 300 * index }
                                ];
                            }
                        });
                    });
                }
                setRulesDataX(_rulesData);
            });

        return () => {
            computedStore.cancel();
            computedStoreSetting.cancel();
        };
    }, []);

    const refAnimationState = useCallback(({ state, name }) => {
        if (state) {
            animationSlotMachine[name] = state;
            setAnimationSlotMachine(animationSlotMachine);
        }
    }, [animationSlotMachine]);

    return (
        <>
            <ContainerW position={machinePosition}>
                <SpineW
                    spineDataKey="cart"
                    animations={[
                        { name: 'loop1', initial: true, groupConfig: 'автомат', configName: 'тележка: пост анимация' }
                    ]}
                />
                <SpineW
                    spineDataKey="light"
                    animations={[
                        { name: 'loop1', loop: true, groupConfig: 'автомат', configName: 'свет: качание' },
                        { name: 'loop2', loop: true, groupConfig: 'автомат', configName: 'свет: качание' },
                        { name: 'loop3', loop: true, groupConfig: 'автомат', configName: 'свет: качание' }
                    ]}
                />
                <SpineW
                    spineDataKey="table"
                    props={{
                        [PORTRAIT]: {
                            scale: { x: 1, y: 1 }
                        },
                        [LANDSCAPE]: {
                            scale: { x: 1, y: 1 }
                        }
                    }}
                    animations={[
                        { name: 'loop', groupConfig: 'автомат', configName: 'пост анимация', loop: true, initial: true }
                    ]}
                >
                    {RULES_SLOTS_MAP.map((slot, i) => {
                        return (
                            // @ts-ignore
                            <ContainerW
                                key={slot}
                                appProvider={app}
                                parentSlotName={slot}
                                props={{
                                    [PORTRAIT]: {
                                        x: (i < 8 ? -1 : 1) * 67
                                    },
                                    [LANDSCAPE]: {
                                        x: (i < 8 ? -1 : 1) * 40
                                    }
                                }}
                                scale={[-1, i < 8 ? 1 : -1]}
                            >
                                <ContainerW
                                    appProvider={app}
                                    props={{
                                        [PORTRAIT]: {
                                            x: (i < 8 ? -1 : 1) * (22 - ICONS_DIS_X_V),
                                            y: i === 1 ? -8 : 0
                                        },
                                        [LANDSCAPE]: {
                                            x: (i < 8 ? -1 : 1) * -2
                                        }
                                    }}
                                >
                                    <TextW
                                        style={new TextStyle(TXT_RULE_MUL_STYLE)}
                                        text={rulesDataX[i]?.text ?? ''}
                                        anchor={[(i < 8 ? 1 : 0), 0.5]}
                                    />
                                </ContainerW>
                                <AppProvider value={app}>
                                    <ContainerW
                                        props={{
                                            [PORTRAIT]: {
                                                x: i < 8 ? 34 + ICONS_DIS_X_V : -110 + ICONS_DIS_X_V,
                                                y: i === 1 ? ICONS_Y - 6 : ICONS_Y
                                            },
                                            [LANDSCAPE]: {
                                                x: i < 8 ? 46 + ICONS_DIS_X_H : -134 + ICONS_DIS_X_H - 26,
                                                y: ICONS_Y
                                            }
                                        }}
                                        scale={ICONS_SCALE}
                                        visible={rulesDataX[i]?.visible[0] ?? false}
                                    >
                                        <SpineW
                                            spineDataKey="icon"
                                            skin={{
                                                [PORTRAIT]: null,
                                                [LANDSCAPE]: null
                                            }}
                                            animations={rulesDataX[i]?.animations ?? []}
                                        />
                                    </ContainerW>
                                    <ContainerW
                                        props={{
                                            [PORTRAIT]: {
                                                x: i < 8 ? 89 + ICONS_DIS_X_V : -57 + ICONS_DIS_X_V,
                                                y: i === 1 ? ICONS_Y - 6 : ICONS_Y
                                            },
                                            [LANDSCAPE]: {
                                                x: i < 8 ? 101 + ICONS_DIS_X_H : -79 + ICONS_DIS_X_H - 24,
                                                y: ICONS_Y
                                            }
                                        }}
                                        scale={ICONS_SCALE}
                                        visible={rulesDataX[i]?.visible[1] ?? false}
                                    >
                                        <SpineW
                                            spineDataKey="icon"
                                            skin={{
                                                [PORTRAIT]: null,
                                                [LANDSCAPE]: null
                                            }}
                                            animations={rulesDataX[i]?.animations ?? []}
                                        />
                                    </ContainerW>
                                    <ContainerW
                                        props={{
                                            [PORTRAIT]: {
                                                x: i < 8 ? 144 + ICONS_DIS_X_V : -2 + ICONS_DIS_X_V,
                                                y: i === 1 ? ICONS_Y - 6 : ICONS_Y
                                            },
                                            [LANDSCAPE]: {
                                                x: i < 8 ? 164 + ICONS_DIS_X_H : -24 + ICONS_DIS_X_H - 16,
                                                y: ICONS_Y
                                            }
                                        }}
                                        scale={ICONS_SCALE}
                                        visible={rulesDataX[i]?.visible[2] ?? false}
                                    >
                                        <SpineW
                                            spineDataKey="icon"
                                            skin={{
                                                [PORTRAIT]: null,
                                                [LANDSCAPE]: null
                                            }}
                                            animations={rulesDataX[i]?.animations ?? []}
                                        />
                                    </ContainerW>
                                </AppProvider>
                            </ContainerW>
                        );
                    })
                    }
                </SpineW>
                <SpineW
                    spineDataKey="slot_machine"
                    animations={[
                        { name: 'show2', groupConfig: 'автомат', configName: 'показать', initial: true },
                        { name: 'loop1', groupConfig: 'автомат', configName: 'пост анимация', loop: true }
                    ]}
                    animationStateCallback={(state) => refAnimationState({ state, name: 'slotMachine' })}
                >
                    {
                        // @ts-ignore
                        <TextW
                            parentSlotName="slot_panel"
                            style={new TextStyle(TXT_MAX_WIN_STYLE)}
                            storeKey="textInfo"
                            store={useStoreGamesState}
                            resolution={1}
                            rotation={0}
                            scale={[1, -1]}
                            y={-15}
                            anchor={0.5}
                        />
                    }
                </SpineW>
                <SpineW
                    spineDataKey="logo"
                    animations={[
                        { name: 'show1', groupConfig: 'автомат', configName: 'лого: показать', initial: true },
                        { name: 'loop2', groupConfig: 'автомат', configName: 'лого: пост анимация', loop: true }
                    ]}
                />
                <SpineW
                    props={{
                        [PORTRAIT]: {
                            x: -140,
                            y: -395
                        },
                        [LANDSCAPE]: {
                            x: -116,
                            y: -172
                        }
                    }}
                    spineDataKey="slot"
                    animations={[
                        {
                            name: SLOTS_MAP[7] + '/hide',
                            groupConfig: 'автомат',
                            configName: 'слот показать',
                            initial: true
                        }
                    ]}
                    animationStateCallback={(state) => refAnimationState({ state, name: 'slotOne' })}
                />
                <SpineW
                    spineDataKey="slot"
                    props={{
                        [PORTRAIT]: {
                            x: -0,
                            y: -395
                        },
                        [LANDSCAPE]: {
                            x: -4,
                            y: -172
                        }
                    }}
                    animations={[
                        {
                            name: SLOTS_MAP[7] + '/hide',
                            groupConfig: 'автомат',
                            configName: 'слот показать',
                            initial: true
                        }
                    ]}
                    animationStateCallback={(state) => refAnimationState({ state, name: 'slotTwo' })}
                />
                <SpineW
                    spineDataKey="slot"
                    props={{
                        [PORTRAIT]: {
                            x: 141,
                            y: -395
                        },
                        [LANDSCAPE]: {
                            x: 110,
                            y: -172
                        }
                    }}
                    animations={[
                        {
                            name: SLOTS_MAP[7] + '/hide',
                            groupConfig: 'автомат',
                            configName: 'слот показать',
                            initial: true
                        }
                    ]}
                    animationStateCallback={(state) => refAnimationState({ state, name: 'slotThree' })}
                />
            </ContainerW>
        </>
    );
};

export default MachineView;
