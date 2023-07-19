import { Container } from '@inlet/react-pixi';

import { bkgPosition } from 'config/Scratch Card/positions';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCallback, useState } from 'react';
import { useLoadGaming } from 'features/useLoadGaming';

const GameBackground_F = (props) => {
    const [stateAnimationRef, setStateAnimationRef] = useState({} as any);

    const callbackStateRef = useCallback((state, key) => {
        if (state && !(key in stateAnimationRef)) {
            setStateAnimationRef(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [stateAnimationRef]);

    useLoadGaming(() => {
        stateAnimationRef.dynamic_background_center.setAnimation(0, 'state_game/loop_movement-of-water-and-bubbles', true);
    });

    return (
        <Container>
            <SpineW
                spineDataKey="dynamic_background_center"
                position={bkgPosition}
                animations={[
                    { name: 'state_loading/show', initial: true },
                    { name: 'state_loading/loop_movement-of-water-and-bubbles', loop: true }
                ]}
                animationStateCallback={callbackStateRef}
            />
        </Container>
    );
};
export default GameBackground_F;
