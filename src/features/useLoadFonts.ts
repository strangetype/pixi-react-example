import FontFaceObserver from 'fontfaceobserver';

export const useLoadFonts = (fontFamilies: Array<string>) => {
    return new Promise(async resolve => {
        const promises: Array<Promise<void>> = [];
        fontFamilies.forEach(f => {
            const font = new FontFaceObserver(f);
            promises.push(font.load(null, 9e3));
        });
        try {
            await Promise.all(promises);
            resolve(true);
        } catch (e) {
            resolve(false);
        }
    });
};
