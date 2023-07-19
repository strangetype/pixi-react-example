import { applyDefaultProps, PixiComponent } from '@inlet/react-pixi';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { applyOrientation } from 'utils/applyOrientation';
import { getPosition } from 'utils/getPosition';
import { filters, Graphics } from 'pixi.js';
import { windowWidth } from 'utils/windowWidthHeight';
import { debounce } from 'utils/debounce';
import { DEBOUNCE_TIME_ELEMENT } from 'config/Common/settings';
import helper from 'utils/helper';

const prepareRGBChannelColor = (channelColor) => {
    let colorText = channelColor.toString(16);
    if (colorText.length < 2) {
        while (colorText.length < 2) {
            colorText = '0' + colorText;
        }
    }

    return colorText;
};

const getRGBChannels = (color) => {
    let colorText = color.toString(16);
    if (colorText.length < 6) {
        while (colorText.length < 6) {
            colorText = '0' + colorText;
        }
    }

    return {
        red: parseInt(colorText.slice(0, 2), 16),
        green: parseInt(colorText.slice(2, 4), 16),
        blue: parseInt(colorText.slice(4, 6), 16)
    };
};

const prepareColorData = (color, alpha) => {
    return {
        color,
        alpha,
        channels: getRGBChannels(color)
    };
};

const getColorOfGradient = (from, to, coef) => {
    if (!from.alpha && from.alpha !== 0) {
        from.alpha = 1;
    }
    if (!from.alpha && from.alpha !== 0) {
        to.alpha = 1;
    }

    let colorRed = Math.floor(from.channels.red + coef * (to.channels.red - from.channels.red));
    colorRed = Math.min(colorRed, 255);
    let colorGreen = Math.floor(from.channels.green + coef * (to.channels.green - from.channels.green));
    colorGreen = Math.min(colorGreen, 255);
    let colorBlue = Math.floor(from.channels.blue + coef * (to.channels.blue - from.channels.blue));
    colorBlue = Math.min(colorBlue, 255);

    const rgb = prepareRGBChannelColor(colorRed) + prepareRGBChannelColor(colorGreen) + prepareRGBChannelColor(colorBlue);

    return {
        color: parseInt(rgb, 16),
        alpha: from.alpha + coef * (to.alpha - from.alpha)
    };
};

export default PixiComponent<any, any>('GradientComponent', {
    create: ({ width }) => {
        return new Graphics();
    },
    applyProps: (instance, oldProps, newProps) => {
        const {
            app = null,
            instanceCallback,
            position = null,
            ...newP
        } = newProps;

        applyDefaultProps(instance, oldProps, newP);

        if (!instance.$complete) {
            const rect = {
                width: windowWidth(),
                height: 80
            };
            //
            const colorFromData = prepareColorData(0x0029FF, 0.17);
            const colorToData = prepareColorData(0x3718F8, 0.08);
            //
            let stepCoef;
            let stepColor;
            const stepsCount = 100;
            const stepHeight = rect.height / stepsCount;
            for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
                stepCoef = stepIndex / stepsCount;
                stepColor = getColorOfGradient(colorFromData, colorToData, stepCoef);

                instance.beginFill(stepColor.color, stepColor.alpha);
                instance.drawRect(
                    0,
                    rect.height * stepCoef,
                    rect.width,
                    stepHeight
                );
            }

            const dropShadowFilter = new filters.BlurFilter();
            //  dropShadowFilter.color = 0x000020;
            //  dropShadowFilter.alpha = 0.2;
            dropShadowFilter.blur = 100;
            //  dropShadowFilter.distance = 20;
            instance.filters = [dropShadowFilter];
            instance.endFill();

            instance.$resize = debounce(async function (isNativeResize) {
                /*
                * @пересобрать что-то тут не так евенты не отписываються
                * @todo сзодать свою шину евентов
                * */
                if (instance.$deleted) {
                    window.removeEventListener('resize', instance.$resize, true);
                    return;
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

                    const { x = 0, y = 0 } = getPosition(newPosition);
                    instance.scale.set(1, -1);
                    instance.x = x;
                    instance.y = y;
                }
            }, DEBOUNCE_TIME_ELEMENT);

            window.addEventListener('resize', instance.$resize);
        }

        instance.$resize();

        instance.$complete = true;
    }
});
