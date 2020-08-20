import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from 'store/index'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/about",
        name: "About",
        component: () =>
            import("../views/About.vue")
    }
];

const router = new VueRouter({
    routes
});

// 记录页面跳转历史，以此判断页面左滑跳转还是右滑跳转
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth
    let token = store.getters['login/token'];
    // 当跳转时携带指定方向参数则优先使用指定参数
    if (to.params.direction) {
        store.commit('updateDirection', to.params.direction)
    } else {
        const toIndex = history.getItem(to.path)
        const fromIndex = history.getItem(from.path)
        // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
        if (toIndex) {
            if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
                store.commit('updateDirection', 'forward')
            } else {
                store.commit('updateDirection', 'back')
            }
        } else {
            ++historyCount
            history.setItem('count', historyCount)
            to.path !== '/' && history.setItem(to.path, historyCount)
            store.commit('updateDirection', 'forward')
        }
    }
    if (auth) { // 需要登录
        if (token) {
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})

export default router;
