import { axiosApi } from 'api/config';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import Auth from 'api/methods/Auth';
import User from 'api/methods/User';
import storage from 'utils/storage';
import helper from 'utils/helper';

import { GAME_ID } from 'config/Common/settings';
import { useStoreUserState } from 'store/Default/user/store_F';
import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { isTestGame } from 'utils/isTestGame';

export const useStoreUserActions = {
    setToken (token) {
        axiosApi.defaults.headers.common['x-authorization'] = token;

        useStoreUserState.setKey('token', token);
    },
    setPartnerToken (token) {
        axiosApi.defaults.headers.common['x-partner-token'] = token;

        useStoreUserState.setKey('tokenPartner', token);
    },
    async userLogin () {
        try {
            const { paramsUrl: { password = null, username = null } = {} } = useStoreSettingsState.get();
            const { data: { payload: { 'x-authorization': token = null } } = {} } = await Auth.user({
                password: password ?? isTestGame() ? 'user_100' : null,
                username: username ?? isTestGame() ? 'user_100' : null
            });
            useStoreUserActions.setToken(token);
        } catch (e) {
            console.error(e);
        }
    },
    async userPartnerLogin () {
        try {
            const { paramsUrl: { login = null, pass = null, userId = null } = {} } = useStoreSettingsState.get();

            const { data: { access_token = null } = {} } = await Auth.login({
                login: login ?? 'test',
                pass: pass ?? 'test',
                userId: String(userId ?? 8)
            });
            useStoreUserActions.setPartnerToken(access_token);
        } catch (e) {
            console.error(e);
        }
    },
    async getUserWallets () {
        try {
            const { data: { payload: { accounts = [] } } = {} } = await User.userGet();

            /*            accounts = accounts.map((item) => {
                if (item.isBonus) {
                    item.currency_code += '_B';
                }
                return item;
            }); */

            const [{ id = null }] = accounts;
            const idLocalSave = storage.get('active_accounts');
            useStoreUserState.setKey('accounts', [...accounts]);

            if (helper.isEmpty(idLocalSave) || !accounts.find(item => item.id === idLocalSave)) {
                useStoreUserState.setKey('activeIdAccount', id);
            } else {
                useStoreUserState.setKey('activeIdAccount', idLocalSave);
            }
        } catch (e) {
            console.error(e);
        }
    },
    async selectAccounts (accountId) {
        const { activeIdAccount = null } = useStoreUserState.get();
        if (accountId === activeIdAccount) {
            return;
        }
        try {
            await useStoreGamesActions.gamesInfo({
                account_id: accountId,
                game_id: GAME_ID
            });
            useStoreGamesState.setKey('input', 0);
            storage.set('active_accounts', accountId);
            useStoreUserState.setKey('activeIdAccount', accountId);
        } catch (e) {
            console.error('Не удалось выбрать кошелек ', e);
        }
    },
    updateAccount (account = {} as any) {
        if (global.$BonusService.bonusSelectedId) {
            return;
        }

        if (helper.isEmpty(account) || isNaN(account.balance)
        ) {
            console.error('Не удалось обновить кошелек account пустой или NaN', account);
            return;
        }

        const { accounts = [] } = useStoreUserState.get();
        const index = accounts.findIndex(item => item.id === account.id);
        if (helper.isEmpty(index)) {
            console.error('Не удалось обновить кошелек нет такого ид', account);
        }
        accounts[index] = account;
        useStoreUserState.setKey('accounts', [...accounts]);
    }
};
