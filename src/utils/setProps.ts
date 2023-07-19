export const setProps = (object: any, props: any, objKey?: string) => {
    if (typeof props === 'object') {
        Object.keys(props).forEach((key: string) => {
            setProps(objKey ? object[objKey] : object, props[key], key);
        });
    } else {
        object[objKey] = props;
    }
};
