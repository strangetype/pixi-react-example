import 'components/Too The Moon/Ui/ActionGameControl/styles/controlSumma.scss';
import { useState } from 'react';

export const ControlSumma = (props) => {
    const [summa, setSumma] = useState(props.summa);

    const clickFast = (type) => {
        if (type === 'add') {
            setSumma(value => value + 1);
        } else if (type === 'minus') {
            setSumma(value => value - 1);
        } else if (type === 'trash') {
            setSumma(0);
        } else {
            setSumma(value => value + type);
        }

        props.onChange(summa);
    };

    return (
        <>
            <div className="game-control-summa">
                <div className="game-control-summa__width">
                    <button className="game-control-summa__action" onClick={() => clickFast('minus')}>
                    -
                    </button>
                    <div className="game-control-summa__summa">
                        {summa}$
                    </div>
                    <button className="game-control-summa__action" onClick={() => clickFast('add')}>
                    +
                    </button>
                </div>
            </div>

            <div className="game-control-fast-action">
                <div className="game-control-fast-action__width">
                    <button className="game-control-fast-action__trash" onClick={() => clickFast('trash')}>
                        <img src={require('assets/Too The Moon/image/trash.svg')}/>
                    </button>
                {...props.fastItems.map(item => {
                    return (
                        <button className="game-control-fast-action__summa" onClick={() => clickFast(item)}>
                            {item}
                        </button>
                    );
                })}
                </div>
            </div>
        </>
    );
};
