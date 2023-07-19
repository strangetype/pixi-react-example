import { useStoreUserState } from 'store/Default/user/store_F';

export const useStoreUserGetters = {
    getActiveAccount () {
        const { accounts = [], activeIdAccount } = useStoreUserState.get();
        return accounts.find(item => item.id === activeIdAccount) ?? {};
    }
};
