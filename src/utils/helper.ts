import cloneDeep from 'lodash/cloneDeep';

export default {
    clearObject (obj) {
        return obj instanceof Object ? Object.entries(obj).reduce((item, [key, value]) => {
            if (!this.isEmpty(value)) {
                item[key] = this.clearObject(value);
            }
            return item;
        }, obj instanceof Array ? [] : {}) : obj;
    },
    typeOf (obj) {
        const map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[Object.prototype.toString.call(obj)];
    },
    isEmpty (obj, path = null) {
        if (path != null) {
            obj = this.get(obj, path);
        }

        switch (this.typeOf(obj)) {
        case 'null':
        case 'undefined':
            return true;
        case 'object':
            return Object.keys(obj).length === 0;
        case 'array':
        case 'string':
            return obj.length === 0;
        case 'number':
        // eslint-disable-next-line no-self-compare
            return obj !== obj || !isFinite(obj);
        }
        return false;
    },
    getOneArray (data) {
        if (this.typeOf(data) === 'array' && data.length > 0) {
            return data.filter(x => x)[0];
        }
        return null;
    },
    cloneDeep
};
