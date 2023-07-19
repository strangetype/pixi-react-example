import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { formatMoney } from 'utils/formatMoney';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import helper from 'utils/helper';
import { add, divide, multiply } from 'utils/math/operators';
import { countDecimals } from 'utils/number/countDecimals';
import {
    KEY_PANEL_BUTTON_CHIPS_1,
    KEY_PANEL_BUTTON_CHIPS_2,
    KEY_PANEL_BUTTON_CHIPS_3,
    KEY_PANEL_BUTTON_CHIPS_4,
    KEY_PANEL_BUTTON_CHIPS_5,
    KEY_PANEL_BUTTON_CHIPS_6,
    KEY_PANEL_BUTTON_D2,
    KEY_PANEL_BUTTON_INPUT,
    KEY_PANEL_BUTTON_INPUT_CLEAR,
    KEY_PANEL_BUTTON_MAX,
    KEY_PANEL_BUTTON_MIN,
    KEY_PANEL_BUTTON_PLAY,
    KEY_PANEL_BUTTON_SELECT_BALANCE,
    KEY_PANEL_BUTTON_X2
} from 'const/Common/KEYS_BUTTONS';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { checkWebview } from 'utils/checkWebview';
import { fractionDigits } from 'utils/fractionDigits';
import { isWindowInIframe } from 'utils/isWindowInIframe';
import { Bonus } from 'plugins/Widget/Bonus';

