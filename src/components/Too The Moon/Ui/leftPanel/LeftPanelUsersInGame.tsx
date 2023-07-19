import { Tabs } from 'components/Too The Moon/Ui/leftPanel/Tabs/Tabs';
import { GameInfo } from 'components/Too The Moon/Ui/leftPanel/GameInfo';
import { ItemUserCard } from 'components/Too The Moon/Ui/leftPanel/ItemUserCard';
import 'components/Too The Moon/Ui/leftPanel/styles/Common/default.scss';
import { useState } from 'react';
import { applyOrientation } from 'utils/applyOrientation';

export const LeftPanelUsersInGame = () => {
    const [device, setDevice] = useState(applyOrientation());

    const tabsItems = [
        {
            name: 'All',
            key: 'all'
        },
        {
            name: 'Mine',
            key: 'mine'
        },
        {
            name: 'Top',
            key: 'top'
        }
    ];

    return (
        <>
            <Tabs items={tabsItems}/>
            <GameInfo/>
            <div className="scroll-section">
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard win/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard win/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard/>
                <ItemUserCard win/>
            </div>
        </>
    );
};
