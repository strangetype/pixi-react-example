import { Sprite, Text } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js';
import { ContainerW } from 'components/Common/wrapper//ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { useCustomTextures } from 'features/useCutomTextures';
import {
    POPUP_BTN_TXT_STYLE,
    TERMS_TITLE_TXT_STYLE_HTP,
    TERMS_TXT_STYLE,
    TXT_RULE_MUL_STYLE,
    TXT_RULE_MUL_STYLE_WIN,
    WIN_LOSE_TXT_STYLE
} from 'const/Slots 777/textStyles';
import { TextW } from 'components/Common/wrapper//TextW';
import { ScrollBoxW } from 'components/Common/wrapper/ScrollBoxW';
import {
    mainPosition,
    TERMS_POPUP_CONTENT_WIDTH,
    TERMS_POPUP_HEIGHT,
    TERMS_POPUP_WIDTH
} from 'config/Slots 777/positions';
import { applyOrientation } from 'utils/applyOrientation';
import { LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { usePopup } from 'components/Common/popups/features/usePopup';
import { useEffect, useState } from 'react';
import { useStoreComputed } from 'features/useComputed';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreGamesState } from 'store/Default/games/store_F';

function createRegExp (line: string[]): string {
    return line.map((s: string) => s || '[0-9]').join('');
}

