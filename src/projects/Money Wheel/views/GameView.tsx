import { useCallback, useEffect, useState } from 'react';
import { TextStyle } from 'pixi.js';
import { useStoreComputed } from 'features/useComputed';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { SpineW } from 'components/Common/wrapper/SpineW';
import { TextW } from 'components/Common/wrapper/TextW';
import { ContainerW } from 'components/Common/wrapper/ContainerW';
import { panelPosition } from 'config/Money Wheel/positions';
import { TXT_COEF_STYLE } from 'const/Money Wheel/textStyles';
import { chunk } from 'utils/array/chunk';
import { GAME_ID } from 'config/Common/settings';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { useStoreGameGetters } from 'store/Default/games/getters_F';
import { fractionDigits } from 'utils/fractionDigits';

const GameView = () => {
    const [animationSlotFortuna, setAnimationSlotFortuna] = useState(null as any);
    const [animationSlotFortunaSector, setAnimationSlotFortunaSector] = useState(null as any);
    const { playGame } = useStoreGamesActions;
    // @ts-ignore
    const { translations, rules: { multipliers = [] } = {} } = useStoreSettingsState.get();
    let accountUpdate = {};

    const SECTOR_COORDINATION_WIN = {} as any;

    const SECTOR_ELEMENTS_24 = (() => {
        const GROUP_MULTIPLIER = chunk(multipliers.slice(1, multipliers.length), 2);
        let groupIndex = -1;
        return [...new Array(24)].map((_, index) => {
            const multiple = index % 3;
            if (multiple === 0 && groupIndex < GROUP_MULTIPLIER.length - 1) {
                groupIndex++;
            } else if (multiple === 0 && groupIndex >= GROUP_MULTIPLIER.length - 1) {
                groupIndex = 0;
            }

            let stopPoint = index / 24;
            if (stopPoint > 1) {
                stopPoint -= 1;
            }
            if (stopPoint < 0) {
                stopPoint += 1;
            }

            // @ts-ignore
            multiple !== 0 && (SECTOR_COORDINATION_WIN[GROUP_MULTIPLIER[groupIndex][multiple - 1]] = Math.abs(stopPoint - 1));

            return multiple === 0 ? 'x0' : `x${GROUP_MULTIPLIER[groupIndex][multiple - 1]}`;
        });
    })();

    const onIsGaming = async (isGaming = false) => {
        if (isGaming) {
            const { input } = useStoreGamesState.get();
            const { activeIdAccount } = useStoreUserState.get();

            useStoreGamesActions.changeBalance({ summa: input, minus: true });

            useStoreGamesState.setKey('isGamingAnimation', true);

            animationSlotFortuna.timeScale = 2;
            try {
                await playGame({
                    account_id: activeIdAccount,
                    game_id: GAME_ID,
                    method: 'prepare',
                    sum: parseFloat(input)
                });
                const {
                    board: {
                        multiplier = 0
                    },
                    account = {},
                    winnings = 0
                } = await playGame({
                    game_id: GAME_ID,
                    method: 'roll'
                }) as any;
                useStoreGamesState.setKey('winnings', winnings);
                accountUpdate = {
                    ...account
                };
                seekRotation({
                    multiplier
                });
            } catch (e) {
                console.log(e);
                seekRotation();
                const { input } = useStoreGamesState.get();
                useStoreGamesActions.changeBalance({ summa: input, plus: true });
                useStoreGamesState.setKey('winnings', null);
                useStoreGamesState.setKey('isGaming', false);
            }
        } else {
            const { winnings = null } = useStoreGamesState.get();
            const { currency_code: currencyCode } = useStoreUserGetters.getActiveAccount();
            if (winnings) {
                useStorePopupsState.setKey('win', {
                    isShow: true,
                    message: `${translations['popup.you_won']}\n${fractionDigits(winnings, 2, 2)} ${currencyCode}`
                });
                useStoreUserActions.updateAccount(accountUpdate);
            } else if (winnings != null) {
                useStorePopupsState.setKey('isShowLose', true);
            }

            winnings != null && useStoreGamesState.setKey('textInfo', `${translations.your_win} ${fractionDigits(winnings, 2, 2)} ${currencyCode}`);
            useStoreGamesState.setKey('isGamingAnimation', false);
        }
    };

    const seekRotation = ((data = {}) => {
        let intervalId;
        let _trackTime;
        return async ({
            multiplier = 0
        } = data as any) => {
            intervalId && clearInterval(intervalId);
            await animationSlotFortunaSector.setAnimation(0, 'glov/hide1', false, { timeScale: -1 });
            const stopWinCoordinationPoint = (() => {
                if (multiplier === 0) {
                    let stopPoint = 3 * (Math.round(Math.random() * 8)) / 24 - 0.5 / 24;
                    if (stopPoint < 0) stopPoint += 1;
                    if (stopPoint > 1) stopPoint -= 1;
                    return stopPoint;
                }
                return SECTOR_COORDINATION_WIN[multiplier] - 0.5 / 24;
            })();

            let { tracks: [{ trackTime, animationEnd } = {} as any] = [] } = animationSlotFortuna;

            if (_trackTime && _trackTime !== trackTime) {
                trackTime = _trackTime;
                animationSlotFortuna.tracks[0].trackTime = _trackTime;
            } else if (!_trackTime) {
                _trackTime = trackTime;
            }

            const smoothnessBraking = useStoreGameGetters.getSettingsAnimation({
                groupConfig: 'барабан',
                configName: 'плавность торможения'
            });

            const smoothnessBrakingTime = animationEnd / (20 * smoothnessBraking);
            const stopCoordinatePoint = animationEnd * Math.floor(trackTime / animationEnd) + animationEnd * Math.round(10 * smoothnessBraking) + stopWinCoordinationPoint * animationEnd;
            const stopCoordinateDistance = stopCoordinatePoint - trackTime;
            let _coordinateCoefficient = (stopCoordinatePoint - trackTime + smoothnessBrakingTime) / (stopCoordinateDistance + smoothnessBrakingTime);

            let _coordinateCoefficientDD = 1;

            intervalId = setInterval(_ => {
                const { tracks: [{ trackTime } = {} as any] = [] } = animationSlotFortuna;
                const coordinateCoefficientDD = stopCoordinatePoint - trackTime + smoothnessBrakingTime;
                let coordinateCoefficientD = coordinateCoefficientDD / (stopCoordinateDistance + smoothnessBrakingTime);

                if (coordinateCoefficientD < 0.01 * smoothnessBraking && coordinateCoefficientDD > 0) {
                    _coordinateCoefficientDD = -1;
                }

                if (_coordinateCoefficientDD < 0) {
                    coordinateCoefficientD = (stopCoordinatePoint - trackTime) / stopCoordinateDistance;
                }

                if (coordinateCoefficientD < 0) {
                    coordinateCoefficientD = -0.01;
                }

                _coordinateCoefficient += 0.02 * (coordinateCoefficientD - _coordinateCoefficient);

                animationSlotFortuna.timeScale = 2 * _coordinateCoefficient * useStoreGameGetters.getSettingsAnimation({
                    groupConfig: 'барабан',
                    configName: 'начальная скорость'
                });

                if (trackTime > stopCoordinatePoint * 1.2 || (_coordinateCoefficientDD < 0 && (trackTime <= stopCoordinatePoint))) {
                    clearInterval(intervalId);
                    animationSlotFortuna.timeScale = 0;
                    animationSlotFortuna.trackTime = stopCoordinatePoint;
                    animationSlotFortunaSector.setAnimation(0, 'glov/show1', false);
                    animationSlotFortunaSector.setAnimation(0, 'glov/loop1', true);
                    useStoreGamesState.setKey('isGaming', false);
                }
            }, 1);
        };
    })();

    useEffect(() => {
        const computedStore = useStoreComputed(useStoreGamesState, ['isGaming', 'line'],
            ({
                stepKey,
                isGaming,
                line
            }) => {
                switch (stepKey) {
                case 'isGaming':
                    onIsGaming(isGaming);
                    break;
                case 'line':
                    break;
                }
            });

        return () => {
            computedStore.cancel();
        };
    }, [animationSlotFortuna]);

    const stateRef = useCallback((state) => {
        if (state) {
            state.clearTracks();
            state.setAnimation(0, 'loop_rotation2', true);
            state.timeScale = 0;
        }
        setAnimationSlotFortuna(state);
    }, [animationSlotFortuna]);

    const stateRefSector = useCallback((state) => {
        setAnimationSlotFortunaSector(state);
    }, [animationSlotFortunaSector]);

    return (
        <ContainerW position={panelPosition}>
            <SpineW
                spineDataKey="Wheel"
                animations={[
                    { name: 'show', initial: true, configName: 'появление' }
                ]}
                animationStateCallback={stateRef}
            >
                {
                    SECTOR_ELEMENTS_24.map((text, index) => {
                        return (
                            <TextW
                                key={`s${index + 1}`}
                                parentSlotName={`s${index + 1}`}
                                text={text}
                                anchor={[0, 0.5]}
                                x={10}
                                scale={[-1, 1]}
                                style={new TextStyle(TXT_COEF_STYLE)}
                            />
                        );
                    })
                }
            </SpineW>
            <SpineW
                spineDataKey="Wheel_Sector_Scale"
                animationStateCallback={stateRefSector}
                animations={[
                    { name: 'loop', initial: true, configName: 'пост анимация' }
                ]}
            />
        </ContainerW>
    );
};

export default GameView;
