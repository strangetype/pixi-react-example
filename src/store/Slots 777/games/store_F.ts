import { map } from 'nanostores';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { useStoreGamesState as commonStoreGamesState } from 'store/Default/games/store_F!!';

export const useStoreGamesState = map({
    ...commonStoreGamesState.get(),
    prevLine: [7, 7, 7],
    board: { line: [] },
    onboardingPlayActive: false
});
