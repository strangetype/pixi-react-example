import { useEffect, useRef, useState } from 'react';
import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { applyOrientation } from 'utils/applyOrientation';
import { useLoadResource } from 'features/useLoadResource';
import { useLoadFonts } from 'features/useLoadFonts';
import { PORTRAIT } from 'const/variable';
import { GAME_ID, GAME_NAME } from 'config/Common/settings';
import { GamesPlayMethods } from 'const/Common/GamesPlayMethods';
import helper from 'utils/helper';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreSettingsActions } from 'store/Default/settings/actions_F';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { windowHeight, windowWidth } from 'utils/windowWidthHeight';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { LOAD_GAMING } from 'const/Common/EVENTS_EMMITER';
import { isMobile } from 'utils/isMobile';
import { isNumberKeyboardEvent } from 'utils/isNumberKeyboardEvent';
import { useStorePopupsActions } from 'store/Default/popup/actions_F';
import { Bonus } from 'plugins/Widget/Bonus';

export const useLayouts = ({ preloadResource, mainResource }) => {
    const [isNativeLoading, setIsNativeLoading] = useState(true);
    const [isAllResourceCheck, setIsAllResourceCheck] = useState(false);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const refStage = useRef(null);
    const { getUserWallets, userPartnerLogin } = useStoreUserActions;
    const { gamesInfo, playGame } = useStoreGamesActions;
    const { getTranslation } = useStoreSettingsActions;
    const { clickKeyButton } = useStorePopupsActions;

    useEffect(() => {
        const keyPress = (event) => {
            const { isKeyBoard } = useStorePopupsState.get();

            if (!isKeyBoard) {
                return;
            }

            if (isNumberKeyboardEvent(event)) {
                clickKeyButton([190, 110].includes(event.keyCode) ? 190 : event.key);
            }
        };

        const stageSize = async () => {
            useStoreSettingsState.setKey('isResize', true);
            useStorePopupsState.setKey('isShowNativeLoading', true);
            refStage.current.app.renderer.resize(windowWidth(), windowHeight());
            setCanvasStyle();
            setPortraiteOrLandscape({ type: applyOrientation(), app: refStage.current.app });
            setTimeout(async _ => {
                useStoreSettingsState.setKey('isResize', false);
                useStorePopupsState.setKey('isShowNativeLoading', false);
            }, 300);

            if (!isMobile()) {
                window.addEventListener('keydown', keyPress);
            }
        };

        stageSize();

        window.addEventListener('resize', stageSize);

        return () => {
            window.removeEventListener('keydown', keyPress);
            window.removeEventListener('resize', stageSize);
        };
    }, [refStage.current]);

    const loadAllResource = async (app) => {
        if (Object.keys(mainResource).length) {
            await useLoadResource({
                app,
                resources: mainResource
            });
        }
        setIsAllResourceCheck(true);
    };

    const loadPreloaderResource = async (app) => {
        try {
            await useLoadResource({
                app,
                resources: preloadResource
            });
            try {
                // @ts-ignore
                const fonts = JSON.parse(__PROJECT_FONTS__);

                const familyNames = [];

                for (const item of fonts) {
                    for (const family of item.variants) {
                        familyNames.push(item.family + family);
                    }
                }
                await useLoadFonts(familyNames);
            } catch (e) {
                console.log(e);
            }
            setIsNativeLoading(false);
            await loadAllResource(app);
        } catch (e) {
            console.log(e);
        }
    };

    const setCanvasStyle = () => {
        if (GAME_ID === 18 && isMobile()) {
            return;
        }

        const canvas = document.getElementsByTagName('canvas')[0];
        canvas.style.width = /* String(windowWidth() * 2) + */'100%';
        canvas.style.minWidth = /* String(windowWidth() * 2) + */'100%';
        canvas.style.height = /* String(windowHeight() * 2) + */'100%';
        canvas.style.minHeight = /* String(windowHeight() * 2) + */'100%';
    };

    const setPortraiteOrLandscape = ({ type = PORTRAIT, app }) => {
        const _WIDTH = 960;
        const _HEIGHT = 540;

        if (type === PORTRAIT) {
            const width = app.renderer.width / app.renderer.resolution;
            const height = app.renderer.height / app.renderer.resolution;
            const c: number = Math.min(width / _HEIGHT, height / _WIDTH);

            app.stage.scale.set(c);
            app.stage.x = 0.5 * width * (1 - c);
            app.stage.y = 0.5 * height * (1 - c);
        } else {
            const width = app.renderer.width / app.renderer.resolution;
            const height = app.renderer.height / app.renderer.resolution;
            const c: number = Math.min(height / _HEIGHT, width / _WIDTH);

            app.stage.scale.set(c);
            app.stage.x = 0.5 * width * (1 - c);
            app.stage.y = 0.5 * height * (1 - c);
        }
    };

    const onComplete = async (app) => {
        try {
            // eslint-disable-next-line no-undef
            if (__DEV__) {
                globalThis.__PIXI_STAGE__ = app.stage;
                globalThis.__PIXI_RENDERER__ = app.renderer;
            }

            await getTranslation();

            const { paramsUrl: { tokenPartner = null } = {} } = useStoreSettingsState.get();

            if (tokenPartner != null) {
                useStoreUserActions.setPartnerToken(tokenPartner);
            } else {
                await userPartnerLogin();
            }
            {
                const { tokenPartner } = useStoreUserState.get();

                global.$BonusService = new Bonus({
                    isInit: true,
                    gameId: GAME_ID,
                    gameName: GAME_NAME,
                    tokenAuth: tokenPartner,
                    options: {
                        right: '4px',
                        top: '50%'
                    }
                });
            }

            await getUserWallets();
            const { activeIdAccount } = useStoreUserState.get();
            await gamesInfo({
                account_id: activeIdAccount,
                game_id: GAME_ID
            });
            const session = await playGame({
                game_id: GAME_ID,
                method: GamesPlayMethods.init
            });
            if (!helper.isEmpty(session)) {
                useStoreUserState.setKey('activeSession', session);
                global.$BonusService.blockedSelectBonuses();
            }
        } catch (e) {
            console.error(e);
        }
        setCanvasStyle();
        setPortraiteOrLandscape({ app, type: applyOrientation() });
        await loadPreloaderResource(app);
        const { clientSettings, paramsUrl } = useStoreSettingsState.get();
        if (paramsUrl.settings) {
            const { DatGui = Function() } = await import(/* webpackChunkName: 'dat-gui' */ 'plugins/DatGui/DatGui');
            DatGui({ clientSettings, apiSave: useStoreSettingsActions.saveApi, widthGui: paramsUrl.widthGui ?? 350 });
        }
    };

    const onLoading = async () => {
        setIsGameComplete(true);
        global.$emitter.emit(LOAD_GAMING, true);
    };

    const stageProps = {
        ref: refStage,
        width: windowWidth(),
        height: windowHeight(),
        options: {
            backgroundColor: 0x1d2230,
            antialias: true,
            autoDensity: true,
            resolution: 2
        },
        onMount: onComplete
    };

    return {
        stageProps,
        onLoading,
        isGameComplete,
        isAllResourceCheck,
        refStage,
        isNativeLoading,
        onComplete
    };
};
