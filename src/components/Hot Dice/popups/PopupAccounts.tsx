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
} from 'config/Hot Dice/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { TextW } from 'components/Common/wrapper/TextW';
import { usePopup } from 'components/Common/popups/features/usePopup';
import { useStore } from '@nanostores/react';
import { POPUP_BIG_TITLE_TXT, POPUP_BIG_TXT_BUTTON_ONE, POPUP_BIG_TXT_CURRENCY } from 'const/Hot Dice/textStyles';

import { applyOrientation } from 'utils/applyOrientation';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { useStoreUserState } from 'store/Default/user/store_F';
import { KEY_SETTING_GROUP_POPUPS_BIG } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { fractionDigits } from 'utils/fractionDigits';

export const PopupAccountsComponent = (props) => {
    const {
        resource = 'popup_bg',
        title: {
            text: titleText = '',
            scale: titleScale = [1, -1],
            anchor: titleAnchor = [0.5, 0.7],
            style: titleStyle = {},
            slot: titleSlot = 'slot_title'
        } = {},
        buttonOne: {
            slot: buttonOneSlot = 'slot_actions3',
            resource: buttonOneResource = 'btn_bonus_play',
            isShow: buttonOneIsShow = true,
            text: buttonOneText = 'PLAY',
            anchor: buttonOneAnchor = [0.5, 0.50],
            scale: buttonOneScale = [0.5, -0.5]
        } = {},
        scroll: {
            slotScroll = 'slot_body'
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
    } = usePopup({ props, hideAnimationName: 'hide' });
    const { accounts = [], activeIdAccount } = useStore(useStoreUserState);

    const setStateRef = useCallback((state) => {
        stateElementWallet.push(state);
        setStateElementWallet(stateElementWallet);
    }, [stateElementWallet]);

    const clickElementWallet = async ({ walletID = null, element = null }) => {
        stateElementWallet.forEach(state => {
            state.setAnimation(0, 'loop', false);
        });

        element.state.setAnimation(0, 'loop2', false);
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

        await statePopup[resource].setAnimation(0, 'hide', false,
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
                    { name: 'show', initial: true, configName: 'показать', groupConfig: KEY_SETTING_GROUP_POPUPS_BIG },
                    { name: 'loop', loop: true }
                ]}
                animationStateCallback={setStatePopupRef}
            >

                <TextW
                    parentSlotName={titleSlot}
                    style={new TextStyle({ ...POPUP_BIG_TITLE_TXT, ...titleStyle })}
                    anchor={titleAnchor}
                    scale={titleScale}
                    props={{
                        [PORTRAIT]: {
                            y: -4
                        },
                        [LANDSCAPE]: {
                            y: 0
                        }
                    }}
                    text={titleText}
                />

                <ContainerW
                    appProvider={app}
                    parentSlotName={slotScroll}
                    props={{
                        [PORTRAIT]: {
                            y: 1,
                            x: 1
                        },
                        [LANDSCAPE]: {
                            y: -10
                        }
                    }}
                    scale={[1, -1]}
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
                                            y: Math.floor(index / 2) * POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()],
                                            scale: {
                                                x: 0.9,
                                                y: 0.9
                                            }
                                        }
                                    }}
                                >
                                    <SpineW
                                        pointerup={{
                                            animationHover: null,
                                            emit: (e: any = {}) => clickElementWallet({
                                                walletID: item.id,
                                                element: e
                                            })
                                        }}
                                        appProvider={app}
                                        spineDataKey="btn_currency"
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
                                                name: activeIdAccount === item.id ? 'loop2' : 'loop',
                                                loop: true
                                            }
                                        ]}
                                    />
                                    <TextW
                                        style={new TextStyle(POPUP_BIG_TXT_CURRENCY)}
                                        anchor={[0, 0.5]}
                                        text={item.currency_code}
                                        props={{
                                            [PORTRAIT]: {
                                                x: 80,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            },
                                            [LANDSCAPE]: {
                                                x: 120,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            }
                                        }}
                                    />
                                    <TextW
                                        style={new TextStyle(POPUP_BIG_TXT_CURRENCY)}
                                        anchor={[1, 0.5]}
                                        isResizeText={0.98}
                                        text={fractionDigits(item.balance, 2, 2)}
                                        props={{
                                            [PORTRAIT]: {
                                                x: POPUP_CURRENCY_ITEM_WIDTH[applyOrientation()] - 60,
                                                y: POPUP_CURRENCY_ITEM_HEIGHT[applyOrientation()] / 2
                                            },
                                            [LANDSCAPE]: {
                                                x: POPUP_CURRENCY_ITEM_WIDTH[applyOrientation()] - 60,
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
                spineDataKey="big_popups_anchor"
            >
                {
                    buttonOneIsShow && <ContainerW
                        parentSlotName={buttonOneSlot}
                        appProvider={app}
                        scale={[1, -1]}
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
                                    scale: { x: 2, y: 2 }
                                },
                                [LANDSCAPE]: {
                                    y: -2,
                                    scale: { x: 2.1, y: 2.1 }
                                }
                            }}
                        >
                            <TextW
                                parentSlotName="t14"
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
