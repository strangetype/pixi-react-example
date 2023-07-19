const CACHE_PREFIX = 'games-';

function supportsStorage () {
    try {
        if (!localStorage) {
            return false;
        }
    } catch (e) {
        return false;
    }
    return true;
}

export default {
    set (key, obj) {
        if (!supportsStorage()) return false;
        let value;
        try {
            value = JSON.stringify(obj);
        } catch (e) {
            return false;
        }

        // Фикс iPad QUOTA_EXCEEDED_ERR, setItem.
        localStorage.removeItem(CACHE_PREFIX + key);
        localStorage.setItem(CACHE_PREFIX + key, value);
    },
    get (key, type = null) {
        if (!supportsStorage()) return false;

        const value = localStorage.getItem(CACHE_PREFIX + key);

        try {
            return JSON.parse(value);
        } catch (e) {
            if (type === 'number') {
                return Number(type);
            }
            return value;
        }
    },
    remove (key) {
        if (!supportsStorage()) return false;
        localStorage.removeItem(CACHE_PREFIX + key);
    },
    removeAll () {
        if (!supportsStorage()) return false;

        const keysToRemove = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const itemStartsWithPrefix = key.slice(0, CACHE_PREFIX.length) === CACHE_PREFIX;

            if (itemStartsWithPrefix) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(k => localStorage.removeItem(k));
    }
};
