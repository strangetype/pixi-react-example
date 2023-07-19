import { useStorePopupsState } from 'store/Default/popup/store_F';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { homePosition, rulesPosition } from 'config/Scratch Card/positions';
import { useStore } from '@nanostores/react';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { KEY_SETTING_GROUP_PANEL_STAVOK } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';

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
        !isResize && <>
            <ContainerW position={rulesPosition}>
                <SpineW
                    spineDataKey="dynamic_rules _top-right"
                    animations={[
                        { name: 'show', initial: true, configName: 'показать правила', groupConfig: KEY_SETTING_GROUP_PANEL_STAVOK }
                    ]}
                    scale={0.85}
                    x={-10}
                    pointerup={{
                        emit: () => clickButton('rules')
                    }}
                />
            </ContainerW>

            <ContainerW position={homePosition}>
                <SpineW
                    spineDataKey="dynamic_home _top-left"
                    scale={0.85}
                    animations={[
                        { name: 'show', initial: true, configName: 'показать домой', groupConfig: KEY_SETTING_GROUP_PANEL_STAVOK }
                    ]}
                    x={10}
                    pointerup={{
                        emit: () => clickButton('exit')
                    }}
                />
            </ContainerW>
        </>
    );
};
