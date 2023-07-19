import { Sprite, Text } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { ContainerW } from 'components/Common/wrapper//ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import { POPUP_BTN_TXT_STYLE, POPUP_MSG_TXT_STYLE, TERMS_TITLE_TXT_STYLE, TERMS_TXT_STYLE } from 'const/Diamonds Slots/textStyles';
import { TextW } from 'components/Common/wrapper//TextW';
import { ScrollBoxW } from 'components/Common/wrapper/ScrollBoxW';
import {
    mainPosition,
    TERMS_POPUP_CONTENT_WIDTH,
    TERMS_POPUP_HEIGHT,
    TERMS_POPUP_WIDTH
} from 'config/Diamonds Slots/positions';
import { applyOrientation } from 'utils/applyOrientation';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { usePopup } from 'components/Common/popups/features/usePopup';

export const PopupComponent = (props) => {
    const {
        type = 'win',
        resource = 'popup',
        anchorResource = 'anchor_popup_btn',
        isNoAnchorAnimation = true,
        isAnchorHasSkins = false,
        skin = null,
        vSkin = null,
        buttonOne: {
            isShow: isShowButtonOne = true,
            text: textButtonOne = '',
            resource: resourceButtonOne = 'btn1PU',
            slot: slotButtonOne = 'btn1PU'
        } = {},
        buttonTwo: {
            isShow: isShowButtonTwo = true,
            text: textButtonTwo = '',
            resource: resourceButtonTwo = 'btn1PU',
            slot: slotButtonTwo = 'btn1PU_2'
        } = {},
        scroll: {
            isScroll = false,
            title: titleScroll = '',
            message: messageScroll = ''
        } = {}
    } = props;

    const { app, message, isShow, textSlot, clickButton, isResize, setStateButtonRef } = usePopup({ props });

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
            >

                {isScroll ? <>
                    <ContainerW
                        appProvider={app}
                        props={{
                            [PORTRAIT]: {
                                y: 50
                            },
                            [LANDSCAPE]: {
                                y: 20
                            }
                        }}
                        scale={1}
                    >
                        {!isResize && <ScrollBoxW
                            height={TERMS_POPUP_HEIGHT[applyOrientation()]}
                            width={TERMS_POPUP_WIDTH[applyOrientation()]}
                        >
                            <TextW
                                style={new TextStyle(TERMS_TXT_STYLE())}
                                props={{
                                    [PORTRAIT]: {
                                        x: TERMS_POPUP_CONTENT_WIDTH[applyOrientation()] / 2,
                                        y: 0
                                    },
                                    [LANDSCAPE]: {
                                        x: TERMS_POPUP_CONTENT_WIDTH[applyOrientation()] / 2,
                                        y: 0
                                    }
                                }}
                                text={messageScroll}
                                tween={(tween) => {
                                    tween.from({ alpha: 0, scale: { x: 0.8, y: 0.8 } })
                                        .to({ alpha: 1, scale: { x: 1, y: 1 } })
                                        .start({ time: 1000 * useStoreGameGetters.getSettingsAnimation({ groupConfig: 'попап', configName: 'показать' }) });
                                }}
                                anchor={[0.5, 0]}
                            />
                        </ScrollBoxW>
                        }
                    </ContainerW>
                    <TextW
                        style={new TextStyle(TERMS_TITLE_TXT_STYLE)}
                        props={{
                            [PORTRAIT]: {
                                x: 0,
                                y: -530,
                                anchor: { x: 0.5, y: 0.5 }
                            },
                            [LANDSCAPE]: {
                                x: -0.95 * TERMS_POPUP_WIDTH[applyOrientation()] / 2,
                                y: -220,
                                anchor: { x: 0, y: 0.5 }
                            }
                        }}
                        tween={(tween) => {
                            tween.from({ alpha: 0, scale: { x: 0.8, y: 0.8 } })
                                .to({ alpha: 1, scale: { x: 1, y: 1 } })
                                .start({ time: 1000 * useStoreGameGetters.getSettingsAnimation({ groupConfig: 'попап', configName: 'показать' }) });
                        }}
                        text={titleScroll}
                    />
                </> : <TextW
                    parentSlotName={textSlot}
                    style={new TextStyle(POPUP_MSG_TXT_STYLE)}
                    anchor={0.5}
                    y={-60}
                    scale={[1, -1]}
                    text={message}
                />
                }

            </SpineW>
            <SpineW
                appProvider={app}
                spineDataKey={anchorResource}
                skin={{
                    [PORTRAIT]: isAnchorHasSkins ? 'v' : null,
                    [LANDSCAPE]: isAnchorHasSkins ? 'h' : null
                }}
                animations={isNoAnchorAnimation ? [
                    // {name: type+'/hide', initial: true, configName: 'кнопка: показать'},
                ] : [
                    { name: 'show', initial: true, configName: 'кнопка: показать', groupConfig: 'попап' },
                    { name: 'loop1', loop: true, configName: 'кнопка: показать', groupConfig: 'попап' }
                ]}
            >
                {
                    isShowButtonOne && <ContainerW
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
                            pointerup={{ emit: () => clickButton('buttonOne') }}
                            keyState="buttonOne"
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
                }
                {
                    isShowButtonTwo && <ContainerW
                        parentSlotName={slotButtonTwo}
                        appProvider={app}
                        scale={[1, -1]}
                    >
                        <SpineW
                            appProvider={app}
                            spineDataKey={resourceButtonTwo}
                            skin={{
                                [PORTRAIT]: null,
                                [LANDSCAPE]: null
                            }}
                            animations={[
                                { name: 'show', initial: true, configName: 'кнопка: показать', groupConfig: 'попап' }
                                //  { name: 'loop1', loop: true, configName: 'кнопка: пост анимаия', groupConfig: 'попап' }
                            ]}
                            pointerup={{ emit: () => clickButton('buttonTwo') }}
                            keyState="buttonTwo"
                            animationStateCallback={setStateButtonRef}
                        />
                        <Text
                            style={new TextStyle(POPUP_BTN_TXT_STYLE)}
                            text={textButtonTwo}
                            anchor={[0.5, 0.5]}
                            y={0}
                            scale={[1]}
                        />
                    </ContainerW>
                }
            </SpineW>
        </ContainerW>
    );
};
