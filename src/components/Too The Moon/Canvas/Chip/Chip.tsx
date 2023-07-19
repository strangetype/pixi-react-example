import { Graphics } from '@inlet/react-pixi';
import { useCallback } from 'react';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { TextW } from 'components/Common/wrapper/TextW';
import { filters, TextStyle } from 'pixi.js';
import { DESKTOP, LANDSCAPE, PORTRAIT } from 'const/variable';
import { windowWidth } from 'utils/windowWidthHeight';

export const Chip = (props) => {
    const width = -1 * windowWidth() * 2;
    const widthChip = 48;
    const heightChip = 18;

    const stateInstance = useCallback((instance) => {
        /*        if (!props.active) {
            instance.$cache = instance.y;
            setInterval(_ => {
                instance.y += 0.1;
                if ((window.outerHeight || window.innerHeight || document.body.clientHeight) < instance.y) {
                    instance.y = instance.$cache;
                }
            });
        } */
    }, []);

    const draw = useCallback(g => {
        g.clear();
        if (props.active) {
            g.lineStyle(1, 15849029, 1);
            g.beginFill(15849029, 1);
            g.drawRoundedRect(0, 0, widthChip, heightChip, 6);
            g.endFill();
            g.beginFill(3358053, 0.15);
            g.drawRoundedRect(-2, -2, 53, 22, 6);
            g.endFill();
        } else {
            g.beginFill(3358053, 1);
            g.drawRoundedRect(0, 0, widthChip, heightChip, 6);
            g.endFill();
        }
    }, [props.active]);

    const drawBlur = useCallback(g => {
        g.clear();
        g.beginFill(15849029, 0.1);
        g.drawRoundedRect(-7, -7, 50, 30, 1000);
        const dropShadowFilter = new filters.BlurFilter();
        dropShadowFilter.blur = 24;
        g.filters = [dropShadowFilter];
        g.endFill();
    }, []);

    const drawLine = useCallback(g => {
        g.clear();
        g.beginFill(15849029, 1);
        g.drawRoundedRect(-width, 8.1, width, 1, 0);
        g.endFill();
    }, []);

    return (
        <ContainerW
            props={{
                [PORTRAIT]: {
                    y: props.y,
                    x: props.x
                },
                [LANDSCAPE]: {
                    y: props.y,
                    x: props.x
                },
                [DESKTOP]: {
                    y: props.y,
                    x: props.x
                }
            }}
            instanceCallback={stateInstance}
        >
            {props.active && <Graphics draw={drawLine}/> }
            <Graphics draw={draw}/>
            {props.active && <Graphics draw={drawBlur}/> }
            <TextW
                scale={[-0.6, 0.6]}
                anchor={[props.coefficient.length <= 3 ? 1.2 : 1.1, 0.07]}
                text={`${props.coefficient}x`}
                style={new TextStyle({
                    fontFamily: 'Oxanium',
                    fontSize: 28,
                    align: 'center',
                    textBaseline: 'alphabetic'
                })}
            />
        </ContainerW>
    );
};