export const useStorePopupsActions = {
    changeStake () {
        global.$BonusService.unBlockedSelectBonuses();
    },
    playAgain () {
        useStoreGamesState.setKey('isGaming', true);
    },
    stakeMin () {
        const { limits } = useStoreSettingsState.get();
        useStoreGamesState.setKey('input', fractionDigits(limits.min_bet, 2, 2));
        useStoreGamesState.setKey('onboardingSummaActive', true);
    },
    stakeMinCancel () {
        const { input } = useStoreGamesState.get();
        if (helper.isEmpty(input)) {
            useStoreGamesState.setKey('input', fractionDigits(0, 2, 2));
        }
    },
    stakeMax () {
        const { limits } = useStoreSettingsState.get();
        useStoreGamesState.setKey('input', fractionDigits(limits.max_bet, 2, 2));
        useStoreGamesState.setKey('onboardingSummaActive', true);
    },
    noMoneyOk () {
        const { isShowOnboarding } = useStorePopupsState.get();
        if (isShowOnboarding) {
            useStorePopupsState.setKey('isShowOnboarding', false);
        }
    },
    exitApp () {
        if (checkWebview()) {
            window.location.replace('webview://close');
        } else if (isWindowInIframe()) {
            window.parent.postMessage('closeGameIframe', '*');
        } else {
            window.location.href = '/';
        }
    },
    checkInputClosedKeyboard () {
        let { input } = useStoreGamesState.get();

        if (String(input).includes(Bonus.prefixSymbolFreeSpins)) {
            return;
        }

        const { currency_code: currencyCode = '', balance } = useStoreUserGetters.getActiveAccount();
        const { translations, limits, isResize } = useStoreSettingsState.get();

        const timeOutKeyboard = isResize ? 600 : 280;

        if (balance === 0 || balance < limits.min_bet) {
            setTimeout(_ => {
                useStoreGamesState.setKey('onboardingSummaActive', true);
            }, timeOutKeyboard);
        }
        if (input >= balance && (input < limits.max_bet || balance < limits.max_bet)) {
            useStoreGamesState.setKey('input', fractionDigits(balance, 2, 2));
            setTimeout(_ => {
                useStorePopupsState.setKey('isShowLowBalance', true);
            }, timeOutKeyboard);
        } else if (input > limits.max_bet) {
            setTimeout(_ => {
                useStorePopupsState.setKey('warningSummaMax', {
                    isShow: true,
                    message: translations['popup.max_bound'].replace('$1', `${limits.max_bet} ${currencyCode}`)
                });
            }, timeOutKeyboard);
        } else if (input < limits.min_bet) {
            setTimeout(_ => {
                useStorePopupsState.setKey('warningSummaMin', {
                    isShow: true,
                    message: translations['popup.up_bet_to_min'].replaceAll('$2', `${fractionDigits(limits.min_bet, 2, 2)} ${currencyCode}`)
                });
            }, timeOutKeyboard);
        } else if (input[input.length - 1] === '.') {
            input = String(input).slice(0, -1);
            useStoreGamesState.setKey('input', fractionDigits(input, 2, 2));
        } else {
            useStoreGamesState.setKey('input', fractionDigits(input, 2, 2));
        }
    },
    async clickKeyButton (name) {
        let { input, isGamingAnimation } = useStoreGamesState.get();
        const { currency_code: currencyCode = '', balance } = useStoreUserGetters.getActiveAccount();
        const { translations, chips, limits } = useStoreSettingsState.get();

        const isEmptyInput = helper.isEmpty(input) || parseFloat(input) === 0;

        const popupMin = () => {
            if (balance < input || balance === 0) {
                useStorePopupsState.setKey('isShowLowBalance', true);
                return;
            }
            useStorePopupsState.setKey('warningSummaMin', {
                isShow: true,
                message: translations['popup.up_bet_to_min'].replaceAll('$2', `${fractionDigits(limits.min_bet, 2, 2)} ${currencyCode}`)
            });
        };

        switch (name) {
        case 'MIN':
            input = limits.min_bet ?? 0;
            input = formatMoney(input);
            useStoreGamesState.setKey('input', input);
            return;
        case 'MAX':
            input = limits.max_bet ?? 0;
            input = formatMoney(input);
            useStoreGamesState.setKey('input', input);
            return;
        case 'X/2':
            input = divide(input, 2);
            input = formatMoney(input);
            useStoreGamesState.setKey('input', input);
            return;
        case 'X2':
            if (String(input).length > 10) {
                return;
            }
            input = multiply(input, 2);
            input = formatMoney(input);
            useStoreGamesState.setKey('input', input);
            return;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            input = String(input);

            if (input.length > 10 && input[input.length - 1] !== '.') {
                return;
            }

            if (input !== '0.0' && isEmptyInput && input[input.length - 1] !== '.') {
                input = String(name);
            } else if (countDecimals(input) === 2) {
                return;
            } else {
                input += String(name);
            }

            useStoreGamesState.setKey('input', input);
            return;
        case '.':
        case 190:
            if (String(input).includes('.')) {
                return;
            }
            input += '.';
            useStoreGamesState.setKey('input', input);
            return;
        case ' ':
        case 'Backspace':
        case 'Delete':
        case 'Clear':
            input = String(input).slice(0, -1);
            useStoreGamesState.setKey('input', input);
            return;
        case 'Enter':
        case 'Ok':
            useStorePopupsState.setKey('isKeyBoard', false);
            return;
        case KEY_PANEL_BUTTON_CHIPS_1:
            input = add(input, chips[0].value);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_CHIPS_2:
            input = add(input, chips[1].value);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_CHIPS_3:
            input = add(input, chips[2].value);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_CHIPS_4:
            input = add(input, chips[3].value);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_CHIPS_5:
            input = add(input, chips[4].value);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_CHIPS_6:
            input = add(input, chips[5].value);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_MIN:
            input = limits.min_bet ?? 0;
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_MAX:
            input = limits.max_bet ?? 0;
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_D2:
            if (isEmptyInput) {
                popupMin();
                return;
            }
            input = divide(input, 2);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_X2:
            if (isEmptyInput) {
                popupMin();
                return;
            }
            input = multiply(input, 2);
            useStoreGamesState.setKey('onboardingSummaActive', true);
            break;
        case KEY_PANEL_BUTTON_INPUT_CLEAR:
            input = '0.00';
            useStoreGamesState.setKey('input', input);
            return;
        case KEY_PANEL_BUTTON_PLAY: {
            const { isShowOnboarding } = useStorePopupsState.get();
            if (isShowOnboarding) {
                useStorePopupsState.setKey('isShowOnboarding', false);
            }
            if (!String(input).includes(Bonus.prefixSymbolFreeSpins)) {
                if (isEmptyInput || +input < limits.min_bet) {
                    popupMin();
                    return;
                } else if (balance < parseFloat(input)) {
                    useStorePopupsState.setKey('isShowLowBalance', true);
                    return;
                }
            }
            useStoreGamesState.setKey('isGaming', true);
            return;
        }
        case KEY_PANEL_BUTTON_INPUT: {
            if (isGamingAnimation) {
                return;
            }
            const { isKeyBoard } = useStorePopupsState.get();
            useStorePopupsState.setKey('isKeyBoard', !isKeyBoard);
        }
            return;
        case KEY_PANEL_BUTTON_SELECT_BALANCE: {
            if (isGamingAnimation) {
                return;
            }
            useStorePopupsState.setKey('isShowAccounts', true);
            return;
        }
        }

        if (input > balance) {
            useStorePopupsState.setKey('isShowLowBalance', true);
            useStoreGamesState.setKey('input', balance);
            return;
        }

        if (+input < limits.min_bet) {
            // input = limits.min_bet;
            popupMin();
        } else if (+input > limits.max_bet) {
            input = limits.max_bet;
            useStorePopupsState.setKey('warningSummaMax', {
                isShow: true,
                message: translations['popup.max_bound'].replace('$1', `${limits.max_bet} ${currencyCode}`)
            });
        }

        useStoreGamesState.setKey('input', fractionDigits(input, 2, 2));
    }
};
