const trailingThrottle = <T extends (...args: any) => void>(func: T, delay: number): T => {
    let isThrottled = false;
    let savedArgs: any;

    const wrapper = (...args: any) => {
        if (isThrottled) {
            savedArgs = args;

            return;
        }

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;

            if (savedArgs) {
                func(...savedArgs);
                savedArgs = undefined;
            }
        }, delay);
    };

    return wrapper as T;
};

const leadingThrottle = <T extends (...args: any) => void>(func: T, delay: number): T => {
    let isThrottled = false;

    const wrapper = (...args: any) => {
        if (isThrottled) {
            return;
        }

        func(...args);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
        }, delay);
    };

    return wrapper as T;
};

const trailingAndLeadingThrottle = <T extends (...args: any) => void>(func: T, delay: number): T => {
    let isThrottled = false;
    let savedArgs: any;

    const wrapper = (...args: any) => {
        if (isThrottled) {
            savedArgs = args;

            return;
        }

        func(...args);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;

            if (savedArgs !== undefined) {
                wrapper(...savedArgs);
                savedArgs = undefined;
            }
        }, delay);
    };

    return wrapper as T;
};

export const throttle = <T extends (...args: any) => void>(
    func: T,
    delay: number,
    {
        leading = true,
        trailing = true
    }: {
        leading?: boolean | undefined
        trailing?: boolean | undefined
    } = {}
): T => {
    if (leading && trailing) {
        return trailingAndLeadingThrottle(func, delay);
    } if (leading) {
        return leadingThrottle(func, delay);
    } if (trailing) {
        return trailingThrottle(func, delay);
    }

    // eslint-disable-next-line no-new-func
    return Function() as T;
};
