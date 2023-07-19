import {
    barPosition,
    buttonCoinPosition,
    gridPosition,
    gridTwoPosition, loadingPosition,
    windowWinPosition
} from 'config/Too The Moon/positions';
import GridComponent from 'components/Too The Moon/Canvas/Grid/GridComponent';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { DESKTOP, LANDSCAPE, PORTRAIT } from 'const/variable';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LineChips } from 'components/Too The Moon/Canvas/LineChips';
import { windowHeight } from 'utils/windowWidthHeight';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStoreComputed } from 'features/useComputed';
import helper from 'utils/helper';
import { random } from 'utils/number/random';
import { delay } from 'utils/delay';
import { debounce } from 'utils/debounce';
import { DEBOUNCE_TIME_ELEMENT } from 'config/Common/settings';
import { applyOrientation } from 'utils/applyOrientation';
import { useApp } from '@inlet/react-pixi';
import { TextW } from 'components/Common/wrapper/TextW';
import { TextStyle } from 'pixi.js';
import { isMobile } from 'utils/isMobile';

export const GameViews = () => {
    const [barState, setBarState] = useState(null as any);
    const [lineCoordinate, setLineCoordinate] = useState({} as any);
    const [coinDecoration, setCoinDecoration] = useState({} as any);
    const refOneGame = useRef(null);
    const refTwoGame = useRef(null);
    const refBarLine = useRef(null);
    const innerGridWidth = useRef(0);
    const innerGridScale = useRef(0);
    const stepTable = useRef(0);
    const taskTurn = useRef(Object.create([]));
    const graphicStop = useRef(false);
    const cacheStepsTableCoodrinate = useRef({
        value: 0,
        coefficientValue: 0
    });
    const listCacheCoordinate = useRef([] as any);
    const coefficientStep = useRef(0.5);
    const summaCommon = useRef(-coefficientStep.current);
    const app = useApp();

    const oneDivisionPx = 100;
    const stepDifference = 2;
    const speed = isMobile() ? 1.5 : 0.8;

    const scaleGrid = applyOrientation() === DESKTOP ? 0 : 0.75;

    const decorationCoins = useMemo(() => {
        return [
            {
                position: helper.cloneDeep(buttonCoinPosition),
                key: 'bitcoin',
                skin: 'btc'
            },
            {
                position: helper.cloneDeep(buttonCoinPosition),
                key: 'eth',
                skin: 'eth'
            },
            {
                position: helper.cloneDeep(buttonCoinPosition),
                key: 'sol',
                skin: 'sol'
            },
            {
                position: helper.cloneDeep(buttonCoinPosition),
                key: 'xpr',
                skin: 'xpr'
            },
            {
                position: helper.cloneDeep(buttonCoinPosition),
                key: 'ust',
                skin: 'ust'
            }
        ].map((item, index) => {
            item.position[applyOrientation()].x = (applyOrientation() === DESKTOP ? 40 : 100) * index;
            return item;
        });
    }, []);

    const refAnimationState = useCallback((state) => {
        if (state) {
            setBarState(state);
        }
    }, [barState]);

    const generateList = (() => {
        const callFunction = useRef(-1);
        return (list = listCacheCoordinate.current) => {
            callFunction.current += 1;
            return list.filter((_, index) => callFunction.current % 2 === 0 ? (index % 2 === 0) : (index % 2 !== 0)).map((item, index) => {
                const coefficient = (() => {
                    summaCommon.current += coefficientStep.current;
                    return (summaCommon.current).toLocaleString('en-US', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 1
                    });
                })();
                return {
                    coordinate: item,
                    coefficient,
                    active: +coefficient !== 0 && +coefficient % 1 === 0
                };
            });
        };
    })();

    const startCoordinate = useCallback((list) => {
        if (list) {
            listCacheCoordinate.current = list.reverse();
            lineCoordinate.one = generateList();
            lineCoordinate.two = generateList();
            setLineCoordinate(lineCoordinate);
        }
    }, []);

    const refCoinDecoration = useCallback((instance, key) => {
        if (instance) {
            setCoinDecoration(value => {
                value[key] = instance;
                return value;
            });
        }
    }, []);

    const refContainerOneGame = useCallback((instance) => {
        if (instance) {
            instance.visible = false;
            instance.scale.set((instance.scale.x + scaleGrid) * -1, instance.scale.y + scaleGrid);
            innerGridWidth.current = instance.width;
            innerGridScale.current = instance.scale.y;
            refOneGame.current = null;
            refOneGame.current = instance;
        }
    }, []);

    const refContainerTwoGame = useCallback((instance) => {
        if (instance) {
            instance.visible = false;
            instance.scale.set((instance.scale.x + scaleGrid) * -1, instance.scale.y + scaleGrid);
            refTwoGame.current = null;
            refTwoGame.current = instance;
        }
    }, []);

    const refInstanceBar = useCallback((instance) => {
        if (instance) {
            instance.scale.set((instance.scale.x + scaleGrid), instance.scale.y + scaleGrid);
            refBarLine.current = null;
            refBarLine.current = instance;
        }
    }, []);

    // const sizeCell = 50;

    const startPositionGrid = () => {
        if (refOneGame.current != null && refTwoGame.current != null && refBarLine.current != null) {
            const startPosition = refBarLine.current.y;
            refOneGame.current.y = (refOneGame.current.height - startPosition - innerGridScale.current * 60) * -1;
            refOneGame.current.visible = true;

            refTwoGame.current.y = (refOneGame.current.height * 2 - startPosition - innerGridScale.current * 70) * -1;
            refTwoGame.current.visible = true;
        }
    };

    useEffect(() => {
        startPositionGrid();
    }, [refOneGame.current, refTwoGame.current, refBarLine.current]);

    const graphicAnimate = () => {
        //  return;
        if (taskTurn.current.length === 0 || graphicStop.current) {
            return;
        }

        cacheStepsTableCoodrinate.current.value += speed;

        refOneGame.current.y += speed;
        refTwoGame.current.y += speed;

        if (refOneGame.current.y >= windowHeight()) {
            refOneGame.current.y = (refOneGame.current.height - refTwoGame.current.y - innerGridScale.current * 11) * -1;
            setLineCoordinate(value => {
                return { ...value, ...{ one: generateList() } };
            });
        }

        if (refTwoGame.current.y >= windowHeight()) {
            refTwoGame.current.y = (refTwoGame.current.height - refOneGame.current.y - innerGridScale.current * 11) * -1;
            setLineCoordinate(value => {
                return { ...value, ...{ two: generateList() } };
            });
        }

        /*       if (stepTable.current === 0) {
            refOneGame.current.y += speed;
            if (refOneGame.current.y >= coefficientHeight) {
                // refTwoGame.current.y += speed;

                if (refOneGame.current.y >= (app.renderer.height / 2) + coefficientHeight) {
                    refOneGame.current.y = refTwoGame.current.$cache;
                    setLineCoordinate(value => {
                        return { ...value, ...{ one: generateList() } };
                    });
                    stepTable.current = 1;
                    graphicStop.current = true;
                }
            }
        } else {
            refTwoGame.current.y += speed;
            if (refTwoGame.current.y >= coefficientHeight) {
                refOneGame.current.y += speed;
                if (refTwoGame.current.y >= (app.renderer.height / 2) + coefficientHeight) {
                    refTwoGame.current.y = refTwoGame.current.$cache;
                    setLineCoordinate(value => {
                        return { ...value, ...{ two: generateList() } };
                    });
                    stepTable.current = 0;
                }
            }
        } */
        if (cacheStepsTableCoodrinate.current.value >= taskTurn.current[0]) {
            taskTurn.current.shift();
        }

        requestAnimationFrame(graphicAnimate);
    };

    useEffect(() => {
        // requestAnimationFrame(graphicAnimate);
        const store = useStoreComputed(useStoreGamesState, ['coefficientActive'], ({ coefficientActive }) => {
            const stepPx = (coefficientActive * stepDifference * oneDivisionPx * innerGridScale.current);
            if (cacheStepsTableCoodrinate.current.value < stepPx) {
                cacheStepsTableCoodrinate.current.coefficientValue = coefficientActive;
                taskTurn.current.push(stepPx);

                if (coefficientActive % 1 === 0) {
                    (async () => {
                        await barState.setAnimation(0, 'line-right-one-up', false);
                        barState.setAnimation(0, 'line-right-one-clean', true);
                    })();
                }

                if (taskTurn.current.length === 1) {
                    requestAnimationFrame(graphicAnimate);
                }
            }
        });
        return () => {
            store.cancel();
        };
    }, [refOneGame.current]);

    useEffect(() => {
        const resize = debounce(() => {
            taskTurn.current = [];
            refOneGame.current.scale.set((refOneGame.current.scale.x + scaleGrid) * -1, (refOneGame.current.scale.y + scaleGrid));
            refTwoGame.current.scale.set((refTwoGame.current.scale.x + scaleGrid) * -1, (refTwoGame.current.scale.y + scaleGrid));
            innerGridScale.current = refOneGame.current.scale.y;

            startPositionGrid();

            const stepResize = cacheStepsTableCoodrinate.current.coefficientValue * stepDifference * oneDivisionPx * innerGridScale.current;

            refOneGame.current.y += stepResize;
            refTwoGame.current.y += stepResize;

            cacheStepsTableCoodrinate.current.value = stepResize;

            taskTurn.current.push(stepResize);
            requestAnimationFrame(graphicAnimate);
        }, DEBOUNCE_TIME_ELEMENT);

        window.addEventListener('resize', resize);

        const randomEffect = async () => {
            for (const key in coinDecoration) {
                if (random(0, 10) > 5) {
                    coinDecoration[key].setAnimation(0, random(0, 5) > 2 ? 'coin_burst_1' : 'coin_burst_2', true);
                }
            }
            await delay(random(2000, 6000));
            for (const key in coinDecoration) {
                coinDecoration[key].setAnimation(0, random(0, 5) > 2 ? 'coin_burst_2' : 'coin_burst_1', false);
            }
            await delay(random(2000, 6000));
            randomEffect();
        };

        const idTimeoutCoin = setTimeout(_ => {
            randomEffect();
        }, 1000);

        const idTimeout = setTimeout(_ => {
            //  barState.setAnimation(0, 'line-crash', false);
        }, 3000);

        return () => {
            window.removeEventListener('resize', resize);
            clearTimeout(idTimeoutCoin);
            clearTimeout(idTimeout);
        };
    }, [barState, coinDecoration]);

    return (
        <>
            <ContainerW
                position={gridPosition}
                instanceCallback={refContainerOneGame}
            >
                <GridComponent width={1920} startCoordinateCallback={startCoordinate}/>
                <LineChips width={innerGridWidth.current} lineCoordinate={lineCoordinate.one}/>
            </ContainerW>
            <ContainerW
                position={gridTwoPosition}
                instanceCallback={refContainerTwoGame}
            >
                <GridComponent width={1920}/>
                <LineChips width={innerGridWidth.current} lineCoordinate={lineCoordinate.two}/>
            </ContainerW>
            <ContainerW position={loadingPosition}>
                <SpineW
                    skin={{
                        [PORTRAIT]: null,
                        [LANDSCAPE]: null
                    }}
                    spineDataKey="intro"
                    animations={[
                        { name: 'intro', initial: true }
                    ]}
                /*  animationStateCallback={refAnimationState}
                instanceCallback={refInstanceBar} */
                />
            </ContainerW>

            <ContainerW position={windowWinPosition}>
                <SpineW
                    skin={{
                        [PORTRAIT]: null,
                        [LANDSCAPE]: null
                    }}
                    spineDataKey="window-win"
                    animations={[
                        { name: 'show', initial: true }
                    ]}
                /*  animationStateCallback={refAnimationState}
                instanceCallback={refInstanceBar} */
                >

                    <TextW
                        parentSlotName="slot_text-win"
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                        text="YOU WIN"
                        style={new TextStyle({
                            fontSize: 18,
                            fontFamily: 'Poppins',
                            fill: '#39C572'
                        })}
                    />

                    <TextW
                        parentSlotName="slot_text-coefficent"
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                        text="x2.00"
                        style={new TextStyle({
                            fontSize: 25,
                            fontFamily: 'Oxanium',
                            fill: '#181B29'
                        })}
                    />

                    <TextW
                        parentSlotName="slot_text-sum-win"
                        scale={[1, -1]}
                        anchor={[0.5, 0.5]}
                        text="20100.01$"
                        style={new TextStyle({
                            fontSize: 35,
                            fontFamily: 'Poppins',
                            fill: '#E89252'
                        })}
                    />
                </SpineW>
            </ContainerW>

            {...decorationCoins.map(item => {
                return (
                    <SpineW
                        key={item.key}
                        position={item.position}
                        skin={{
                            [PORTRAIT]: item.skin,
                            [LANDSCAPE]: item.skin
                        }}
                        props={{
                            [PORTRAIT]: {
                                scale: {
                                    x: 1,
                                    y: 1
                                }
                            },
                            [LANDSCAPE]: {
                                scale: {
                                    x: 1,
                                    y: 1
                                }
                            },
                            [DESKTOP]: {
                                scale: {
                                    x: 0.32,
                                    y: 0.32
                                }
                            }
                        }}
                        spineDataKey="coins"
                        animations={[
                            { name: 'idle_green', initial: true }
                        ]}
                        animationStateCallback={(e) => refCoinDecoration(e, item.key)}
                    />
                );
            })}
            <SpineW
                position={barPosition}
                skin={{
                    [PORTRAIT]: null,
                    [LANDSCAPE]: null
                }}
                spineDataKey="bar"
                animations={[
                    { name: 'line-right-one-clean', loop: true }
                ]}
                animationStateCallback={refAnimationState}
                instanceCallback={refInstanceBar}
            ></SpineW>
        </>
    );
};
