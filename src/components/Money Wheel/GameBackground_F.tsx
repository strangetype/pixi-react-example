import { Container } from '@inlet/react-pixi';

import { bkgPosition } from 'config/Money Wheel/positions';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { LANDSCAPE, PORTRAIT } from 'const/variable';

const GameBackground_F = () => {
    return (
        <Container>
            <SpineW
                spineDataKey="bg"
                position={bkgPosition}
                skin={{
                    [PORTRAIT]: 'Main/v',
                    [LANDSCAPE]: 'Main/h'
                }}
                animations={[
                    { name: 'show', initial: true, groupConfig: 'фон', configName: 'показать' },
                    { name: 'loop', loop: true, groupConfig: 'фон', configName: 'пост анимация' }
                ]}
            />
        </Container>
    );
};
export default GameBackground_F;
