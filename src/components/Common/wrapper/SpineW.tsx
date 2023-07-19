import { useApp } from '@inlet/react-pixi';
import React, { useEffect, useState } from 'react';
import SpineCustom from 'components/Common/customs-pixi/SpineCustom';

export const SpineW = (props) => {
    const app = props.appProvider ?? useApp();

    const [spineDataResource, setSpineData] = useState(null);

    useEffect(() => {
        if (!(props.spineDataKey in app.loader.resources)) {
            console.error('Нет такого ресурса ' + props.spineDataKey);
            return;
        }
        const { [props.spineDataKey]: { spineData = null } } = app.loader.resources;
        if (spineData) {
            setSpineData(spineData);
        }
    }, [props.spineDataKey]);

    return (
        spineDataResource &&
        <SpineCustom
            spineData={spineDataResource}
            {...props}
            app={app}
            children={[]}
            skeletonChildren={React.Children.toArray(props.children)}
        />
    );
};
