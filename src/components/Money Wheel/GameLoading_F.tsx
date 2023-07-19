import { useCallback, useEffect, useState } from 'react';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { bkgPosition, chrPosition, mainPosition } from 'config/Money Wheel/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { TextW } from 'components/Common/wrapper/TextW';
import { TextStyle } from 'pixi.js';
import { LOADING_TXT_STYLE } from 'const/Money Wheel/textStyles';

export const GameLoading_F = (props) => {
    const [animationState, setAnimationState] = useState(null);
    const [animationLineState, setAnimationLineState] = useState(null);
    const [isComplete, setIsComplete] = useState(true);
    useEffect(() => {
        if (!animationLineState) {
            return;
        }
        animationLineState.timeScale = 1;
        const idInterval = setInterval(() => {
            animationLineState.timeScale *= props.isAllResourceCheck ? 1.1 : 0.96;
            if (props.isAllResourceCheck) {
                setTimeout(_ => {
                    clearInterval(idInterval);
                }, 150);
            }
        }, 150);

        return () => {
            clearInterval(idInterval);
        };
    }, [animationLineState, props.isAllResourceCheck]);

    useEffect(() => {
        if (props.isAllResourceCheck && animationState) {
            (async () => {
                animationState.setAnimation(0, 'hide', false, {
                    groupConfig: 'загрузка',
                    configName: 'лого: скрыть'
                });
                animationLineState.setAnimation(0, 'hide', false, {
                    groupConfig: 'загрузка',
                    configName: 'загрузка: скрыть'
                });
                setTimeout(_ => {
                    setIsComplete(false);
                    props.onLoading(true);
                }, 1000 * useStoreGameGetters.getSettingsAnimation({
                    groupConfig: 'загрузка',
                    configName: 'время закрытия'
                }));
            })();
        }
    }, [props.isAllResourceCheck]);

    const stateRef = useCallback((state) => {
        setAnimationState(state);
    }, [animationState]);

    const stateRefLine = useCallback((state) => {
        setAnimationLineState(state);
    }, [animationLineState]);

    return (
        isComplete && <ContainerW>
            <SpineW
                spineDataKey="bg"
                position={bkgPosition}
                skin={{
                    [PORTRAIT]: 'Load/v',
                    [LANDSCAPE]: 'Load/h'
                }}
                animations={[
                    { name: 'show', initial: true, groupConfig: 'фон', configName: 'показать' },
                    { name: 'loop', loop: true, groupConfig: 'фон', configName: 'пост анимация' }
                ]}
            />
            <SpineW
                spineDataKey="character"
                position={chrPosition}
                animations={[
                    { name: 'show', initial: true, groupConfig: 'загрузка', configName: 'лого: повление' },
                    { name: 'loop', loop: true, groupConfig: 'загрузка', configName: 'лого: прогресс' }
                ]}
            />
            <ContainerW position={mainPosition}>
                <SpineW
                    spineDataKey="logo"
                    skin={{
                        [PORTRAIT]: 'Load/v',
                        [LANDSCAPE]: 'Load/h'
                    }}
                    animations={[
                        { name: 'show', initial: true, groupConfig: 'загрузка', configName: 'повление' },
                        { name: 'loop', groupConfig: 'загрузка', configName: 'прогресс' }
                    ]}
                    animationStateCallback={stateRef}
                />
                <SpineW
                    props={{
                        [PORTRAIT]: {
                            y: 0
                        },
                        [LANDSCAPE]: {
                            y: 0
                        }
                    }}
                    spineDataKey="loading"
                    animations={[
                        { name: 'show', initial: true, groupConfig: 'загрузка', configName: 'повление' },
                        { name: 'loop', groupConfig: 'загрузка', configName: 'прогресс' }
                    ]}
                    animationStateCallback={stateRefLine}
                >
                    <TextW
                        parentSlotName="Loading_Frame"
                        text="Loading"
                        style={new TextStyle(LOADING_TXT_STYLE)}
                        anchor={0.5}
                        scale={[1, -1]}
                        y={40}
                    />
                </SpineW>
            </ContainerW>
        </ContainerW>
    );
};
