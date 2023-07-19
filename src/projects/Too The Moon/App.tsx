import { useCallback } from 'react';
import { useApp } from '@inlet/react-pixi';
import { filters } from 'pixi.js';
import { GameViews } from 'projects/Too The Moon/views/GameViews';
import { windowWidth } from 'utils/windowWidthHeight';

const App = () => {
    const app = useApp();

    const draw = useCallback(g => {
        g.clear();
        g.beginFill(0x181B29, 1);
        g.drawRoundedRect(0, 0, windowWidth(), 100, 0);
        const dropShadowFilter = new filters.BlurFilter();
        dropShadowFilter.blur = 3;
        g.filters = [dropShadowFilter];
        g.endFill();
    }, []);

    return (
        <>
            <GameViews/>
            {/*   <ContainerW position={substratePosition}>
                <Graphics draw={draw}/>
            </ContainerW>
            <GradientComponent position={gradientPosition} app={app}/> */}
        </>
    );
};

export default App;
