## Vue2

[Vue 源码解析](/vue/code.html)

### Vue 的数据双向绑定

数据劫持： vue 是采用数据劫持结合发布者-订阅者模式的方式，通过 <b>Object.defineProperty()</b> 来劫持各个属性的 gettter 和 setter，在数据变动时发布消息给订阅者，触发相应的回调。

### MVVM 响应式原理

vue 是采用 <b> 发布者-订阅者</b> 的设计模式，通过 Object.defineProperty 来劫持各个属性的 getter 和 setter ，在数据变动时，发布消息给以来收集器（dep 中的 subs）,去通知（notify)观察者，做出对应的回调函数，去更新视图。

MVVM 作为绑定的入口，整合 Observer、Compile 和 Watch 三者，通过 Observer 来监听 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭配琪 Observer、Compile 之间的通信桥路，打到数据变化 => 视图更新；视图交互变化 => 数据 model 变更的双向绑定效果。
![mvvm](/images/mvvm.png)

> data 中每一个数据都绑定一个 Dep，这个 Dep 中都存有所有用到该数据的观察者,当数据改变时，发布消息给 dep（依赖收集器），去通知每一个观察者。做出对应的回调函数。

```js
const dep = new Dep();
// 劫持并监听所有属性
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: false,
  get() {
    // 订阅数据变化时，在Dep中添加观察者
    Dep.target && dep.addSub(Dep.target);
    return value;
  },
  set: (newVal) => {
    if (newVal !== value) {
      this.observe(newVal);
      value = newVal;
    }
    // 告诉Dep通知变化
    dep.notify();
  },
});
```

### Vue 的生命周期

- `beforeCreate`

  > 创建之前，此时还没有 data 和 methods

- `created`

  > 创建完成，此时 data 和 methods 可用

  > 在 created 之后 beforeMounted 之前如果没有 el 选项此生命周期结束，停止编译，如果有则继续

- `beforeMount`

  > 在渲染之前

- `mounted`

  > 页面已经渲染完成，并且 `vm` 实例中已经添加完 `$el` 了，已经替换掉那些 DOM 元素了（模板中的变量），这个时候已经可以操作 DOM 了（但是获取不了 DOM 的属性，如需获取使用 `nextTick`）

- `beforeUpdate`

  > `data`改变后，对应的组件重新渲染之前

- `updated`

  > `data` 改变后，对应的组件重新渲染完成

- `beforeDestroy`

  > 在当前实例销毁之前，此时实例仍然可用。一般在此执行清空有副作用的引用

- `destroyed`

  > 实例销毁后

vue2 生命周期示意图

