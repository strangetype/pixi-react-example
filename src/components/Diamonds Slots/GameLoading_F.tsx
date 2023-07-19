import { useCallback, useEffect, useState } from 'react';
import { loadingPos } from 'config/Diamonds Slots/positions';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';

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
        isComplete && <ContainerW position={loadingPos}>
            <SpineW
                spineDataKey="loader"
                animations={[
                    { name: 'show', initial: true, groupConfig: 'загрузка', configName: 'лого: повление' },
                    { name: 'loop', loop: true, groupConfig: 'загрузка', configName: 'лого: прогресс' }
                ]}
                animationStateCallback={stateRef}
            />
            <SpineW
                spineDataKey="loader_line"
                animations={[
                    { name: 'show', initial: true, groupConfig: 'загрузка', configName: 'повление' },
                    { name: 'loop', groupConfig: 'загрузка', configName: 'прогресс' }
                ]}
                animationStateCallback={stateRefLine}
            />
        </ContainerW>
    );
};
