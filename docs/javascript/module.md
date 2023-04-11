## JavaScript 模块化

::: tip
将 JavaScript 程序拆分为可按需导入的单独模块的机制 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
:::

### 一、CJS/commonjs

* exports
  
* module.exports
  
* require

```javascript
module.exports = exports
```

### 二、UMD

### 三、CMD

### 四、AMD

::: tip
AMD 主要是应用于浏览器的一种模块化规范
:::

* AMD 是 Asynchronous Module Definition （异步模块定义）的缩写

* 采用异步加载模块

### 五、EsModule

:::tip
EsModule 加载 js 文件的过程是编译（解析）时加载的，并且是异步的。
异步加载意味着，并不会阻塞主线程的执行
:::

#### 导出

* export

* export {}

* export default 

#### 导入

* import {} from './moduleName'

* import * as from './moduleName'
