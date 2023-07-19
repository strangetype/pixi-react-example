import { Stage } from '@inlet/react-pixi';
import { NativeLoading } from 'components/NativeLoading';
import App from 'projects/Diamonds Slots/App';
import { GameLoading_F } from 'components/Diamonds Slots/GameLoading_F';
import { NativeNotification } from 'components/NativeNotification';
import GameBackground_F from 'components/Diamonds Slots/GameBackground_F';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useLayouts } from 'layouts/features/useLayouts';
import { mainResource } from 'resource/Diamonds Slots/main-resources';
import { preloadResource } from 'resource/Diamonds Slots/preload-resources';

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
                        <GameBackground_F isAllResourceCheck={isAllResourceCheck} isGameComplete={isGameComplete}/>}
                    {!isNativeLoading && !isGameComplete &&
                        <GameLoading_F isAllResourceCheck={isAllResourceCheck} onLoading={onLoading}/>}
                    {(isAllResourceCheck && !isNativeLoading && isGameComplete) && <App/>}

                </Stage>
            </div>
        </>
    );
};
