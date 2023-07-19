import { applyDefaultProps, PixiComponent } from '@inlet/react-pixi';
import { Grid } from 'components/Too The Moon/Canvas/Grid/source/grid';

export default PixiComponent<any, any>('GridComponent', {
    create: ({ width }) => {
        return new Grid(width);
    },
    applyProps: (instance, oldProps, newProps) => {
        const {
            instanceCallback,
            startCoordinateCallback,
            ...newP
        } = newProps;

        applyDefaultProps(instance, oldProps, newP);

        if (!instance.$complete) {
            const startCoordinate = instance.drawGrid();

            if (startCoordinateCallback) {
                startCoordinateCallback(startCoordinate);
            }
        }

        instance.$complete = true;
    }
});
