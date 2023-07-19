import { TextStyle } from 'pixi.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { TextW } from 'components/Common/wrapper/TextW';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import storage from 'utils/storage';
import { panelPosition, skipPosition } from 'config/Hot Dice/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreComputed } from 'features/useComputed';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { GAME_SKULL_TXT, ONBOARDING_BUTTON_SKIP, ONBOARDING_TEXT_INFO } from 'const/Hot Dice/textStyles';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { KEY_SETTING_GROUP_ONBOARDING } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { iphonePositionSafeArea } from 'utils/iphonePositionSafeArea';
import { useApp } from '@inlet/react-pixi';
import { GamesPlayButtons } from 'projects/Hot Dice/views/enum/GamesPlayButtons';

export const OnboardingView = () => {
    const app = useApp();
    const { translations, limits } = useStoreSettingsState.get();
    const { currency_code } = useStoreUserGetters.getActiveAccount();
    const diceStatus = useRef([]);
    const step = useRef(0);
    const isWin = useRef(null);

    const containerOnboarding = useRef(null);
    const [dice, setDice] = useState({} as any);
    const [isShowOnboarding, setIsShowOnboarding] = useState(true);
    const [stateAnimationOnboarding, setStateAnimationOnboarding] = useState({} as any);

    const textList = [
        {
            slot: 'slot_text_part1_step1',
            text: translations['onboarding.part1_step1'].replace('$2', '\n' + limits.min_bet + ' ' + currency_code),
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.6
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.5,
                        y: 0.6
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                }
            }
        },
        {
            slot: 'slot_text_part1_step2',
            text: translations['onboarding.part1_step2'],
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.6
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.7,
                        y: 0.5
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                }
            }
        },
        {
            slot: 'slot_text_part1_step3',
            text: translations['onboarding.part1_step3'],
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.6
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 120
                    }
                }
            }
        },
        {
            slot: 'slot_text_part1_step4',
            text: translations['onboarding.part1_step4'],
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.6
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 190
                    }
                }
            }
        },
        {
            slot: 'slot_text_part1_step5',
            text: translations['onboarding.part1_step5'],
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.6
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                }
            }
        },
        {
            slot: 'slot_text_part1_step6',
            text: translations['onboarding.part1_step6'],
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.6
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                }
            }
        },
        {
            slot: 'slot_text_part3_step2',
            text: translations['onboarding.part3_step2'],
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.3
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                }
            }
        },
        {
            slot: 'slot_text_part2_step2',
            text: translations['onboarding.part2_step2'],
            props: {
                [PORTRAIT]: {
                    anchor: {
                        x: 0.5,
                        y: 0.3
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                },
                [LANDSCAPE]: {
                    anchor: {
                        x: 0.5,
                        y: 0.5
                    },
                    style: {
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 100
                    }
                }
            }
        }
    ];

    const mapSteps = {
        commonSteps: [
            {
                animationName: 'part1/step1',
                step: 1
            },
            {
                animationName: 'part1/step2',
                step: 2
            }
        ],
        userNoStake: [
            {
                animationName: 'part1/step3',
                step: 3
            },
            {
                animationName: 'part1/step4',
                step: 4,
                action: () => {
                    if (diceStatus.current.length === 2) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[0]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[1]}`);
                    } else if (diceStatus.current.length) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[2]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[3]}`);
                    } else {
                        global.$emitter.emit('HotDice_gameTableResult', {
                            steps: [1, 3]
                        });
                    }

                    global.$emitter.emit('HotDice_zIndex', 11);
                }
            },
            {
                animationName: 'part3/step2',
                step: 5,
                action: () => {
                    if (diceStatus.current.length === 2) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[0]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[1]}`);
                    } else if (diceStatus.current.length) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[2]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[3]}`);
                    } else {
                        global.$emitter.emit('HotDice_gameTableResultChoice', {
                            choice: GamesPlayButtons.greater
                        });
                        dice.dice1.skeleton.setSkinByName('v/2');
                        dice.dice2.skeleton.setSkinByName('v/6');

                        global.$emitter.emit('HotDice_gameTableResult', {
                            steps: [1, 3, 2, 6]
                        });
                    }

                    global.$emitter.emit('HotDice_zIndex', 11);
                }
            },
            {
                animationName: 'part1/step6',
                step: 6,
                action: () => {
                    global.$emitter.emit('HotDice_zIndex', 1);
                }
            },
            {
                animationName: 'part1/step5',
                step: 7,
                action: () => {
                    if (diceStatus.current.length === 2) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[0]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[1]}`);
                    } else if (diceStatus.current.length) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[2]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[3]}`);
                    }

                    global.$emitter.emit('HotDice_zIndex', 11);
                }
            }
        ],
        userMoneyGame: [
            {
                animationName: 'part1/step4',
                step: 3,
                action: () => {
                    if (diceStatus.current.length === 2) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[0]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[1]}`);
                    } else if (diceStatus.current.length) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[2]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[3]}`);
                    }

                    global.$emitter.emit('HotDice_zIndex', 11);
                }
            }
        ],
        userStakeWin: [
            {
                animationName: 'part3/step2',
                step: 4,
                action: () => {
                    if (diceStatus.current.length === 2) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[0]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[1]}`);
                    } else if (diceStatus.current.length) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[2]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[3]}`);
                    }

                    global.$emitter.emit('HotDice_zIndex', 11);
                }
            }
        ],
        userStakeLoose: [
            {
                animationName: 'part2/step2',
                step: 4,
                action: () => {
                    if (diceStatus.current.length === 2) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[0]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[1]}`);
                    } else if (diceStatus.current.length) {
                        dice.dice1.skeleton.setSkinByName(`v/${diceStatus.current[2]}`);
                        dice.dice2.skeleton.setSkinByName(`v/${diceStatus.current[3]}`);
                    }

                    global.$emitter.emit('HotDice_zIndex', 11);
                }
            }
        ],
        userStakeNext: [
            {
                animationName: 'part3/step2',
                step: 4,
                action: () => {
                    global.$emitter.emit('HotDice_zIndex', 11);
                }
            }
        ],
        clear: function () {
            this.userNoStake = [];
            this.userMoneyGame = [];
            this.userStakeWin = [];
            this.userStakeLoose = [];
            this.userStakeNext = [];
        },
        status: null
    };

    const closedOnboarding = (clearTable = false) => {
        clearTable && global.$emitter.emit('HotDice_gameTableResult', {
            clear: true
        });

        mapSteps.commonSteps = [];
        storage.set('onboarding', true);
        useStorePopupsState.setKey('isShowOnboarding', false);
        setIsShowOnboarding(false);
    };

    const showAnimation = () => {
        // @ts-ignore
        mapSteps.commonSteps[step.current].action && mapSteps.commonSteps[step.current].action();

        stateAnimationOnboarding.setAnimation(0, mapSteps.commonSteps[step.current].animationName, true, {
            configName: 'появления шаги',
            groupConfig: KEY_SETTING_GROUP_ONBOARDING
        });
    };

    const clickNext = async (next = false) => {
        console.log('isShowOnboarding', isShowOnboarding);
        if (!isShowOnboarding || !mapSteps.commonSteps.length) {
            return;
        }
        console.log('next', next);
        step.current++;

        if (mapSteps.commonSteps[step.current]) {
            showAnimation();
        } else if (isWin.current == null && mapSteps.userNoStake.length) {
            console.log('userNoStake');
            mapSteps.commonSteps = [...mapSteps.commonSteps, ...mapSteps.userNoStake];
            mapSteps.clear();
            mapSteps.status = 'userNoStake';
            showAnimation();
        } else if (isWin.current != null && !next && mapSteps.userMoneyGame.length) {
            console.log('userMoneyGame');
            mapSteps.commonSteps = [...mapSteps.commonSteps, ...mapSteps.userMoneyGame];
            mapSteps.userMoneyGame = [];
            showAnimation();
        } else if (isWin.current === true && !next && mapSteps.userStakeWin.length) {
            console.log('userStakeWin');
            mapSteps.commonSteps = [...mapSteps.commonSteps, ...mapSteps.userStakeWin];
            mapSteps.clear();
            showAnimation();
        } else if (isWin.current === false && !next && mapSteps.userStakeLoose.length) {
            console.log('userStakeLoose');
            mapSteps.commonSteps = [...mapSteps.commonSteps, ...mapSteps.userStakeLoose];
            mapSteps.clear();
            showAnimation();
        } else if (isWin.current != null && next && mapSteps.userStakeNext.length) {
            console.log('userStakeNext');
            mapSteps.commonSteps = [...mapSteps.commonSteps, ...mapSteps.userStakeNext];
            mapSteps.clear();
            showAnimation();
        } else {
            console.log('closedOnboarding');
            closedOnboarding(mapSteps.status != null);
        }
    };

    useEffect(() => {
        const computedStoreGame = useStoreComputed(useStoreGamesState, ['input'], ({ input }) => {
            const { isKeyBoard } = useStorePopupsState.get();
            if (step.current === 0 && (!isKeyBoard && input >= limits.min_bet && input <= limits.max_bet)) {
                clickNext();
            }
        });

        global.$emitter.on('HotDice_onboarding', async ({ action = null, steps = [], isWin: win = false, closed = false } = {}) => {
            if (!isShowOnboarding) {
                return;
            }
            if (closed) {
                closedOnboarding();
                return;
            }

            console.log({ action, steps, win });
            console.log(step.current);

            isWin.current = win;

            switch (action) {
            case 'hide':
                containerOnboarding.current.visible = false;
                break;
            case 'show':
                diceStatus.current = steps;

                dice.dice1.scale.set(10);
                dice.dice2.scale.set(10);

                clickNext();

                containerOnboarding.current.visible = true;
                break;
            }
        });

        return () => {
            global.$emitter.off('HotDice_onboarding');
            computedStoreGame.cancel();
        };
    }, [stateAnimationOnboarding, dice, isShowOnboarding]);

    const stateRef = useCallback((state) => {
        setStateAnimationOnboarding(state);
    }, [stateAnimationOnboarding]);

    const stateDiceRef = useCallback((state, key) => {
        if (state && !(key in dice)) {
            setDice(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [dice]);

    const stateContainer = useCallback((state) => {
        if (state) {
            containerOnboarding.current = state;
        }
    }, []);

    return (
        isShowOnboarding &&
        <>
            <ContainerW
                props={{
                    [PORTRAIT]: {
                        zIndex: 10
                    },
                    [LANDSCAPE]: {
                        zIndex: 10
                    }
                }}
                instanceCallback={stateContainer}
            >
                <SpineW
                    position={panelPosition}
                    spineDataKey="dynamic_onboarding"
                    animations={[
                        {
                            name: 'part1/show',
                            initial: true,
                            configName: 'появления',
                            groupConfig: KEY_SETTING_GROUP_ONBOARDING
                        },
                        {
                            name: 'part1/step1',
                            loop: true,
                            configName: 'появления шаги',
                            groupConfig: KEY_SETTING_GROUP_ONBOARDING
                        }
                    ]}
                    animationStateCallback={stateRef}
                    pointerup={{
                        emit: () => clickNext(true),
                        slot: 'fade'
                    }}
                >
                    <TextW
                        parentSlotName="slot_text20"
                        text="x2"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                    />
                    <TextW
                        parentSlotName="slot_text21"
                        text="x4"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                    />
                    <TextW
                        parentSlotName="slot_text22"
                        text="x7"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                    />
                    <TextW
                        parentSlotName="slot_text23"
                        text="x13"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                    />
                    <TextW
                        parentSlotName="slot_text24"
                        text="x30"
                        style={new TextStyle(GAME_SKULL_TXT)}
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                    />

                    <SpineW
                        skin={{
                            [PORTRAIT]: 'v/1',
                            [LANDSCAPE]: 'v/1'
                        }}
                        props={{
                            [PORTRAIT]: {
                                y: 0,
                                scale: {
                                    x: 10,
                                    y: 10
                                }
                            },
                            [LANDSCAPE]: {
                                y: 0,
                                scale: {
                                    x: 10,
                                    y: 10
                                }
                            }
                        }}
                        appProvider={app}
                        parentSlotName="slot_dice_result_big1"
                        spineDataKey="dice_result"
                        instanceCallback={(state) => stateDiceRef(state, 'dice1')}
                    />
                    <SpineW
                        skin={{
                            [PORTRAIT]: 'v/3',
                            [LANDSCAPE]: 'v/3'
                        }}
                        props={{
                            [PORTRAIT]: {
                                y: 0,
                                scale: {
                                    x: 10,
                                    y: 10
                                }
                            },
                            [LANDSCAPE]: {
                                y: 0,
                                scale: {
                                    x: 10,
                                    y: 10
                                }
                            }
                        }}
                        appProvider={app}
                        parentSlotName="slot_dice_result_big2"
                        spineDataKey="dice_result"
                        instanceCallback={(state) => stateDiceRef(state, 'dice2')}
                    />
                    {textList.map((item) => {
                        return (
                            <TextW
                                key={item.slot}
                                parentSlotName={item.slot}
                                text={item.text}
                                style={new TextStyle(ONBOARDING_TEXT_INFO)}
                                props={item.props}
                                scale={[1, -1]}
                            />
                        );
                    })}
                </SpineW>
                <ContainerW
                    position={skipPosition}
                    zIndex={11}
                >
                    <SpineW
                        spineDataKey="dynamic_button-skip_top-right"
                        animations={[
                            {
                                name: 'show',
                                initial: true,
                                configName: 'кнопка пропустить появления',
                                groupConfig: KEY_SETTING_GROUP_ONBOARDING
                            }
                        ]}
                        props={{
                            [PORTRAIT]: {
                                y: iphonePositionSafeArea() === 0 ? 0 : 20
                            },
                            [LANDSCAPE]: {
                                y: iphonePositionSafeArea() === 0 ? 0 : 20
                            }
                        }}
                        pointerup={{
                            emit: () => clickNext(true),
                            animationPressed: 'pressed',
                            animationNormal: 'normal',
                            animationHover: 'hover'
                        }}
                    >
                        <TextW
                            anchor={[0.5, 0.5]}
                            scale={[0.5, -0.5]}
                            parentSlotName="slot_text"
                            text={translations['button_text.skip']}
                            style={new TextStyle(ONBOARDING_BUTTON_SKIP)}
                        />
                    </SpineW>
                </ContainerW>
            </ContainerW>
        </>
    );
};
