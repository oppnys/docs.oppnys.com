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
