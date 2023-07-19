import 'components/Too The Moon/Ui/Card/styles/component.scss';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { useStoreGamesState } from 'store/Default/games/store_F';
import { socket } from 'api/config.socet';
import { useStoreUserState } from 'store/Default/user/store_F';
import { GAME_ID } from 'config/Common/settings';

export const CardUi = () => {
    const { coefficientActive } = useStore(useStoreGamesState as any);
    const { activeIdAccount } = useStore(useStoreUserState as any);

    useEffect(() => {
        if (socket.instance) {
            console.log(socket.instance);
            // eslint-disable-next-line no-undef
            socket.instance.emit('event.get.games.info', { account_id: activeIdAccount, id: GAME_ID }, (data) => {
                console.log('data', data);
            });
        }

        let step = 0;
        setInterval(_ => {
            if (step === 15) {
                return;
            }
            step = Number((step + 0.01).toFixed(2));
            useStoreGamesState.setKey('coefficientActive' as any, step);
        }, 50);
    }, [socket.instance]);

    return (
        <div className="card">
            {coefficientActive}
        </div>
    );
};
