import { Container, Sprite, Text } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { useStore } from '@nanostores/react';
import { useCallback, useState } from 'react';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import { ACCOUNT_BALANCE_TXT_STYLE, POPUP_BTN_TXT_STYLE, TERMS_TITLE_TXT_STYLE } from 'const/Diamonds Slots/textStyles';
import { ScrollBoxW } from 'components/Common/wrapper/ScrollBoxW';

import {
    ACC_POPUP_ITEM_HEIGHT,
    ACC_POPUP_ITEM_OFFSET,
    ACC_POPUP_ITEM_WIDTH,
    ACC_POPUP_WIDTH,
    mainPosition, TERMS_POPUP_HEIGHT, TERMS_POPUP_WIDTH
} from 'config/Diamonds Slots/positions';
import { applyOrientation } from 'utils/applyOrientation';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { TextW } from 'components/Common/wrapper/TextW';
import { usePopup } from 'components/Common/popups/features/usePopup';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { KEY_SETTING_GROUP_POPUPS_BIG } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { fractionDigits } from 'utils/fractionDigits';

export const PopupAccountsComponent = (props) => {
    const {
        type = 'current',
        resource = 'current_Hov_to_play',
        anchorResource = 'anchor_current_htp',
        isNoAnchorAnimation = true,
        isAnchorHasSkins = true,
        skin = 'h',
        vSkin = 'v',
        buttonOne: {
            text: textButtonOne = '',
            resource: resourceButtonOne = 'btn2PU',
            slot: slotButtonOne = 'btn3PU7'
        } = {},
        scroll: {
            title: titleScroll = ''
        } = {}
    } = props;

    const [stateElementWallet, setStateElementWallet] = useState([]);

    const {
        app,
        isShow,
        clickButton,
        isResize,
        setStateButtonRef,
        setStatePopupRef,
        statePopup,
        setIsShowText,
        stateButtons,
        storeKeyActionShow
    } = usePopup({ props });
    const { accounts = [], activeIdAccount } = useStore(useStoreUserState);

    const setStateRef = useCallback((state) => {
        stateElementWallet.push(state);
        setStateElementWallet(stateElementWallet);
    }, [stateElementWallet]);

    const clickElementWallet = async ({ walletID = null, element = null }) => {
        stateElementWallet.forEach(state => {
            state.setAnimation(0, 'loop1', false);
        });

        element.state.setAnimation(0, 'loop2', false);
        await useStoreUserActions.selectAccounts(walletID);

        const promiseAll = [];
        for (const key in stateButtons) {
            promiseAll.push(stateButtons[key].setAnimation(0, 'hide', false));
        }
        setIsShowText(false);
        Promise.all(promiseAll);
        statePopup[resource].setAnimation(0, type + '/hide', false,
            { groupConfig: KEY_SETTING_GROUP_POPUPS_BIG, configName: 'скрыть' });
        setTimeout(_ => {
            useStorePopupsState.setKey(storeKeyActionShow, false);
        }, 200);
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
                skin={{
                    [PORTRAIT]: vSkin,
                    [LANDSCAPE]: skin
                }}
                animations={[
                    { name: type + '/show', initial: true, configName: 'показать', groupConfig: 'попап' },
                    { name: type + '/loop1', loop: true, configName: 'показать', groupConfig: 'попап' }
                ]}
                animationStateCallback={setStatePopupRef}
            >
                <>
                    <Container y={-30} scale={1}>
                        {!isResize && <ScrollBoxW
                            height={TERMS_POPUP_HEIGHT[applyOrientation()]}
                            width={TERMS_POPUP_WIDTH[applyOrientation()]}
                        >
                            {...accounts.map((item, index) => {
                                return (
                                    <ContainerW
                                        appProvider={app}
                                        props={{
                                            [PORTRAIT]: {
                                                x: ACC_POPUP_ITEM_OFFSET[applyOrientation()],
                                                y: index * ACC_POPUP_ITEM_HEIGHT[applyOrientation()]
                                            },
                                            [LANDSCAPE]: {
                                                x: index % 2 ? ACC_POPUP_ITEM_OFFSET[applyOrientation()] + ACC_POPUP_WIDTH[applyOrientation()] / 2 : ACC_POPUP_ITEM_OFFSET[applyOrientation()],
                                                y: Math.floor(index / 2) * ACC_POPUP_ITEM_HEIGHT[applyOrientation()]
                                            }
                                        }}
                                        scale={0.9}
                                    >
                                        <SpineW
                                            interactive={true}
                                            pointerup={{
                                                animationHover: null,
                                                emit: (e: any = {}) => clickElementWallet({
                                                    walletID: item.id,
                                                    element: e
                                                })
                                            }}
                                            appProvider={app}
                                            spineDataKey="btn3PU_current_htp"
                                            animationStateCallback={setStateRef}
                                            props={{
                                                [PORTRAIT]: {
                                                    x: ACC_POPUP_ITEM_WIDTH[applyOrientation()] / 2,
                                                    y: ACC_POPUP_ITEM_HEIGHT[applyOrientation()] / 2
                                                },
                                                [LANDSCAPE]: {
                                                    x: ACC_POPUP_ITEM_WIDTH[applyOrientation()] / 2,
                                                    y: ACC_POPUP_ITEM_HEIGHT[applyOrientation()] / 2
                                                }
                                            }}
                                            animations={[
                                                { name: 'show', initial: true, configName: 'аккаунт: показать' },
                                                {
                                                    name: activeIdAccount === item.id ? 'loop2' : 'loop1',
                                                    loop: true,
                                                    configName: 'аккаунт: пост анимация'
                                                }
                                            ]}
                                        />
                                        <TextW
                                            style={new TextStyle(ACCOUNT_BALANCE_TXT_STYLE)}
                                            anchor={[1, 0.5]}
                                            text={fractionDigits(item.balance, 2, 2)}
                                            props={{
                                                [PORTRAIT]: {
                                                    x: ACC_POPUP_ITEM_WIDTH[applyOrientation()] - 100,
                                                    y: ACC_POPUP_ITEM_HEIGHT[applyOrientation()] / 2
                                                },
                                                [LANDSCAPE]: {
                                                    x: ACC_POPUP_ITEM_WIDTH[applyOrientation()] - 100,
                                                    y: ACC_POPUP_ITEM_HEIGHT[applyOrientation()] / 2
                                                }
                                            }}
                                        />
                                        <TextW
                                            style={new TextStyle(ACCOUNT_BALANCE_TXT_STYLE)}
                                            anchor={[0, 0.5]}
                                            text={item.currency_code}
                                            props={{
                                                [PORTRAIT]: {
                                                    x: 80,
                                                    y: ACC_POPUP_ITEM_HEIGHT[applyOrientation()] / 2
                                                },
                                                [LANDSCAPE]: {
                                                    x: 120,
                                                    y: ACC_POPUP_ITEM_HEIGHT[applyOrientation()] / 2
                                                }
                                            }}
                                        />
                                    </ContainerW>
                                );
                            })
                            }
                        </ScrollBoxW>
                        }
                    </Container>
                    <TextW
                        style={new TextStyle(TERMS_TITLE_TXT_STYLE)}
                        props={{
                            [PORTRAIT]: {
                                x: 0,
                                y: -530
                            },
                            [LANDSCAPE]: {
                                x: 0,
                                y: -275
                            }
                        }}
                        text={titleScroll}
                        anchor={0.5}
                    />
                </>
            </SpineW>
            <SpineW
                appProvider={app}
                spineDataKey={anchorResource}
                skin={{
                    [PORTRAIT]: isAnchorHasSkins ? 'v' : null,
                    [LANDSCAPE]: isAnchorHasSkins ? 'h' : null
                }}
                animations={isNoAnchorAnimation ? [] : [
                    { name: 'show', initial: true, configName: 'кнопка: показать', groupConfig: 'попап' },
                    { name: 'loop1', loop: true, configName: 'кнопка: показать', groupConfig: 'попап' }
                ]}
            >
                <ContainerW
                    parentSlotName={slotButtonOne}
                    appProvider={app}
                    scale={[1, -1]}
                >
                    <SpineW
                        appProvider={app}
                        spineDataKey={resourceButtonOne}
                        skin={{
                            [PORTRAIT]: null,
                            [LANDSCAPE]: null
                        }}
                        animations={[
                            { name: 'show', initial: true, configName: 'кнопка: показать', groupConfig: 'попап' }
                            // { name: 'loop1', loop: true, configName: 'кнопка: пост анимаия', groupConfig: 'попап' }
                        ]}
                        keyState="buttonOne"
                        pointerup={{ emit: () => clickButton('buttonOne') }}
                        animationStateCallback={setStateButtonRef}
                    />
                    <Text
                        style={new TextStyle(POPUP_BTN_TXT_STYLE)}
                        text={textButtonOne}
                        anchor={[0.5, 0.5]}
                        y={0}
                        scale={[1]}
                    />

                </ContainerW>
            </SpineW>
        </ContainerW>
    );
};
