import { Container, Sprite, useApp } from '@inlet/react-pixi';
import React, { useEffect, useState } from 'react';

import { useStore } from '@nanostores/react';
import { useCustomTextures } from 'features/useCutomTextures';
import TweenManager from 'plugins/Tween/TweenManager';
import { useStoreComputed } from 'features/useComputed';

import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { applyOrientation } from 'utils/applyOrientation';
import { PORTRAIT } from 'const/variable';
import KeyComponent from 'components/Common/keyboard/sources/KeyComponent';
import Key, { EKEY_CODES } from 'components/Common/keyboard/sources/Key';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { useStorePopupsState } from 'store/Default/popup/store_F';

export const KeyboardComponent = (props) => {
    const app = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const { translations } = useStoreSettingsState.get();
    const { clickKeyButton } = useStorePopupsActions;
    const { isResize } = useStore(useStoreSettingsState);

    const width = app.renderer.width / app.renderer.resolution;
    const height = app.renderer.height / app.renderer.resolution;

    const CODE_TR: { [key: string]: string } = {
        [EKEY_CODES.MAX]: 'button_text.max',
        [EKEY_CODES.MIN]: 'button_text.min'
    };

    const codes: Array<EKEY_CODES> = [
        EKEY_CODES.MAX,
        EKEY_CODES.CODE_1,
        EKEY_CODES.CODE_2,
        EKEY_CODES.CODE_3,
        EKEY_CODES.MIN,
        EKEY_CODES.CODE_4,
        EKEY_CODES.CODE_5,
        EKEY_CODES.CODE_6,
        EKEY_CODES.X2,
        EKEY_CODES.CODE_7,
        EKEY_CODES.CODE_8,
        EKEY_CODES.CODE_9,
        EKEY_CODES.D2,
        EKEY_CODES.CODE_0,
        EKEY_CODES.DOT,
        EKEY_CODES.DEL
    ];

    const {
        bkg = 0xdfdfdf
    } = props.style ?? {
        bkg: 0xdfdfdf,
        btnShadow: 0xdfdfdf,
        font: 0x4F4F4F,
        fontSecond: 0x828282,
        btn: 0xf9f9f9,
        btnPressed: 0xe9e9e9,
        btnAccent: 0x47bf6f,
        btnAccentPressed: 0x37af5f,
        btnSecond: 0xD0D5CF,
        btnSecondPressed: 0xc0c5bF
    };

    const maxRenderSize = Math.max(width, height) / app.stage.scale.x;

    const stateKeyboardOpenClosed = (() => {
        let slideX = 0;
        let slideY = 0;
        return ({ isOpened = false, dx = 0, dy = 0 } = {}) => {
            dx /= app.renderer.resolution;
            dy /= app.renderer.resolution;
            dx *= 2;// this.dppx;
            dy *= 2; // this.dppx;

            const stageTween: any = new TweenManager().createTween(app.stage);
            stageTween.time = 30000;
            const animate = ({ from, to, time = 3000 } = {} as any) => {
                stageTween.from(from).to(to);
                stageTween.start({ time });
            };

            if (isOpened) {
                setIsOpen(true);
                slideX = dx;
                slideY = dy;
                const to = { x: app.stage.x + dx, y: app.stage.y + dy };
                const from = { x: app.stage.x, y: app.stage.y };
                animate({ from, to });
            } else {
                const to = { x: app.stage.x - slideX, y: app.stage.y - slideY };
                const from = { x: app.stage.x, y: app.stage.y };
                animate({ from, to, time: 2500 });
                useStorePopupsActions.checkInputClosedKeyboard();
                setTimeout(_ => {
                    setIsOpen(false);
                }, 300);
            }
        };
    })();

    useEffect(() => {
        useStoreComputed(useStorePopupsState, ['isKeyBoard'], ({ isKeyBoard }) => {
            stateKeyboardOpenClosed({ isOpened: isKeyBoard, dx: 0, dy: applyOrientation() === PORTRAIT ? -240 : -180 });
        });
        useStoreComputed(useStoreSettingsState, ['isResize'], ({ isResize }) => {
            if (isResize) {
                useStorePopupsState.setKey('isKeyBoard', false);
            }
        });
        return () => {
            useStorePopupsState.setKey('isKeyBoard', false);
        };
    }, []);

    return (
        !isResize && <Container x={((-app.stage.x + 0) / app.stage.scale.x)} y={(-app.stage.y + 0 + height) / app.stage.scale.x} zIndex={11}>
            {isOpen && <Sprite
                anchor={0.5}
                alpha={0}
                width={4e3}
                height={4e3}
                interactive={true}
                pointerup={async (e: any = {}) => {
                    useStorePopupsState.setKey('isKeyBoard', false);
                }}
                texture={useCustomTextures(app, { alpha: 1 })}
            />
            }
            <Sprite
                interactive={true}
                width={maxRenderSize}
                height={maxRenderSize}
                texture={useCustomTextures(app, {
                    bg: bkg,
                    draw: { x: 0, y: 0, height: maxRenderSize, width: maxRenderSize }
                })}
            />
            <KeyComponent
                key={Key.DONE}
                keyCode={Key.DONE}
                text={translations['button_text.ok']}
                doneKey={true}
                app={app}
                onClick={clickKeyButton}
            />
            {
                codes.map((item, index) => {
                    return (
                        <KeyComponent
                            key={item}
                            keyCode={item}
                            text={translations[CODE_TR[codes[index] as string]]}
                            index={index}
                            app={app}
                            onClick={clickKeyButton}
                        />
                    );
                })
            }
        </Container>
    );
};
