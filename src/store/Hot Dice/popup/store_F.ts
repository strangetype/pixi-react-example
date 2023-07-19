import { map } from 'nanostores';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { useStorePopupsState as commonStorePopupsState } from 'store/Default/popup/store_F!!';

export const useStorePopupsState = map({
    ...commonStorePopupsState.get(),
    isShowTakeSum: false
});
