
export default {
    // 通过path获取当前菜单
    getMenuByPath (menus, path) {
        for (var i in menus) {
            if (menus[i].url === path) {
                return menus[i]
            }
        }
    },
    // 通过alias 获取当前菜单
    getMenuById (menus, alias) {
        for (var i in menus) {
            if (menus[i].alias === alias) {
                return menus[i]
            }
        }
    },
    // 通过id获取当前菜单下的所有子菜单
    getChilds (menus, alias) {
        var childs = []
        for (var i in menus) {
            if (menus[i].parent_alias === alias) {
                childs.push(menus[i])
            }
        }
        return childs
    },
    // 通过path获取当前菜单下的所有子菜单
    getChildsByPath (menus, path) {
        var menu = this.getMenuByPath(menus, path)
        return this.getChilds(menus, menu.alias)
    },
    // 通过path获取当前菜单的所有兄弟菜单
    getSiblingMenus (menus, path) {
        var menu = this.getMenuByPath(menus, path)
        return this.getChilds(menus, menu.parent_alias)
    },
    // 此方法是快速将数组转为树状结构
    toTree (val) {
        let result = []
        if (!Array.isArray(val)) {
            return result
        }
        val.forEach(item => {
            delete item.children
        })
        let map = {}
        val.forEach(item => {
            map[item.alias] = item
        })
        val.forEach(item => {
            let parent = map[item.parent_alias]
            if (parent) {
                (parent.children || (parent.children = [])).push(item)
            } else {
                result.push(item)
            }
        })
        return result
    }
}
