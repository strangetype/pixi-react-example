import { expand } from 'utils/math/expand';
/**
 * Более безопасные математические операции с плавающей запятой.
 * @example add(0.1, 0.2) // 0.3 вместо 0.30000000000000004
 */

export const add = (x: number, y: number): number => {
    const { left, right, exponent } = expand(x, y);

    return (left + right) / exponent;
};

/**
 * Более безопасные математические операции с плавающей запятой.
 * @example minus(0.3, 0.2) // 0.1 вместо 0.09999999999999998
 */
export const minus = (x: number, y: number): number => {
    const { left, right, exponent } = expand(x, y);

    return (left - right) / exponent;
};

/**
 * Более безопасные математические операции с плавающей запятой.
 * @example multiply(0.2, 0.1) // 0.02 вместо 0.020000000000000004
 */
export const multiply = (x: number, y: number): number => {
    const { left, right, exponent } = expand(x, y);

    return (left * right) / (exponent * exponent);
};

/**
 * Более безопасные математические операции с плавающей запятой.
 * @example divide(0.3, 0.2) // 1.5 вместо 1.4999999999999998
 */
export const divide = (x: number, y: number): number => {
    const { left, right } = expand(x, y);

    return left / right;
};
