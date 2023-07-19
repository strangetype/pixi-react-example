import { Graphics } from 'pixi.js';

export const useCustomTextures = ((app = null, data = {}) => {
    const cacheTexture = {};
    return (app, {
        alpha = 1,
        bg = 0x000000,
        draw: { x = -1, y = -1, width = 2, height = 2 } = {}
    } = data as any) => {
        const key = `${alpha}${bg}${JSON.stringify({ x, y, width, height })}`;
        if (cacheTexture[key]) {
            return cacheTexture[key];
        }
        cacheTexture[key] = app.renderer.generateTexture(new Graphics().beginFill(bg, alpha).drawRect(x, y, width, height));
        return cacheTexture[key];
    };
})();
