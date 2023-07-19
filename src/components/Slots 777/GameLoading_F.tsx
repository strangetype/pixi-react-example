import { useCallback, useEffect, useMemo, useState } from 'react';
import { mainPosition } from 'config/Slots 777/positions';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { TextStyle } from 'pixi.js';
import { LOADING_TXT_STYLE } from 'const/Slots 777/textStyles';
import { TextW } from 'components/Common/wrapper/TextW';
import { useStoreSettingsState } from 'store/Default/settings/store_F';

export const GameLoading_F = (props) => {
    const [animationState, setAnimationState] = useState(null);
    // const [animationLineState, setAnimationLineState] = useState(null);
    // const [hideText, setHideText] = useState(false);
    const [isComplete, setIsComplete] = useState(true);
    const { translations } = useStoreSettingsState.get();

    const computedIsLoadedProp = useMemo(() => {
        return !props.isAllResourceCheck;
    }, [props.isAllResourceCheck]);

    useEffect(() => {
        if (animationState) {
            (async () => {
                await animationState.setAnimation(0, 'show', false, {
                    groupConfig: 'загрузка',
                    configName: 'лого: появление'
                });

                await animationState.setAnimation(0, 'loop', true, {
                    groupConfig: 'загрузка',
                    configName: 'лого: прогресс'
                });
            })();
        }

        if (props.isAllResourceCheck) {
            (async () => {
                animationState.timeScale = 0.5;
                await animationState.setAnimation(0, 'hide', false, {
                    groupConfig: 'загрузка',
                    configName: 'лого: скрыть'
                });
                setIsComplete(false);
                props.onLoading(true);
                setTimeout(
                    (_) => {
                    },
                    1000 *
                    useStoreGameGetters.getSettingsAnimation({
                        groupConfig: 'загрузка',
                        configName: 'время закрытия'
                    })
                );
            })();
        }
    }, [props.isAllResourceCheck, animationState]);

    const stateRef = useCallback(
        (state) => {
            setAnimationState(state);
        },
        [animationState]
    );

    return (
        isComplete && (
            <ContainerW position={mainPosition}>
                <SpineW
                    skin={{
                        [PORTRAIT]: null,
                        [LANDSCAPE]: null
                    }}
                    spineDataKey="loading"
                    animations={[
                        {
                            name: 'show',
                            initial: true,
                            groupConfig: 'загрузка',
                            configName: 'лого: повление'
                        },
                        {
                            name: 'loop',
                            loop: true,
                            groupConfig: 'загрузка',
                            configName: 'лого: прогресс'
                        },
                        {
                            name: 'hide',
                            initial: true,
                            groupConfig: 'скрыть загрузку',
                            configName: 'лого: исчезание'
                        }
                    ]}
                    animationStateCallback={stateRef}
                >
                    {<TextW
                        style={new TextStyle(LOADING_TXT_STYLE)}
                        text={computedIsLoadedProp ? translations.loading : ''}
                        anchor={[0.5, 0.9]}
                    />}
                </SpineW>
            </ContainerW>
        )
    );
};
