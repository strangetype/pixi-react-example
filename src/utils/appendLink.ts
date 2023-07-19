/**
 * Добавляет скрипт в тело документа
 * @param src
 * @param async Allows to load script file asynchronously by adding attribute `async` to the script element. It takes precedence if both `async` and `defer` are defined
 * @param defer Allows to load script file deferred
 * @param attributes
 */
export default (src: string, {
    async = false,
    defer = false,
    attributes = {
        rel: 'stylesheet',
        type: 'text/css'
    }
} = {}): Promise<HTMLScriptElement> => {
    const scriptExist = document.querySelector<HTMLScriptElement>(`link[href="${src}"]`);

    if (scriptExist) {
        return Promise.resolve(scriptExist);
    }

    const script = document.createElement('link');

    if (attributes) {
        Object.entries<string>(attributes).forEach(([key, value]) => {
            script.setAttribute(key, value);
        });
    }

    // script.async = async;
    // script.defer = defer;
    script.href = src;

    document.head.appendChild(script);

    return new Promise((resolve, reject) => {
        // @ts-ignore
        script.onload = (): void => resolve(script);
        script.onerror = (): void => reject(new Error(`Error occurred while loading the link ${src}`));
    });
};
