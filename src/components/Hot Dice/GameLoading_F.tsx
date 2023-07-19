import { useCallback, useEffect, useState } from 'react';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { mainPosition } from 'config/Hot Dice/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { Container } from '@inlet/react-pixi';
import { TextW } from 'components/Common/wrapper/TextW';
import { TextStyle } from 'pixi.js';
import { LOADING_TEXT } from 'const/Hot Dice/textStyles';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { KEY_SETTING_GROUP_LOADING } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';

export const GameLoading_F = (props) => {
    const [animationState, setAnimationState] = useState(null);
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
        if (props.isAllResourceCheck && animationState) {
            (async () => {
                animationState.setAnimation(0, 'hide', false, {
                    groupConfig: KEY_SETTING_GROUP_LOADING,
                    configName: 'лого скрыть'
                });
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

    const stateRef = useCallback((state) => {
        setAnimationState(state);
    }, [animationState]);

    const stateRefLine = useCallback((state) => {
        setAnimationLineState(state);
    }, [animationLineState]);

    return (
        isComplete && <Container>
            <ContainerW position={mainPosition}>
                <SpineW
                    spineDataKey="logo"
                    animations={[
                        { name: 'show', initial: true, groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'повление' },
                        { name: 'loop', groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'прогресс' }
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
                        { name: 'show', initial: true, groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'повление' },
                        { name: 'loop', groupConfig: KEY_SETTING_GROUP_LOADING, configName: 'прогресс' }
                    ]}
                    animationStateCallback={stateRefLine}
                >
                    <TextW
                        text={translations.loading}
                        parentSlotName="slot_loading-text"
                        scale={[5, -5]}
                        anchor={[0.5, 0.5]}
                        style={new TextStyle(LOADING_TEXT)}
                    ></TextW>
                </SpineW>
            </ContainerW>
        </Container>
    );
};
