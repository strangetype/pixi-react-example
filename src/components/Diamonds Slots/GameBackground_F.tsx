import { Container } from '@inlet/react-pixi';
import { useCallback, useEffect, useState } from 'react';

import { bkgPosition } from 'config/Diamonds Slots/positions';
import { SpineW } from 'components/Common/wrapper/SpineW';

const GameBackground_F = (props) => {
    const [animationState, setAnimationState] = useState(null as any);

    const stateRef = useCallback((state) => {
        setAnimationState(state);
    }, [animationState]);

    useEffect(() => {
        if (props.isAllResourceCheck && animationState) {
            animationState.setAnimation(0, 'loop2', true, { configName: 'фон: пост. анимация', groupConfig: 'фон' });
        }
    }, [props]);

    return (
        <Container>
            <SpineW
                spineDataKey="bg"
                position={bkgPosition}
                animationStateCallback={stateRef}
                animations={[
                    { name: 'show', initial: true, groupConfig: 'фон', configName: 'пост анимация' },
                    { name: 'loop', loop: true, groupConfig: 'фон', configName: 'пост анимация' }
                ]}
            />
        </Container>
    );
};
export default GameBackground_F;
