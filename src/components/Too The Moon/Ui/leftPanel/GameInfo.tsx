import 'components/Too The Moon/Ui/leftPanel/styles/gamesInfo/component.scss';

export const GameInfo = () => {
    return (
        <div className="games-info">
            <div className="games-info__total">
                TOTAL BETS:
                <span>142</span>
            </div>
            <div className="games-info__action">
                <img src={require('assets/Too The Moon/image/shape.svg')}/>
                    PRE ROUND
            </div>
        </div>
    );
};
