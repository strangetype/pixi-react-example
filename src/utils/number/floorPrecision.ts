/** Округление вниз до precision знаков после запятой. */
export const floorPrecision = (num: number, precision: number) => {
    const pow = 10 ** precision;

    return Math.floor(num * pow) / pow;
};
