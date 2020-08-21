import axios from 'axios'
import router from '../router'
// import functions from './functions'
axios.defaults.timeout = 10000 // 设置超时10秒
const prefix = ''

// 请求拦截
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        token && (config.headers.token = token)
        return config
    },
    error => {
        return Promise.error(error)
    }
)

// 响应拦截
axios.interceptors.response.use((res) => {
    if (res.data.status == 11 || res.data.status == 12) {
        localStorage.clear();
        router.replace({
            path: '/login',
            query: { forward: router.currentRoute.path }
        })
    } else {
        return res
    }
}, (error) => {
    // 根据传回来的错误信息`erroe`进行判断
    // 	意为：`error.code`
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
        // `这里我 的方案是，超时后再次请求，所以新建了一个promise`
        alert('网络连接发生问题，请检查网络或刷新重试')
    }
    if (error.response) {
        console.log(error.response)
        if (error.response.status === 404) {
            alert('找不到页面')
        } else if (error.response.status === 500) {
            alert(error.response.data)
        }
    }
    return Promise.reject(error)
})

export default {
    post: function (url, data, params) {
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
        return new Promise((resolve, reject) => {
            axios.post(prefix + url, data, params)
                .then(response => {
                    resolve(response.data)
                }, err => {
                    console.log(err)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    },
    put: function (url, data, params) {
        return new Promise((resolve, reject) => {
            axios.put(prefix + url, data, params)
                .then(response => {
                    resolve(response.data)
                }, err => {

                })
                .catch((error) => {

                })
        })
    },
    get: function (url, data, params) {
        if (!params) {
            params = {}
        }
        if (data) {
            params.params = data
        }
        return new Promise((resolve, reject) => {
            axios.get(prefix + url, params)
                .then(response => {
                    resolve(response.data)
                }, err => {

                })
                .catch((error) => {

                })
        })
    },
    delete: function (url, data, params) {
        if (!params) {
            params = {}
        }
        if (data) {
            params.params = data
        }
        return new Promise((resolve, reject) => {
            axios.delete(prefix + url, params)
                .then(response => {
                    resolve(response.data)
                }, err => {

                })
                .catch((error) => {

                })
        })
    }
}
