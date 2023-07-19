import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import 'components/Too The Moon/Ui/Modals/styles/rulesModal/component.scss';
import { useStoreComputed } from 'features/useComputed';
import { useStorePopupsState } from 'store/Default/popup/store_F';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'transparent',
        border: '0px',
        zIndex: 999
    }
};

export const RulesModal = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal () {
        setIsOpen(true);
    }

    function afterOpenModal () {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal () {
        useStorePopupsState.setKey('isShowRules', false);
        setIsOpen(false);
    }

    useEffect(() => {
        const computedStore = useStoreComputed(useStorePopupsState, ['isShowRules'],
            ({
                isShowRules
            }) => {
                if (isShowRules) {
                    openModal();
                }
            });

        return () => {
            computedStore.cancel();
        };
    }, []);

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <div className="modal-rules">
                <div className="modal-rules__title">
                    <img src={require('assets/Too The Moon/image/question-orange.svg')}/>
                        GAME RULES
                </div>
                <div className="modal-rules__content">
                    <div className="rules-card">
                        <div className="rules-card__box">
                            <div className="rules-card__box__check">
                                    1
                            </div>
                        </div>
                        <div className="rules-card__subtitle">
                                Place a bet. The size of the initial bet is determined before the start of the game.
                        </div>
                    </div>

                    <div className="rules-card">
                        <div className="rules-card__box">
                            <div className="rules-card__box__check">
                                    2
                            </div>
                        </div>
                        <div className="rules-card__subtitle">
                                The minimum bet amount is 1 $. You can place two bets at the same time using both the
                                left and right bet pads.
                        </div>
                    </div>

                    <div className="rules-card">
                        <div className="rules-card__box">
                            <div className="rules-card__box__check">
                                    3
                            </div>
                        </div>
                        <div className="rules-card__subtitle">
                                To withdraw the winnings, you need to click the "Withdrawal" button. Your winnings are
                                the sum of your stake multiplied by the cashout multiplier.
                        </div>
                    </div>

                    <div className="rules-card">
                        <div className="rules-card__box">
                            <div className="rules-card__box__check">
                                    4
                            </div>
                        </div>
                        <div className="rules-card__subtitle">
                                If you did not have time to click on the "Withdrawal" button until the stock exchange
                                collapsed, then you lose.
                        </div>
                    </div>

                    <div className="modal-rules__content-info">
                            If you did not have time to click on the "Withdrawal" button until the stock exchange
                            collapsed, then you lose.
                    </div>

                </div>
            </div>

        </Modal>
    );
};
