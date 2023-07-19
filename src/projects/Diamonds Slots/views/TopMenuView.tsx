import { Container } from '@inlet/react-pixi';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { homePosition, termsPosition } from 'config/Diamonds Slots/positions';

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
                <Container
                    scale={[0.75, 0.75]}
                >
                    <SpineW
                        pointerup={{ emit: () => clickButton('exit') }}
                        spineDataKey="btn1"
                        animations={[
                            { name: 'show', initial: true, configName: 'показать' },
                            { name: 'loop1', loop: true, configName: 'пост анимация' }
                        ]}
                    />
                </Container>
            </ContainerW>
            <ContainerW position={termsPosition}>
                <Container
                    scale={[0.75, 0.75]}
                >
                    <SpineW
                        pointerup={{ emit: () => clickButton('rules') }}
                        spineDataKey="btn2"
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
