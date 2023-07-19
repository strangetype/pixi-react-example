import { TextStyle } from 'pixi.js';
import { PANEL_BUTTONS } from 'const/Money Wheel/PANEL_MAP';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { TextW } from 'components/Common/wrapper/TextW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { panelPosition } from 'config/Money Wheel/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { ACCOUNT_TXT_STYLE, RULES_TXT_STYLE } from 'const/Money Wheel/textStyles';
import { usePanelView } from 'projects/features/usePanelView';
import {
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_INPUT_CLEAR,
    KEY_PANEL_BUTTON_SELECT_BALANCE
} from 'const/Common/KEYS_BUTTONS';
import { useStoreUserState } from 'store/Default/user/store_F';
import { formatMoneyIntl } from 'utils/formatMoneyIntl';

export const PanelView = () => {
    const { clickKeyButton } = useStorePopupsActions;
    const {
        app,
        translations,
        accounts,
        getText,
        animationStateCallback
    } = usePanelView({
        PANEL_BUTTONS
    });

    return (
        <ContainerW position={panelPosition}>
            <SpineW
                spineDataKey="logo"
                skin={{
                    [PORTRAIT]: 'Main/v',
                    [LANDSCAPE]: 'Main/h'
                }}
                props={{
                    [PORTRAIT]: {
                        y: -100
                    },
                    [LANDSCAPE]: {
                        y: 0
                    }
                }}
                animations={[
                    { name: 'show', groupConfig: 'панель ставок', configName: 'панель показать', initial: true },
                    { name: 'loop', groupConfig: 'панель ставок', configName: 'панель пост. танимация', loop: true }
                ]}
            />
            <SpineW
                spineDataKey="btn_field"
                animations={[
                    { name: 'show', groupConfig: 'панель ставок', configName: 'панель показать', initial: true },
                    { name: 'loop', groupConfig: 'панель ставок', configName: 'панель пост. танимация', loop: true }
                ]}
            >
                <ContainerW
                    appProvider={app}
                    {...((accounts.length > 1) ? {
                        interactive: true,
                        pointerup: () => clickKeyButton(KEY_PANEL_BUTTON_SELECT_BALANCE)
                    } : {})}
                    props={{
                        [PORTRAIT]: {
                            x: 0, y: 108
                        },
                        [LANDSCAPE]: {
                            x: -200, y: 212
                        }
                    }}
                >
                    <TextW
                        store={useStoreUserState}
                        storeKey="balanceAndCurrencyCode"
                        style={new TextStyle(ACCOUNT_TXT_STYLE)}
                        {...((accounts.length > 1) ? {
                            prefixText: formatMoneyIntl
                        } : {})
                        }
                        scale={0.6}
                        anchor={0.5}
                        text={getText({ key: KEY_PANEL_BUTTON_SELECT_BALANCE })}
                    />
                </ContainerW>

                <TextW
                    text={translations.rules_start}
                    parentSlotName="Red_Top_Line6"
                    anchor={0.5}
                    scale={[0.8, -1]}
                    style={new TextStyle(RULES_TXT_STYLE)}
                />
            </SpineW>

            <SpineW
                spineDataKey="btn_anchor"
            >
                {
                    PANEL_BUTTONS.map(({ key = null, slot, style, spineDataKey, text = null, keyTranslation = null, chipKey = null }) => {
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
                                        { name: 'show', groupConfig: 'панель ставок', configName: 'кнопка: показать', initial: true },
                                        { name: 'loop', groupConfig: 'панель ставок', configName: 'кнопка: пост анимация', loop: true }
                                    ]}
                                    animationStateCallback={(state) => animationStateCallback(state, key)}
                                    pointerup={{
                                        emit: () => clickKeyButton(key)
                                    }}
                                >
                                    {key === KEY_PANEL_BUTTON_INPUT && <SpineW
                                        appProvider={app}
                                        spineDataKey="btn13"
                                        animationStateCallback={(state) => animationStateCallback(state, key)}
                                        pointerup={{
                                            emit: () => clickKeyButton(KEY_PANEL_BUTTON_INPUT_CLEAR)
                                        }}
                                    /> }
                                </SpineW>

                                <TextW
                                    delayVisisble={key !== KEY_PANEL_BUTTON_INPUT ? 600 : null}
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
                                    style={new TextStyle(style)}
                                    text={getText({ text, keyTranslation, chipKey, key })}
                                    anchor={[0.5, 0.6]}
                                />
                            </ContainerW>
                        );
                    })
                }
            </SpineW>

        </ContainerW>
    );
};
