# vue-cli4-H5

### 本项目使用vue-cli4版本，特别对项目打包做出优化，其中包括：
- CDN引入，减少打包体积
- compression-webpack-plugin 插件 对css、js文件压缩
- uglifyjs-webpack-plugin 插件 对js文件压缩优化
- sass-resources-loader 插件 实现全局sass引入
- webpack-bundle-analyzer 插件 可以查看打包分析
- axios 封装请求
- localStorage方法封装
- 路由切换特效优化

### 克隆
```

git clone https://github.com/webfel/vue-cli4-H5.git

```

### 下载依赖

```

npm install

```

### 运行

```

npm run serve

```

### 打包
```

npm run build

```

### 查看打包体积分析
```

npm run build --report

```

