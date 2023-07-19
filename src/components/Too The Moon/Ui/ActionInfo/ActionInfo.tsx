import 'components/Too The Moon/Ui/ActionInfo/styles/component.scss';
import { useStorePopupsState } from 'store/Default/popup/store_F';

export const ActionInfo = () => {
    const clickRules = () => {
        useStorePopupsState.setKey('isShowRules', true);
    };

    const clickExitApp = () => {
        useStorePopupsState.setKey('isShowExit', true);
    };

    const clickWallets = () => {
        useStorePopupsState.setKey('isShowAccounts', true);
    };

    return (
        <div className="action-info">
            <button className="action-info__wallet" onClick={clickWallets}>
                <img src={require('assets/Too The Moon/image/wallet.svg')}/>
                444.42 USD
            </button>
            <button className="action-info__how-to-play" onClick={clickRules}>
                <img src={require('assets/Too The Moon/image/question.svg')}/>
                <span>HOW TO PLAY</span>
            </button>
            <button className="action-info__how-to-play" onClick={clickExitApp}>
                <img src={require('assets/Too The Moon/image/exit-app.svg')}/>
                <span>EXIT GAME</span>
            </button>
        </div>
    );
};
