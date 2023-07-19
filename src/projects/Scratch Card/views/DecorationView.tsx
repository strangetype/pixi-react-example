import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { octopusPosition, panelPosition } from 'config/Scratch Card/positions';
import { useCallback, useEffect, useState } from 'react';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { KEY_SETTING_GROUP_LOADING } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { delay } from 'utils/delay';

export const DecorationView = () => {
    const [octopus, setOctopus] = useState(null as any);
    const [octopusShow, setOctopusShow] = useState(true);

    useEffect(() => {
        global.$emitter.on('Scratch-Card_octopus', async ({ reset = false, isWin = false, animation = null, loop = true }) => {
            if (reset) {
                setOctopusShow(false);
                await delay(200);
                setOctopusShow(true);
                return;
            }

            if (animation) {
                octopus && octopus.setAnimation(0, animation, loop);
                return;
            }

            if (isWin) {
                await octopus.setAnimation(0, 'state_game/loop_win', false);
                octopus.setAnimation(0, 'state_game/loop_idle', true);
            } else {
                await octopus.setAnimation(0, 'state_game/loop_lose', false);
                octopus.setAnimation(0, 'state_game/loop_idle', true);
            }
        });

        return () => {
            global.$emitter.off('Scratch-Card_octopus');
        };
    }, [octopus]);

    const refOctopus = useCallback((state) => {
        if (state) {
            setOctopus(state);
        }
    }, []);

    return (
        <>
            {octopusShow && <SpineW
                spineDataKey="octopus"
                position={octopusPosition}
                props={{
                    [PORTRAIT]: {
                        zIndex: 12
                    },
                    [LANDSCAPE]: {
                        zIndex: 12
                    }
                }}
                animations={[
                    {
                        name: 'state_game/loop_idle',
                        loop: true,
                        groupConfig: KEY_SETTING_GROUP_LOADING,
                        configName: 'прогресс'
                    }
                ]}
                animationStateCallback={refOctopus}
                            /> }

            <ContainerW position={panelPosition}>
                <SpineW
                    spineDataKey="dynamic_panel_center"
                    animations={[
                        { name: 'show', initial: true }
                    ]}
                />
            </ContainerW>
        </>
    );
};
