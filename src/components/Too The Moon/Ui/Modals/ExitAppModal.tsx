import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import 'components/Too The Moon/Ui/Modals/styles/exitModal/component.scss';
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

export const ExitAppModal = () => {
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
        useStorePopupsState.setKey('isShowExit', false);
        setIsOpen(false);
    }

    useEffect(() => {
        const computedStore = useStoreComputed(useStorePopupsState, ['isShowExit'],
            ({
                isShowExit
            }) => {
                if (isShowExit) {
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
            <div className="modal-exit-app">
                <div className="modal-exit-app__title">
                    EXIT
                </div>
                <div className="modal-exit-app__content">
                    ARE YOU SURE ?
                </div>
                <div className="modal-exit-app__actions">
                    <button className="button-confirm" onClick={closeModal}>CONFIRM</button>
                    <button className="button-cancel" onClick={closeModal}>CANCEL</button>
                </div>
            </div>

        </Modal>
    );
};
