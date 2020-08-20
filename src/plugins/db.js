export default {
    /**
     * 写入,支持直接写入对象，数组等。
     * @param key
     * @param value
     */
    set (key, value) {
        if (typeof (value) !== 'string') {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            localStorage.setItem(key, value)
        }
    },
    /**
     * 读取，支持Path ,比如  db.get('user.username');
     * @param key
     * @returns {string|string | any}
     */
    get (key) {
        array = []
        if (key.indexOf('.')) {
            var array = key.split('.')
            key = array[0]
            array.shift()
        }
        let value = localStorage.getItem(key)
        try {
            var obj = JSON.parse(value)
            if (typeof obj === 'object' && obj) {
                // 是JSON
                value = JSON.parse(value)
            }
        } catch (e) {

        }
        if (array.length > 0) {
            var path = value
            for (var i in array) {
                if (Array.isArray(path)) {
                    path = value[array[i]]
                } else if (typeof (path) === 'object') {
                    for (var j in path) {
                        if (j == array[i]) {
                            path = path[j]
                        }
                    }
                }
            }
            return path
        }
        return value
    },
    clear () {
        localStorage.clear()
    }
}