export const PopupComponent = (props) => {
    const {
        type = 'win',
        resource = 'big_popups',
        anchorResource = 'anchor_big_popups',
        scalePopup = [1, 1],
        isNoAnchorAnimation = true,
        isAnchorHasSkins = false,
        skin = null,
        vSkin = null,
        messageStyle = null,
        messageAncher = null,
        buttonOne: {
            isShow: isShowButtonOne = true,
            text: textButtonOne = '',
            resource: resourceButtonOne = 'btn2',
            slot: slotButtonOne = 'btnPU2_1',
            textStyleBtnOne = null
            // x: xBtnOne = 0,
            // y: yBtnOne = 0
        } = {},
        buttonTwo: {
            isShow: isShowButtonTwo = true,
            text: textButtonTwo = '',
            resource: resourceButtonTwo = 'btn2',
            slot: slotButtonTwo = 'btnPU2_2',
            textStyleBtnTwo = null,
            // x: xBtnTwo = 0,
            y: yBtnTwo = 0
        } = {},
        scroll: {
            isScroll = false,
            title: titleScroll = '',
            message: messageScroll = ''
        } = {}
    } = props;

    const {
        app,
        message,
        isShow,
        textSlot,
        clickButton,
        isResize,
        setStateButtonRef,
        setStatePopupRef,
        // statePopup,
        isShowText
    } = usePopup({ props });

    const [rulesKof, setRulesKof] = useState([]);
    const [boardData, setBoardData] = useState(null);

    useEffect(() => {
        const getRule = useStoreComputed(
            useStoreSettingsState,
            [{ key: 'rules', init: true }],
            ({ rules = [] }) => {
                setRulesKof(rules);
            }
        );

        const getGame = useStoreComputed(
            useStoreGamesState,
            ['board'],
            ({ board }) => {
                setBoardData(board);
            }
        );

        return () => {
            getRule.cancel();
            getGame.cancel();
        };
    }, []);

    return (
        isShow && (
            <ContainerW position={mainPosition} visible={isShow}>
                <Sprite
                    anchor={0.5}
                    alpha={0.8}
                    width={4e3}
                    height={4e3}
                    interactive={true}
                    texture={useCustomTextures(app, { alpha: 1 })}
                />

                <SpineW
                    spineDataKey={resource}
                    scale={scalePopup}
                    skin={{
                        [PORTRAIT]: vSkin,
                        [LANDSCAPE]: skin
                    }}
                    animations={[
                        {
                            name: type + '/show',
                            initial: true,
                            configName: 'показать',
                            groupConfig: 'попап'
                        },
                        {
                            name: type + '/loop',
                            loop: true,
                            configName: 'показать',
                            groupConfig: 'попап'
                        }
                    ]}
                    animationStateCallback={setStatePopupRef}
                >
                    {isScroll ? (
                        <>
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
                                {!isResize && isShowText && (
                                    <ScrollBoxW
                                        height={TERMS_POPUP_HEIGHT[applyOrientation()] - 100}
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
                                                tween
                                                    .from({ alpha: 0, scale: { x: 0.8, y: 0.8 } })
                                                    .to({ alpha: 1, scale: { x: 1, y: 1 } })
                                                    .start({
                                                        time:
                              1000 *
                              useStoreGameGetters.getSettingsAnimation({
                                  groupConfig: 'попап',
                                  configName: 'показать'
                              })
                                                    });
                                            }}
                                            anchor={[0.5, 0]}
                                        />
                                    </ScrollBoxW>
                                )}
                            </ContainerW>
                            <TextW
                                style={new TextStyle(TERMS_TITLE_TXT_STYLE_HTP)}
                                props={{
                                    [PORTRAIT]: {
                                        x: 0,
                                        y: -830,
                                        anchor: { x: 0.5, y: 0.5 }
                                    },
                                    [LANDSCAPE]: {
                                        x: -350,
                                        y: -420,
                                        anchor: { x: 0, y: 0.5 }
                                    }
                                }}
                                tween={(tween) => {
                                    tween
                                        .from({ alpha: 0, scale: { x: 0.8, y: 0.8 } })
                                        .to({ alpha: 1, scale: { x: 1, y: 1 } })
                                        .start({
                                            time:
                        1000 *
                        useStoreGameGetters.getSettingsAnimation({
                            groupConfig: 'попап',
                            configName: 'показать'
                        })
                                        });
                                }}
                                text={isShowText ? titleScroll : ''}
                            />
                        </>
                    ) : (
                        <TextW
                            parentSlotName={textSlot}
                            style={messageStyle || new TextStyle(WIN_LOSE_TXT_STYLE)}
                            anchor={messageAncher || [0.5, 0.3]}
                            y={0}
                            scale={[1, -1]}
                            text={message}
                        />
                    )}
                </SpineW>

                {(type === 'win' || type === 'lose') && isShowText && (
                    <SpineW
                        appProvider={app}
                        spineDataKey="anchor_btnUP_win_lose"
                        scale={scalePopup}
                        skin={{
                            [PORTRAIT]: null,
                            [LANDSCAPE]: null
                        }}
                        animations={[
                            {
                                name: type + '/show',
                                initial: true,
                                configName: 'кнопка: показать',
                                groupConfig: 'попап'
                            },
                            {
                                name: type + '/loop',
                                loop: true,
                                configName: 'кнопка: показать',
                                groupConfig: 'попап'
                            }
                        ]}
                    >
                        {rulesKof.map((ruled, ind) => {
                            if (
                                ruled.multiplier === boardData.multiplier &&
                boardData.line &&
                boardData.line.join('').match(createRegExp(ruled.symbols))
                            ) {
                                return (
                                    <TextW
                                        key={`${ruled.multiplier + ind}`}
                                        parentSlotName={`rt_${3 * (ind + 1) - 2}`}
                                        style={new TextStyle(TXT_RULE_MUL_STYLE_WIN)}
                                        text={ruled.symbols
                                            .map((el) => (el === null ? '*' : el))
                                            .join('')}
                                        anchor={[0.5, 0.5]}
                                        scale={[1, -1]}
                                        alpha={2}
                                        props={{
                                            [PORTRAIT]: {
                                                x: 0,
                                                y: -0
                                            },
                                            [LANDSCAPE]: {
                                                x: 25,
                                                y: -0
                                            }
                                        }}
                                    />
                                );
                            } else {
                                return (
                                    <TextW
                                        key={`${ruled.multiplier + ind}`}
                                        parentSlotName={`rt_${3 * (ind + 1) - 2}`}
                                        style={new TextStyle(TXT_RULE_MUL_STYLE)}
                                        text={ruled.symbols
                                            .map((el) => (el === null ? '*' : el))
                                            .join('')}
                                        anchor={[0.5, 0.5]}
                                        scale={[1, -1]}
                                        props={{
                                            [PORTRAIT]: {
                                                x: 0,
                                                y: -0
                                            },
                                            [LANDSCAPE]: {
                                                x: 25,
                                                y: -0
                                            }
                                        }}
                                    />
                                );
                            }
                        })}
                        {rulesKof.map((ruled, ind) => {
                            if (
                                ruled.multiplier === boardData.multiplier &&
                boardData.line &&
                boardData.line.join('').match(createRegExp(ruled.symbols))
                            ) {
                                return (
                                    <TextW
                                        key={`${ruled.multiplier + ind}`}
                                        parentSlotName={`rt_${3 * (ind + 1)}`}
                                        style={new TextStyle(TXT_RULE_MUL_STYLE_WIN)}
                                        text={`x${ruled.multiplier}`}
                                        anchor={[0.5, 0.5]}
                                        alpha={2}
                                        scale={[1, -1]}
                                        props={{
                                            [PORTRAIT]: {
                                                x: 0,
                                                y: -0
                                            },
                                            [LANDSCAPE]: {
                                                x: 0,
                                                y: -0
                                            }
                                        }}
                                    />
                                );
                            } else {
                                return (
                                    <TextW
                                        key={`${ruled.multiplier + ind}`}
                                        parentSlotName={`rt_${3 * (ind + 1)}`}
                                        style={new TextStyle(TXT_RULE_MUL_STYLE)}
                                        text={`x${ruled.multiplier}`}
                                        anchor={[0.5, 0.5]}
                                        scale={[1, -1]}
                                        props={{
                                            [PORTRAIT]: {
                                                x: 0,
                                                y: -0
                                            },
                                            [LANDSCAPE]: {
                                                x: 0,
                                                y: -0
                                            }
                                        }}
                                    />
                                );
                            }
                        })}

                        {rulesKof.map((ruled, ind) => {
                            if (
                                ruled.multiplier === boardData.multiplier &&
                boardData.line &&
                boardData.line.join('').match(createRegExp(ruled.symbols))
                            ) {
                                return (
                                    <SpineW
                                        appProvider={app}
                                        key={`${ruled.multiplier + ind}`}
                                        parentSlotName={`rt_${3 * (ind + 1) - 1}`}
                                        spineDataKey={'btn_kof'}
                                        alpha={2}
                                        skin={{
                                            [PORTRAIT]: null,
                                            [LANDSCAPE]: null
                                        }}
                                        animations={[
                                            {
                                                name: 'loop2',
                                                initial: true,
                                                configName: 'стелка: подсвечена',
                                                groupConfig: 'попап'
                                            }
                                        ]}
                                    />
                                );
                            }
                            return <></>;
                        })}
                    </SpineW>
                )}

                <SpineW
                    appProvider={app}
                    spineDataKey={anchorResource}
                    scale={scalePopup}
                    skin={{
                        [PORTRAIT]: isAnchorHasSkins ? 'v' : null,
                        [LANDSCAPE]: isAnchorHasSkins ? 'h' : null
                    }}
                    animations={
                        isNoAnchorAnimation
                            ? [
                                // {name: type+'/hide', initial: true, configName: 'кнопка: показать'},
                            ]
                            : [
                                {
                                    name: 'show',
                                    initial: true,
                                    configName: 'кнопка: показать',
                                    groupConfig: 'попап'
                                },
                                {
                                    name: 'loop1',
                                    loop: true,
                                    configName: 'кнопка: показать',
                                    groupConfig: 'попап'
                                }
                            ]
                    }
                >
                    {isShowButtonOne && (
                        <ContainerW
                            parentSlotName={slotButtonOne}
                            appProvider={app}
                            props={{
                                [PORTRAIT]: { y: yBtnTwo, scale: { x: 1, y: -1 } },
                                [LANDSCAPE]: { y: yBtnTwo, scale: { x: 1, y: -1 } }
                            }}
                        >
                            <SpineW
                                appProvider={app}
                                spineDataKey={resourceButtonOne}
                                skin={{
                                    [PORTRAIT]: null,
                                    [LANDSCAPE]: null
                                }}
                                animations={[
                                    {
                                        name: 'show',
                                        initial: true,
                                        configName: 'кнопка: показать',
                                        groupConfig: 'попап'
                                    }
                                    // { name: 'loop1', loop: true, configName: 'кнопка: пост анимаия', groupConfig: 'попап' }
                                ]}
                                pointerup={{
                                    emit: () => {
                                        clickButton('buttonOne');
                                    }
                                }}
                                keyState="buttonOne"
                                animationStateCallback={setStateButtonRef}
                            />

                            {isShowText &&
                            <Text
                                style={textStyleBtnOne || new TextStyle(POPUP_BTN_TXT_STYLE)}
                                text={textButtonOne}
                                anchor={[0.5, 0.5]}
                                y={0}
                                scale={[1]}
                            />}
                        </ContainerW>
                    )}
                    {isShowButtonTwo && (
                        <ContainerW
                            parentSlotName={slotButtonTwo}
                            appProvider={app}
                            props={{
                                [PORTRAIT]: { y: yBtnTwo, scale: { x: 1, y: -1 } },
                                [LANDSCAPE]: { y: yBtnTwo, scale: { x: 1, y: -1 } }
                            }}
                        >
                            <SpineW
                                appProvider={app}
                                spineDataKey={resourceButtonTwo}
                                skin={{
                                    [PORTRAIT]: null,
                                    [LANDSCAPE]: null
                                }}
                                animations={[
                                    {
                                        name: 'show',
                                        initial: true,
                                        configName: 'кнопка: показать',
                                        groupConfig: 'попап'
                                    }
                                    //  { name: 'loop1', loop: true, configName: 'кнопка: пост анимаия', groupConfig: 'попап' }
                                ]}
                                pointerup={{
                                    emit: () => {
                                        clickButton('buttonTwo');
                                    }
                                }}
                                keyState="buttonTwo"
                                animationStateCallback={setStateButtonRef}
                            />

                            {isShowText &&
                            <Text
                                style={textStyleBtnTwo || new TextStyle(POPUP_BTN_TXT_STYLE)}
                                text={textButtonTwo}
                                anchor={[0.5, 0.5]}
                                y={0}
                                scale={[1]}
                            />}
                        </ContainerW>
                    )}
                </SpineW>
            </ContainerW>
        )
    );
};
