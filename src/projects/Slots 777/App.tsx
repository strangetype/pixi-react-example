import { useEffect } from 'react';

import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { PopupComponent } from 'components/Slots 777/popups/PopupComponent';
import { KeyboardComponent } from 'components/Common/keyboard/KeyboardComponent';
import { PopupAccountsComponent } from 'components/Slots 777/popups/PopupAccounts';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { PanelView } from 'projects/Slots 777/views/PanelView';
import MachineView from 'projects/Slots 777/views/MachineView';
import { TopMenuView } from 'projects/Slots 777/views/TopMenuView';
import { OnboardingView } from 'projects/Slots 777/views/OnboardingView';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { TextStyle } from 'pixi.js';
import {
    POPUP_BTN_TXT_DANGER_STYLE
} from 'const/Slots 777/textStyles';

const App = () => {
    const { translations } = useStoreSettingsState.get();
    console.log(translations);

    const popupsData = [
        {
            type: 'exit',
            storeKeyActionShow: 'isShowExit',
            resource: 'pop_up',
            anchorResource: 'anchor_btnUP_popup',
            message: {
                text: translations['popup.exit']
            },
            buttonOne: {
                resource: 'btn2_ok',
                slot: 'btnPU2_1',
                text: translations['button_text.cancel'],
                action: Function
            },
            buttonTwo: {
                resource: 'btnPU3_win_lose',
                slot: 'btnPU3',
                text: translations['button_text.exit'],
                textStyleBtnTwo: new TextStyle(POPUP_BTN_TXT_DANGER_STYLE),
                action: useStorePopupsActions.exitApp
            }
        },
        {
            type: 'htp',
            storeKeyActionShow: 'isShowRules',
            resource: 'big_popups',
            anchorResource: 'anchor_big_popups',
            scroll: {
                isScroll: true,
                title: translations['rule_menu.title'],
                message: () => {
                    const { limits } = useStoreSettingsState.get();
                    const { currency_code } = useStoreUserGetters.getActiveAccount();
                    return (
                        translations['rule_menu.rules']
                            .replace('$1', `${limits.max_bet} ${currency_code}`)
                            .replace('$2', `${limits.min_bet} ${currency_code}`) +
            '\n\n Version app: ' +
            // eslint-disable-next-line no-undef
            __VERSION__
                    );
                }
            },
            buttonOne: {
                text: translations['button_text.close'],
                resource: 'btn2_ok',
                slot: 'btn2'
            },
            buttonTwo: {
                isShow: false
            },
            isAnchorHasSkins: true,
            skin: 'h',
            vSkin: 'v'
        },
        {
            type: 'win',
            storeKeyActionShow: 'win',
            resource: 'popup_win_lose',
            anchorResource: 'anchor_btnUP_popup',
            messageAncher: [0.5, 0.65],
            buttonOne: {
                resource: 'btnPU3_win_lose',
                slot: 'btnPU2_1',
                textStyleBtnOne: new TextStyle(POPUP_BTN_TXT_DANGER_STYLE),
                text: translations['button_text.change_stake'],
                action: useStorePopupsActions.changeStake,
                x: 0,
                y: -180
            },
            buttonTwo: {
                resource: 'btn2_ok',
                slot: 'btnPU3',
                text: translations['button_text.play_again'],
                x: 0,
                y: -180,
                action: () => setTimeout(() => (useStorePopupsActions.playAgain()), 1000)
            }
        },

        {
            type: 'lose',
            storeKeyActionShow: 'isShowLose',
            resource: 'popup_win_lose',
            anchorResource: 'anchor_btnUP_popup',
            messageAncher: [0.5, 0.65],
            message: {
                slot: 'text2',
                text: translations['popup.you_lose']
            },
            buttonOne: {
                resource: 'btnPU3_win_lose',
                textStyleBtnOne: new TextStyle(POPUP_BTN_TXT_DANGER_STYLE),
                slot: 'btnPU2_1',
                y: -180,
                text: translations['button_text.change_stake'],
                action: useStorePopupsActions.changeStake
            },
            buttonTwo: {
                resource: 'btn2_ok',
                slot: 'btnPU3',
                y: -180,
                text: translations['button_text.play_again'],
                action: () => setTimeout(() => (useStorePopupsActions.playAgain()), 1000)
            }
        },
        {
            type: 'bet_to_min',
            resource: 'pop_up',
            anchorResource: 'anchor_btnUP_popup',
            storeKeyActionShow: 'warningSummaMin',
            message: {
                text: translations['popup.up_bet_to_min']
            },
            buttonOne: {
                resource: 'btnPU3_win_lose',
                slot: 'btnPU2_1',
                text: translations['button_text.cancel'],
                textStyleBtnOne: new TextStyle(POPUP_BTN_TXT_DANGER_STYLE),
                action: useStorePopupsActions.stakeMinCancel
            },
            buttonTwo: {
                resource: 'btn2_ok',
                slot: 'btnPU3',
                text: translations['button_text.ok'],
                action: useStorePopupsActions.stakeMin
            }
        },
        {
            type: 'max_bound',
            resource: 'pop_up',
            anchorResource: 'anchor_btnUP_popup',
            storeKeyActionShow: 'warningSummaMax',
            message: {
                text: translations['popup.up_bet_to_min']
            },
            buttonOne: {
                text: translations['button_text.ok'],
                resource: 'btn2_ok',
                slot: 'btnPU2_2',
                action: useStorePopupsActions.stakeMax
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'low_balance',
            resource: 'pop_up',
            anchorResource: 'anchor_btnUP_popup',
            storeKeyActionShow: 'isShowLowBalance',
            message: {
                text: translations['popup.low_balance']
            },
            buttonOne: {
                text: translations['button_text.ok'],
                resource: 'btn2_ok',
                slot: 'btnPU2_2'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'error',
            resource: 'pop_up',
            anchorResource: 'anchor_btnUP_popup',
            storeKeyActionShow: 'isShowNetworkError',
            message: {
                text: translations['popup.network_error']
            },
            buttonOne: {
                isShow: false
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'network',
            resource: 'pop_up',
            anchorResource: 'anchor_btnUP_popup',
            storeKeyActionShow: 'isShowNetworkConnection',
            message: {
                text: translations['popup.network']
            },
            buttonOne: {
                text: translations['button_text.continue'],
                resource: 'btn2_ok',
                slot: 'btnPU2_2'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'session_expired',
            resource: 'pop_up',
            anchorResource: 'anchor_btnUP_popup',
            storeKeyActionShow: 'ajaxError',
            buttonOne: {
                text: translations['button_text.continue'],
                resource: 'btn2_ok',
                slot: 'btnPU2_2'
            },
            buttonTwo: {
                isShow: false
            }
        }
    ];

    useEffect(() => {
        window.addEventListener('offline', (e) => {
            useStorePopupsState.setKey('isShowNetworkError', true);
        });

        window.addEventListener('online', (e) => {
            useStorePopupsState.setKey('isShowNetworkError', false);
            useStorePopupsState.setKey('isShowNetworkConnection', true);
        });
    }, []);

    return (
        <>
            <MachineView />
            <PanelView />
            <TopMenuView />
            <OnboardingView/>
            <KeyboardComponent />
            {popupsData.map((item) => {
                return <PopupComponent {...item} key={item.storeKeyActionShow} />;
            })}
            <PopupAccountsComponent
                storeKeyActionShow="isShowAccounts"
                scroll={{
                    title: translations['popup.currency']
                }}
                buttonOne={{
                    text: translations['button_text.close']
                }}
            />
        </>
    );
};

export default App;
