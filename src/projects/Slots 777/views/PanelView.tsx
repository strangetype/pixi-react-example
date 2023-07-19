import { TextStyle } from 'pixi.js';
import { PANEL_BUTTONS } from 'const/Slots 777/PANEL_MAP';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { TextW } from 'components/Common/wrapper/TextW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { useStoreUserState } from 'store/Default/user/store_F';
import { panelPosition } from 'config/Slots 777/positions';
import { usePanelView } from 'projects/features/usePanelView';
import {
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_SELECT_BALANCE
} from 'const/Common/KEYS_BUTTONS';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import React, { useCallback, useEffect, useState } from 'react';
import { useStoreComputed } from 'features/useComputed';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import {
    TXT_RULE_MUL_STYLE,
    TXT_RULE_MUL_STYLE_PANEL
} from 'const/Slots 777/textStyles';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { fractionDigits } from 'utils/fractionDigits';
import { useStore } from '@nanostores/react';

export const PanelView = (props) => {
    const { isResize } = useStore(useStoreSettingsState);
    const { translations } = useStoreSettingsState.get();
    const { clickKeyButton } = useStorePopupsActions;
    const { app, getText, animationStateCallback, accounts } = usePanelView({
        PANEL_BUTTONS
    });

    const [rulesKof, setRulesKof] = useState([]);
    const [animationState, setAnimationState] = useState(null as any);
    const [winningsData, setWinningsData] = useState(null);
    const { currency_code: currencyCode } =
    useStoreUserGetters.getActiveAccount();

    const stateRef = useCallback(
        (state) => {
            setAnimationState(state);
        },
        [animationState]
    );

    useEffect(() => {
        const getRule = useStoreComputed(
            useStoreSettingsState,
            [{ key: 'rules', init: true }],
            ({ rules = [], ...val }) => {
                setRulesKof(rules);
            }
        );
        const gemeState = useStoreComputed(
            useStoreGamesState,
            ['isGamingAnimation'],
            ({ isGamingAnimation }) => {
                if (!isGamingAnimation) {
                    const { winnings } = useStoreGamesState.get();
                    setWinningsData(winnings || 0);
                }
            }
        );

        return () => {
            getRule.cancel();
            gemeState.cancel();
        };
    }, []);

    return (
        <>
            {
                !isResize && <ContainerW position={panelPosition}>
                    <SpineW spineDataKey="anchor_game_buttons">
                        {PANEL_BUTTONS.map(
                            ({
                                slot,
                                style,
                                spineDataKey,
                                text = null,
                                keyTranslation = null,
                                chipKey = null,
                                key = null,
                                props = null,
                                position = null
                            }) => {
                                const isSelectDisabled =
                  (key === KEY_PANEL_BUTTON_SELECT_BALANCE &&
                    accounts.length > 1) ||
                  key !== KEY_PANEL_BUTTON_SELECT_BALANCE;
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
                                                    name: isSelectDisabled ? 'loop1' : 'loop4',
                                                    groupConfig: 'панель ставок',
                                                    configName: 'кнопка: пост анимация',
                                                    loop: true
                                                }
                                            ]}
                                            animationStateCallback={(state) =>
                                                animationStateCallback(state, key)
                                            }
                                            {...(isSelectDisabled
                                                ? {
                                                    pointerup: {
                                                        emit: () => clickKeyButton(key)
                                                    }
                                                }
                                                : {})}
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
                                            style={new TextStyle(style)}
                                            text={getText({ text, keyTranslation, chipKey, key })}
                                            props={{ ...props, ...position }}
                                            anchor={0.5}
                                        />
                                    </ContainerW>
                                );
                            }
                        )}
                        {rulesKof.map((rule, index) => {
                            return (
                                <TextW
                                    key={`${rule.multiplier + index}`}
                                    parentSlotName={`rt_1_${index + 17}`}
                                    style={new TextStyle(TXT_RULE_MUL_STYLE_PANEL())}
                                    text={rule.symbols
                                        .map((el) => (el === null ? '*' : el))
                                        .join('')}
                                    anchor={[0.5, 0.5]}
                                    scale={[1, -1]}
                                    props={{
                                        [PORTRAIT]: {
                                            x: 0,
                                            y: 0
                                        },
                                        [LANDSCAPE]: {
                                            x: -40,
                                            y: 0
                                        }
                                    }}
                                />
                            );
                        })}
                        {rulesKof.map((rule, index) => {
                            return (
                                <TextW
                                    key={`${rule.multiplier + index}`}
                                    parent="anchor_game_buttons"
                                    parentSlotName={`rt_3_${index + 17}`}
                                    style={new TextStyle(TXT_RULE_MUL_STYLE_PANEL())}
                                    text={`x${rule.multiplier}`}
                                    anchor={[0.5, 0.5]}
                                    scale={[1, -1]}
                                    props={{
                                        [PORTRAIT]: {
                                            x: 0,
                                            y: 0
                                        },
                                        [LANDSCAPE]: {
                                            x: -30,
                                            y: 0
                                        }
                                    }}
                                />
                            );
                        })}

                        {winningsData !== null && (
                            <TextW
                                parent="anchor_game_buttons"
                                parentSlotName={'max_win_txt'}
                                style={new TextStyle(TXT_RULE_MUL_STYLE)}
                                text={`${translations.your_win} ${fractionDigits(
                                    winningsData || 0,
                                    2,
                                    2
                                )} ${currencyCode}`}
                                anchor={[0.5, 0.5]}
                                scale={[1, -1]}
                                props={{
                                    [PORTRAIT]: {
                                        x: 0,
                                        y: -0
                                    },
                                    [LANDSCAPE]: {
                                        x: -20,
                                        y: 0
                                    }
                                }}
                            />
                        )}
                    </SpineW>
                    <ContainerW>
                        <SpineW
                            spineDataKey="rates"
                            props={{
                                [PORTRAIT]: {
                                    x: -10,
                                    y: -0
                                },
                                [LANDSCAPE]: {
                                    x: -40,
                                    y: -0
                                }
                            }}
                            animationStateCallback={stateRef}
                            animations={[
                                {
                                    name: 'show',
                                    initial: true,
                                    groupConfig: 'стрелки',
                                    configName: 'стрелки: анимация появления'
                                }
                            ]}
                        ></SpineW>
                    </ContainerW>
                </ContainerW>
            }
        </>
    );
};
