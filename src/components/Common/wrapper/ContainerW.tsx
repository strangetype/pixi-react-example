import { useEffect, useRef, useState } from 'react';
import { Container, useApp } from '@inlet/react-pixi';
import { getPosition } from 'utils/getPosition';
import { applyOrientation } from 'utils/applyOrientation';
import { setProps } from 'utils/setProps';
import helper from 'utils/helper';
import { debounce } from 'utils/debounce';
import { DEBOUNCE_TIME_ELEMENT } from 'config/Common/settings';

export const ContainerW = (props) => {
    const app = props.appProvider ?? useApp();
    const refContainer = useRef(null);
    const [positionRes, setPositionRes] = useState({});

    useEffect(() => {
        if (!refContainer.current) {
            return;
        }

        const stageSize = async function (isNativeResize = true as any) {
            if (props.position && refContainer.current) {
                const newPosition = {
                    position: helper.typeOf(props.position) === 'function' ? props.position()[applyOrientation()] : props.position[applyOrientation()],
                    renderHeight: app.renderer.height,
                    renderWidth: app.renderer.width,
                    renderResolution: app.renderer.resolution,
                    stageXY: {
                        x: app.stage.x,
                        y: app.stage.y
                    },
                    stageScale: {
                        x: app.stage.scale.x,
                        y: app.stage.scale.y
                    },
                    containerScale: {
                        x: refContainer.current?.scale?.x ?? 1,
                        y: refContainer.current?.scale?.y ?? 1
                    }
                };

                const { scale = 1, x = 0, y = 0 } = getPosition(newPosition);

                if (isNativeResize) {
                    refContainer.current.scale.set(scale);
                    refContainer.current.x = x;
                    refContainer.current.y = y;
                } else {
                    setPositionRes(getPosition(newPosition));
                }

                if (props.props) {
                    setProps(refContainer.current, props.props[applyOrientation()] ?? {});
                }

                refContainer.current.calculateBounds();
            } else if (!helper.isEmpty(props.props)) {
                setProps(refContainer.current, props.props[applyOrientation()] ?? {});
            }
        };

        const stageSizeDebounce = debounce(stageSize, DEBOUNCE_TIME_ELEMENT);

        window.addEventListener('resize', stageSizeDebounce);

        stageSize(false);

        if (props.instanceCallback) {
            props.instanceCallback(refContainer.current);
        }

        return () => {
            window.removeEventListener('resize', stageSizeDebounce);
        };
    }, [refContainer.current, props.position, props.props]);

    const newProps = {
        ...props,
        ...(props.position ? { position: helper.typeOf(props.position) === 'function' ? {} : props.position } : {})
    };

    return (
        <Container ref={refContainer} {...newProps} {...positionRes}>
            {props.children}
        </Container>
    );
};
