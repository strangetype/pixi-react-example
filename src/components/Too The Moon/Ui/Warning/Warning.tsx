import 'components/Too The Moon/Ui/Warning/styles/warning/component.scss';

export const Warning = () => {
    return (
        <div className="warning">
            <div className="warning__text">
                <img src={require('assets/Too The Moon/image/error.svg')}/>
                <span>
                   Server Connection Error
                </span>
            </div>
            <div className="warning__subtitle">
                error code: 213345
            </div>
        </div>
    );
};
