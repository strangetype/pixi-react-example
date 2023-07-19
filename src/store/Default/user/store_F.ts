import { map } from 'nanostores';
import { useStoreUserGetters } from 'store/Default/user/getters_F';
import { fractionDigits } from 'utils/fractionDigits';

export const useStoreUserState = map({
    accounts: [],
    balanceAndCurrencyCode: null,
    activeIdAccount: null,
    token: null,
    tokenPartner: null,
    activeSession: {} as any
});

useStoreUserState.subscribe((dataStore, changed) => {
    if (['accounts', 'activeIdAccount'].includes(changed)) {
        const { balance, currency_code } = useStoreUserGetters.getActiveAccount();
        useStoreUserState.setKey('balanceAndCurrencyCode', `${fractionDigits(balance, 2, 2)} ${currency_code}`);
    }
});
