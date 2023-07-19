import { useCallback, useEffect, useState } from 'react';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { loadingPosition, logoPosition, mainPosition } from 'config/Scratch Card/positions';
import { Container } from '@inlet/react-pixi';
import { TextW } from 'components/Common/wrapper/TextW';
import { TextStyle } from 'pixi.js';
import { LOADING_TEXT } from 'const/Scratch Card/textStyles';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { KEY_SETTING_GROUP_LOADING } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';

export const GameLoading_F = (props) => {
    const [animationObjectsState, setAnimationObjectsState] = useState({} as any);
    const [animationLineState, setAnimationLineState] = useState(null);
    const [isComplete, setIsComplete] = useState(true);
    const { translations } = useStoreSettingsState.get();

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
        if (props.isAllResourceCheck) {
            (async () => {
                for (const key in animationObjectsState) {
                    animationObjectsState[key].visible = false;
                }

                animationLineState.setAnimation(0, 'hide', false, {
                    groupConfig: KEY_SETTING_GROUP_LOADING,
                    configName: 'загрузка скрыть'
                });
                setTimeout(_ => {
                    setIsComplete(false);
                    props.onLoading(true);
                }, 1000 * useStoreGameGetters.getSettingsAnimation({
                    groupConfig: KEY_SETTING_GROUP_LOADING,
                    configName: 'задержка закрытия'
                }));
            })();
        }
    }, [props.isAllResourceCheck]);

    const stateObjectsRef = useCallback((state, key) => {
        if (state && !(key in animationObjectsState)) {
            setAnimationObjectsState(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [animationObjectsState]);

    const stateRefLine = useCallback((state) => {
        setAnimationLineState(state);
    }, [animationLineState]);

    return (
        isComplete &&
        <Container>
            <SpineW
                spineDataKey="dynamic_logo_top"
                position={logoPosition}
                animations={[
                    { name: 'show', initial: true, groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'прогресс' }
                ]}
                instanceCallback={stateObjectsRef}
            />
            <SpineW
                spineDataKey="octopus"
                position={mainPosition}
                animations={[
                    { name: 'state_loading/loop_idle', loop: true, groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'прогресс' }
                ]}
                instanceCallback={stateObjectsRef}
            />

            <SpineW
                spineDataKey="crab _bottom-right"
                position={mainPosition}
                animations={[
                    { name: 'loop_loading', loop: false, groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'прогресс' }
                ]}
                instanceCallback={stateObjectsRef}
            />
            <SpineW
                position={loadingPosition}
                spineDataKey="dynamic_loading-bar_bottom"
                animations={[
                    { name: 'show', initial: true, groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'повление' },
                    { name: 'loading', loop: true }
                ]}
                animationStateCallback={stateRefLine}
            >
                <TextW
                    text={translations.loading}
                    parentSlotName="slot_loading-text"
                    scale={[5, -5]}
                    anchor={[0.5, 2]}
                    style={new TextStyle(LOADING_TEXT)}
                    instanceCallback={stateObjectsRef}
                />
            </SpineW>
        </Container>
    );
};
