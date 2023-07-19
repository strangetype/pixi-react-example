/**
 * Создает массив элементов, разделенных на группы по длине размера.
 * Если массив не может быть разделен равномерно, последним фрагментом будут оставшиеся элементы.
 */
export const chunk = <T>(array: T[], size: number = 1): T[][] => {
    size = Math.max(Math.round(size), 1);

    return array.reduce((acc, curr: T) => {
        if (acc[acc.length - 1]!.length === size) {
            acc.push([]);
        }

        acc[acc.length - 1]!.push(curr);

        return acc;
    }, [[]] as T[][]);
};
