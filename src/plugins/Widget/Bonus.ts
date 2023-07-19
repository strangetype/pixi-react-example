import { isMobile } from 'utils/isMobile';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { BONUSES_TYPE_FREE_SPIN } from 'plugins/Widget/TYPE_BONUSES';
import { useStorePopupsState } from 'store/Default/popup/store_F';

export class Bonus {
    private isInit = false;
    private selectedBonuses = {} as any;
    private readonly gameId;
    private readonly gameName;
    private readonly tokenAuth;
    private readonly options = {} as any;

    constructor ({
        isInit = true,
        gameId = null,
        gameName = '',
        tokenAuth = '',
        options = {}
    } = {}) {
        if (isInit) {
            this.init();
            this.gameId = gameId;
            this.gameName = gameName;
            this.tokenAuth = tokenAuth;
            this.options = options;
        }
    }

    async init () {
        if (this.isInit) {
            return;
        }

        const MOBILE_OPEN_ANIMATION = 'bottom';
        const DESKTOP_OPEN_ANIMATION = 'right';

        this.isInit = true;
        try {
            // @ts-ignore
            const { WidgetLoad } = await import(/* webpackChunkName: 'widget-bonuses' */ 'plugins/Widget/index.ts');
            await WidgetLoad();

            if (!this.tokenAuth) {
                console.error('Токен пустой');
                return;
            }

            global.$widgetBonuses = {
                gameId: this.gameId,
                gameName: this.gameName,
                tokenAuth: this.tokenAuth,
                options: {
                    popupOpen: isMobile() ? MOBILE_OPEN_ANIMATION : DESKTOP_OPEN_ANIMATION,
                    ...this.options
                },
                selectBonuses: function (data = {} as any) {
                    this.selectedBonuses = data;

                    if (Object.keys(this.selectedBonuses).length) {
                        const { options: { isKeyboard = false } = {}, spins: { amount = 0 } = {}, type = null } = this.selectedBonuses;

                        useStoreGamesState.setKey('isBonusesBlockedKeyboard', isKeyboard);
                        if (type === BONUSES_TYPE_FREE_SPIN) {
                            useStoreGamesState.setKey('input', `+${amount} ${Bonus.prefixSymbolFreeSpins}`);
                            useStorePopupsState.setKey('isKeyBoard', false);
                        }
                    } else {
                        useStoreGamesState.setKey('isBonusesBlockedKeyboard', false);
                        useStoreGamesState.setKey('input', '0.00');
                    }
                }.bind(this)
            };

            global.$widgetStartInit && global.$widgetStartInit();
        } catch (e) {
            console.error(e);
        }
    }

    updateBonuses (bonus = null) {
        if (!bonus || typeof bonus !== 'object') {
            return;
        }

        if (global.$widgetBonuses && global.$widgetBonuses.updateBonuses) {
            this.selectedBonuses = bonus;
            global.$widgetBonuses.updateBonuses(this.selectedBonuses);

            const { spins: { amount = 0 } = {}, type = null } = this.selectedBonuses;

            if (type === BONUSES_TYPE_FREE_SPIN) {
                useStoreGamesState.setKey('input', `+${amount} ${Bonus.prefixSymbolFreeSpins}`);
            }
        }
    }

    clearSelectedBonuses () {
        global.$widgetBonuses && global.$widgetBonuses.clearBonuses();
    }

    blockedSelectBonuses () {
        global.$widgetBonuses && global.$widgetBonuses.blockedWidget(true);
    }

    unBlockedSelectBonuses () {
        global.$widgetBonuses && global.$widgetBonuses.blockedWidget(false);
    }

    static get prefixSymbolFreeSpins () {
        return 'FS';
    }

    public get bonusSelectedId () {
        return this.selectedBonuses?.id;
    }

    public get bonusSelectedType () {
        return this.selectedBonuses?.type;
    }
}
