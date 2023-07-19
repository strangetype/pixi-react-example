import { Chip } from 'components/Too The Moon/Canvas/Chip/Chip';

export const LineChips = (props) => {
    return (
        (props.width !== 0) && props.lineCoordinate.map(({ coordinate, coefficient, active }, index) => {
            return (
                <Chip
                    key={index}
                    y={coordinate - 10}
                    x={-24}
                    coefficient={coefficient}
                    active={active}
                />
            );
        })
    );
};
