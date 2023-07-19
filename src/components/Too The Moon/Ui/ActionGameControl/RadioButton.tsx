import 'components/Too The Moon/Ui/ActionGameControl/styles/readioButton.scss';
import { useMemo, useState } from 'react';
import { isMobile } from 'utils/isMobile';

export const RadioButton = (props) => {
    const [itemsRadioButton, setItemsRadioButton] = useState(props.items);

    const activeItemLeft = useMemo(() => {
        const activeIndex = itemsRadioButton.findIndex(item => item.active);

        if (activeIndex === 0) {
            return isMobile() ? '4.5%' : '2%';
        }
        return isMobile() ? '50%' : '50%';
    }, [itemsRadioButton]);

    const clickItem = (key) => {
        setItemsRadioButton(value => {
            return value.reduce((acc, currentValue) => {
                currentValue.active = currentValue.key === key;
                acc.push(currentValue);

                return acc;
            }, []);
        });

        props.onChange(key);
    };

    return (
        <div className="game-control-selected">
            {...itemsRadioButton.map(item => {
                return (
                    <div key={item.key} className={`game-control-selected__item ${item.active && 'game-control-selected__item--active'}`} onClick={() => clickItem(item.key)}>
                        {item.name}
                    </div>
                );
            })}
            <div className="game-control-selected__backlight" style={{ left: activeItemLeft }}/>
        </div>
    );
};
