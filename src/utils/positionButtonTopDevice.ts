import { windowHeight } from 'utils/windowWidthHeight';
import { iphonePositionSafeArea } from 'utils/iphonePositionSafeArea';

export const positionButtonTopDevice = ({ startMinX = 45, startMinY = 55, startMaxX = 45, startMaxY = 85 } = {}) => {
    const result = {
        x: startMaxX,
        y: startMaxY
    };

    if (windowHeight() < 700) {
        result.x = startMinX;
        result.y = startMinY;
    } else if (iphonePositionSafeArea() !== 0) {
        result.y += 15;
    }

    return result;
};
