import { TextStyle } from 'pixi.js';
import { PANEL_BUTTONS, SELECT_BALANCE_BUTTON } from 'const/Hot Dice/PANEL_MAP';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { TextW } from 'components/Common/wrapper/TextW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { accountPosition, panelPosition } from 'config/Hot Dice/positions';
import { usePanelView } from 'projects/features/usePanelView';
import { KEY_PANEL_BUTTON_INPUT } from 'const/Common/KEYS_BUTTONS';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreUserState } from 'store/Default/user/store_F';
import { AnimationButton_F } from 'config/Hot Dice/AnimationButton_F';
import { KEY_SETTING_GROUP_PANEL_STAVOK } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';

export const PanelView = () => {
    const { clickKeyButton } = useStorePopupsActions;
    const {
        app,
        getText,
        animationStateCallback,
        accounts
    } = usePanelView({
        PANEL_BUTTONS
    });

    return (
        <>
            <ContainerW position={accountPosition}>
                <ContainerW
                    appProvider={app}
                    y={575}
                >
                    <SpineW
                        appProvider={app}
                        spineDataKey="rope_top"
                    />
                </ContainerW>
                <SpineW
                    appProvider={app}
                    spineDataKey={SELECT_BALANCE_BUTTON.spineDataKey}
                    animations={[
                        { name: 'show', groupConfig: KEY_SETTING_GROUP_PANEL_STAVOK, configName: 'кнопка показать', initial: true },
                        (accounts.length === 1) ? { name: AnimationButton_F.disabled, initial: true } : null
                    ]}
                    animationStateCallback={(state) => animationStateCallback(state, SELECT_BALANCE_BUTTON.key)}
                    {...((accounts.length > 1) ? {
                        pointerup: { emit: () => clickKeyButton(SELECT_BALANCE_BUTTON.key) }
                    } : {})}
                    props={{
                        [PORTRAIT]: {
                            scale: {
                                x: 1,
                                y: 1
                            }
                        },
                        [LANDSCAPE]: {
                            scale: {
                                x: 0.8,
                                y: 0.8
                            }
                        }
                    }}
                >
                    <TextW
                        store={useStoreUserState}
                        storeKey="balanceAndCurrencyCode"
                        props={{
                            [PORTRAIT]: {
                                anchor: {
                                    x: 0.5,
                                    y: 0.5
                                }
                            },
                            [LANDSCAPE]: {
                                anchor: {
                                    x: 0.5,
                                    y: 0.5
                                }
                            }
                        }}
                        isResizeText={0.98}
                        style={new TextStyle(SELECT_BALANCE_BUTTON.style)}
                        text={getText({ key: SELECT_BALANCE_BUTTON.key })}
                    />
                </SpineW>
            </ContainerW>
            <ContainerW position={panelPosition}>
                <SpineW
                    spineDataKey="btn_anchor"
                >
                    {
                        PANEL_BUTTONS.map(({ key = null, slot, style, spineDataKey, text = null, keyTranslation = null, chipKey = null, decorations = null, propsText = {} }) => {
                            return (
                                <ContainerW
                                    key={key}
                                    appProvider={app}
                                    parentSlotName={slot}
                                    scale={[1, -1]}
                                >

                                    <SpineW
                                        appProvider={app}
                                        spineDataKey={spineDataKey}
                                        animations={[
                                            { name: 'show', groupConfig: KEY_SETTING_GROUP_PANEL_STAVOK, configName: 'кнопка показать', initial: true }
                                        ]}
                                        animationStateCallback={(state) => animationStateCallback(state, key)}
                                        pointerup={{
                                            emit: () => clickKeyButton(key)
                                        }}
                                    />
                                    {decorations && decorations.map(decoration => {
                                        return (
                                            <SpineW
                                                appProvider={app}
                                                spineDataKey={decoration.spineDataKey}
                                                parentSlotName={decoration.slot}
                                                props={{
                                                    [PORTRAIT]: {
                                                        scale: {
                                                            x: 0.34,
                                                            y: 0.34
                                                        }
                                                    },
                                                    [LANDSCAPE]: {
                                                        scale: {
                                                            x: 0.34,
                                                            y: 0.34
                                                        }
                                                    }
                                                }}
                                                animations={[
                                                    {
                                                        name: 'show',
                                                        initial: true
                                                    }
                                                ]}
                                            />
                                        );
                                    })
                                    }
                                    { getText({ text, keyTranslation, chipKey, key }) &&
                                        <TextW
                                            store={(() => {
                                                switch (key) {
                                                case KEY_PANEL_BUTTON_INPUT:
                                                    return useStoreGamesState;
                                                }
                                                return null;
                                            })()}
                                            storeKey={(() => {
                                                switch (key) {
                                                case KEY_PANEL_BUTTON_INPUT:
                                                    return 'input';
                                                }
                                                return null;
                                            })()}
                                            props={{
                                                [PORTRAIT]: {
                                                    anchor: {
                                                        x: 0.5,
                                                        y: 0.5
                                                    }
                                                },
                                                [LANDSCAPE]: {
                                                    anchor: {
                                                        x: 0.5,
                                                        y: 0.5
                                                    }
                                                },
                                                ...propsText
                                            }}
                                            style={new TextStyle(style)}
                                            text={getText({ text, keyTranslation, chipKey, key })}
                                        />
                                    }
                                </ContainerW>
                            );
                        })
                    }
                </SpineW>
            </ContainerW>
        </>
    );
};
