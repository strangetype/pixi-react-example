import { useCallback, useEffect, useState } from 'react';
import { useStoreComputed } from 'features/useComputed';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStore } from '@nanostores/react';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useApp } from '@inlet/react-pixi';
import {
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_PLAY,
    KEY_PANEL_BUTTON_SELECT_BALANCE
} from 'const/Common/KEYS_BUTTONS';
import { AnimationButton_F } from 'config/Diamonds Slots/AnimationButton_F';

export const usePanelView = ({
    PANEL_BUTTONS = [],
    animationNameDisabled = AnimationButton_F.disabled,
    animationNameActive = AnimationButton_F.normal
} = {}) => {
    const app = useApp();
    const { input } = useStoreGamesState.get();
    const { balanceAndCurrencyCode, accounts } = useStoreUserState.get();
    const { translations, chips } = useStore(useStoreSettingsState);
    const [animationsStateButtons, setAnimationsStateButtons] = useState({} as any);

    useEffect(() => {
        const computedStore = useStoreComputed(useStoreGamesState, ['isGamingAnimation', 'isPanelDisabled', 'isBonusesBlockedKeyboard'], () => {
            const { isGamingAnimation, isPanelDisabled, isBonusesBlockedKeyboard } = useStoreGamesState.get();

            if (isGamingAnimation || isPanelDisabled || (isBonusesBlockedKeyboard && !(isGamingAnimation || isPanelDisabled))) {
                for (const key in animationsStateButtons) {
                    if (key === KEY_PANEL_BUTTON_PLAY && (isBonusesBlockedKeyboard && !(isGamingAnimation || isPanelDisabled))) {
                        delete animationsStateButtons[key].$isBlock;
                        animationsStateButtons[key].setAnimation(0, animationNameActive, true);
                    } else {
                        animationsStateButtons[key].$isBlock = true;
                        animationsStateButtons[key].setAnimation(0, animationNameDisabled, true);
                    }
                }
                (isGamingAnimation || isPanelDisabled) && global.$BonusService.blockedSelectBonuses();
            } else if (!isGamingAnimation && !isPanelDisabled) {
                for (const key in animationsStateButtons) {
                    if (!(key === KEY_PANEL_BUTTON_SELECT_BALANCE && accounts.length === 1)) {
                        delete animationsStateButtons[key].$isBlock;
                        animationsStateButtons[key].setAnimation(0, animationNameActive, true);
                    }
                }
            }
        });

        return () => {
            computedStore.cancel();
        };
    }, []);

    const animationStateCallback = useCallback((state, key) => {
        animationsStateButtons[key] = state;
        setAnimationsStateButtons(animationsStateButtons);
    }, [animationsStateButtons]);

    const getText = ({ text = null, keyTranslation = null, chipKey = null, key = null } = {}) => {
        if (key === KEY_PANEL_BUTTON_INPUT) {
            return String(input);
        } else if (key === KEY_PANEL_BUTTON_SELECT_BALANCE) {
            return balanceAndCurrencyCode;
        }

        return chips[chipKey]?.text ?? translations[keyTranslation] ?? text ?? null;
    };

    return {
        app,
        accounts,
        translations,
        getText,
        animationStateCallback
    };
};
