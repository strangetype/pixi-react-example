import { PixiComponent } from '@inlet/react-pixi';
import { applyOrientation } from 'utils/applyOrientation';
import { LANDSCAPE } from 'const/variable';
import Key from 'components/Common/keyboard/sources/Key';

export default PixiComponent<any, any>('KeyComponent', {
    create: ({ keyCode, text, style, app }) => {
        return new Key(keyCode, text, style, app);
    },
    applyProps: (instance, oldProps, newProps) => {
        const {
            app = null,
            index = 0,
            doneKey = false,
            onClick = Function
        } = newProps;
        const width = app.renderer.width / app.renderer.resolution;
        const height = app.renderer.height / app.renderer.resolution;

        instance.y = (-app.stage.y + 0 + height) / app.stage.scale.x;
        instance.x = (-app.stage.x + 0) / app.stage.scale.x;

        let c: number = 2 * 300 / (1280 * app.stage.scale.x) / app.renderer.resolution;
        let _keyboardHeight = 900 * c;
        const kw: number = (width / app.stage.scale.x) / 5;
        const kh: number = (_keyboardHeight * instance.scale.y) / 4.25;
        let spacing: number = (kh + kw) * 0.05;
        let keyWidth: number = kw - 4 * spacing / 5 - 4 * spacing / 5;
        let keyHeight: number = kh - spacing;
        let xOffset: number = 2 * spacing;
        let yOffset: number = 2 * spacing;
        let radius: number = spacing;
        let fontSize: number = keyHeight / 2;

        if (applyOrientation() === LANDSCAPE) {
            c = 2 * 500 / (1280 * app.stage.scale.x) / app.renderer.resolution;
            _keyboardHeight = 420 * c;
            const kh = (_keyboardHeight * instance.scale.y) / 4;
            const kw = kh * 1.75;
            spacing = (kh + kw) * 0.05;
            keyWidth = kw - spacing - spacing / 8;
            keyHeight = kh - spacing;
            yOffset = 2 * spacing;
            radius = spacing;
            fontSize = keyHeight / 2;
            xOffset = ((width / app.stage.scale.x) - 3 * spacing - 4 * keyWidth) / 2;
        }

        if (doneKey) {
            instance.position.set(xOffset + 4 * spacing + 4 * keyWidth, yOffset + 3 * spacing + 3 * keyHeight);
            instance.resize(keyWidth, keyHeight, radius, fontSize);
        } else {
            instance.position.set(xOffset + (index % 4) * (keyWidth + spacing), yOffset + Math.floor(index / 4) * (keyHeight + spacing));
            instance.resize(keyWidth, keyHeight, radius, fontSize);
        }

        instance.on('keydown', (code) => onClick(code));
    }
});
