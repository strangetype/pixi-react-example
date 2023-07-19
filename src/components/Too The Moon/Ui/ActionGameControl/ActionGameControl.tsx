import 'components/Too The Moon/Ui/ActionGameControl/styles/actionGameControl.scss';
import { RadioButton } from 'components/Too The Moon/Ui/ActionGameControl/RadioButton';
import { ControlSumma } from 'components/Too The Moon/Ui/ActionGameControl/ControlSumma';
import { useMemo, useRef } from 'react';
import { AutoWithdrawl } from 'components/Too The Moon/Ui/ActionGameControl/AutoWithdrawl';
import { applyOrientation } from 'utils/applyOrientation';

export const ActionGameControl = () => {
    const settingButtons = useMemo(() => {
        return [
            {
                key: 'bet',
                name: 'Bet',
                active: false
            },
            {
                key: 'auto',
                name: 'Auto Bet',
                active: true
            }
        ];
    }, []);

    const fastSummaButtons = useMemo(() => {
        return [
            1000, 5000, 10000, 21000
        ];
    }, []);

    const summa = useRef(0);

    const DESKTOP_TEMPLATE = (
        <div className="action-game-control">

            <AutoWithdrawl/>

            <div className="game-control">
                <RadioButton
                    onChange={() => {
                    }}
                    items={settingButtons}
                />

                <ControlSumma
                    summa={summa.current}
                    fastItems={fastSummaButtons}
                    onChange={(e) => {
                        summa.current = e;
                    }}
                />

                <button className="game-control__play-bet">
                    BET
                </button>

            </div>

        </div>
    );

    const MOBILE_LANDSCAPE_TEMPLATE = (
        <div className="action-game-control">
            <div className="action-game-landscape">
                <RadioButton
                    onChange={() => {
                    }}
                    items={settingButtons}
                />

                <AutoWithdrawl/>
            </div>

            <div className="game-control">
                <div className="game-control-column-landscape">
                    <ControlSumma
                        summa={summa.current}
                        fastItems={fastSummaButtons}
                        onChange={(e) => {
                            summa.current = e;
                        }}
                    />
                </div>
                <button className="game-control__play-bet">
                    BET
                </button>
            </div>
        </div>
    );

    switch (applyOrientation()) {
    case 'desktop':
        return DESKTOP_TEMPLATE;
    case 'landscape':
    case 'portrait':
        return MOBILE_LANDSCAPE_TEMPLATE;
    default:
        return DESKTOP_TEMPLATE;
    }
};
