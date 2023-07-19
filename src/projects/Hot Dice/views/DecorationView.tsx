import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { accountPosition, panelPosition } from 'config/Hot Dice/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { KEY_SETTING_GROUP_LOGO } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { useLoadGaming } from 'features/useLoadGaming';
import { useState } from 'react';

export const DecorationView = () => {
    const [isHideLogo, setIsHideLogo] = useState(false);

    useLoadGaming(() => {
        setIsHideLogo(false);
    });

    return (
        <>
            {isHideLogo && <ContainerW position={accountPosition}>
                <SpineW
                    spineDataKey="logo"
                    animations={[
                        { name: 'show', groupConfig: KEY_SETTING_GROUP_LOGO, configName: 'показать', initial: true },
                        { name: 'loop', groupConfig: KEY_SETTING_GROUP_LOGO, configName: 'повторяющая аним. кубик', loop: true }
                    ]}
                    props={{
                        [PORTRAIT]: {
                            y: 570,
                            scale: {
                                x: 0.8,
                                y: 0.8
                            }
                        },
                        [LANDSCAPE]: {
                            y: -999
                        }
                    }}
                />
            </ContainerW> }
            <ContainerW position={panelPosition}>
                <SpineW
                    spineDataKey="btn_bg"
                    animations={[
                        { name: 'show', initial: true }
                    ]}
                />
                <SpineW
                    spineDataKey="rope"
                    animations={[
                        { name: 'show', initial: true }
                    ]}
                />
            </ContainerW>
        </>
    );
};
