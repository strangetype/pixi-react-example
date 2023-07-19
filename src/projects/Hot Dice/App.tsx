import { useEffect, useRef, useState } from 'react';

import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { PopupComponent } from 'components/Hot Dice/popups/PopupComponent';
import { KeyboardComponent } from 'components/Common/keyboard/KeyboardComponent';
import { PopupAccountsComponent } from 'components/Hot Dice/popups/PopupAccounts';
import { PanelView } from 'projects/Hot Dice/views/PanelView';
import { TopMenuView } from 'projects/Hot Dice/views/TopMenuView';
import GameView from 'projects/Hot Dice/views/GameView';
import storage from 'utils/storage';
import { Container } from '@inlet/react-pixi';
import { PopupRules } from 'components/Hot Dice/popups/PopupRules';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { DecorationView } from 'projects/Hot Dice/views/DecorationView';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { OnboardingView } from 'projects/Hot Dice/views/OnboardingView';
import { GameTableResult } from 'projects/Hot Dice/views/GameTableResult';

const App = () => {
    const { translations } = useStoreSettingsState.get();
    const [isShowOnboarding, setIsShowOnboarding] = useState(false);
    const refContainer = useRef(null);

    const propsDataRules = {
        storeKeyActionShow: 'isShowRules',
        title: {
            text: translations['rule_menu.title']
        },
        message: {
            text: () => {
                const { limits } = useStoreSettingsState.get();
                const { currency_code } = useStoreUserGetters.getActiveAccount();
                // @ts-ignore
                // eslint-disable-next-line no-undef
                return translations['rule_menu.rules'] && translations['rule_menu.rules'].replace('$1', `${limits.max_bet} ${currency_code}`).replace('$2', `${limits.min_bet} ${currency_code}`) + '\n\n Version app: ' + __VERSION__;
            }
        },
        buttonOne: {
            text: translations['button_text.close']
        }
    };

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
            type: 'win',
            storeKeyActionShow: 'win',
            message: {
                style: {
                    fill: '#7ED8FF',
                    fontSize: 42,
                    strokeThickness: 5
                }
            },
            buttonOne: {
                text: translations['button_text.change_stake'],
                // @ts-ignore
                action: useStorePopupsActions.renameStake
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
                text: translations['popup.you_lose'],
                style: {
                    fill: '#FF0000',
                    fontSize: 42,
                    strokeThickness: 5
                }
            },
            buttonOne: {
                text: translations['button_text.change_stake'],
                // @ts-ignore
                action: useStorePopupsActions.renameStake
            },
            buttonTwo: {
                text: translations['button_text.play_again'],
                action: useStorePopupsActions.playAgain
            }
        },
        {
            type: 'go_on',
            storeKeyActionShow: 'isShowTakeSum',
            message: {
                text: translations['popup.you_nextstep']
            },
            buttonOne: {
                text: translations['button_text.take'],
                // @ts-ignore
                action: useStorePopupsActions.takeSum
            },
            buttonTwo: {
                text: translations['button_text.nextstep'],
                resource: 'ppp_btnPU5',
                style: {
                    fill: '#FFDA92'
                }
            }
        },
        {
            type: 'max_money',
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
            type: 'max_bet2',
            storeKeyActionShow: 'warningSummaMax',
            message: {
                text: translations['popup.up_bet_to_min']
            },
            buttonOne: {
                text: translations['button_text.ok'],
                action: useStorePopupsActions.stakeMax,
                slot: 'btnPU4_3'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'no_money',
            storeKeyActionShow: 'isShowLowBalance',
            message: {
                text: translations['popup.low_balance']
            },
            buttonOne: {
                text: translations['button_text.ok'],
                slot: 'btnPU4_3'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'no_internet',
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
            type: 'internet',
            storeKeyActionShow: 'isShowNetworkConnection',
            message: {
                text: translations['popup.network']
            },
            buttonOne: {
                text: translations['button_text.continue'],
                slot: 'btnPU4_3'
            },
            buttonTwo: {
                isShow: false
            }
        },
        {
            type: 'error',
            storeKeyActionShow: 'ajaxError',
            message: {
                text: translations['popup.session_expired']
            },
            buttonOne: {
                text: translations['button_text.continue'],
                slot: 'btnPU4_3'
            },
            buttonTwo: {
                isShow: false
            }
        }
    ];

    useEffect(() => {
        const idTimeout = setTimeout(_ => {
            refContainer.current.sortChildren();
        }, 200);

        global.$emitter.on('HotDice_zIndex', () => {
            setTimeout(_ => {
                refContainer.current.sortChildren();
            }, 30);
        });

        return () => {
            clearTimeout(idTimeout);
            global.$emitter.off('HotDice_zIndex');
        };
    }, [refContainer.current, isShowOnboarding]);

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
        }
    }, []);

    return (
        <Container ref={refContainer}>
            <GameView/>
            <DecorationView/>
            <GameTableResult/>
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

            <PopupRules {...propsDataRules}/>
            <PopupAccountsComponent
                storeKeyActionShow="isShowAccounts"
                title={{
                    text: translations['popup.currency']
                }}
                buttonOne={{
                    text: translations['button_text.close']
                }}
            />
        </Container>
    );
};

export default App;
