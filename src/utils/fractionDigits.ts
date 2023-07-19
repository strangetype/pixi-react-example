export const fractionDigits = (number, maximumFractionDigits = 2, minimumFractionDigits = 1) => {
    return String(parseFloat(number).toLocaleString('en-US', { maximumFractionDigits, minimumFractionDigits })).replace(/[\s,%]/g, '');
};
