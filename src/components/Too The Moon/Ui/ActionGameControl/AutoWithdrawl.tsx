import 'components/Too The Moon/Ui/ActionGameControl/styles/autoWithdrawl.scss';

export const AutoWithdrawl = (props) => {
    return (
        <div className="auth-withdrawal">
            <div className="auth-withdrawal__action">
                <label><input type="checkbox"/>AUTO WITHDRAWL</label>
            </div>
            <div className="auth-withdrawal__title">
                x2.00
            </div>
        </div>
    );
};
