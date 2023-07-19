import { useEffect, useState } from 'react';

import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { PopupComponent } from 'components/Money Wheel/popups/PopupComponent';
import { KeyboardComponent } from 'components/Common/keyboard/KeyboardComponent';
import { PopupAccountsComponent } from 'components/Money Wheel/popups/PopupAccounts';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { PanelView } from 'projects/Money Wheel/views/PanelView';
import { TopMenuView } from 'projects/Money Wheel/views/TopMenuView';
import { OnboardingView } from 'projects/Money Wheel/views/OnboardingView';
import GameView from 'projects/Money Wheel/views/GameView';
import storage from 'utils/storage';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { useStorePopupsState } from 'store/Default/popup/store_F';

const App = () => {
    const { translations } = useStoreSettingsState.get();
    const [isShowOnboarding, setIsShowOnboarding] = useState(false);

    const popupsData = [
        {
            storeKeyActionShow: 'isShowExit',
            message: {
                text: translations['popup.exit'],
                slot: 't2'
            },
            buttonOne: {
                text: translations['button_text.exit'],
                action: useStorePopupsActions.exitApp
            },
            buttonTwo: {
                text: translations['button_text.cancel'],
                action: Function
            }
        },
        {
            type: 'how_to_play',
            storeKeyActionShow: 'isShowRules',
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
                slot: 'btnP3'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'win',
            storeKeyActionShow: 'win',
            message: {
                slot: 't2'
            },
            title: {
                text: translations['popup.title.you_won'],
                slot: 't1'
            },
            buttonOne: {
                text: translations['button_text.play_again'],
                action: useStorePopupsActions.playAgain,
                anchor: [0.5, 0.3]
            },
            buttonTwo: {
                text: translations['button_text.change_stake'],
                action: useStorePopupsActions.changeStake,
                anchor: [0.5, 0.7],
                scale: [1, -1],
                isResizeText: 0.985
            }
        },
        {
            type: 'lose',
            storeKeyActionShow: 'isShowLose',
            title: {
                text: translations['popup.title.you_lose']
            },
            message: {
                text: translations['popup.you_lose'],
                slot: 't2'
            },
            buttonOne: {
                text: translations['button_text.play_again'],
                action: useStorePopupsActions.playAgain,
                anchor: [0.5, 0.3]
            },
            buttonTwo: {
                text: translations['button_text.change_stake'],
                action: useStorePopupsActions.changeStake,
                anchor: [0.5, 0.7],
                scale: [1, -1],
                isResizeText: 0.985
            }
        },
        {
            storeKeyActionShow: 'warningSummaMin',
            message: {
                text: translations['popup.up_bet_to_min'],
                slot: 't2',
                scale: [0.92, -0.92]
            },
            buttonOne: {
                text: translations['button_text.ok'],
                action: useStorePopupsActions.stakeMin
            },
            buttonTwo: {
                text: translations['button_text.cancel'],
                action: useStorePopupsActions.stakeMinCancel
            }
        },
        {
            type: 'no_money',
            storeKeyActionShow: 'warningSummaMax',
            resource: 'popup',
            anchorResource: 'anchor_popup_btn',
            message: {
                text: translations['popup.up_bet_to_min'],
                slot: 't2'
            },
            buttonOne: {
                text: translations['button_text.ok'],
                slot: 'btnP1',
                action: useStorePopupsActions.stakeMax
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'no_money',
            storeKeyActionShow: 'isShowLowBalance',
            resource: 'popup',
            anchorResource: 'anchor_popup_btn',
            message: {
                text: translations['popup.low_balance'],
                slot: 't2'
            },
            buttonOne: {
                text: translations['button_text.ok'],
                action: useStorePopupsActions.noMoneyOk
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'internet_restored',
            storeKeyActionShow: 'isShowNetworkError',
            message: {
                text: translations['popup.network_error'],
                slot: 'Small_Popup_Paper4',
                scale: [1, 1]
            },
            buttonOne: {
                isShow: false
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'internet_restored',
            storeKeyActionShow: 'isShowNetworkConnection',
            message: {
                text: translations['popup.network'],
                slot: 'Small_Popup_Paper4',
                scale: [1, 1]
            },
            buttonOne: {
                text: translations['button_text.continue']
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'internet_restored',
            storeKeyActionShow: 'ajaxError',
            message: {
                text: translations['popup.session_expired'],
                slot: 'Small_Popup_Paper4',
                scale: [1, 1]
            },
            buttonOne: {
                text: translations['button_text.continue']
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

        const { paramsUrl: { onb = null } = {} } = useStoreSettingsState.get();

        if (onb || !storage.get('onboarding')) {
            setIsShowOnboarding(true);
            useStorePopupsState.setKey('isShowOnboarding', true);
        }
    }, []);

    return (
        <>
            <GameView/>
            <PanelView/>
            <TopMenuView/>
            {isShowOnboarding && <OnboardingView/>}
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
