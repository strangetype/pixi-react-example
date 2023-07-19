import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import 'components/Too The Moon/Ui/Modals/styles/walletsModal/component.scss';
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

export const WalletsModal = () => {
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
        useStorePopupsState.setKey('isShowAccounts', false);
        setIsOpen(false);
    }

    useEffect(() => {
        const computedStore = useStoreComputed(useStorePopupsState, ['isShowAccounts'],
            ({
                isShowAccounts
            }) => {
                if (isShowAccounts) {
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
            <div className="modal-wallet">
                <div className="modal-wallet__title">
                    <img src={require('assets/Too The Moon/image/wallet-orange.svg')}/>
                    BALANCE
                </div>
                <div className="modal-wallet__content">
                    <div className="wallet-item wallet-item--active">
                        <div className="wallet-item__summa">
                            34443
                        </div>
                        <div className="wallet-item__currency">
                            USD
                        </div>
                    </div>
                    <div className="wallet-item">
                        <div className="wallet-item__summa">
                            34443
                        </div>
                        <div className="wallet-item__currency">
                            USD
                        </div>
                    </div>
                    <div className="wallet-item">
                        <div className="wallet-item__summa">
                            34443
                        </div>
                        <div className="wallet-item__currency">
                            USD
                        </div>
                    </div>
                    <div className="wallet-item">
                        <div className="wallet-item__summa">
                            34443
                        </div>
                        <div className="wallet-item__currency">
                            USD
                        </div>
                    </div>
                    <div className="wallet-item">
                        <div className="wallet-item__summa">
                            34443
                        </div>
                        <div className="wallet-item__currency">
                            USD
                        </div>
                    </div>
                    <div className="wallet-item">
                        <div className="wallet-item__summa">
                            34443
                        </div>
                        <div className="wallet-item__currency">
                            USD
                        </div>
                    </div>
                </div>
                <div className="modal-wallet__confirm">
                    <button className="button-confirm">
                        CONFIRM
                    </button>
                </div>
            </div>

        </Modal>
    );
};
