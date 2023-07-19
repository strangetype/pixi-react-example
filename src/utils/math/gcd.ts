/**
 * Greatest common divisor (Наибольший общий делитель)
 * @todo Добавить аргумент точность дроби
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export const getGCD = (a: number, b: number): number => (a > 0.0001 ? getGCD(b % a, a) : b);
