/* eslint-disable no-param-reassign */
/**
 * Генерирует случайный `number` в промежутке `[min, max]`.
 * Если один из аргументов равен `NaN`, то и результат будет `NaN`.
 * Если один `min` равен бесконечен, то он заменяется на `Number.MIN_SAFE_INTEGER`.
 * Если один `max` равен бесконечен, то он заменяется на `Number.MAX_SAFE_INTEGER`.
 * Аргументы `min` и `max` можно поменять местами.
 *
 * @param min нижняя граница значения случайного значения.
 * @param max верхняя граница значения случайного значения.
 * @param accuracy точность или количество знаков после запятой.
 */
export const random = (min: number, max: number, accuracy = 0): number => {
    if (Number.isNaN(min) || Number.isNaN(max)) {
        return NaN;
    }

    if (min > max) {
        [min, max] = [max, min];
    }

    if (!Number.isFinite(min)) {
        min = Number.MIN_SAFE_INTEGER;
    }

    if (!Number.isFinite(max)) {
        max = Number.MAX_SAFE_INTEGER;
    }

    const diff = max - min + 1;
    const factor = 10 ** accuracy;

    return Math.floor((Math.random() * diff + min) * factor) / factor;
};
