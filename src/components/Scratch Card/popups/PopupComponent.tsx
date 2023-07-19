import { Sprite, Text } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import { TextW } from 'components/Common/wrapper/TextW';
import { mainPosition } from 'config/Scratch Card/positions';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { usePopup } from 'components/Common/popups/features/usePopup';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { POPUP_MIN_BODY_TXT, POPUP_MIN_TXT_BUTTON_ONE, POPUP_MIN_TXT_BUTTON_TWO } from 'const/Scratch Card/textStyles';
import { KEY_SETTING_GROUP_POPUPS } from 'const/Common/KEYS_SETTINGS_ANIMATION_GROUP';

export const PopupComponent = (props) => {
    const {
        type = 'win',
        resource = 'dynamic_popups_center',
        message: {
            scale: messageBodyScale = [1, -1],
            anchor: messageBodyAnchor = [0.5, 1],
            style: messageBodyStyle = {},
            slot: messageBodySlot = 'slot_text'
        } = {},
        buttonOne: {
            slot: buttonOneSlot = 'slot_cancel',
            resource: buttonOneResource = 'dynamic_button-cancel',
            isShow: buttonOneIsShow = true,
            text: buttonOneText = '',
            anchor: buttonOneAnchor = [0.5, 0.5],
            scale: buttonOneScale = 1,
            style: buttonOneStyle = {}
        } = {},
        buttonTwo: {
            slot: buttonTwoSlot = 'slot_confirm',
            resource: buttonTwoResource = 'dynamic_button-ok',
            isShow: buttonTwoIsShow = true,
            text: buttonTwoText = '',
            anchor: buttonTwoAnchor = [0.5, 0.5],
            scale: buttonTwoScale = 1,
            style: buttonTwoStyle = {}
        } = {}
    } = props;

    const {
        app,
        message: messageBodyText,
        isShow,
        setStateButtonRef,
        stateButtons,
        statePopup,
        storeKeyActionShow,
        setStatePopupRef,
        actionButtonOne,
        actionButtonTwo,
        isShowText,
        setIsShowText
    } = usePopup({ props, hideAnimationName: type + '/hide' });

    const clickButton = async (name) => {
        switch (name) {
        case 'buttonOne':
            actionButtonOne();
            break;
        case 'buttonTwo':
            actionButtonTwo();
            break;
        }
        const promiseAll = [];
        for (const key in stateButtons) {
            promiseAll.push(stateButtons[key].setAnimation(0, 'hide', false));
        }
        setIsShowText(false);
        await statePopup[resource].setAnimation(0, 'hide', false,
            { groupConfig: KEY_SETTING_GROUP_POPUPS, configName: 'скрыть' });
        // Promise.all(promiseAll);
        useStorePopupsState.setKey(storeKeyActionShow, false);
    };

    return (
        isShow && <ContainerW position={mainPosition} visible={isShow} zIndex={5}>
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
                    { name: 'show', initial: true, configName: 'показать', groupConfig: KEY_SETTING_GROUP_POPUPS }
                ]}
                skin={{
                    [PORTRAIT]: 'v/' + type,
                    [LANDSCAPE]: 'h/' + type
                }}
                animationStateCallback={setStatePopupRef}
            >
                <TextW
                    parentSlotName={messageBodySlot}
                    style={new TextStyle({ ...POPUP_MIN_BODY_TXT, ...messageBodyStyle })}
                    anchor={messageBodyAnchor}
                    scale={messageBodyScale}
                    text={messageBodyText}
                    visible={isShowText}
                />

                <SpineW
                    appProvider={app}
                    skin={{
                        [PORTRAIT]: null,
                        [LANDSCAPE]: null
                    }}
                    spineDataKey="dynamic_popups_anchor_center"
                >
                    {
                        buttonOneIsShow && <ContainerW
                            parentSlotName={buttonOneSlot}
                            appProvider={app}
                            scale={[1, -1]}
                        >
                            <SpineW
                                appProvider={app}
                                spineDataKey={buttonOneResource}
                                skin={{
                                    [PORTRAIT]: null,
                                    [LANDSCAPE]: null
                                }}
                                animations={[
                                    { name: 'show', initial: true, configName: 'показать: первая кнопка', groupConfig: KEY_SETTING_GROUP_POPUPS }
                                ]}
                                pointerup={{ emit: () => clickButton('buttonOne') }}
                                animationStateCallback={setStateButtonRef}
                                keyState='buttonOne'
                            >
                                <Text
                                    style={new TextStyle({ ...POPUP_MIN_TXT_BUTTON_ONE, ...buttonOneStyle })}
                                    text={buttonOneText}
                                    anchor={buttonOneAnchor}
                                    scale={buttonOneScale}
                                />
                            </SpineW>
                        </ContainerW>
                    }
                    {
                        buttonTwoIsShow && <ContainerW
                            parentSlotName={buttonTwoSlot}
                            appProvider={app}
                            scale={[1, -1]}
                        >
                            <SpineW
                                appProvider={app}
                                spineDataKey={buttonTwoResource}
                                skin={{
                                    [PORTRAIT]: null,
                                    [LANDSCAPE]: null
                                }}
                                animations={[
                                    { name: 'show', initial: true, configName: 'показать: вторая кнопка', groupConfig: KEY_SETTING_GROUP_POPUPS }
                                ]}
                                pointerup={{ emit: () => clickButton('buttonTwo') }}
                                animationStateCallback={setStateButtonRef}
                            >
                                <Text
                                    style={new TextStyle({ ...POPUP_MIN_TXT_BUTTON_TWO, ...buttonTwoStyle })}
                                    text={buttonTwoText}
                                    anchor={buttonTwoAnchor}
                                    scale={buttonTwoScale}
                                />
                            </SpineW>
                        </ContainerW>
                    }

                </SpineW>
            </SpineW>
        </ContainerW>
    );
};
