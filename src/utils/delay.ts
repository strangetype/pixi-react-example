export const delay = (time) => {
    return new Promise(resolve => {
        setTimeout(_ => {
            resolve(true);
        }, time);
    });
};
