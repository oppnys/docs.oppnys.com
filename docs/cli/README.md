## webpack

### webpack 的常用对象

- `mode`: 模式 'development' | 'production'

- `entry`: 文件入口

- `output`: 输出文件, 一般配合 node 的 path 模块使用

```js
const path = require("path");
module.export = {
  // 设置模式
  mode: "development",
  // 入口文件
  entry: "./src/index.js",
  output: {
    // 输出文件名称
    filename: "bundle.js",
    // 输出的路径（绝对路径）
    path: path.resolve(__dirname, "dist"), //利用node模块的path 绝对路径
  },
};
```

- `module(loader)`: 里面有一个 `rules` 数组对某种格式的文件进行转换处理（转换规则）, `use` 数组解析顺序是从下到上逆序执行的。

```js
module: {
  // 对某种格式的文件进行转换处理（转换规则）
  rules: [
    {
      // 用到正则表达式
      test: /[\.css|\.less]$/, //后缀名为 css 或者 less 格式的文件
      use: [
        // use数组解析顺序是从下到上逆序执行的
        // 先用css-loader 再用style-loader
        // 将js的样式内容插入到style标签里
        "style-loader",
        // 将css文件转换为js
        "css-loader",
        "postcss-loader",
        "less-loader",
      ],
    },
    // vue-loader 的使用
    {
      test: /\.vue$/,
      use: ["vue-loader"],
    },
  ];
}
```

- `plugin`: 插件配置

```js
const uglifyJsPlugin = reqiure("uglifyjs-webpack-plugin");
const htmlPlugin = reqiure("html-webpack-plugin");

module.exports = {
  plugin: [
    new htmlPlugin(),
    new uglifyJsPlugin(), //丑化
  ],
};
```

- `devServer`: 热更新

```js
devServer:{
    // 项目构建路径
    contentBase:path.resolve(__dirname,"dist"),
    // 启动 gzip 压缩
    compress:true,
    // 设置端口号
    port: 8080,
    // 自动打开浏览器:否
    open: true,
    //页面实时刷新(实时监听)
    inline: true,
    //开启 HMR hot module replacement
    hot: true
}
```

- `resolve`: 配置路径规则

```js
module.exports= {
	resolve:{
		//如果导入的时候不想写后缀名可以在resolve中定义extensions
		extensions:['.js','.css','.vue']
		//alias:别名
		alias:{
			//导入以vue结尾的文件时，会去寻找vue.esm.js文件
			'vue$':"vue/dist/vue.esm.js"
		}
	}
}
```

- `optimization`: chuck 优化

```js
optimization: {
    chunkIds: false,
    // 是否压缩 bundle
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
        },
      }),
    ],
},
```

### webpack 中 module、chunck、bundle 的理解

- `module`: 源代码模块

- `chunck`: webpack 构建过程中的模块

- `bundle`: 打包后的代码

![webpack](/images/webpack.png)

### loader 和 plugin 的区别

- `loader`: loader 是用来解析非 js 文件的，因为 Webpack 原生只能解析 js 文件，如果想把那些文件一并打包的话，就需要用到 loader，loader 使 webpack 具有了解析非 js 文件的能力

- `plugin`: 用来给 webpack 扩展功能的，可以加载许多插件

## babel

> 用来将 ES6+ 语法转化成 ES5 语法的工具

### 使用

下载插件 babel-loader, 在 module（loader）中配置。

### 配置

babel.config.js

```js
module.export = {
  // 预设
  preset: ["@babel/preset-env"],
  // 插件
  plugins: ["@vue/babel-plugin-jsx"],
};
```
