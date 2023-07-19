import 'components/Too The Moon/Ui/leftPanel/styles/itemUserCard/component.scss';

export const ItemUserCard = (props) => {
    return (
        <div className={`user-card ${props.win && 'user-card--win'}`}>
            <div className="user-card__abbreviated">
                ob
            </div>
            <div className="user-card__name">
                    34343423434 4344244
            </div>
            <div className="user-card__summa">
                 232 $
            </div>
            <div className="user-card__rate">
                        x2.00
            </div>
            <div className="user-card__summa-win">
                466 $
            </div>
            <div className="user-card__win-cup">
                <img src={require('assets/Too The Moon/image/cup.svg')}/>
                <img className="user-card__win-cup--animated" src={require('assets/Too The Moon/image/rays 5.svg')}/>
            </div>
        </div>
    );
};
