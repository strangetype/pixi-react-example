import { Stage } from '@inlet/react-pixi';
import { NativeLoading } from 'components/NativeLoading';
import App from 'projects/Hot Dice/App';
import { GameLoading_F } from 'components/Hot Dice/GameLoading_F';
import { NativeNotification } from 'components/NativeNotification';
import GameBackground_F from 'components/Hot Dice/GameBackground_F';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useLayouts } from 'layouts/features/useLayouts';
import { preloadResource } from 'resource/Hot Dice/preload-resources';
import { mainResource } from 'resource/Hot Dice/main-resources';

export const Layouts_F = () => {
    const {
        isNativeLoading,
        isAllResourceCheck,
        isGameComplete,
        onLoading,
        stageProps
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
                        <GameBackground_F isGaming={(isAllResourceCheck && !isNativeLoading && isGameComplete)}/>}
                    {!isNativeLoading && !isGameComplete &&
                        <GameLoading_F isAllResourceCheck={isAllResourceCheck} onLoading={onLoading}/>}
                    {(isAllResourceCheck && !isNativeLoading && isGameComplete) && <App/>}
                </Stage>
            </div>
        </>
    );
};
