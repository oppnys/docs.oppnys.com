## Vue2

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
