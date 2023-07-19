import { TextStyle } from 'pixi.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { ONB_PROPS_MAP } from 'const/Slots 777/ONB_MAP';
import { TextW } from 'components/Common/wrapper/TextW';
import {
    ONB_SKIP_BTN_TXT_STYLE,
    ONB_TXT_STYLE
} from 'const/Slots 777/textStyles';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import storage from 'utils/storage';
import {
    machinePosition,
    panelPosition,
    skipPosition
} from 'config/Slots 777/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreComputed } from 'features/useComputed';
import { useStoreGamesState } from 'store/Slots 777/games/store_F';
import { AnimationButton_F } from 'config/Slots 777/AnimationButton_F';
import { fractionDigits } from 'utils/fractionDigits';

export const OnboardingView = () => {
    const [isShowAnimations, setIsShowAnimations] = useState({
        1: true,
        2: false,
        3: false
    });

    const [count, setCount] = useState(2);
    const { isResize } = useStore(useStoreSettingsState);
    const [isShowOnboarding, setIsShowOnboarding] = useState(false);
    const [stateAnimationButton, setStateAnimationButton] = useState({} as any);
    const { translations, limits } = useStoreSettingsState.get();
    const { currency_code } = useStoreUserGetters.getActiveAccount();
    const { paramsUrl: { onb = null } = {} } = useStoreSettingsState.get();

    useEffect(() => {
        const computedStartGame = useStoreComputed(
            useStoreGamesState,
            ['onboardingPlayActive'],
            ({ onboardingPlayActive }) => {
                if (onboardingPlayActive) {
                    clickNext();
                    useStoreGamesState.setKey('onboardingPlayActive', false);
                    setTimeout(() => {}, 2000);
                }
            }
        );

        return () => {
            computedStartGame.cancel();
        };
    }, [count]);

    useEffect(() => {
        const computed = useStoreComputed(
            useStorePopupsState,
            ['isShowOnboarding'],
            ({ isShowOnboarding, isKeyBoard }) => {
                setIsShowOnboarding(isShowOnboarding);
            }
        );

        const computedGames = useStoreComputed(
            useStoreGamesState,
            ['onboardingSummaActive'],
            () => {
                if (isShowAnimations[1]) {
                    clickNext();
                }
            }
        );

        if (onb || !storage.get('onboarding')) {
            useStorePopupsState.setKey('isShowOnboarding', true);
        }

        return () => {
            computed.cancel();
            computedGames.cancel();
            // computedStartGame.cancel();
        };
    }, [stateAnimationButton]);

    const stateButton = useCallback(
        (state) => {
            setStateAnimationButton(state);
        },
        [stateAnimationButton]
    );

    const clickNext = async () => {
        setCount(count + 1);

        for (const key in isShowAnimations) {
            isShowAnimations[key] = false;
        }
        setIsShowAnimations({ ...isShowAnimations, [count]: true });

        if (stateAnimationButton?.setAnimation) {
            stateAnimationButton.setAnimation(0, AnimationButton_F.normal, false);
        }
        if (count === 4) {
            storage.set('onboarding', true);
            useStorePopupsState.setKey('isShowOnboarding', false);
        }
    };

    return (
        isShowOnboarding &&
    !isResize && (
            <>
                <ContainerW
                    interactive={true}
                    pointerup={clickNext}
                    position={isShowAnimations[2] ? machinePosition : panelPosition}
                >
                    {isShowAnimations[1] && (
                        <SpineW
                            spineDataKey="onboarding"
                            animations={[
                                { name: 'show1', initial: true, configName: 'показать' },
                                { name: 'loop1', loop: true, configName: 'пост анимация' }
                            ]}
                        >
                            <TextW
                                parentSlotName="text"
                                style={new TextStyle(ONB_TXT_STYLE)}
                                anchor={0.5}
                                scale={[1, -1]}
                                text={translations['onboarding.step1']?.replace(
                                    '$2',
                                    `${fractionDigits(limits.min_bet, 2, 2)} ${currency_code}`
                                )}
                                props={{
                                    [PORTRAIT]:
                    ONB_PROPS_MAP[0] && ONB_PROPS_MAP[0].v
                        ? ONB_PROPS_MAP[0].v
                        : {},
                                    [LANDSCAPE]:
                    ONB_PROPS_MAP[0] && ONB_PROPS_MAP[0].h
                        ? ONB_PROPS_MAP[0].h
                        : {}
                                }}
                            />
                        </SpineW>
                    )}

                    {isShowAnimations[2] && (
                        <SpineW
                            spineDataKey="onboarding"
                            animations={[
                                { name: 'loop2', loop: true, configName: 'пост анимация' }
                            ]}
                        >
                            <TextW
                                parentSlotName="text"
                                style={new TextStyle(ONB_TXT_STYLE)}
                                anchor={0.5}
                                scale={[1, -1]}
                                text={translations['onboarding.step2']}
                                props={{
                                    [PORTRAIT]:
                    ONB_PROPS_MAP[1] && ONB_PROPS_MAP[1].v
                        ? ONB_PROPS_MAP[1].v
                        : {},
                                    [LANDSCAPE]:
                    ONB_PROPS_MAP[1] && ONB_PROPS_MAP[1].h
                        ? ONB_PROPS_MAP[1].h
                        : {}
                                }}
                            />
                        </SpineW>
                    )}

                    {isShowAnimations[3] && (
                        <SpineW
                            spineDataKey="onboarding"
                            animations={[
                                { name: 'loop3', loop: true, configName: 'пост анимация' }
                            ]}
                        >
                            <TextW
                                parentSlotName="text"
                                style={new TextStyle(ONB_TXT_STYLE)}
                                anchor={0.5}
                                scale={[1, -1]}
                                text={translations['onboarding.step3']}
                                props={{
                                    [PORTRAIT]:
                    ONB_PROPS_MAP[3] && ONB_PROPS_MAP[3].v
                        ? ONB_PROPS_MAP[3].v
                        : {},
                                    [LANDSCAPE]:
                    ONB_PROPS_MAP[3] && ONB_PROPS_MAP[3].h
                        ? ONB_PROPS_MAP[3].h
                        : {}
                                }}
                            />
                        </SpineW>
                    )}
                </ContainerW>
                <ContainerW position={skipPosition}>
                    <SpineW
                        spineDataKey="btn4"
                        scale={[0.4, 0.4]}
                        animations={[
                            {
                                configName: 'пропустить: пост анимация',
                                name: AnimationButton_F.normal,
                                loop: true
                            }
                        ]}
                        animationStateCallback={stateButton}
                        pointerup={{ emit: clickNext }}
                    >
                        <TextW
                            text={translations['button_text.skip']}
                            style={new TextStyle(ONB_SKIP_BTN_TXT_STYLE)}
                            anchor={0.5}
                            isResizeText={1}
                        />
                    </SpineW>
                </ContainerW>
            </>
        )
    );
};
