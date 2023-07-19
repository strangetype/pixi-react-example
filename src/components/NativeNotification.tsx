import '../style/notification.css';
import React, { useEffect, useState } from 'react';

export const NativeNotification = () => {
    const [isShow, setIsShow] = useState(false);
    const [text, setText] = useState('');
    const [color, setColor] = useState('van-notify--danger');

    useEffect(() => {
        function handleOffline () {
            setText('Network without internet access');
            setColor('van-notify--danger');
            setIsShow(true);
        }

        function handleOnline () {
            setText('Internet access restored');
            setColor('van-notify--success');
            setIsShow(true);
            setTimeout(() => {
                setIsShow(false);
            }, 3000);
        }

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);
    return (
        <div className={`van-popup-slide-top van-popup van-popup--top van-notify ${color} van-popup-slide-top-enter-active ${!isShow && 'van-popup-slide-top-enter'}`}>
            {text}
        </div>
    );
};
