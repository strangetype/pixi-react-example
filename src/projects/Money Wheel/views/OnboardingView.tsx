import { TextStyle } from 'pixi.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { TextW } from 'components/Common/wrapper/TextW';
import { ONB_TXT_STYLE } from 'const/Money Wheel/textStyles';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import storage from 'utils/storage';
import { panelPosition } from 'config/Money Wheel/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreComputed } from 'features/useComputed';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { fractionDigits } from 'utils/fractionDigits';

export const OnboardingView = () => {
    const { translations, limits } = useStoreSettingsState.get();
    const { currency_code } = useStoreUserGetters.getActiveAccount();
    const [text, setText] = useState('');
    const [isShowOnboarding, setIsShowOnboarding] = useState(true);
    const [stateAnimationOnboarding, setStateAnimationOnboarding] = useState({} as any);

    const clickNext = async (step) => {
        if (!isShowOnboarding) {
            return;
        }

        if (step >= 3) {
            storage.set('onboarding', true);
            useStorePopupsState.setKey('isShowOnboarding', false);
            setIsShowOnboarding(false);
            return;
        }

        stateAnimationOnboarding.clearTracks();
        await stateAnimationOnboarding.setAnimation(0, 'hide' + (step - 1), false);
        setText(translations['onboarding.step' + step]);
        stateAnimationOnboarding.setAnimation(0, 'loop' + step, true);
    };

    useEffect(() => {
        let step = 1;

        const computedStoreGame = useStoreComputed(useStoreGamesState, ['input', 'isGaming'], ({ input, isGaming }) => {
            const { isKeyBoard } = useStorePopupsState.get();
            if (isGaming || (!isKeyBoard && input >= limits.min_bet && input <= limits.max_bet)) {
                step++;
                clickNext(step);
            }
        });

        return () => {
            computedStoreGame.cancel();
        };
    }, [stateAnimationOnboarding, isShowOnboarding]);

    useEffect(() => {
        setText(translations['onboarding.step1'].replace('$2', `${fractionDigits(limits.min_bet, 2, 2)} ${currency_code}`));

        const computedStorePopup = useStoreComputed(useStorePopupsState, ['isShowOnboarding'], ({ isShowOnboarding }) => {
            setIsShowOnboarding(isShowOnboarding);
        });

        return () => {
            computedStorePopup.cancel();
        };
    }, []);

    const stateRef = useCallback((state) => {
        setStateAnimationOnboarding(state);
    }, [stateAnimationOnboarding]);

    return (
        isShowOnboarding &&
            <SpineW
                position={panelPosition}
                skin={{
                    [PORTRAIT]: 'v',
                    [LANDSCAPE]: 'h'
                }}
                spineDataKey="onboarding"
                animations={[
                    { configName: 'показать', name: 'show', initial: true },
                    { configName: 'показать', name: 'loop1', loop: true }
                ]}
                animationStateCallback={stateRef}
                pointerup={{
                    emit: () => {},
                    slot: 'black'
                }}
            >
                <TextW
                    parentSlotName='t1'
                    text={text}
                    style={new TextStyle(ONB_TXT_STYLE)}
                    props={{
                        [PORTRAIT]: {
                            anchor: {
                                x: 0.5,
                                y: 0.6
                            },
                            style: {
                                wordWrapWidth: ONB_TXT_STYLE.wordWrapWidth
                            }
                        },
                        [LANDSCAPE]: {
                            anchor: {
                                x: 0.4,
                                y: 0.5
                            },
                            style: {
                                wordWrapWidth: ONB_TXT_STYLE.wordWrapWidth * 0.75
                            }
                        }
                    }}
                    scale={[1, -1]}
                />
            </SpineW>
    );
};
