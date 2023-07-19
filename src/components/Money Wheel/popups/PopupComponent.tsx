import { Sprite } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import {
    POPUP_BTN_TXT_STYLE,
    POPUP_BTN_TXT_STYLE2,
    POPUP_MSG_TXT_STYLE,
    TERMS_TITLE_TXT_STYLE,
    TERMS_TXT_STYLE
} from 'const/Money Wheel/textStyles';
import { TextW } from 'components/Common/wrapper//TextW';
import { ScrollBoxW } from 'components/Common/wrapper/ScrollBoxW';
import { mainPosition, TERMS_POPUP_HEIGHT, TERMS_POPUP_WIDTH } from 'config/Money Wheel/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { usePopup } from 'components/Common/popups/features/usePopup';

import { applyOrientation } from 'utils/applyOrientation';
import helper from 'utils/helper';
import { useState } from 'react';
import { useStorePopupsState } from 'store/Default/popup/store_F';

export const PopupComponent = (props) => {
    const {
        type = 'win',
        resource = 'popup',
        message: {
            scale: scaleMessage = [1, -1]
        } = {},
        title: {
            slot: slotTitle = 't1',
            text: textTitle = ''
        } = {},
        buttonOne: {
            isShow: isShowButtonOne = true,
            text: textButtonOne = '',
            slot: slotButtonOne = 'btnP1',
            anchor: anchorButtonOne = [0.5, helper.isEmpty(textTitle) ? 0.3 : 0.15],
            scale: scaleButtonOne = [1, -1]
        } = {},
        buttonTwo: {
            isShow: isShowButtonTwo = true,
            text: textButtonTwo = '',
            slot: slotButtonTwo = 'btnP2',
            anchor: anchorButtonTwo = [0.5, 0.7],
            scale: scaleButtonTwo = [1, -1],
            isResizeText: isResizeTextButtonTwo = 1
        } = {},
        scroll: {
            isScroll = false,
            title: titleScroll = '',
            message: messageScroll = '',
            slotTitle: slotTitleScroll = 'How_To_Play_Title'
        } = {}
    } = props;

    const {
        app,
        message,
        textSlot,
        isShow,
        isResize,
        setStateButtonRef,
        stateButtons,
        storeKeyActionShow,
        actionButtonOne,
        actionButtonTwo
    } = usePopup({ props, hideAnimationName: type + '/hide' });

    const [isShowText, setIsShowText] = useState(true);

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
            promiseAll.push(stateButtons[key].setAnimation(0, type + '/hide', false));
        }

        await Promise.all(promiseAll);
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
                    { name: type + '/show', initial: true, configName: 'показать', groupConfig: 'попап' },
                    { name: type + '/loop', loop: true, configName: 'показать', groupConfig: 'попап' }
                ]}
                pointerup={[
                    {
                        emit: () => clickButton('buttonOne'),
                        slot: slotButtonOne
                    },
                    {
                        emit: () => clickButton('buttonTwo'),
                        slot: slotButtonTwo
                    }
                ]}
                slotsHide={[!isShowButtonOne && slotButtonOne, !isShowButtonTwo && slotButtonTwo]}
                keyState="popup"
                animationStateCallback={setStateButtonRef}
            >
                {isScroll ? [
                    <TextW
                        key="title"
                        parentSlotName={slotTitleScroll}
                        style={new TextStyle(TERMS_TITLE_TXT_STYLE)}
                        anchor={[0.5, 0.7]}
                        scale={[1, -1]}
                        y={1}
                        text={titleScroll}
                    />,
                    <ContainerW
                        key="body"
                        appProvider={app}
                        props={{
                            [PORTRAIT]: {
                                y: 1,
                                x: 1
                            },
                            [LANDSCAPE]: {
                                y: -10
                            }
                        }}
                        scale={1}
                        visible={isShowText}
                    >
                        {!isResize && <ScrollBoxW
                            height={TERMS_POPUP_HEIGHT[applyOrientation()]}
                            width={TERMS_POPUP_WIDTH[applyOrientation()]}
                        >
                            <TextW
                                style={new TextStyle(TERMS_TXT_STYLE())}
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
                                text={messageScroll}
                                delayVisisble={600}
                            />
                        </ScrollBoxW>
                        }
                    </ContainerW>
                ]
                    : [<TextW
                        key="body"
                        parentSlotName={textSlot}
                        style={new TextStyle(POPUP_MSG_TXT_STYLE)}
                        anchor={[0.5, 0.3]}
                        scale={scaleMessage}
                        text={message}
                        visible={isShowText}
                    />,
                    !helper.isEmpty(textTitle) && <TextW
                        key="title"
                        parentSlotName={slotTitle}
                        style={new TextStyle(TERMS_TITLE_TXT_STYLE)}
                        anchor={[0.5, 0.7]}
                        scale={[1, -1]}
                        props={{
                            [PORTRAIT]: {
                                y: -4
                            },
                            [LANDSCAPE]: {
                                y: 0
                            }
                        }}
                        text={textTitle}
                    />
                    ]
                }

                {
                    isShowButtonOne &&
                        <TextW
                            parentSlotName={slotButtonOne}
                            style={new TextStyle(POPUP_BTN_TXT_STYLE)}
                            text={textButtonOne}
                            anchor={anchorButtonOne}
                            scale={scaleButtonOne}
                        />
                }
                {
                    isShowButtonTwo &&
                        <TextW
                            parentSlotName={slotButtonTwo}
                            style={new TextStyle(POPUP_BTN_TXT_STYLE2)}
                            text={textButtonTwo}
                            anchor={anchorButtonTwo}
                            y={0}
                            scale={scaleButtonTwo}
                            isResizeText={isResizeTextButtonTwo}
                        />
                }

            </SpineW>
        </ContainerW>
    );
};
