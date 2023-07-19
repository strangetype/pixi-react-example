const trailingDebounce = <T extends (...args: any) => void>(func: T, delay: number): T => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    return ((...args) => {
        clearTimeout(timerId!);

        timerId = setTimeout(() => func(...args), delay);
    }) as T;
};

const leadingDebounce = <T extends (...args: any) => void>(func: T, delay: number): T => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    return ((...args) => {
        if (timerId === undefined) {
            func(...args);
        }

        clearTimeout(timerId!);
        timerId = setTimeout(() => {
            timerId = undefined;
        }, delay);
    }) as T;
};

const trailingAndLeadingDebounce = <T extends (...args: any) => void>(func: T, delay: number): T => {
    let timerId: ReturnType<typeof setTimeout> | undefined;

    let isCalled = false;

    return ((...args) => {
        if (timerId === undefined) {
            func(...args);
            isCalled = true;
        } else {
            isCalled = false;
        }

        clearTimeout(timerId!);
        timerId = setTimeout(() => {
            timerId = undefined;
            if (!isCalled) {
                func(...args);
            }
        }, delay);
    }) as T;
};

/**
 * @see https://ellenaua.medium.com/throttle-debounce-behavior-lodash-6bcae1494e03
 */
export const debounce = <T extends (...args: any) => void>(
    func: T,
    delay: number,
    {
        leading = false,
        trailing = true
    }: {
        leading?: boolean | undefined
        trailing?: boolean | undefined
    } = {}
): T => {
    if (leading && trailing) {
        return trailingAndLeadingDebounce(func, delay);
    } if (leading) {
        return leadingDebounce(func, delay);
    } if (trailing) {
        return trailingDebounce(func, delay);
    }

    // eslint-disable-next-line no-new-func
    return Function() as T;
};
