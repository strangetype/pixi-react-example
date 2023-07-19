import { useEffect } from 'react';

import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { PopupComponent } from 'components/Diamonds Slots/popups/PopupComponent';
import { KeyboardComponent } from 'components/Common/keyboard/KeyboardComponent';
import { PopupAccountsComponent } from 'components/Diamonds Slots/popups/PopupAccounts';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { PanelView } from 'projects/Diamonds Slots/views/PanelView';
import MachineView from 'projects/Diamonds Slots/views/MachineView';
import { TopMenuView } from 'projects/Diamonds Slots/views/TopMenuView';
import { OnboardingView } from 'projects/Diamonds Slots/views/OnboardingView';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { useStorePopupsState } from 'store/Default/popup/store_F';

const App = () => {
    const { translations } = useStoreSettingsState.get();

    const popupsData = [
        {
            type: 'exit',
            storeKeyActionShow: 'isShowExit',
            message: {
                text: translations['popup.exit']
            },
            buttonOne: {
                text: translations['button_text.cancel'],
                action: Function
            },
            buttonTwo: {
                text: translations['button_text.exit'],
                action: useStorePopupsActions.exitApp
            }
        },
        {
            type: 'how_to_play',
            storeKeyActionShow: 'isShowRules',
            resource: 'current_Hov_to_play',
            anchorResource: 'anchor_current_htp',
            scroll: {
                isScroll: true,
                title: translations['rule_menu.title'],
                message: () => {
                    const { limits } = useStoreSettingsState.get();
                    const { currency_code } = useStoreUserGetters.getActiveAccount();
                    // @ts-ignore
                    // eslint-disable-next-line no-undef
                    return translations['rule_menu.rules'].replace('$1', `${limits.max_bet} ${currency_code}`).replace('$2', `${limits.min_bet} ${currency_code}`) + '\n\n Version app: ' + __VERSION__;
                }
            },
            buttonOne: {
                text: translations['button_text.close'],
                resource: 'btn2PU',
                slot: 'btn3PU7'
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
            buttonOne: {
                text: translations['button_text.change_stake'],
                action: useStorePopupsActions.changeStake
            },
            buttonTwo: {
                text: translations['button_text.play_again'],
                action: useStorePopupsActions.playAgain
            }
        },
        {
            type: 'lose',
            storeKeyActionShow: 'isShowLose',
            message: {
                text: translations['popup.you_lose']
            },
            buttonOne: {
                text: translations['button_text.change_stake'],
                action: useStorePopupsActions.changeStake
            },
            buttonTwo: {
                text: translations['button_text.play_again'],
                action: useStorePopupsActions.playAgain
            }
        },
        {
            type: 'min10',
            storeKeyActionShow: 'warningSummaMin',
            message: {
                text: translations['popup.up_bet_to_min']
            },
            buttonOne: {
                text: translations['button_text.cancel'],
                action: useStorePopupsActions.stakeMinCancel
            },
            buttonTwo: {
                text: translations['button_text.ok'],
                action: useStorePopupsActions.stakeMin
            }
        },
        {
            type: 'max',
            storeKeyActionShow: 'warningSummaMax',
            resource: 'popup',
            anchorResource: 'anchor_popup_btn',
            message: {
                text: translations['popup.up_bet_to_min']
            },
            buttonOne: {
                text: translations['button_text.ok'],
                resource: 'btn2PU',
                slot: 'btn2PU',
                action: useStorePopupsActions.stakeMax
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'low_balance',
            storeKeyActionShow: 'isShowLowBalance',
            resource: 'popup',
            anchorResource: 'anchor_popup_btn',
            message: {
                text: translations['popup.low_balance']
            },
            buttonOne: {
                text: translations['button_text.ok'],
                resource: 'btn2PU',
                slot: 'btn2PU'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'no_connection',
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
            storeKeyActionShow: 'isShowNetworkConnection',
            message: {
                text: translations['popup.network']
            },
            buttonOne: {
                text: translations['button_text.continue'],
                resource: 'btn2PU',
                slot: 'btn2PU'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'no_connection',
            storeKeyActionShow: 'ajaxError',
            buttonOne: {
                text: translations['button_text.continue'],
                resource: 'btn2PU',
                slot: 'btn2PU'
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
            <PanelView/>
            <MachineView/>
            <TopMenuView/>
            <OnboardingView/>
            <KeyboardComponent/>
            {
                popupsData.map((item) => {
                    return (
                        <PopupComponent {...item} key={item.storeKeyActionShow}/>
                    );
                })
            }
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
