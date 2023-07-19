import { useApp } from '@inlet/react-pixi';
import { getQualitySfx } from 'utils/getQualitySfx';
import { PATH_ASSETS } from 'config/Common/settings';

const NOT_PATH_INCLUDED = ['keyboardBack'];

export const useLoadResource = (() => {
    let loadResource = Function();
    let isOnline = true;
    let initPartCount = 0;
    let resolveCache = null;
    return ({
        app = useApp(),
        resources = {},
        assetsUrl = PATH_ASSETS,
        options = {}
    }) => {
        const middleWare = () => {
            const sfx: string = getQualitySfx();

            app.loader.pre((resourse: any, next: Function) => {
                if (!isOnline) {
                    return;
                }
                if (resourse.extension === 'json' && resourse.name.includes('@')) {
                    resourse.onComplete.once((res: any) => {
                        const name: string = res.name.replace('@', '');
                        app.loader.resources[name] = app.loader.resources[res.name];
                        delete app.loader.resources[res.name];
                    });
                }
                if (resourse.extension === 'atlas' && resourse.name.includes('@')) {
                    resourse.url = resourse.url.replace('.atlas', sfx + '.atlas');
                }
                resourse.$part = initPartCount;

                next();
            });
        };

        if (initPartCount === 0) {
            window.addEventListener('offline', (e) => {
                console.log('offline');
                //  app.loader.destroy();
                // app.loader = new Loader();
                // middleWare();
                isOnline = false;
            });
            middleWare();
        }

        const handlerOnline = function () {
            if (initPartCount >= 2) {
                window.location.reload();
                return;
            }

            console.log('online');
            isOnline = true;
            loadResource(resolveCache, true);
        };

        loadResource = (resolve, isRepeat = false) => {
            if (isRepeat) {
                for (const key in app.loader.resources) {
                    // @ts-ignore
                    if (!app.loader.resources[key] || app.loader.resources[key].$part === initPartCount || !('$part' in app.loader.resources[key])) {
                        delete app.loader.resources[key];
                    }
                }
            }

            for (const name in resources) {
                // eslint-disable-next-line no-undef
                app.loader.add(name, NOT_PATH_INCLUDED.includes(name) && !__DEV__ ? resources[name] : assetsUrl + resources[name], options);
            }

            app.loader.load();

            app.loader.onComplete.once((loader, resource) => {
                if (isOnline) {
                    resolveCache = null;
                    window.removeEventListener('online', handlerOnline);
                    resolve({ loader, resource });
                }
            });
        };

        return new Promise((resolve) => {
            initPartCount++;
            resolveCache = resolve;
            window.addEventListener('online', handlerOnline);
            loadResource(resolve);
        });
    };
})();
