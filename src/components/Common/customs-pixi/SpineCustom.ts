import { applyDefaultProps, Container, PixiComponent, render } from '@inlet/react-pixi';
import { setProps } from 'utils/setProps';
import { getPosition } from 'utils/getPosition';

import { applyOrientation } from 'utils/applyOrientation';
import { DESKTOP, LANDSCAPE, PORTRAIT } from 'const/variable';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { AnimationButton_F } from 'config/Diamonds Slots/AnimationButton_F';
import { delay } from 'utils/delay';
import { debounce } from 'utils/debounce';
import { DEBOUNCE_TIME_ELEMENT } from 'config/Common/settings';
import helper from 'utils/helper';

interface SpineMix {
    from: string;
    to: string;
    duration: number;
}

interface Props {
    app?: any,
    x?: number;
    y?: number;
    zIndex?: number;
    spineData: any;
    keyState: string;
    spineDataKey: string;
    scale?: number;
    visible?: boolean;
    tint?: number;
    delayLimit?: number;
    mixes?: SpineMix[];
    position?: any;
    animations?: any[],
    slotsHide?: any[],
    skeletonChildren?: any[],
    resources?: any[],
    skin?: any,
    props?: { [key: string]: any },
    animationStateCallback?: (ref: any, key?: string) => void;
    instanceCallback?: (ref: any, key?: string) => void;
    pointerup?: (e: any) => void;
}

