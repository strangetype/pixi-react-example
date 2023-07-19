import { Sprite } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import { TextW } from 'components/Common/wrapper/TextW';
import { ScrollBoxW } from 'components/Common/wrapper/ScrollBoxW';
import { mainPosition, POPUP_CONTENT_SCROLL_HEIGHT, POPUP_CONTENT_SCROLL_WIDTH } from 'config/Scratch Card/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { usePopup } from 'components/Common/popups/features/usePopup';

import { applyOrientation } from 'utils/applyOrientation';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { POPUP_BIG_RULES_TXT, POPUP_BIG_TITLE_TXT, POPUP_BIG_TXT_BUTTON_ONE } from 'const/Scratch Card/textStyles';
import { KEY_SETTING_GROUP_POPUPS_BIG } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';

export const PopupRules = (props) => {
    const {
        type = 'win',
        resource = 'dynamic_big-popups_center',
        message: {
            style: messageBodyStyle = {}
        } = {},
        title: {
            text: titleText = '',
            scale: titleScale = [1, -1],
            anchor: titleAnchor = [0.5, 0.7],
            style: titleStyle = {},
            slot: titleSlot = 'slot_text2'
        } = {},
        buttonOne: {
            slot: buttonOneSlot = 'slot_ok',
            resource: buttonOneResource = 'dynamic_button-ok',
            isShow: buttonOneIsShow = true,
            text: buttonOneText = '',
            anchor: buttonOneAnchor = [0.5, 0.50],
            scale: buttonOneScale = [2, -2]
        } = {},
        scroll: {
            slotScroll = 'slot_text'
        } = {}
    } = props;

    const {
        app,
        message,
        isShow,
        isResize,
        setStateButtonRef,
        setStatePopupRef,
        stateButtons,
        storeKeyActionShow,
        actionButtonOne,
        actionButtonTwo,
        statePopup,
        isShowText,
        setIsShowText
    } = usePopup({ props, hideAnimationName: 'rules/hide' });

    const clickButton = async (name) => {
        switch (name) {
        case 'buttonOne':
            actionButtonOne();
            break;
        case 'buttonTwo':
            actionButtonTwo();
            break;
        }

        setIsShowText(false);

        const promiseAll = [];

        for (const key in stateButtons) {
            promiseAll.push(stateButtons[key].setAnimation(0, 'hide', false));
        }

        await statePopup[resource].setAnimation(0, 'rules/hide', false,
            { configName: 'скрыть', groupConfig: KEY_SETTING_GROUP_POPUPS_BIG });
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
                    { name: 'rules/show', initial: true, configName: 'показать', groupConfig: KEY_SETTING_GROUP_POPUPS_BIG }
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
                            anchor: {
                                x: 0.5,
                                y: 0.5
                            }
                        },
                        [LANDSCAPE]: {
                            anchor: {
                                x: 0.5,
                                y: 0.5
                            }
                        }
                    }}
                    text={titleText}
                />

                <ContainerW
                    appProvider={app}
                    parentSlotName={slotScroll}
                    props={{
                        [PORTRAIT]: {
                            y: 20,
                            scale: {
                                x: 1,
                                y: -1
                            }
                        },
                        [LANDSCAPE]: {
                            y: -50
                        }
                    }}
                    scale={[1, -1]}
                    visible={isShowText}
                >
                    {!isResize && <ScrollBoxW
                        height={POPUP_CONTENT_SCROLL_HEIGHT[applyOrientation()]}
                        width={POPUP_CONTENT_SCROLL_WIDTH[applyOrientation()]}
                    >
                        <TextW
                            style={new TextStyle({ ...POPUP_BIG_RULES_TXT(), ...messageBodyStyle })}
                            props={{
                                [PORTRAIT]: {
                                    x: 0,
                                    y: 0,
                                    anchor: { x: 0, y: 0 }
                                },
                                [LANDSCAPE]: {
                                    x: 0,
                                    y: 0,
                                    anchor: { x: 0, y: 0 }
                                }
                            }}
                            text={message}
                            tween={(tween) => {
                                tween.from({ alpha: -4, scale: { x: 0, y: 0 } })
                                    .to({ alpha: 1, scale: { x: 1, y: 1 } })
                                    .start({
                                        time: 800 * useStoreGameGetters.getSettingsAnimation({
                                            groupConfig: KEY_SETTING_GROUP_POPUPS_BIG,
                                            configName: 'задержка текст правил'
                                        })
                                    });
                            }}
                        />
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
                                    y: 32,
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
