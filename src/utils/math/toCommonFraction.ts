import { getGCD } from 'utils/math/gcd';
/**
 * Конвертирует десятичную дробь в обычную дробь
 * @param {number} value
 * @returns {[number, number]}
 */

export const toCommonFraction = (value: number): [number, number] => {
    const gcd = getGCD(value, 1);

    return [Math.trunc(value / gcd), Math.trunc(1 / gcd)];
};
