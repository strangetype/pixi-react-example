import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { tableResultPosition } from 'config/Hot Dice/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { KEY_SETTING_GROUP_LOGO } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { useLoadGaming } from 'features/useLoadGaming';
import { useCallback, useEffect, useState } from 'react';
import { useApp } from '@inlet/react-pixi';
import { GamesPlayButtons } from 'projects/Hot Dice/views/enum/GamesPlayButtons';

export const GameTableResult = () => {
    const app = useApp();
    const [isHideLogo, setIsHideLogo] = useState(false);
    const [gameTableRef, setGameTableRef] = useState({} as any);

    useLoadGaming(() => {
        setIsHideLogo(true);
    });

    const stateRef = useCallback((state, key) => {
        if (state && !(key in gameTableRef)) {
            if (['dice1', 'dice2', 'dice3', 'dice4'].includes(key)) {
                state.scale.set(10, 10);
            } else {
                state.scale.set(1, -1);
            }

            setGameTableRef(prev => {
                prev[key] = state;
                return Object.assign({}, prev);
            });
        }
    }, [gameTableRef]);

    const setSkinSign = (choice, isWin = false, isGameOver = false) => {
        const nameResult = {};

        const status = (() => {
            if (isWin) {
                nameResult[GamesPlayButtons.less] = 'sign5';
                nameResult[GamesPlayButtons.greater] = 'sign6';
                nameResult[GamesPlayButtons.lessOrEqual] = 'sign11';
                nameResult[GamesPlayButtons.greaterOrEqual] = 'sign12';
                return 'green';
            } else if (isGameOver) {
                nameResult[GamesPlayButtons.less] = 'sign3';
                nameResult[GamesPlayButtons.greater] = 'sign4';
                nameResult[GamesPlayButtons.lessOrEqual] = 'sign9';
                nameResult[GamesPlayButtons.greaterOrEqual] = 'sign10';
                return 'red';
            } else {
                nameResult[GamesPlayButtons.less] = 'sign1';
                nameResult[GamesPlayButtons.greater] = 'sign2';
                nameResult[GamesPlayButtons.lessOrEqual] = 'sign7';
                nameResult[GamesPlayButtons.greaterOrEqual] = 'sign8';
                return 'white';
            }
        })();

        switch (choice) {
        // меньше
        case GamesPlayButtons.less:
            gameTableRef.sign.skeleton.setSkinByName(`v/${status}/${nameResult[GamesPlayButtons.less]}`);
            break;
            // больше
        case GamesPlayButtons.greater:
            gameTableRef.sign.skeleton.setSkinByName(`v/${status}/${nameResult[GamesPlayButtons.greater]}`);
            break;
            // меньше или равно
        case GamesPlayButtons.lessOrEqual:
            gameTableRef.sign.skeleton.setSkinByName(`v/${status}/${nameResult[GamesPlayButtons.lessOrEqual]}`);
            break;
        case GamesPlayButtons.greaterOrEqual:
            gameTableRef.sign.skeleton.setSkinByName(`v/${status}/${nameResult[GamesPlayButtons.greaterOrEqual]}`);
            break;
        }
    };

    useEffect(() => {
        global.$emitter.on('HotDice_gameTableResult', ({ steps = [], history = [], init = false, clear = false } = {}) => {
            if (init && history.length !== 0) {
                const { dicesToBeat = [], newDices = [], choice } = history[history.length - 1];
                gameTableRef.dice1.skeleton.setSkinByName(`v/${dicesToBeat[0]}`);
                gameTableRef.dice2.skeleton.setSkinByName(`v/${dicesToBeat[1]}`);

                gameTableRef.dice3.skeleton.setSkinByName(`v/${newDices[0]}`);
                gameTableRef.dice4.skeleton.setSkinByName(`v/${newDices[1]}`);

                setSkinSign(choice, true);
            } if (clear) {
                gameTableRef.dice4.skeleton.setSkin(null);
                gameTableRef.dice4.skeleton.setSlotsToSetupPose();
                gameTableRef.dice3.skeleton.setSkin(null);
                gameTableRef.dice3.skeleton.setSlotsToSetupPose();
                gameTableRef.dice2.skeleton.setSkin(null);
                gameTableRef.dice2.skeleton.setSlotsToSetupPose();
                gameTableRef.dice1.skeleton.setSkin(null);
                gameTableRef.dice1.skeleton.setSlotsToSetupPose();
                gameTableRef.sign.skeleton.setSkin(null);
                gameTableRef.sign.skeleton.setSlotsToSetupPose();
            } else {
                steps.forEach((item, index) => {
                    if (item == null) {
                        gameTableRef[`dice${index + 1}`].skeleton.setSkin(null);
                        gameTableRef[`dice${index + 1}`].skeleton.setSlotsToSetupPose();
                    } else {
                        gameTableRef[`dice${index + 1}`].skeleton.setSkinByName(`v/${item}`);
                    }
                });
            }
        });

        global.$emitter.on('HotDice_gameTableResultChoice', ({ choice = null, isWin = false, isGameOver = false } = {}) => {
            setSkinSign(choice, isWin, isGameOver);
        });

        global.$emitter.on('HotDice_zIndex', (zIndex) => {
            gameTableRef.container.zIndex = zIndex;
        });

        return () => {
            global.$emitter.off('HotDice_gameTableResult');
            global.$emitter.off('HotDice_gameTableResultChoice');
        };
    }, [gameTableRef]);

    return (
        <>
            {isHideLogo && <ContainerW
                position={tableResultPosition}
                instanceCallback={(state) => stateRef(state, 'container')}
            >
                <SpineW
                    spineDataKey="version"
                    animations={[
                        { name: 'show', groupConfig: KEY_SETTING_GROUP_LOGO, configName: 'показать', initial: true }
                    ]}
                    props={{
                        [PORTRAIT]: {
                            y: 750
                        },
                        [LANDSCAPE]: {
                            y: 320,
                            scale: {
                                x: 0.9,
                                y: 0.9
                            }
                        }
                    }}
                >
                    <SpineW
                        appProvider={app}
                        spineDataKey="dice_anchor_top"
                    >

                        <SpineW
                            skin={{
                                [PORTRAIT]: null,
                                [LANDSCAPE]: null
                            }}
                            appProvider={app}
                            parentSlotName="slot_dice1"
                            spineDataKey="dice_result"
                            instanceCallback={(state) => stateRef(state, 'dice1')}
                        />
                        <SpineW
                            skin={{
                                [PORTRAIT]: null,
                                [LANDSCAPE]: null
                            }}
                            appProvider={app}
                            parentSlotName="slot_dice2"
                            spineDataKey="dice_result"
                            instanceCallback={(state) => stateRef(state, 'dice2')}
                        />

                        <SpineW
                            skin={{
                                [PORTRAIT]: null,
                                [LANDSCAPE]: null
                            }}
                            appProvider={app}
                            parentSlotName="slot_sign1"
                            spineDataKey="sign"
                            instanceCallback={stateRef}
                            props={{
                                [PORTRAIT]: {
                                    scale: {
                                        x: 1,
                                        y: -1
                                    }
                                },
                                [LANDSCAPE]: {
                                    scale: {
                                        x: 1,
                                        y: -1
                                    }
                                }
                            }}
                        />

                        <SpineW
                            skin={{
                                [PORTRAIT]: null,
                                [LANDSCAPE]: null
                            }}
                            appProvider={app}
                            parentSlotName="slot_dice3"
                            spineDataKey="dice_result"
                            instanceCallback={(state) => stateRef(state, 'dice3')}
                        />
                        <SpineW
                            skin={{
                                [PORTRAIT]: null,
                                [LANDSCAPE]: null
                            }}
                            appProvider={app}
                            parentSlotName="slot_dice4"
                            spineDataKey="dice_result"
                            instanceCallback={(state) => stateRef(state, 'dice4')}
                        />

                    </SpineW>
                </SpineW>
            </ContainerW> }
        </>
    );
};
