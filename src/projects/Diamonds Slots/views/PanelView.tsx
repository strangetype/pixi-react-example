import { TextStyle } from 'pixi.js';
import { PANEL_BUTTONS } from 'const/Diamonds Slots/PANEL_MAP';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { TextW } from 'components/Common/wrapper/TextW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { useStoreUserState } from 'store/Default/user/store_F';
import { panelPosition } from 'config/Diamonds Slots/positions';
import { usePanelView } from 'projects/features/usePanelView';
import {
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_PLAY,
    KEY_PANEL_BUTTON_SELECT_BALANCE
} from 'const/Common/KEYS_BUTTONS';

export const PanelView = () => {
    const { clickKeyButton } = useStorePopupsActions;
    const {
        app,
        getText, animationStateCallback, accounts
    } = usePanelView({
        PANEL_BUTTONS
    });

    return (
        <ContainerW position={panelPosition}>
            <SpineW
                spineDataKey="wood_bg"
                animations={[
                    { name: 'show', groupConfig: 'панель ставок', configName: 'панель показать', initial: true },
                    { name: 'loop', groupConfig: 'панель ставок', configName: 'панель пост. танимация', loop: true }
                ]}
            />

            <SpineW
                spineDataKey="anchor_btns_cut"
            >
                {
                    PANEL_BUTTONS.map(({
                        slot,
                        style,
                        spineDataKey,
                        text = null,
                        keyTranslation = null,
                        chipKey = null,
                        key = null,
                        props = null
                    }) => {
                        const isSelectDisabled = ((key === KEY_PANEL_BUTTON_SELECT_BALANCE && accounts.length > 1) || (key !== KEY_PANEL_BUTTON_SELECT_BALANCE));
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
                                        {
                                            name: 'show',
                                            groupConfig: 'панель ставок',
                                            configName: 'кнопка: показать',
                                            initial: true
                                        },
                                        {
                                            name: isSelectDisabled
                                                ? 'loop1' : 'loop4',
                                            groupConfig: 'панель ставок',
                                            configName: 'кнопка: пост анимация',
                                            loop: true
                                        }
                                    ]}
                                    animationStateCallback={(state) => animationStateCallback(state, key)}
                                    {...(isSelectDisabled ? {
                                        pointerup: {
                                            emit: () => clickKeyButton(key)
                                        }
                                    } : {})}
                                />
                                <TextW
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
                                    isResizeText={[KEY_PANEL_BUTTON_SELECT_BALANCE, KEY_PANEL_BUTTON_PLAY].includes(key) ? 0.970 : null}
                                    style={new TextStyle(style)}
                                    text={getText({ text, keyTranslation, chipKey, key })}
                                    props={props}
                                    scale={key === KEY_PANEL_BUTTON_PLAY ? [0.75, 0.75] : [1, 1]}
                                    anchor={0.5}
                                />
                            </ContainerW>

                        );
                    })
                }
            </SpineW>

        </ContainerW>
    );
};
