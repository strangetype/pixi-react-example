import { TextStyle } from 'pixi.js';
import { PANEL_BUTTONS } from 'const/Scratch Card/PANEL_MAP';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { TextW } from 'components/Common/wrapper/TextW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { panelPosition } from 'config/Scratch Card/positions';
import { usePanelView } from 'projects/features/usePanelView';
import {
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_PLAY,
    KEY_PANEL_BUTTON_SELECT_BALANCE
} from 'const/Common/KEYS_BUTTONS';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreUserState } from 'store/Default/user/store_F';
import { AnimationButton_F } from 'config/Scratch Card/AnimationButton_F';

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
            <ContainerW position={panelPosition}>
                <SpineW
                    spineDataKey="dynamic_panel_anchor"
                >
                    {
                        PANEL_BUTTONS.map(({ key = null, slot, style, spineDataKey, text = null, keyTranslation = null, chipKey = null, propsText = {}, props = {} }) => {
                            const isSelectDisabled = ((key === KEY_PANEL_BUTTON_SELECT_BALANCE && accounts.length > 1) || (key !== KEY_PANEL_BUTTON_SELECT_BALANCE));
                            return (
                                <SpineW
                                    appProvider={app}
                                    spineDataKey={spineDataKey}
                                    parentSlotName={slot}
                                    props={props}
                                    animations={[
                                        {
                                            name: 'show',
                                            groupConfig: 'панель ставок',
                                            configName: 'кнопка: показать',
                                            initial: true
                                        },
                                        {
                                            name: isSelectDisabled
                                                ? AnimationButton_F.normal : AnimationButton_F.disabled,
                                            groupConfig: 'панель ставок',
                                            configName: 'кнопка: пост анимация',
                                            loop: true
                                        }
                                    ]}
                                    animationStateCallback={(state) => animationStateCallback(state, key)}
                                    {...(isSelectDisabled ? {
                                        pointerup: { emit: () => clickKeyButton(key) }
                                    } : {})}
                                >
                                    {key === KEY_PANEL_BUTTON_SELECT_BALANCE &&
                                        <SpineW
                                            appProvider={app}
                                            props={{
                                                [PORTRAIT]: {
                                                    y: -40,
                                                    x: -10
                                                },
                                                [LANDSCAPE]: {
                                                    y: -40,
                                                    x: -10
                                                }
                                            }}
                                            parentSlotName="slot_currency_arrow"
                                            spineDataKey="currency_arrow"
                                        />
                                    }

                                    { getText({ text, keyTranslation, chipKey, key }) &&
                                        <TextW
                                            parentSlotName="slot_text"
                                            store={(() => {
                                                switch (key) {
                                                case KEY_PANEL_BUTTON_INPUT:
                                                    return useStoreGamesState;
                                                case KEY_PANEL_BUTTON_SELECT_BALANCE:
                                                    return useStoreUserState;
                                                }
                                                return null;
                                            })()}
                                            storeKey={(() => {
                                                switch (key) {
                                                case KEY_PANEL_BUTTON_INPUT:
                                                    return 'input';
                                                case KEY_PANEL_BUTTON_SELECT_BALANCE:
                                                    return 'balanceAndCurrencyCode';
                                                }
                                                return null;
                                            })()}
                                            isResizeText={[KEY_PANEL_BUTTON_SELECT_BALANCE, KEY_PANEL_BUTTON_PLAY].includes(key) ? 0.975 : null}
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
                                </SpineW>
                            );
                        })
                    }
                </SpineW>
            </ContainerW>
        </>
    );
};
