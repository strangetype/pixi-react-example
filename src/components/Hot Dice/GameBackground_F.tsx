import { Container } from '@inlet/react-pixi';

import {
    bkgPosition,
    boardMastPosition,
    boxPosition,
    foregroundPosition,
    girlPosition,
    mastPosition
} from 'config/Hot Dice/positions';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { LANDSCAPE } from 'const/variable';
import { applyOrientation } from 'utils/applyOrientation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'utils/debounce';
import { KEY_SETTING_GROUP_BACKGROUND, KEY_SETTING_GROUP_GAME } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { DEBOUNCE_TIME_ELEMENT } from 'config/Common/settings';

const GameBackground_F = (props) => {
    const [stateAnimationRef, setStateAnimationRef] = useState({} as any);
    const foregroundRef = useRef(null as any);

    const callbackStateRef = useCallback((state, key) => {
        if (state && !(key in stateAnimationRef)) {
            setStateAnimationRef(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [stateAnimationRef]);

    const instanceCallbackRef = useCallback((state) => {
        if (state) {
            foregroundRef.current = state;
        }
    }, []);

    useEffect(() => {
        if (props.isGaming) {
            if (applyOrientation() === LANDSCAPE) {
                stateAnimationRef.background.setAnimation(0, 'h/state_game/loop_sky_and_flag', true, {
                    groupConfig: KEY_SETTING_GROUP_BACKGROUND,
                    configName: 'повторяющая аним. небо и флаг'
                });
                stateAnimationRef.girl.setAnimation(0, 'h/transition', false, {
                    groupConfig: KEY_SETTING_GROUP_GAME,
                    configName: 'девушка переход в игру'
                });
                stateAnimationRef.girl.setAnimation(0, 'h/state_game/loop_revive', true, {
                    groupConfig: KEY_SETTING_GROUP_GAME,
                    configName: 'девушка оживление'
                });
                stateAnimationRef.foreground.setAnimation(0, 'h/transition', false, {
                    groupConfig: KEY_SETTING_GROUP_BACKGROUND,
                    configName: 'ящики и бочки переход в игру (увеличить)'
                });
                // stateAnimationRef.foreground.setAnimation(0, 'h/state_game/show', true);
                foregroundRef.current.y -= 55;
            } else {
                stateAnimationRef.background.setAnimation(0, 'v/state_game/loop_sky_and_flag', true, {
                    groupConfig: KEY_SETTING_GROUP_BACKGROUND,
                    configName: 'повторяющая аним. небо и флаг'
                });
                stateAnimationRef.girl.setAnimation(0, 'v/state_game/loop_revive', true, {
                    groupConfig: KEY_SETTING_GROUP_GAME,
                    configName: 'девушка оживление'
                });
                stateAnimationRef.foreground.setAnimation(0, 'v/state_game/show', true, {
                    groupConfig: KEY_SETTING_GROUP_BACKGROUND,
                    configName: 'ящики и бочки'
                });
            }
        }
    }, [props.isGaming, stateAnimationRef, foregroundRef.current]);

    useEffect(() => {
        const resize = debounce(() => {
            if (applyOrientation() === LANDSCAPE) {
                stateAnimationRef.foreground.setAnimation(0, 'h/transition', false, {
                    groupConfig: KEY_SETTING_GROUP_BACKGROUND,
                    configName: 'ящики и бочки переход в игру (увеличить)'
                });
                stateAnimationRef.girl.setAnimation(0, 'h/transition', false, {
                    groupConfig: KEY_SETTING_GROUP_GAME,
                    configName: 'девушка переход в игру'
                });

                foregroundRef.current.y -= 55;
            } else {
                stateAnimationRef.foreground.setAnimation(0, 'h/untransition', false, {
                    groupConfig: KEY_SETTING_GROUP_BACKGROUND,
                    configName: 'ящики и бочки переход в загрузку (уменьшить)'
                });
            }
        }, DEBOUNCE_TIME_ELEMENT + 100);

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, [stateAnimationRef]);

    return (
        <Container>
            <SpineW
                spineDataKey="background"
                position={bkgPosition}
                animations={
                    applyOrientation() === LANDSCAPE
                        ? [
                            { name: 'h/state_loading/loop_sky_and_flag', loop: true, groupConfig: KEY_SETTING_GROUP_BACKGROUND, configName: 'повторяющая аним. небо и флаг' }
                        ] : [
                            { name: 'v/state_loading/loop_sky_and_flag', loop: true, groupConfig: KEY_SETTING_GROUP_BACKGROUND, configName: 'повторяющая аним. небо и флаг' }
                        ]}
                animationStateCallback={callbackStateRef}
            />
            <SpineW
                spineDataKey="mast"
                position={mastPosition}
            />
            <SpineW
                spineDataKey="board_mast"
                position={boardMastPosition}
            />
            <SpineW
                spineDataKey="box"
                position={boxPosition}
            />
            <SpineW
                position={girlPosition}
                spineDataKey="girl"
                animations={
                    applyOrientation() === LANDSCAPE
                        ? [
                            { name: 'h/state_loading/loop_revive', loop: true, groupConfig: KEY_SETTING_GROUP_GAME, configName: 'девушка оживление' }
                        ] : [
                            { name: 'v/state_loading/loop_revive', loop: true, groupConfig: KEY_SETTING_GROUP_GAME, configName: 'девушка оживление' }
                        ]}
                animationStateCallback={callbackStateRef}
            />
            <SpineW
                position={foregroundPosition}
                spineDataKey="foreground"
                animations={
                    applyOrientation() === LANDSCAPE
                        ? [
                            { name: 'h/state_loading/show', loop: true, groupConfig: KEY_SETTING_GROUP_BACKGROUND, configName: 'ящики и бочки' }

                        ] : [
                            { name: 'v/state_loading/show', loop: true, groupConfig: KEY_SETTING_GROUP_BACKGROUND, configName: 'ящики и бочки' }
                        ]}
                animationStateCallback={callbackStateRef}
                instanceCallback={instanceCallbackRef}
            />
        </Container>
    );
};
export default GameBackground_F;
