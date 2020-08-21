export default {
    namespaced: true, // 使用模块中的mutations、getters、actions时候，要加上模块名
    state: {
        value: '这段文字是用来打酱油的'
    },
    mutations: {
        UPDATA_VALUE (state, value){
            state.value = value
        }
    },
    actions: {
        setValue({ commit }, value) {
            commit('UPDATA_VALUE', value)
        }
    },
    getters: {

    }
}
