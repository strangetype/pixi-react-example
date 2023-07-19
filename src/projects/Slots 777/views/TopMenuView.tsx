import { Container } from '@inlet/react-pixi';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { homePosition, termsPosition } from 'config/Slots 777/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';

export const TopMenuView = () => {
    const clickButton = (name) => {
        switch (name) {
        case 'exit':
            useStorePopupsState.setKey('isShowExit', true);
            break;
        case 'rules':
            useStorePopupsState.setKey('isShowRules', true);
            break;
        }
    };

    return (
        <>
            <ContainerW position={homePosition}>

            </ContainerW>
            <ContainerW position={termsPosition}>
                <Container scale={[0.5, 0.5]}>
                    <SpineW
                        pointerup={{ emit: () => clickButton('rules') }}
                        spineDataKey="btn6"
                        position={{
                            [LANDSCAPE]: { y: 0 },
                            [PORTRAIT]: { y: 0 }
                        }}
                        animations={[
                            { name: 'show', initial: true, configName: 'показать' },
                            { name: 'loop1', loop: true, configName: 'пост анимация' }
                        ]}
                    />
                    <SpineW
                        pointerup={{ emit: () => clickButton('exit') }}
                        spineDataKey="btn5"
                        position={{
                            [LANDSCAPE]: { x: -140, y: 0 },
                            [PORTRAIT]: { x: -140, y: 0 }
                        }}
                        animations={[
                            { name: 'show', initial: true, configName: 'показать' },
                            { name: 'loop1', loop: true, configName: 'пост анимация' }
                        ]}
                    />
                </Container>
            </ContainerW>
        </>
    );
};