![vue2 生命周期示意图](https://cn.vuejs.org/images/lifecycle.png)

### Vue 中父子组件的生命周期

- 父子组件的生命周期是一个嵌套的过程

- 渲染的过程

  > 父 `beforeCreate` -> 父 `created` -> 父`beforeMounted` -> 子 `beforeCreate` -> 子 `created` -> 子 `beforeMounted` -> 子`mounted`-> 父`mounted`

- 子组件更新的过程

  > 父`beforeUpdate` -> 子 `beforeUpdate` -> 子 `updated` -> 父`updated`

- 父组件更新的过程

  > 父`bodoreUpdate` -> 父`updated`

- 销毁过程

  > 父`beforeDestroy` -> 子 `beforeDestroy` -> 子 `destroyed` -> 父 `destroyed`

### Vue 指令相关

- 全局注册

```js
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus();
  },
});
```

- 局部注册

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

- 指令的 hooks

  - `bind`: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  - `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  - `update`: 在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
  - `componentUpdated`: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  - `unbind`: 只调用一次，指令与元素解绑时调用。

  参数：

  - el：指令所绑定的元素，可以用来直接操作 DOM。
  - binding:
  - vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
  - oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

  > 注意 ⚠️： 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。

### Vue 中的 `nextTick`

- 解释

  > `nextTick`: 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

- 应用

  - 想要在 Vue 生命周期函数中的 `created()` 操作 DOM 可以使用 `Vue.nextTick()` 回调函数.

  - 在数据改变后要执行的操作，而这个操作需要等数据改变后而改变 DOM 结构的时候才进行操作，需要用到 nextTick.

### `computed` 和 `watch` 的区别

- `computed`

  > 计算属性，依赖其他属性，当其他属性改变的时候下一次获取 `computed` 值也会改变， `computed` 的值会有缓存。

- `watch`

  - 侦听属性，类似于数据改变后的回调
  - 如果需要深度监听，需要配置 `deep: true`
  - 如果监听完立马运行，需要配置 `immediate: true`

### Vue 优化方式

- `v-show`和 `v-if`

  > `v-show` 指令: 根据表达式之真假值，切换元素的 display 属性，

  > `v-if` 根据表达式的值的 真假 来有条件地渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 `<template>`，将提出它的内容作为条件块。

- `Object.freeze()`

  > 使用 Object.freeze() 方式冻结 data 中的属性，从而阻止数据劫持。

- 清除副作用

  > 组件销毁的时候会断开所有与实例联系，但是除了 `addEventListener`，所以当一个组件销毁的时候需要手动去 `removeEventListener`。 清除定时器。

- 图片懒加载

- 路由懒加载

  ```js
  import("/pages/second.vue");
  ```

- 为减少重新渲染和创建 dom 节点的时间，采用虚拟 dom。

### MVC 与 MVVM 有什么区别

- MVC

  - Model（模型）是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据

  - View（视图）是应用程序中处理数据显示的部分。通常视图是依据模型数据创建的。

  - Controller（控制器）是应用程序中处理用户交互的部分, 通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

- MVVM

  - Model 数据模型层

  - View 视图层

  - ViewModel 处理交互以及数据, 这就是 vue 所做的事情，DOM 监听以及数据绑定。

  ![MVVM](https://cn.vuejs.org/images/mvvm.png?_=5619070s)

### diff 算法

- vue2.0 的 diff 算法来源于 snabbdom，复杂度为 O(n)。 diff 算法是指对新旧 `vdom` 进行对比，并返回一个 patch 对象，用来存储两个节点不同的地方，最后利用 `patch` 记录的消息局部更新 DOM。diff 算法特点：

  1. 先去同级比较，然后再去比较子节点.
  2. 先去判断一方有子节点一方没有子节点的情况.
  3. 比较都有子节点的情况
  4. 递归比较子节点

### Vue 的 Key 的作用

key 主要用在虚拟 Dom 算法中，每个虚拟节点 VNode 有一个唯一标识 Key，通过对比新旧节点的 key 来判断节点是否改变，用 key 就可以大大提高渲染效率，这个 key 类似于缓存中的 etag。

### 虚拟 DOM 的优缺点

- 优点
  1. 减少了 dom 操作，减少了回流与重绘.
  2. 保证性能的下限，虽说性能不是最佳，但是它具备局部更新的能力，所以大部分时候还是比正常的 DOM 性能高很多的。
- 缺点
  1. 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。

### Vue 组件之间的通信方式

- 子组件设置 `props`, 父组件设置 `v-bind:` / `:`

- 子组件的 `$emit`, 父组件设置 `v-on` / `@`

- 任意组件

  > 任意组件通信，新建一个空的全局 Vue 对象，利用 `emit` 发送 ， `on` 接收。

  ```js
  const vueEvent = new Vue();

  // 发送消息
  vueEvent.$emit(methodName, { data: 12 });
  // 接收消息
  vueEvent.$on(methodName, (data) => {});
  ```

- vuex

  - state

    > 存储数据的
    > 获取数据最好推荐使用 getters
    > 硬要使用的话可以用 MapState， 先引用，放在 compute 中 `...mapState(['方法名','方法名'])`

  - getter

    > 获取数据的
    > `this.$store.getters.xxx`
    > 也可使用 mapGetters 先引用，放在 `computed` 中，`...mapGetters(['方法名','方法名'])`

  - mutation

    > 同步操作数据的, 原子操作
    > `this.$store.commit(“方法名”,数据)`
    > 也可使用 mapMutations ，使用方法和以上一样

  - action

    > 异步操作数据的
    > `this.$store.dispatch(“方法名”,数据)`
    > 也可使用 mapActions ，使用方法和以上一样

  - modules

    > 模块，里面可以放多个 vuex

- 父组件通过属性 `v-bind:` / `:`传值，子组件通过 `this.$attrs` 获取

- 祖先组件使用 `provide` 提供数据，子孙组件通过 `inject` 注入数据

## Vue-router

### Vue-router 的模式

- hash 模式

  > 监听 hashchange 事件实现前端路由，利用 url 中的 hash 来模拟一个 hash，以保证 url 改变时，页面不会重新加载。

  ```js
  const routes = [];
  // 4.0 之前
  const router = VueRouter.createRouter({
    mode: "hash",
    routes,
    base: "folder",
  });
  // 4.0 后
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory("folder"),
    routes, // `routes: routes` 的缩写
  });
  ```

- history 模式

  > 利用 pushstate 和 replacestate 来将 url 替换但不刷新，但是有一个致命点就是，一旦刷新的话，就会可能 404，因为没有当前的真正路径，要想解决这一问题需要后端配合，将不存在的路径重定向到入口文件。

  ```js
  const routes = [];
  // 4.0 之前
  const router = VueRouter.createRouter({
    mode: "history",
    routes,
    base: "folder",
  });
  // 4.0 后
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory("folder"),
    routes, // `routes: routes` 的缩写
  });
  ```

  Nginx 服务器配置

  ```
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

### Vue-router 有哪几种钩子函数

- `beforeEach(to, from, next)`

  - to(Route 路由对象)
  - from(Route 路由对象)
  - next(function 函数) 一定要调用才能进行下一步

- `afterEach`

- `beforeRouterLeaves`
