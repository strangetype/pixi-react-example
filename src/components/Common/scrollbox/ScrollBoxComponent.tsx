import { applyDefaultProps, PixiComponent, render } from '@inlet/react-pixi';
import DefaultScrollBox from 'components/Common/scrollbox/sources/DefaultScrollbox';

export default PixiComponent<any, any>('ScrollBoxComponent', {
    create: () => {
        return new DefaultScrollBox({});
    },
    applyProps: (instance, oldProps, newProps) => {
        const {
            childrenNew = [],
            height = 0,
            width = 0,
            ...newP
        } = newProps;
        applyDefaultProps(instance, oldProps, newP);

        render(childrenNew, instance.children[0]);

        instance.options.boxWidth = width;
        instance.options.boxHeight = height;
        instance.content.screenWidth = width;
        instance.content.screenHeight = height;
        instance.x = -width / 2;
        instance.y = -height / 2;
        instance.update();
    },
    willUnmount (instance: any, parent: any) {
        instance.renderable = false;
        instance.children.forEach((item) => {
            instance.removeChild(item);
        });
        instance.destroy({
            children: true,
            texture: true,
            baseTexture: true
        });
    }
});
