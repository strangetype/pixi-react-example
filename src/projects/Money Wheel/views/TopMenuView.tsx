import { useStorePopupsState } from 'store/Default/popup/store_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { homePosition } from 'config/Money Wheel/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStore } from '@nanostores/react';
import { useStoreSettingsState } from 'store/Default/settings/store_F';

export const TopMenuView = () => {
    const { isResize } = useStore(useStoreSettingsState);

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
        !isResize && <ContainerW position={homePosition}>
            <ContainerW
                props={{
                    [PORTRAIT]: {
                        scale: { x: 1.75, y: 1.75 }
                    },
                    [LANDSCAPE]: {
                        scale: { x: 1, y: 1 }
                    }
                }}
            >
                <SpineW
                    pointerup={[
                        {
                            emit: () => clickButton('exit'),
                            slot: 'Home_Button'
                        },
                        {
                            emit: () => clickButton('rules'),
                            slot: 'Help_Button'
                        }
                    ]}
                    spineDataKey="Home_Help_Buttons"
                    animations={[
                        { name: 'show', initial: true, configName: 'показать' },
                        { name: 'loop', loop: true, configName: 'пост анимация' }
                    ]}
                />
            </ContainerW>
        </ContainerW>
    );
};
