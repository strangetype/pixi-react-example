/**
 * Считает кол-во десятичных знаков
 * Максимальное кол-во знаков после . - 17
 * @example
 * countDecimals(0.123) => 3
 * countDecimals(0.12312313123132131312313123123131231231231231231321312311231231232131231231231313123123) => 17 !
 * countDecimals(5) => 0
 */
const SEPARATOR = '.';

export const countDecimals = (value: number): number => {
    if (Number.isInteger(value) && !Number.isSafeInteger(value)) {
        return 0;
    }

    const parts = value.toString().split(SEPARATOR);

    if (parts && parts.length > 1) {
        const decimals = parts[1];

        return decimals ? decimals.length : 0;
    }

    return 0;
};
