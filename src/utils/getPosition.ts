export const getPosition = ({
    position,
    renderWidth = 0,
    renderHeight = 0,
    renderResolution = 0,
    stageXY = {
        x: null,
        y: null
    },
    stageScale = {
        x: null,
        y: null
    },
    containerScale = {
        x: null,
        y: null
    }
}) => {
    if (!position) return {};

    const {
        full = false, byMinSize = false, byMaxSize = false, cover = false, contain = false, byWidth = false,
        byHeight = false, h, w, x, y, cx, cy, l, r, cl, cr, ax, t, b, ct, cb, ay
    } = position;
    const WIDTH_RENDER_RESOLUTION = (renderWidth / renderResolution);
    const HEIGHT_RENDER_RESOLUTION = (renderHeight / renderResolution);

    const weight: number = full ? WIDTH_RENDER_RESOLUTION / stageScale.x : WIDTH_RENDER_RESOLUTION;
    const height: number = full ? HEIGHT_RENDER_RESOLUTION / stageScale.y : HEIGHT_RENDER_RESOLUTION;

    const result = {
        scale: 1,
        y: containerScale.y,
        x: containerScale.x
    };

    if (byMinSize) {
        if (WIDTH_RENDER_RESOLUTION > HEIGHT_RENDER_RESOLUTION) {
            result.scale = (height / h);
        } else {
            result.scale = (weight / w);
        }
    } else if (byMaxSize) {
        if (WIDTH_RENDER_RESOLUTION < HEIGHT_RENDER_RESOLUTION) {
            result.scale = (height / h);
        } else {
            result.scale = (weight / w);
        }
    } else if (cover) {
        result.scale = (Math.max(height / h, weight / w));
    } else if (contain) {
        result.scale = (Math.min(height / h, weight / w));
    } else {
        result.scale = (1);
        if (byWidth) result.scale = (weight / w);
        if (byHeight) result.scale = (height / h);
    }

    result.x = x || 0;
    result.y = y || 0;
    if (full) {
        result.x -= stageXY.x / stageScale.x; // .5 * WIDTH_RENDER_RESOLUTION * (1-c) / stageScale.x;
        result.y -= stageXY.y / stageScale.y;// .5 * HEIGHT_RENDER_RESOLUTION * (1-c)/ stageScale.y;
    }

    if (isFinite(cx)) result.x += cx * weight;
    if (isFinite(cy)) result.y += cy * height;
    if (isFinite(w)) {
        const pw: number = w * result.scale;
        if (isFinite(l)) result.x += l + pw / 2;
        if (isFinite(r)) result.x += weight - r - pw / 2;
        if (isFinite(cl)) result.x += weight * cl + pw / 2;
        if (isFinite(cr)) result.x += weight - weight * cr - pw / 2;
        if (isFinite(ax)) result.x += pw * ax;
    }
    if (isFinite(h)) {
        const ph: number = h * result.scale;
        if (isFinite(t)) result.y += t + ph / 2;
        if (isFinite(b)) result.y += height - b - ph / 2;
        if (isFinite(ct)) result.y += height * ct + ph / 2;
        if (isFinite(cb)) result.y += height - height * cb - ph / 2;
        if (isFinite(ay)) result.y += ph * ay;
    }

    return result as any;
};
