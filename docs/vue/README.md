## Vue

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

### vue 的生命周期

- `beforeCreate`

> 创建之前，此时还没有 data 和 method

- `created`

- `beforeMount`

- `mounted`

- `beforeUpdate`

- `updated`

- `beforeDestory`

- `destoryed`
