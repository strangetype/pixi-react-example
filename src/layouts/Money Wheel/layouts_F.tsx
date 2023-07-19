import { Stage } from '@inlet/react-pixi';
import { NativeLoading } from 'components/NativeLoading';
import App from 'projects/Money Wheel/App';
import { GameLoading_F } from 'components/Money Wheel/GameLoading_F';
import { NativeNotification } from 'components/NativeNotification';
import GameBackground_F from 'components/Money Wheel/GameBackground_F';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useLayouts } from 'layouts/features/useLayouts';
import { preloadResource } from 'resource/Money Wheel/preload-resources';
import { mainResource } from 'resource/Money Wheel/main-resources';

export const Layouts_F = () => {
    const {
        isNativeLoading,
        stageProps,
        isAllResourceCheck,
        isGameComplete,
        onLoading
    } = useLayouts({
        preloadResource,
        mainResource
    });

    return (
        <>
            {isNativeLoading && <NativeNotification/>}
            <NativeLoading isNativeLoading={isNativeLoading} store={useStoreSettingsState}/>
            <div className="main-container">
                <Stage
                    {...stageProps}
                >
                    {!isNativeLoading &&
                        <GameBackground_F/>}
                    {!isNativeLoading && !isGameComplete &&
                        <GameLoading_F isAllResourceCheck={isAllResourceCheck} onLoading={onLoading}/>}
                    {(isAllResourceCheck && !isNativeLoading && isGameComplete) && <App/>}
                </Stage>
            </div>
        </>
    );
};
