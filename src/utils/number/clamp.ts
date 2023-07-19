/**
 * Ограничьте ввод числа в пределах минимального и максимального значений.
 * Если value больше `max`, то результат будет `max`.
 * Если value меньше `min`, то результат будет `min`.
 * Если один из аргументов равен `NaN`, то и результат будет `NaN`.
 * Аргументы `min` и `max` можно поменять местами.
 */
export const clamp = (
    value: number,
    min: number,
    max: number,
): number => {
    if (min > max) {
        [min, max] = [max, min];
    }

    return Math.min(Math.max(value, min), max);
};
