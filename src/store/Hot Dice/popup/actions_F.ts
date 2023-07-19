import { useStoreGamesActions } from 'store/Default/games/actions_F';
import { useStoreUserState } from 'store/Default/user/store_F';
import { GAME_ID } from 'config/Common/settings';
import { GamesPlayMethods } from 'const/Common/GamesPlayMethods';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { useStorePopupsActions as commonStorePopupsActions } from 'store/Default/popup/actions_F!!';
import { useStorePopupsState } from 'store/Default/popup/store_F';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { useStoreSettingsState } from 'store/Default/settings/store_F';
import { useStoreUserActions } from 'store/Default/user/actions_F';
import { fractionDigits } from 'utils/fractionDigits';

export const useStorePopupsActions = {
    ...commonStorePopupsActions,
    playAgain () {
        useStoreGamesState.setKey('isGaming', true);
        global.$emitter.emit('HotDice_onboarding', {
            closed: true
        });
    },
    renameStake () {
        global.$emitter.emit('HotDice_onboarding', {
            closed: true
        });
        global.$BonusService.unBlockedSelectBonuses();
    },
    async takeSum () {
        const { activeSession: { version = 0 } } = useStoreUserState.get();
        const { playGame } = useStoreGamesActions;
        const { translations } = useStoreSettingsState.get();

        /*
        * {
    "id": 37,
    "userId": 8,
    "partnerId": 1,
    "gameId": 18,
    "status": "closed",
    "bet": 10,
    "currency": "USD",
    "precision": 2,
    "payoutRate": 0.98,
    "level": 4,
    "winnings": 40,
    "board": {
        "history": [
            {
                "win": true,
                "level": 0,
                "choice": "less",
                "newDices": [
                    1,
                    1
                ],
                "dicesToBeat": [
                    6,
                    5
                ]
            },
            {
                "win": true,
                "level": 1,
                "choice": "greater",
                "newDices": [
                    6,
                    6
                ],
                "dicesToBeat": [
                    1,
                    1
                ]
            },
            {
                "win": true,
                "level": 2,
                "choice": "less",
                "newDices": [
                    2,
                    4
                ],
                "dicesToBeat": [
                    6,
                    6
                ]
            },
            {
                "win": true,
                "level": 3,
                "choice": "greater",
                "newDices": [
                    4,
                    5
                ],
                "dicesToBeat": [
                    2,
                    4
                ]
            }
        ],
        "dicesToBeat": [
            4,
            5
        ],
        "availableChoices": [
            "less",
            "greater_or_equal"
        ]
    },
    "version": 5,
    "expiresAt": "2022-12-08T11:18:34.244Z",
    "createdAt": "2022-12-08T07:18:34.244Z",
    "updatedAt": "2022-12-08T09:36:25.447Z",
    "deletedAt": null,
    "account": {
        "id": 2,
        "currency_code": "USD",
        "balance": 49409.97
    }
}
        * */
        try {
            const { winnings, currency: currencyCode, account } = await playGame({
                game_id: GAME_ID,
                method: GamesPlayMethods.collect,
                version
            });

            useStorePopupsState.setKey('win', {
                isShow: true,
                message: `${translations['popup.you_won']}\n${fractionDigits(winnings, 2, 2)} ${currencyCode}`
            });
            useStoreUserActions.updateAccount(account);
            useStoreGamesState.setKey('textInfo', `${translations.your_win} ${fractionDigits(winnings, 2, 2)} ${currencyCode}`);
            useStoreGamesState.setKey('isGaming', false);
            global.$emitter.emit('HotDice_gameTableResult', {
                clear: true
            });
            global.$BonusService.unBlockedSelectBonuses();
        } catch (e) {
            console.error(e);
        }
    }
};
