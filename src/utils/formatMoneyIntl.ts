export const formatMoneyIntl = (value, prefix = '▼') => {
    if (!value) {
        return value;
    }
    return value + ' ' + prefix;
};
