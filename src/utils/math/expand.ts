const { round } = Math;

/**
 * @function expand, accepts two parameters, coerces them to integers, and
 * returns an object containing the x & y integer pair, plus the exponent by
 * which to reduce the result of an operation on them to their original decimal
 * precision.
 *
 * Отброшен особый случай при очень малых значениях, т.к. специфика приложения не подразумевает таких чисел.
 *
 * @see https://0.30000000000000004.com
 * @see https://github.com/dfkaye/safe-math
 */
export const expand = (x: number, y: number): {
    left: number
    right: number
    exponent: number
} => {
    const a = `${x}`.split('.')[1]?.length ?? 0;
    const b = `${y}`.split('.')[1]?.length ?? 0;
    const c = a > b ? a : b;
    const d = 10 ** c;

    return {
        left: round(x * d),
        right: round(y * d),
        exponent: d
    };
};
