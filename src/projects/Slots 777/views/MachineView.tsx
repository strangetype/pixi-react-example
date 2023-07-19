import { useCallback, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { SLOTS_MAP } from 'config/Slots 777/games';
import { applyOrientation } from 'utils/applyOrientation';
import { useStoreComputed } from 'features/useComputed';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { GAME_ID } from 'config/Common/settings';
import { logoPosition, machinePosition } from 'config/Slots 777/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { GamesPlayMethods } from 'const/Common/GamesPlayMethods';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { useStoreGamesState } from 'store/Slots 777/games/store_F';
import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { fractionDigits } from 'utils/fractionDigits';

const MachineView = () => {
    // eslint-disable-next-line no-unused-vars
    const { isResize } = useStore(useStoreSettingsState);
    const [animationSlotMachine, setAnimationSlotMachine] = useState({
        slotMachine: null,
        lever: null,
        slotOne: null,
        slotTwo: null,
        slotThree: null
    });
    const { playGame } = useStoreGamesActions;
    const { translations } = useStoreSettingsState.get();
    let accountUpdate = {};
    useEffect(() => {
        const {
            board: { line = [] }
        } = useStoreGamesState.get();
        const { isGamingAnimation } = useStoreGamesState.get();
        if (line.length !== 0 && !isGamingAnimation) {
            onLine(line, true, 1000);
        }
        if (line.length !== 0 && isGamingAnimation) {
            onLine(line, true, 2);
        }
    }, [isResize]);

    const onLine = async (
        line = [],
        init: boolean = false,
        speed: number = 2
    ) => {
        const keySlots = ['slotOne', 'slotTwo', 'slotThree'];
        const allSlots = [];
        line.forEach((completeIndex, index) => {
            const prefix = SLOTS_MAP[completeIndex - 1 < 0 ? 9 : completeIndex - 1];
            animationSlotMachine[keySlots[index]].timeScale = speed;
            allSlots.push(
                animationSlotMachine[keySlots[index]].setAnimation(
                    0,
                    prefix + '/show' + (prefix === '10' ? '0' : prefix),
                    false,
                    {
                        groupConfig: 'автомат',
                        configName: 'слот кручение ' + index,
                        timeout: init ? null : index * 300
                    }
                )
            );
        });
        await Promise.all(allSlots);
        !init && useStoreGamesState.setKey('isGaming', false);
    };

    const onIsGaming = async (isGaming = false) => {
        if (isGaming) {
            const { input, prevLine } = useStoreGamesState.get();
            const { activeIdAccount } = useStoreUserState.get();

            useStoreGamesActions.changeBalance({ summa: input, minus: true });

            useStoreGamesState.setKey('isGamingAnimation', true);
            // animationSlotMachine.slotMachine.clearTracks();

            if (animationSlotMachine.lever) {
                animationSlotMachine.lever.setAnimation(0, 'loop2', false, {
                    groupConfig: 'автомат',
                    configName: 'рычаг: нажать'
                });
                animationSlotMachine.lever.timeScale = 0.5;
            }

            const keySlots = ['slotOne', 'slotTwo', 'slotThree'];

            keySlots.forEach((key: string) => {
                [...new Array(3)].forEach((_, index) => {
                    animationSlotMachine[key].setAnimation(
                        0,
                        prevLine[index] + '/loop' + prevLine[index],
                        true,
                        {
                            groupConfig: 'автомат',
                            configName: 'слот кручение ' + index
                        }
                    );
                    animationSlotMachine[key].timeScale = 2;
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
                    board,
                    board: { line = [] },
                    account = {},
                    winnings = 0
                } = await playGame({
                    game_id: GAME_ID,
                    method: GamesPlayMethods.roll
                });

                useStoreGamesState.setKey('prevSessionId', line);
                useStoreGamesState.setKey('board', board);

                await onLine(line);

                useStoreGamesState.setKey('winnings', winnings);
                accountUpdate = {
                    ...account
                };
            } catch (e) {
                const { input } = useStoreGamesState.get();
                useStoreGamesActions.changeBalance({ summa: input, plus: true });
                onLine([7, 7, 7]);
                useStoreGamesState.setKey('winnings', null);
                useStoreGamesState.setKey('isGaming', false);
            }
        } else {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });

            animationSlotMachine.slotMachine.setAnimation(0, 'loop', true, {
                groupConfig: 'автомат',
                configName: 'машина: анимация'
            });

            const { winnings = null } = useStoreGamesState.get();
            const { currency_code: currencyCode } =
        useStoreUserGetters.getActiveAccount();
            if (winnings) {
                useStorePopupsState.setKey('win', {
                    isShow: true,
                    message: `${translations['popup.you_won']}\n${fractionDigits(
                        winnings,
                        2,
                        2
                    )} ${currencyCode}`
                });
                useStoreUserActions.updateAccount(accountUpdate);
            } else if (winnings != null) {
                useStorePopupsState.setKey('isShowLose', true);
            }

            winnings != null &&
        useStoreGamesState.setKey(
            'textInfo',
            `${translations.your_win} ${fractionDigits(
                winnings,
                2,
                2
            )} ${currencyCode}`
        );
            useStoreGamesState.setKey('isGamingAnimation', false);
        }
    };

    useEffect(() => {
        const computedStore = useStoreComputed(
            useStoreGamesState,
            ['isGaming'],
            ({ isGaming }) => {
                onIsGaming(isGaming);
            }
        );

        return () => {
            computedStore.cancel();
        };
    }, []);

    const refAnimationState = useCallback(
        ({ state, name }) => {
            if (state) {
                animationSlotMachine[name] = state;
                setAnimationSlotMachine(animationSlotMachine);
            }
        },
        [animationSlotMachine]
    );

    return (
        <>
            {
                <ContainerW position={machinePosition}>
                    <SpineW
                        props={logoPosition}
                        spineDataKey="logo"
                        scale={[1, 1]}
                        skin={{
                            [PORTRAIT]: 'h',
                            [LANDSCAPE]: 'v'
                        }}
                        animations={[
                            {
                                name: 'show',
                                groupConfig: 'автомат',
                                configName: 'показать',
                                initial: true
                            },
                            {
                                name: 'loop1',
                                groupConfig: 'автомат',
                                configName: 'пост анимация',
                                loop: true
                            }
                        ]}
                    />
                    <SpineW
                        spineDataKey="game_machine"
                        scale={[1, 1]}
                        animations={[
                            {
                                name: 'show',
                                groupConfig: 'автомат',
                                configName: 'показать',
                                initial: true
                            },
                            {
                                name: 'loop',
                                groupConfig: 'автомат',
                                configName: 'пост анимация',
                                loop: true
                            }
                        ]}
                        animationStateCallback={(state) =>
                            refAnimationState({ state, name: 'slotMachine' })
                        }
                    />
                    <SpineW
                        spineDataKey="slot_roll1"
                        animations={[
                            {
                                name: SLOTS_MAP[6] + '/hide' + SLOTS_MAP[6],
                                groupConfig: 'автомат',
                                configName: 'слот показать',
                                initial: true
                            }
                        ]}
                        animationStateCallback={(state) =>
                            refAnimationState({ state, name: 'slotOne' })
                        }
                    />
                    <SpineW
                        spineDataKey="slot_roll2"
                        animations={[
                            {
                                name: SLOTS_MAP[6] + '/hide' + SLOTS_MAP[6],
                                groupConfig: 'автомат',
                                configName: 'слот показать',
                                initial: true
                            }
                        ]}
                        animationStateCallback={(state) =>
                            refAnimationState({ state, name: 'slotTwo' })
                        }
                    />
                    <SpineW
                        spineDataKey="slot_roll3"
                        animations={[
                            {
                                name: SLOTS_MAP[6] + '/hide' + SLOTS_MAP[6],
                                groupConfig: 'автомат',
                                configName: 'слот показать',
                                initial: true
                            }
                        ]}
                        animationStateCallback={(state) =>
                            refAnimationState({ state, name: 'slotThree' })
                        }
                    />
                    {applyOrientation() === LANDSCAPE && !isResize && (
                        <SpineW
                            spineDataKey="lever"
                            skin={{
                                [PORTRAIT]: null,
                                [LANDSCAPE]: null
                            }}
                            props={{
                                [PORTRAIT]: {
                                    x: 0,
                                    y: -0
                                },
                                [LANDSCAPE]: {
                                    x: 0,
                                    y: -0
                                }
                            }}
                            animations={[
                                { name: 'show', configName: 'рычаг: показать', initial: true },
                                {
                                    name: 'loop1',
                                    configName: 'рычаг: пост анимация',
                                    loop: true
                                }
                            ]}
                            animationStateCallback={(state) =>
                                refAnimationState({ state, name: 'lever' })
                            }
                        />
                    )}
                </ContainerW>
            }
        </>
    );
};

export default MachineView;
