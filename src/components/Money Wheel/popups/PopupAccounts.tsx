import { Container, Sprite } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { useCallback, useState } from 'react';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import { ACCOUNT_BALANCE_TXT_STYLE, ACCOUNT_CURR_TXT_STYLE, POPUP_BTN_TXT_STYLE2 } from 'const/Money Wheel/textStyles';
import { ScrollBoxW } from 'components/Common/wrapper/ScrollBoxW';
import { ACC_POPUP_HEIGHT, ACC_POPUP_WIDTH, mainPosition } from 'config/Money Wheel/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { TextW } from 'components/Common/wrapper/TextW';
import { usePopup } from 'components/Common/popups/features/usePopup';
import { formatMoneyIntl } from 'utils/formatMoneyIntl';
import { useStore } from '@nanostores/react';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import {fractionDigits} from "utils/fractionDigits";

export const PopupAccountsComponent = (props) => {
    const {
        type = '',
        resource = 'Currency_Popup',
        buttonOne: {
            isShow: isShowButtonOne = true,
            text: textButtonOne = '',
            slot: slotButtonOne = 'Red_Line_Bottom6',
            resource: resourceButtonOne = 'btnP2'
        } = {}
    } = props;

    const [stateElementWallet, setStateElementWallet] = useState([]);

    const { app, isShow, clickButton, isResize, setStateButtonRef } = usePopup({ props, hideAnimationName: 'hide' });
    const { accounts = [], activeIdAccount } = useStore(useStoreUserState);

    const setStateRef = useCallback((state) => {
        stateElementWallet.push(state);
        setStateElementWallet(stateElementWallet);
    }, [stateElementWallet]);

    const clickElementWallet = async ({ walletID = null, element = null }) => {
        stateElementWallet.forEach(state => {
            state.setAnimation(0, 'loop', false);
        });

        element.state.setAnimation(0, 'loop_on', false);

        await useStoreUserActions.selectAccounts(walletID);

        clickButton('buttonOne');
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
                    { name: type + 'show', initial: true, configName: 'показать', groupConfig: 'попап' },
                    { name: type + 'loop', loop: true, configName: 'показать', groupConfig: 'попап' }
                ]}
                keyState="popup"
                animationStateCallback={setStateButtonRef}
            >
                <ContainerW
                    parentSlotName='t1'
                    appProvider={app}
                    props={{
                        [PORTRAIT]: {
                            y: -0.65 * ACC_POPUP_HEIGHT,
                            x: 0
                        },
                        [LANDSCAPE]: {
                            y: -0.65 * ACC_POPUP_HEIGHT,
                            x: 0
                        }
                    }}
                    scale={[1, -1]}
                >
                    {!isResize && <ScrollBoxW
                        height={ACC_POPUP_HEIGHT}
                        width={ACC_POPUP_WIDTH}
                    >
                        <Container x={ACC_POPUP_WIDTH / 2} y={0}>
                            {...accounts.map((item, index) => {
                                return (
                                    <SpineW
                                        pointerup={{
                                            animationHover: null,
                                            emit: (e: any = {}) => clickElementWallet({
                                                walletID: item.id,
                                                element: e
                                            }),
                                            slot: 'target'
                                        }}
                                        skin={{
                                            [PORTRAIT]: null,
                                            [LANDSCAPE]: null
                                        }}
                                        appProvider={app}
                                        spineDataKey="currency_button"
                                        animationStateCallback={setStateRef}
                                        props={{
                                            [PORTRAIT]: {
                                                x: -5,
                                                y: 20 + 80 * index
                                            },
                                            [LANDSCAPE]: {
                                                x: -5,
                                                y: 20 + 80 * index
                                            }
                                        }}
                                        animations={[
                                            {
                                                name: 'show' + (activeIdAccount === item.id ? '_on' : ''),
                                                initial: true,
                                                configName: 'аккаунт: показать'
                                            },
                                            {
                                                name: 'loop' + (activeIdAccount === item.id ? '_on' : ''),
                                                loop: true,
                                                configName: 'аккаунт: пост анимация'
                                            }
                                        ]}
                                    >
                                        <TextW
                                            appProvider={app}
                                            parentSlotName='t1'
                                            style={new TextStyle(ACCOUNT_CURR_TXT_STYLE)}
                                            anchor={[1, 0.5]}
                                            scale={[1, -1]}
                                            text={item.currency_code}
                                        />
                                        <TextW
                                            appProvider={app}
                                            parentSlotName='t2'
                                            style={new TextStyle(ACCOUNT_BALANCE_TXT_STYLE)}
                                            anchor={[0.75, 0.5]}
                                            scale={[1, -1]}
                                            text={fractionDigits(item.balance, 2, 2)}
                                            props={{
                                            }}
                                        />
                                    </SpineW>
                                );
                            })
                            }
                        </Container>
                    </ScrollBoxW>
                    }
                </ContainerW>

                {
                    isShowButtonOne &&
                    <ContainerW appProvider={app} parentSlotName={slotButtonOne} scale={[0.7, -0.7]} y={-20}>
                        <SpineW
                            appProvider={app}
                            spineDataKey={resourceButtonOne}
                            pointerup={{
                                emit: () => clickButton('buttonOne')
                            }}
                        >
                            <TextW
                                style={new TextStyle(POPUP_BTN_TXT_STYLE2)}
                                text={textButtonOne}
                                anchor={[0.5, 0.5]}
                                y={20}
                                scale={[1, 1]}
                            />
                        </SpineW>
                    </ContainerW>
                }

            </SpineW>
        </ContainerW>
    );
};
