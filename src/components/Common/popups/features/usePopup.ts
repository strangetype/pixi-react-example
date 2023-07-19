import { useApp } from '@inlet/react-pixi';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import helper from 'utils/helper';
import { useStoreSettingsState } from 'store/Default/settings/store_F';

export const usePopup = ({ props, hideAnimationName = 'hide' }) => {
    const {
        storeKeyActionShow = '',
        type = '',
        message: {
            slot: textSlot = 'text'
        } = {},
        buttonOne: {
            action: actionButtonOne = Function
        } = {},
        buttonTwo: {
            action: actionButtonTwo = Function
        } = {}
    } = props;

    const app = useApp();
    const { isResize } = useStore(useStoreSettingsState);
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState(props.message?.text);
    const [stateButtons, setStateButtons] = useState({});
    const [statePopup, setStatePopups] = useState({} as any);
    const [isShowText, setIsShowText] = useState(true);
    const store = useStore(useStorePopupsState);

    useEffect(() => {
        if (store && store[storeKeyActionShow] == null) {
            console.error('Нет такого ключа в сторе ' + storeKeyActionShow);
            return;
        }

        if (helper.typeOf(store[storeKeyActionShow]) === 'object') {
            setMessage(store[storeKeyActionShow].message ?? props.message?.text);
            if (store[storeKeyActionShow].isShow) {
                setIsShowText(true);
            }
            setIsShow(store[storeKeyActionShow].isShow);
        } else {
            setMessage(props.message?.text);
            if (store[storeKeyActionShow]) {
                setIsShowText(true);
            }
            setIsShow(store[storeKeyActionShow]);
        }
    }, [store[storeKeyActionShow]]);

    const clickButton = async (name) => {
        switch (name) {
        case 'buttonOne':
            actionButtonOne();
            break;
        case 'buttonTwo':
            actionButtonTwo();
            break;
        }

        setIsShowText(false);

        const promiseAll = [];

        for (const key in statePopup) {
            promiseAll.push(statePopup[key].setAnimation(0, `${type}/${hideAnimationName}`, false));
        }
        for (const key in stateButtons) {
            promiseAll.push(stateButtons[key].setAnimation(0, hideAnimationName, false));
        }

        await Promise.all(promiseAll);
        useStorePopupsState.setKey(storeKeyActionShow, false);
        setIsShowText(true);
    };

    const setStateButtonRef = useCallback((state, key) => {
        stateButtons[key] = state;
        setStateButtons(stateButtons);
    }, [stateButtons]);

    const setStatePopupRef = useCallback((state, key) => {
        statePopup[key] = state;
        setStatePopups(statePopup);
    }, [statePopup]);

    return {
        app,
        isShow,
        message,
        textSlot,
        isResize,
        clickButton,
        stateButtons,
        statePopup,
        setStatePopupRef,
        setStateButtonRef,
        storeKeyActionShow,
        actionButtonOne,
        actionButtonTwo,
        isShowText,
        setIsShowText
    };
};
