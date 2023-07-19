import { Stage } from '@inlet/react-pixi';
import { NativeLoading } from 'components/NativeLoading';
import { NativeNotification } from 'components/NativeNotification';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useLayouts } from 'layouts/features/useLayouts';
import { preloadResource } from 'resource/Too The Moon/preload-resources';
import { LeftPanelUsersInGame } from 'components/Too The Moon/Ui/leftPanel/LeftPanelUsersInGame';
import 'layouts/Too The Moon/styles/default.scss';
import App from 'projects/Too The Moon/App';
import { ActionGameControl } from 'components/Too The Moon/Ui/ActionGameControl/ActionGameControl';
import GameBackground_F from 'components/Too The Moon/Canvas/GameBackground_F';
import { HistoryLine } from 'components/Too The Moon/Ui/HistoryLine/HistoryLine';
import { CardUi } from 'components/Too The Moon/Ui/Card/CardUi';
import { ActionInfo } from 'components/Too The Moon/Ui/ActionInfo/ActionInfo';
import { RulesModal } from 'components/Too The Moon/Ui/Modals/RulesModal';
import { WalletsModal } from 'components/Too The Moon/Ui/Modals/WalletsModal';
import { Logo } from 'components/Too The Moon/Ui/leftPanel/Logo';
import { windowHeight, windowWidth } from 'utils/windowWidthHeight';
import { useEffect } from 'react';
import { ExitAppModal } from 'components/Too The Moon/Ui/Modals/ExitAppModal';
import { useStoreComputed } from 'features/useComputed';
import { useStoreUserState } from 'store/Default/user/store_F';
import { socket } from 'api/config.socet';

export const Layouts_F = () => {
    const {
        refStage,
        isNativeLoading,
        isAllResourceCheck,
        isGameComplete,
        onLoading,
        stageProps
    } = useLayouts({
        preloadResource,
        mainResource: []
    });

    useEffect(() => {
        const computedStore = useStoreComputed(useStoreUserState, ['token'], ({ token }) => {
            if (token) {
                socket.init(token);
                computedStore.cancel();
            }
        });

        const bodyResize = () => {
            document.body.style.width = `${windowWidth()}px`;
            document.body.style.height = `${windowHeight()}px`;
        };
        bodyResize();

        window.addEventListener('resize', bodyResize);

        return () => {
            window.removeEventListener('resize', bodyResize);
            computedStore.cancel();
        };
    }, []);

    return (
        <>
            {isNativeLoading && <NativeNotification/>}
            <NativeLoading isNativeLoading={isNativeLoading} store={useStoreSettingsState}/>
            <div className="content">
                <div className="content-game">
                    <Stage
                        {...stageProps}
                        {...{
                            options: {
                                ...stageProps.options,
                                backgroundColor: 0x181B29
                            }
                        }}
                    >
                        {(isAllResourceCheck && !isNativeLoading) && <GameBackground_F/>}
                        {(isAllResourceCheck && !isNativeLoading) && <App/>}
                    </Stage>
                </div>
                {/*    <div className="content-warning">
                    <Warning/>
                </div> */}

                <div className="content-action-info">
                    <ActionInfo/>
                </div>
                <div className="content-left-panel-substrate"/>
                <div className="content-left-panel">
                    <Logo/>
                    <div className="content-left-panel__desktop">
                        <LeftPanelUsersInGame/>
                    </div>
                </div>

                <div className="content-action">
                    <div className="content-action-element">
                        <div className="content-action-element__left-control">
                            <ActionGameControl/>
                        </div>
                        <div className="content-action-element__card">
                            <CardUi/>
                        </div>
                        <div className="content-action-element__right-control">
                            <ActionGameControl/>
                        </div>
                    </div>
                    <div className="content-action-history-line">
                        <HistoryLine/>
                    </div>
                </div>
                <div className="content-gradient"/>
                <div className="content-substrate"/>
                <div className="content-panel-mobile">
                    <div className="content-action-history-line-iphoneSE">
                        <HistoryLine/>
                    </div>
                    <LeftPanelUsersInGame/>
                </div>
                <RulesModal/>
                <WalletsModal/>
                <ExitAppModal/>
            </div>
        </>
    );
};
