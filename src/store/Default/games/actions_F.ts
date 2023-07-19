import { GAME_ID } from 'config/Common/settings';
import Games from 'api/methods/Games';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { GamesPlayMethods } from 'const/Common/GamesPlayMethods';
import { add, minus } from 'utils/math/operators';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { abbrNum } from 'utils/number/friendly';
import helper from 'utils/helper';
import { BONUSES_TYPE_FREE_SPIN } from 'plugins/Widget/TYPE_BONUSES';

export const useStoreGamesActions = {
    async gamesInfo (params = {
        account_id: null,
        game_id: GAME_ID
    }) {
        try {
            const {
                data: {
                    payload: {
                        name = '',
                        rules = [],
                        chips = [],
                        account = {},
                        limits = {},
                        client_settings = {}
                    }
                } = {}
            } = await Games.info(params);

            chips.shift();
            useStoreUserActions.updateAccount(account);
            useStoreSettingsState.setKey('rules', rules);
            useStoreSettingsState.setKey('name', name);
            useStoreSettingsState.setKey('chips', [...chips.map(item => {
                return {
                    text: abbrNum(item, 0),
                    value: item
                };
            })]);
            useStoreSettingsState.setKey('limits', limits);
            useStoreSettingsState.setKey('clientSettings', client_settings);
        } catch (e) {
            console.error(e);
        }
    },
    async playGame (params) {
        try {
            if (params.method === GamesPlayMethods.prepare && !helper.isEmpty(global.$BonusService.bonusSelectedId)) {
                params.bonusId = global.$BonusService.bonusSelectedId;
                delete params.account_id;

                if (global.$BonusService.bonusSelectedType === BONUSES_TYPE_FREE_SPIN) {
                    params.sum = 0;
                }
                global.$BonusService.blockedSelectBonuses();
            }

            const {
                data: {
                    message = '',
                    payload: {
                        session = {}
                    }
                } = {}
            } = await Games.play(params);

            if (params.method !== GamesPlayMethods.init && session == null) {
                useStorePopupsState.setKey('ajaxError', {
                    isShow: true,
                    message: 'Oops... session null'
                });
                console.error('Ajax error ', message);
                return Promise.reject(message);
            }

            if (params.method === GamesPlayMethods.prepare) {
                const {
                    account = {},
                    bonus = null
                } = session;

                useStoreUserActions.updateAccount(account);
                global.$BonusService.updateBonuses(bonus);
            }

            if (params.method === GamesPlayMethods.roll) {
                return Promise.resolve(
                    session as any
                );
            }

            return Promise.resolve(
                session as any
            );
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    },
    changeBalance ({ summa = 0, minus: typeMinus = false, plus: typePlus = false }) {
        if (String(summa).includes(global.$BonusService.prefixSymbolFreeSpins)) {
            return;
        }

        const account = useStoreUserGetters.getActiveAccount();

        if (typeMinus) {
            account.balance = minus(account.balance, +summa);
            if (account.balance < 0) {
                console.error('Что-то пошло не так баланс не может быть минусом');
                return;
            }
        }

        if (typePlus) {
            account.balance = add(account.balance, +summa);
        }

        useStoreUserActions.updateAccount(account);
    }
};