export default PixiComponent<Props, any>('SpineCustom', {
    create: ({ spineData }) => {
        return new global.spine.Spine(spineData);
    },
    applyProps: async (instance, oldProps, newProps) => {
        const {
            app = null,
            animationStateCallback,
            instanceCallback,
            pointerup = null,
            animations = [],
            props = null,
            skeletonChildren = [],
            slotsHide = [],
            position = null,
            keyState = null,
            spineDataKey = '',
            zIndex = null,
            skin: {
                [PORTRAIT]: vSkin = 'v',
                [LANDSCAPE]: skin = 'h'
            } = {},
            ...newP
        } = newProps;

        applyDefaultProps(instance, oldProps, newP);

        if (!instance.$complete) {
            instance.$resize = async function () {
                /*
                * @пересобрать что-то тут не так евенты не отписываються
                * @todo сзодать свою шину евентов
                * */
                if (instance.$deleted) {
                    window.removeEventListener('resize', instance.$resize, true);
                    return;
                }

                if (instance.skeleton != null) {
                    switch (applyOrientation()) {
                    case PORTRAIT:
                        if (vSkin != null) {
                            if (!instance.spineData.findSkin(vSkin)) {
                                console.error(`Нет такого скина (оболочки) у ресурса: ${spineDataKey} скин ${vSkin}`);
                                return;
                            }
                            instance.skeleton.setSkin(null);
                            instance.skeleton.setSkinByName(vSkin);
                            instance.skeleton.setSlotsToSetupPose();
                        }
                        break;
                    case LANDSCAPE:
                    case DESKTOP:
                        if (skin != null) {
                            if (!instance.spineData.findSkin(skin)) {
                                console.error(`Нет такого скина (оболочки) у ресурса: ${spineDataKey} скин ${skin}`);
                                return;
                            }
                            instance.skeleton.setSkin(null);
                            instance.skeleton.setSkinByName(skin);
                            instance.skeleton.setSlotsToSetupPose();
                        }

                        break;
                    }
                }

                if (position && app) {
                    const newPosition = {
                        position: helper.typeOf(position) === 'function' ? position()[applyOrientation()] : position[applyOrientation()],
                        renderHeight: app.renderer.height,
                        renderWidth: app.renderer.width,
                        renderResolution: app.renderer.resolution,
                        stageXY: {
                            x: app.stage.x,
                            y: app.stage.y
                        },
                        stageScale: {
                            x: app.stage.scale.x,
                            y: app.stage.scale.y
                        },
                        containerScale: {
                            x: instance.scale.x,
                            y: instance.scale.y
                        }
                    };

                    const { x = 0, y = 0, scale = 1 } = getPosition(newPosition);
                    instance.scale.set(scale);
                    instance.x = x;
                    instance.y = y;
                }

                if (props) {
                    setProps(instance, props[applyOrientation()] ?? {});
                }

                await delay(300);

                if (instance?.state?.$isBlock) {
                    instance.state.setAnimation(0, AnimationButton_F.disabled, true);
                }
            };

            instance.$resizeDebounce = debounce(instance.$resize, DEBOUNCE_TIME_ELEMENT);

            window.addEventListener('resize', instance.$resizeDebounce);

            const realFunc = instance.state.setAnimation;

            instance.state.setAnimation = function (trackIndex, animationName, loop, {
                groupConfig = null,
                configName = null,
                timeout = null,
                timeScale = null,
                endAnimation = Function(),
                startAnimation = Function(),
                eventAnimation = Function()
            } = {}) {
                if (instance.$deleted) {
                    return;
                }

                return new Promise(resolve => {
                    if (!this.data.skeletonData.findAnimation(animationName)) {
                        console.error('Нет такой анимации ' + animationName + ' ' + spineDataKey);
                        return resolve('error');
                    }

                    instance.state.addListener({
                        complete: (data: any) => {
                            // this.clearListeners();
                            resolve(data);
                        },
                        start: startAnimation,
                        end: endAnimation,
                        event: eventAnimation
                    });

                    if (timeout) {
                        setTimeout(_ => {
                            const animation = realFunc.call(instance.state, trackIndex, animationName, loop);
                            if (timeScale != null) {
                                animation.timeScale = timeScale;
                            } else if (configName && groupConfig && animation?.animation) {
                                animation.timeScale = useStoreGameGetters.getSettingsAnimation({
                                    groupConfig,
                                    configName
                                });
                            }
                            return animation;
                        }, timeout);
                    } else {
                        if (timeScale != null) {
                            instance.state.timeScale = timeScale;
                        }
                        const animation = realFunc.call(instance.state, trackIndex, animationName, loop);
                        if (timeScale != null) {
                            animation.timeScale = timeScale;
                        } else if (configName && groupConfig && animation?.animation) {
                            animation.timeScale = useStoreGameGetters.getSettingsAnimation({
                                groupConfig,
                                configName
                            });
                        }
                        return animation;
                    }
                });
            };

            const realFuncAdd = instance.state.addAnimation;
            instance.state.addAnimation = function (trackIndex, animationName, loop, delay, {
                groupConfig = null,
                configName = null,
                timeout = null,
                timeScale = null,
                endAnimation = Function(),
                startAnimation = Function(),
                eventAnimation = Function()
            } = {}) {
                if (instance.$deleted) {
                    return;
                }

                return new Promise(resolve => {
                    if (!this.data.skeletonData.findAnimation(animationName)) {
                        console.error('Нет такой анимации ' + animationName + ' ' + spineDataKey);
                        return resolve('error');
                    }
                    instance.state.addListener({
                        complete: (data: any) => {
                            // this.clearListeners();
                            resolve(data);
                        },
                        start: startAnimation,
                        end: endAnimation,
                        event: eventAnimation
                    });

                    if (timeout) {
                        setTimeout(_ => {
                            const animation = realFuncAdd.call(instance.state, trackIndex, animationName, loop, delay);
                            if (timeScale != null) {
                                animation.timeScale = timeScale;
                            } else if (configName && groupConfig) {
                                animation.timeScale = useStoreGameGetters.getSettingsAnimation({
                                    groupConfig,
                                    configName
                                });
                            }
                            return animation;
                        }, timeout);
                    } else {
                        const animation = realFuncAdd.call(instance.state, trackIndex, animationName, loop, delay);
                        if (timeScale != null) {
                            animation.timeScale = timeScale;
                        } else if (configName && groupConfig && animation?.animation) {
                            animation.timeScale = useStoreGameGetters.getSettingsAnimation({
                                groupConfig,
                                configName
                            });
                        }
                    }
                });
            };
        }

        skeletonChildren.forEach((child) => {
            if (child.props?.parentSlotName) {
                const slotIndex: number = instance.skeleton.findSlotIndex(child.props.parentSlotName);
                if (slotIndex !== -1) {
                    // @ts-ignore
                    const slot: Container = instance.slotContainers[slotIndex];
                    render(child, slot);
                } else {
                    console.error('Нет такого слота ' + child.props.parentSlotName + ' ' + spineDataKey);
                }
            } else {
                // console.log(child);
                render(child, instance);
                // instance.addChild(child);
            }
        });
        if (pointerup) {
            const addInteractiveSlot = ({
                slot,
                emit,
                animationPressed = AnimationButton_F.pressed,
                animationNormal = AnimationButton_F.normal,
                animationHover = AnimationButton_F.hover
            }) => Object.assign(slot, {
                interactive: true,
                pointerout: function (e) {
                    if (instance.state?.$isBlock) {
                        return;
                    }
                    animationNormal && animationHover && instance.state.setAnimation(0, animationNormal, true);
                },
                pointerover: function (e) {
                    if (instance.state?.$isBlock) {
                        return;
                    }
                    animationHover && instance.state.setAnimation(0, animationHover, true);
                },
                pointerdown: function (e) {
                    instance.$powerDown = true;
                    if (instance.state?.$isBlock) {
                        return;
                    }
                    animationPressed && instance.state.setAnimation(0, animationPressed, true);
                },
                pointerupoutside: function (e) {
                    delete instance.$powerDown;
                    if (instance.state?.$isBlock) {
                        return;
                    }
                    animationNormal && instance.state.setAnimation(0, animationNormal, true);
                },
                pointerup: function (e) {
                    if (!instance.$powerDown) {
                        return;
                    }
                    delete instance.$powerDown;
                    if (instance.state?.$isBlock) {
                        return;
                    }
                    animationNormal && instance.state.setAnimation(0, animationNormal, true);
                    emit(instance);
                }
            });

            if (Array.isArray(pointerup)) {
                pointerup.forEach(({ slot, emit, animationPressed, animationNormal, animationHover } = {}) => {
                    const slotIndex: number = instance.skeleton.findSlotIndex(slot);
                    if (slotIndex === -1) {
                        throw new Error('Нет такого слота для клика ' + slot);
                    }
                    addInteractiveSlot({
                        slot: instance.slotContainers[slotIndex],
                        emit,
                        animationPressed,
                        animationNormal,
                        animationHover
                    });
                });
            } else {
                const { slot = null, emit, animationPressed, animationNormal, animationHover } = pointerup as any;

                addInteractiveSlot({
                    slot: (() => {
                        if (slot === 'target') {
                            return instance;
                        }

                        if (slot != null) {
                            const slotIndex = instance.skeleton.findSlotIndex(slot);
                            if (slotIndex == null || slotIndex === -1) {
                                console.error('Нет такого слота для клика ' + slot);
                            } else {
                                return instance.slotContainers[slotIndex];
                            }
                        }

                        return instance.slotContainers.length >= 1 ? instance.slotContainers[0] : instance;
                    })(),
                    emit,
                    animationPressed,
                    animationNormal,
                    animationHover
                });
            }
        }

        slotsHide.forEach((nameSlot) => {
            if (nameSlot) {
                const slotIndex: number = instance.skeleton.findSlotIndex(nameSlot);
                instance.slotContainers[slotIndex].renderable = false;
                instance.slotContainers[slotIndex].interactive = false;
            }
        });

        instance.$resize();

        /* if (zIndex && spineDataKey === 'dynamic_onboarding') {
            console.log(instance);
            instance.slotContainers.forEach(slot => {
                setProps(slot, {
                    zIndex
                });
            });
        } */

        for (const {
            name,
            initial = false,
            loop = false,
            track = 0,
            delay = null,
            groupConfig = null,
            configName = null,
            timeScale = null,
            async = false
        } of animations.filter(item => Boolean(item))) {
            if (initial) {
                if (async) {
                    await instance.state.setAnimation(track, name, loop, { groupConfig, configName, timeout: delay, timeScale });
                } else {
                    instance.state.setAnimation(track, name, loop, { groupConfig, configName, timeout: delay, timeScale });
                }
            } else {
                if (async) {
                    await instance.state.addAnimation(track, name, loop, 0, {
                        groupConfig,
                        configName,
                        timeout: delay,
                        timeScale
                    });
                } else {
                    instance.state.addAnimation(track, name, loop, 0, {
                        groupConfig,
                        configName,
                        timeout: delay,
                        timeScale
                    });
                }
            }
        }

        if (animationStateCallback) {
            animationStateCallback(instance.state, keyState ?? spineDataKey);
        }

        if (instanceCallback) {
            instanceCallback(instance, keyState ?? spineDataKey);
        }

        instance.$complete = true;
    },
    async willUnmount (instance: any, parent: any) {
        window.removeEventListener('resize', instance.$resizeDebounce);

        while (instance.children[0]) {
            instance.removeChild(instance.children[0]);
        }

        instance.$deleted = true;
        instance.skeleton.setSlotsToSetupPose();
        instance.state.clearTracks();

        instance.slotContainers.forEach((item) => {
            item.removeChildren();
        });

        instance.renderable = false;

        /* parent.children.forEach((item) => {
            if (item._boundsID === instance._boundsID) {
                item.destroy({
                    baseTexture: true
                });
            }
        }); */

        instance.destroy({
            baseTexture: true
        });

        instance = null;
    },
    config: {
        destroy: false,
        destroyChildren: true
    }
});
