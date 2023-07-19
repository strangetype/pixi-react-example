export const textLengthCoefFilter = ({ text = '', data = [] }) => {
    return {
        fontSize: Math.round(data[0] * (data[1] ** text.length)),
        lineHeight: Math.round((data[2] || data[0]) * (data[1] ** text.length))
    };
};
