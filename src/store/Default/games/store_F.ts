import { map } from 'nanostores';

export const useStoreGamesState = map({
    input: '0.00' as any,
    isGaming: false,
    isGamingAnimation: false,
    isPanelDisabled: false,
    isBonusesBlockedKeyboard: false,
    winnings: 0,
    textInfo: '',
    onboardingSummaActive: false,
    prevLine: [7, 7, 7]
});
