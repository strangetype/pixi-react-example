import { useEffect, useMemo, useRef } from 'react';
import 'components/Too The Moon/Ui/leftPanel/styles/tabs/component.scss';
import { throttle } from 'utils/throttle';

export const Tabs = (props) => {
    const tabEl = useRef(null as any);

    const checkedItems = useMemo(() => {
        return props.items ?? [];
    }, [props.items]);

    useEffect(() => {
        if (tabEl.current != null) {
            const startPosition = tabEl.current.offsetTop;
            document.getElementsByClassName('content')[0].addEventListener(
                'scroll',
                throttle(e => {
                    tabEl.current.classList.toggle(
                        'is-pinned',
                        (() => {
                            return tabEl.current.offsetTop !== startPosition;
                        })()
                    );
                }, 300)
            );
        }
    }, [tabEl.current]);

    return (
        <div className="tabs" ref={tabEl}>
            {
                ...checkedItems.map(item => {
                    return (
                        <button className="tabs__item">
                            {item.name}
                        </button>
                    );
                })
            }
        </div>
    );
};
