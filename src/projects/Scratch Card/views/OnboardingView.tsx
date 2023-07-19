import { TextStyle } from 'pixi.js';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { TextW } from 'components/Common/wrapper/TextW';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import storage from 'utils/storage';
import { onboardingPosition, skipPosition } from 'config/Scratch Card/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreComputed } from 'features/useComputed';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { ONBOARDING_BUTTON_SKIP, ONBOARDING_TEXT_INFO } from 'const/Scratch Card/textStyles';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { KEY_SETTING_GROUP_ONBOARDING } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { iphonePositionSafeArea } from 'utils/iphonePositionSafeArea';
import { delay } from 'utils/delay';

export const OnboardingView = () => {
    const { translations, limits } = useStoreSettingsState.get();
    const { currency_code } = useStoreUserGetters.getActiveAccount();
    const step = useRef(0);

    const containerOnboarding = useRef(null);
    const [isShowOnboarding, setIsShowOnboarding] = useState(true);
    const [stateAnimationOnboarding, setStateAnimationOnboarding] = useState({} as any);

    const textList = [
        {
            slot: 'slot_text-step1',
            text: translations['onboarding.step1'].replace('$2', '\n' + limits.min_bet + ' ' + currency_code),
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
            slot: 'slot_text-step2',
            text: translations['onboarding.step2'],
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
            slot: 'slot_text-step3',
            text: translations['onboarding.step3'],
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
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 400
                    }
                }
            }
        },
        {
            slot: 'slot_text-step4',
            text: translations['onboarding.step4'],
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
                        wordWrapWidth: ONBOARDING_TEXT_INFO.wordWrapWidth + 400
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
            },
            {
                animationName: 'part1/step3',
                step: 3,
                action: () => {
                    global.$emitter.emit('Scratch-Card_zIndex_gamePorthole', { zIndex: 11 });
                    global.$emitter.emit('Scratch-Card_zIndex');

                    global.$emitter.emit('Scratch-Card_octopus', { animation: 'state_onboarding/loop_indicates', loop: true });
                }
            },
            {
                animationName: 'part1/step4',
                step: 4
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
        global.$emitter.emit('Scratch-Card_octopus', { reset: true });

        global.$emitter.emit('Scratch-Card_zIndex_gamePorthole', { zIndex: -1 });
        global.$emitter.emit('Scratch-Card_zIndex');

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
        if (!isShowOnboarding || !mapSteps.commonSteps.length) {
            return;
        }
        console.log('next', next);
        step.current++;

        if (mapSteps.commonSteps[step.current]) {
            showAnimation();
        } else {
            console.log('closedOnboarding');
            closedOnboarding(mapSteps.status != null);
        }
    };

    useEffect(() => {
        const computedStoreGame = useStoreComputed(useStoreGamesState, ['input', 'isGaming'], ({ input, isGaming }) => {
            const { isKeyBoard } = useStorePopupsState.get();
            if (step.current === 0 && (!isKeyBoard && input >= limits.min_bet && input <= limits.max_bet)) {
                clickNext();
            }

            if (step.current === 1 && isGaming) {
                clickNext();
            }
        });

        global.$emitter.emit('Scratch-Card_octopus', { animation: 'state_onboarding/loop_idle', loop: true });

        global.$emitter.on('Scratch-Card_onboarding_next', () => {
            clickNext();
        });

        return () => {
            computedStoreGame.cancel();
            global.$emitter.off('Scratch-Card_onboarding_next');
        };
    }, [stateAnimationOnboarding, isShowOnboarding]);

    const stateRef = useCallback((state) => {
        setStateAnimationOnboarding(state);
    }, [stateAnimationOnboarding]);

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
            >
                <SpineW
                    position={onboardingPosition}
                    spineDataKey="dynamic_onboarding"
                    animations={[
                        {
                            name: 'part1/step1',
                            loop: true,
                            configName: 'появления шаги',
                            groupConfig: KEY_SETTING_GROUP_ONBOARDING
                        }
                    ]}
                    animationStateCallback={stateRef}
                    instanceCallback={stateContainer}
                    pointerup={{
                        emit: () => clickNext(true),
                        slot: 'fade'
                    }}
                >
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
                            anchor={[0.5, 0.6]}
                            scale={[1, -1]}
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
