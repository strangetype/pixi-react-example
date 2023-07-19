import '../style/loading.css';
import { useStore } from '@nanostores/react';
import { GAME_NAME } from 'config/Common/settings';
import { useStorePopupsState } from 'store/Default/popup/store_F';

export const NativeLoading = (props) => {
    const { isShowNativeLoading } = useStore(useStorePopupsState);
    return (
        (props.isNativeLoading || isShowNativeLoading) && <div className="loader">
            <div className="loader__spinner-img"/>
            <div className="loader__title">{GAME_NAME}</div>
        </div>
    );
};
