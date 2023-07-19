import { Sprite } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { useCallback, useState } from 'react';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import { ScrollBoxW } from 'components/Common/wrapper/ScrollBoxW';

import {
    mainPosition,
    POPUP_CONTENT_SCROLL_HEIGHT,
    POPUP_CONTENT_SCROLL_WIDTH,
    POPUP_CURRENCY_ITEM_HEIGHT,
    POPUP_CURRENCY_ITEM_WIDTH
} from 'config/Scratch Card/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { TextW } from 'components/Common/wrapper/TextW';
import { usePopup } from 'components/Common/popups/features/usePopup';
import { useStore } from '@nanostores/react';
import { POPUP_BIG_TITLE_TXT, POPUP_BIG_TXT_BUTTON_ONE, POPUP_BIG_TXT_CURRENCY } from 'const/Scratch Card/textStyles';

import { applyOrientation } from 'utils/applyOrientation';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { useStoreUserState } from 'store/Default/user/store_F';
import { KEY_SETTING_GROUP_POPUPS_BIG } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { fractionDigits } from 'utils/fractionDigits';

export const PopupAccountsComponent = (props) => {
    const {
        resource = 'dynamic_big-popups_center',
        title: {
            text: titleText = '',
            scale: titleScale = [1, -1],
            anchor: titleAnchor = [0.5, 0.5],
            style: titleStyle = {},
            slot: titleSlot = 'slot_text2'
        } = {},
        buttonOne: {
            slot: buttonOneSlot = 'slot_ok',
            resource: buttonOneResource = 'dynamic_button-ok',
            isShow: buttonOneIsShow = true,
            text: buttonOneText = 'PLAY',
            anchor: buttonOneAnchor = [0.5, 0.5],
            scale: buttonOneScale = [2, -2]
        } = {},
        scroll: {
            slotScroll = 'slot_text'
        } = {}
    } = props;

    const [stateElementWallet, setStateElementWallet] = useState([]);

    const {
        app, isShow, storeKeyActionShow,
        isResize, setStateButtonRef, setStatePopupRef,
        isShowText,
        setIsShowText,
        stateButtons,
        statePopup
    } = usePopup({ props, hideAnimationName: 'currency/hide' });
    const { accounts = [], activeIdAccount } = useStore(useStoreUserState);

    const setStateRef = useCallback((state) => {
        stateElementWallet.push(state);
        setStateElementWallet(stateElementWallet);
    }, [stateElementWallet]);

    const clickElementWallet = async ({ walletID = null, element = null }) => {
        stateElementWallet.forEach(state => {
            state.setAnimation(0, 'normal', false);
        });

        element.state.setAnimation(0, 'pressed', false);
        await useStoreUserActions.selectAccounts(walletID);

        const promiseAll = [];
        for (const key in stateButtons) {
            promiseAll.push(stateButtons[key].setAnimation(0, 'hide', false));
        }
        setIsShowText(false);
        await statePopup[resource].setAnimation(0, 'hide', false,
            { groupConfig: KEY_SETTING_GROUP_POPUPS_BIG, configName: 'скрыть' });
        // Promise.all(promiseAll);
        useStorePopupsState.setKey(storeKeyActionShow, false);
    };

    const clickButton = async (name) => {
        setIsShowText(false);

        const promiseAll = [];

        for (const key in stateButtons) {
            promiseAll.push(stateButtons[key].setAnimation(0, 'hide', false));
        }

        await statePopup[resource].setAnimation(0,
            'select-currency/hide',
            false,
            { groupConfig: KEY_SETTING_GROUP_POPUPS_BIG, configName: 'скрыть' });
        useStorePopupsState.setKey(storeKeyActionShow, false);
        setIsShowText(true);
    };

    return (
        isShow && <ContainerW position={mainPosition} visible={isShow}>
            {
                <Sprite
                    anchor={0.5}
                    alpha={0.8}
                    width={4e3}
                    height={4e3}
                    interactive={true}
                    texture={useCustomTextures(app, { alpha: 1 })}
                />
            }
            <SpineW
                spineDataKey={resource}
                animations={[
                    { name: 'select-currency/show', initial: true, configName: 'показать', groupConfig: KEY_SETTING_GROUP_POPUPS_BIG }
                ]}
                animationStateCallback={setStatePopupRef}
            >

                <TextW
                    parentSlotName={titleSlot}
                    style={new TextStyle({ ...POPUP_BIG_TITLE_TXT, ...titleStyle })}
                    anchor={titleAnchor}
                    scale={titleScale}
                    text={titleText}
                />

                <ContainerW
                    appProvider={app}
                    parentSlotName={slotScroll}
                    props={{
                        [PORTRAIT]: {
                            y: -120,
                            scale: {
                                x: 1.5,
                                y: -1.5
                            }
                        },
                        [LANDSCAPE]: {
                            y: -120,
                            x: -30,
                            scale: {
                                x: 1.3,
                                y: -1.3
                            }
                        }
                    }}
                >
                    {!isResize && <ScrollBoxW
                        height={POPUP_CONTENT_SCROLL_HEIGHT[applyOrientation()]}
                        width={POPUP_CONTENT_SCROLL_WIDTH[applyOrientation()]}
                    >

                        {...accounts.map((item, index) => {
                            return (
                                <ContainerW
                                    appProvider={app}
                                    props={{
                                        [PORTRAIT]: {
                                            x: 0,
                                            y: index * POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()]
                                        },
                                        [LANDSCAPE]: {
                                            x: index % 2 ? POPUP_CONTENT_SCROLL_WIDTH[applyOrientation()] / 2 : 0,
                                            y: Math.floor(index / 2) * POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()]
                                        }
                                    }}
                                >
                                    <SpineW
                                        pointerup={{
                                            emit: (e: any = {}) => clickElementWallet({
                                                walletID: item.id,
                                                element: e
                                            })
                                        }}
                                        appProvider={app}
                                        spineDataKey="dynamic_button-currency"
                                        animationStateCallback={setStateRef}
                                        props={{
                                            [PORTRAIT]: {
                                                x: POPUP_CURRENCY_ITEM_WIDTH[applyOrientation()] / 2,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            },
                                            [LANDSCAPE]: {
                                                x: POPUP_CURRENCY_ITEM_WIDTH[applyOrientation()] / 2,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            }
                                        }}
                                        animations={[
                                            { name: 'show', initial: true, configName: 'аккаунт показать', groupConfig: KEY_SETTING_GROUP_POPUPS_BIG },
                                            {
                                                name: activeIdAccount === item.id ? 'pressed' : 'normal',
                                                loop: true
                                            }
                                        ]}
                                    />
                                    <TextW
                                        style={new TextStyle(POPUP_BIG_TXT_CURRENCY)}
                                        anchor={[0, 0.6]}
                                        isResizeText={0.98}
                                        text={fractionDigits(item.balance, 2, 2)}
                                        props={{
                                            [PORTRAIT]: {
                                                x: 140,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            },
                                            [LANDSCAPE]: {
                                                x: 140,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            }
                                        }}
                                    />
                                    <TextW
                                        style={new TextStyle(POPUP_BIG_TXT_CURRENCY)}
                                        anchor={[1, 0.6]}
                                        text={item.currency_code}
                                        props={{
                                            [PORTRAIT]: {
                                                x: POPUP_CURRENCY_ITEM_WIDTH[applyOrientation()] - 85,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            },
                                            [LANDSCAPE]: {
                                                x: POPUP_CURRENCY_ITEM_WIDTH[applyOrientation()] - 85,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            }
                                        }}
                                    />
                                </ContainerW>
                            );
                        })
                        }

                    </ScrollBoxW>
                    }
                </ContainerW>
            </SpineW>
            <SpineW
                spineDataKey="dynamic_big-popups_anchor_center"
            >
                {
                    buttonOneIsShow && <ContainerW
                        parentSlotName={buttonOneSlot}
                        appProvider={app}
                        scale={[1.2, -1.2]}
                        visible={isShowText}
                    >
                        <SpineW
                            appProvider={app}
                            spineDataKey={buttonOneResource}
                            animations={[
                                { name: 'show', initial: true, configName: 'кнопка появления', groupConfig: KEY_SETTING_GROUP_POPUPS_BIG }
                            ]}
                            pointerup={{ emit: () => clickButton('buttonTwo') }}
                            animationStateCallback={setStateButtonRef}
                            props={{
                                [PORTRAIT]: {
                                    y: -2,
                                    scale: { x: 1, y: 1 }
                                },
                                [LANDSCAPE]: {
                                    y: -2,
                                    scale: { x: 1, y: 1 }
                                }
                            }}
                        >
                            <TextW
                                parentSlotName="slot_text"
                                style={new TextStyle(POPUP_BIG_TXT_BUTTON_ONE)}
                                text={buttonOneText}
                                anchor={buttonOneAnchor}
                                scale={buttonOneScale}
                            />
                        </SpineW>
                    </ContainerW>
                }
            </SpineW>
        </ContainerW>
    );
};
