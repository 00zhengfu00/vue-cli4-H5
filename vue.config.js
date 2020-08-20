const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // gzip压缩插件
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin; //打包后模块大小分析
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // UglifyJS Webpack Plugin插件用来缩小（压缩优化）js文件，至少需要Node v6.9.0和Webpack v4.0.0版本。
const isProduction = process.env.NODE_ENV === "production"; // 环境判断

// "@vue/prettier"  放在pagejson的eslintConfig.extends里面会生效eslint

// cdn预加载使用
const externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    axios: "axios"
};

// cdn资源
const cdn = {
    // 开发环境
    dev: {
        css: [],
        js: []
    },
    // 生产环境
    build: {
        css: [],
        js: [
            "https://lib.baomitu.com/vue/2.6.6/vue.min.js",
            "https://lib.baomitu.com/vue-router/3.0.1/vue-router.min.js",
            "https://lib.baomitu.com/vuex/3.0.1/vuex.min.js",
            "https://lib.baomitu.com/axios/0.18.0/axios.min.js"
        ]
    }
};

module.exports = {
    // 项目部署的基础路径 默认/
    // 放在子目录时使用./或者加你的域名
    publicPath: process.env.BASE_URL,
    lintOnSave: false, // 是否开启eslint
    devServer: {
        open: true, // 启动服务后是否打开浏览器
        host: "127.0.0.1",
        port: 8088, // 服务端口
        https: false,
        hotOnly: false,
        proxy: {
            "/": {
                target: "https://easy-mock.com/",
                changeOrigin: true,
                ws: false, // proxy websockets
                pathRewrite: {
                    // 路径重写
                    "^/": "/"
                }
            }
        }
    },
    configureWebpack: config => {
        if (isProduction) {
            // externals里的模块不打包
            Object.assign(config, {
                externals: externals
            });
            // 为生产环境修改配置...
            // 上线压缩去除console等信息
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        warnings: false,
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ["console.log"] // 移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            // 开启gzip压缩
            const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
            config.plugins.push(
                new CompressionWebpackPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            if (process.env.npm_config_report) {
                // 打包后模块大小分析//npm run build --report
                config.plugins.push(new BundleAnalyzerPlugin());
            }
        } else {
            // 为开发环境修改配置...
            config.devServer = {
                disableHostCheck: true
            };
        }
    },
    chainWebpack: config => {
        /**
         * 删除懒加载模块的prefetch，降低带宽压力
         * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
         * 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的
         */
        config.plugins.delete("prefetch");
        // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
        // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
        config.plugin("html").tap(args => {
            if (process.env.NODE_ENV === "production") {
                args[0].cdn = cdn.build;
            }
            if (process.env.NODE_ENV === "development") {
                args[0].cdn = cdn.dev;
            }
            return args;
        });
        // 设置目录别名alias
        config.resolve.alias
            .set("assets", "@/assets")
            .set("components", "@/components")
            .set("view", "@/view")
            .set("style", "@/style")
            .set("api", "@/api")
            .set("store", "@/store");
        /**
         * 无需使用@import在每个scss文件中引入变量或者mixin，也可以避免大量@import导致build变慢
         * sass-resources-loader 文档链接：https://github.com/shakacode/sass-resources-loader
         */
        const oneOfsMap = config.module.rule("scss").oneOfs.store;
        const sassResources = ["vars.scss", "mixin.scss", "common.scss"]; // scss资源文件，可以在里面定义变量，mixin,全局混入样式等
        oneOfsMap.forEach(item => {
            item
                .use("sass-resources-loader")
                .loader("sass-resources-loader")
                .options({
                    resources: sassResources.map(file =>
                        path.resolve(__dirname, "src/style/" + file)
                    )
                })
                .end();
        });
    },
    // 打包时不生成.map文件
    productionSourceMap: false
};
