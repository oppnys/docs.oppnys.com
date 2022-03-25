## JavaScript

### 实现 call、apply、bind

- `call` 和 `apply` 的主要实现思路

  - 判断是否为函数调用，若非函数调用抛出异常
  - 通过传入的对象来调用函数
    - 给传入的对象创建 `fn` 设置为需要调用的函数 `this`
    - 调用结束后删除 `fn`

apply 的实现

```js
Function.prototype.myApply = function (context) {
  // 类型判断，this 不是函数抛出类型错误
  if (typeof this !== "function") throw new TypeError("Not a Function");
  let result;
  context.fn = this || window;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
```

call 的实现

```js
Function.prototype.myCall = function (context) {
  if (typeof this !== "function") throw new TypeError("Not a Function");
  context.fn = this || window;
  const args = Array.from(arguments).slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
```

- `bind` 的主要实现思路

  - 判断是否为函数调用，若非函数调用抛出异常
  - 返回函数

    - 判断函数的调用方式，是否是被 `new` 出来的

    - new 出来的话返回空对象，但实例的 `__proto__` 指向 `that` 的 `prototype`

    - 完成函数柯里化

    - `Array.prototype.slice.call()`

bind 的实现

```js
Function.prototype.Mybind = function (context) {
  if (this instanceof "function") throw new TypeError("Not a Function");
  const that = this;
  const args = Array.prototype.slice.call(arguments, 1);
  // 返回一个函数
  return function F(){
      if(this instanceof F){
           //返回一个空对象，且使创建出来的实例的__proto__指向_this的prototype，且完成函数柯里化
          return new that(..args, ...arguments)
      }
      // 如果不是new出来的改变this指向，且完成函数柯里化
      return _this.applu(contect, args.concat(...arguments))
  };
};
```

使用

```js
// Usage
const obj = { message: "Hi" };

function getName(firstName = "", lastName = "") {
  console.log(`${this.message} ${firstName}·${lastName}`);
}
getName.myApply(obj, ["liu", "oppnys"]);
getName.myCall(obj, "liu", "oppnys");
getName.bind(obj)("liu", "oppnys");
```

### 实现 Promise 的 then 和 all 方法

```js
// state = pending | fulfilled | rejected
class MyPromise {
  constructor(exector) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.successCB = [];
    this.failCB = [];
    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.successCB.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.failCB.forEach((fn) => fn());
      }
    };
    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected") {
      onRejected(this.reason);
    }
    if (this.state === "pending") {
      this.successCB.push(() => {
        onFulfilled(this.value);
      });
      this.failCB.push(() => {
        onRejected(this.reason);
      });
    }
  }

  static all(promises = []) {
    let list = [];
    let count = 0;
    function handle(i, data, resolve) {
      list[i] = data;
      count++;
      if (count === promises.length) {
        resolve(list);
      }
    }
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (res) => {
            handle(i, res, resolve);
          },
          (err) => rejected(err)
        );
      }
    });
  }
}

// Usage
const promise1 = new MyPromise((resolve, reject) => {
  setTimeout((_) => {
    resolve(1);
  }, 1000);
});

const promise2 = new MyPromise((resolve) => {
  setTimeout((_) => {
    resolve(2);
  }, 2000);
});

MyPromise.all([promise1, promise2]).then((res) => {
  console.log(res);
});
```

### 字面量创建对象和 new 创建对象有什么区别，new 的实现

- 字面量

  - 创建简单，方便阅读
  - 不要用作用域解析，速度更快

- `new` 的内部
  - 创建一个新对象
  - 使新对象的 `__proto__` 指向原函数的 `prototype`
  - 改变 `this` 指向（指向新的 obj），并执行该函数，执行结果保存起来 `result`
  - 判断执行函数的结果是不是 `null` 或 `undefined`, 如果是返回之前创建的新对象，不是返回 `result`

new 的实现

```js
function myNew(fn, ...args) {
  // 创建一个空对象
  const obj = {};
  // 使空对象的隐式原型指向原函数的显式原型
  obj.___proto__ = fn.prototype;
  //this指向obj
  const result = fn.apply(obj, args);
  // 返回
  return result instanceof Object ? result : obj;
}

const o = myNew(Object, { num: 12 });
// const o = new Object({ num: 12 })
console.log(o); // {num: 12}
```

### 字面量 new 出来的对象和 Object.create(null)创建出来的对象有什么区别

- 字面量和 `new` 创建出来的对象会继承 `Object` 的方法和属性，他们的隐式原型会指向 `Object` 的显式原型
- `Object.create(null)` 创建出来的对象原型为 `null`，作为原型链的顶端，自然也没有继承 `Object` 的方法和属性

### 作用域和作用域链

- 规定变量和函数的可使用范围称作作用域
- 每个函数都有一个作用域链，查找变量或者函数时，需要从局部作用域到全局作用域依次查找，这些作用域的集合称作作用域链。

### 执行栈和执行上下文

> 执行上下文分为全局执行上下文和函数执行上下文

- 全局执行上下文
  - 创建一个全局 `windos` 对象，并规定 `this` 指向 `window`, 执行的时候压入栈底，关闭浏览器或标签时弹出。
- 函数执行上下文
  - 每次函数调用时，会创建一个函数执行上下文
  - 执行上下文分为创建阶段和执行阶段
    - 创建阶段： 函数环境会创建变量对象：arguments 对象（并赋值）、函数申明（并赋值）、变量申明（不赋值）、函数表达式（不赋值）; 确定 `this` 指向； 确定作用域。
    - 执行阶段： 变量赋值、函数表达式赋值、使变量对象变成活跃对象。
- `eval` 执行上下文

- 执行栈
  - 栈的特点，先进后出（FILO）
  - 当进入一个执行环境，就会创建出它的执行上下文，然后进行压栈，当程序执行完成，它的执行上下文就会被销毁，然后出栈。
  - 栈底永远是全局环境的执行上下文，栈顶永远是正在执行函数的执行上下文
  - 只有关闭浏览器或关闭标签的时候全局执行上下文才会出栈

### 闭包

函数执行，形成私有的执行上下文，使内部私有变量不受外界干扰，起到保护和保存的作用。

- 作用

  - 保护
    > 避免命名冲突
  - 保存
    > 解决循环绑定引发的索引问题
  - 变量不会被销毁
    > 可用使用函数内部的变量，使变量不会被垃圾回收机制回收

- 应用

  - 设计模式中的单例模式
  - for 循环中保留 i 的操作
  - 节流防抖
  - 函数柯里化

- 缺点
  - 会出现内存泄露的问题

### 原型和原型链

- 原型：
  > 原型分为显式原型和隐式原型，每个对象都有一个隐式原型，指向自己构造函数的显式原型
- 原型链
  > 多个隐式原型组合的集合成为原型链
  - 所有实例的隐式原型都指向构造函数的显式原型
  - 所有的显式原型都是对象，显式原型的隐式原型指向 `Object()` 的显式原型
  - `Object` 的隐式原型是 `null`

### JavaScript 的继承

- 原型继承
  > 把父类的实例作为子类的原型。缺点：子类的实例共享了父类构造函数的引用属性

```js
const person = {
  firends: ["a", "b", "c"],
};
const p = Object.create(person);

p.friends.push("d");
console.log(p);
console.log(person);
```

- 组合继承
  > 在子函数中运行父函数，但是要利用 call 把 this 改变一下，
  > 优点可传参，不共享父类引用属性
  > 缺点：调用了两次父类的构造函数，造成了不必要的消耗，父类方法可以复用

```js
function Father(name) {
  this.name = name;
  this.hobby = ["篮球", "足球", "乒乓球"];
}
// 给父类原型上挂载方法
Father.prototype.getName = function () {
  console.log(this.name);
};

function Son(name, age) {
  // 子类调用父类的构造函数， 初始化父类
  Father.call(this, name);
  this.age = age;
}
// 将子类的显式原型指向父类的实例化对象
Son.prototype = new Father();
//将子类的构造函数指回子类
Son.prototype.constructor = Son;
const s = new Son("ming", 20);
console.log(s.getName()); // ming
```

- 寄生组合继承

```js
function Father(name) {
  this.name = name;
  this.hobby = ["篮球", "足球", "乒乓球"];
}
// 给父类原型上挂载方法
Father.prototype.getName = function () {
  console.log(this.name);
};

function Son(name, age) {
  // 子类调用父类的构造函数， 初始化父类
  Father.call(this, name);
  this.age = age;
}
// 将子类的原型指向父类的原型
Son.prototype = Object.create(Father.prototype);
//将子类的构造函数指回子类
Son.prototype.constructor = Son;
const s = new Son("ming", 20);
console.log(s.getName()); // ming
```

- ES6 的 `extend`

> 寄生组合继承的语法糖，类只要继承父类，可以不写 constructor ，一旦写了，则在 constructor 中的第一句话。

```js
class Son extends Father {
  constructor(y) {
    super(200);
    this.y = y;
  }
}
```

### 内存泄漏与垃圾回收机制

- 内存泄漏
  > 内存泄漏是指不在用的内存没有被及时释放出来，导致该段内存无法被使用。
- 导致内存泄漏的原因
  > 内存泄漏指我们无法在通过 js 访问某个对象，而垃圾回收机制却认为该对象还在被引用，因此垃圾回收机制不会释放对象，导致该内存永远无法释放，积少成多，系统会越来越卡。

### 垃圾回收机制的策略

- 标记清除法

垃圾回收机制获取跟并标记它们，然后访问并标记所有来自它们的引用，然后再访问这些对象并标记它们的引用，如此递归结束后若发现有没有标记的（不可达的）进行删除，进入执行环境下的不能删除。

- 应用计数法

当声明一个变量并给该变量赋值一个引用类型的值时候，该值的计数+1，当该值赋值给另一个变量的时候，该计数+1，当该值被其他值取代的时候，该计数-1，当计数变为 0 的时候，说明无法访问该值了，垃圾回收机制清除该对象。

缺点： 当两个对象循环引用的时候，引用计数无计可施。如果循环引用多次执行的话，会造成崩溃等问题。所以后来被标记清除法取代。

### 异步的任务队列

- 宏任务： `script`、`setTimeout`、`setInterval`、`setImmediate`
- 微任务: `promise.then`、`process.nextTick`、`Object.observe`、`MutationObserver`
- Promise 是同步任务

### 异步的任务队列执行顺序

- 执行宏任务 `script`
- 进入 `script`后，所有的同步任务主线程执行
- 所有的宏任务放入宏任务执行队列
- 所有的微任务放入微任务执行队列
- 先清空微任务队列
- 再取一个宏任务，执行，再清空微任务队列
- 依次循环

示例一

```js
setTimeout(function () {
  console.log("1");
});
new Promise(function (resolve) {
  console.log("2");
  resolve();
}).then(function () {
  console.log("3");
});
console.log("4");
new Promise(function (resolve) {
  console.log("5");
  resolve();
}).then(function () {
  console.log("6");
});
setTimeout(function () {
  console.log("7");
});
function bar() {
  console.log("8");
  foo();
}
function foo() {
  console.log("9");
}
console.log("10");
bar();
// 同步 : 2、4、5、10、8、9、
// macro Queue: [1，7]
// micro Queue: [3, 6]
// 输出结果： 2、4、5、10、8、9、3、6、1、7
```

示例二

```javascript
setTimeout(() => {
  console.log("1");
  new Promise(function (resolve, reject) {
    console.log("2");
    setTimeout(() => {
      console.log("3");
    }, 0);
    resolve();
  }).then(function () {
    console.log("4");
  });
}, 0);
console.log("5");
setTimeout(() => {
  console.log("6");
}, 0);
new Promise(function (resolve, reject) {
  console.log("7");
  // 两个执行一个
  // reject();
  resolve();
})
  .then(function () {
    console.log("8");
  })
  .catch(function () {
    console.log("9");
  });
console.log("10");
//结果: 5、7、10、[8/9]、1、2、4、6、3
```

### 变量和函数提升

- 对所有函数申明进行提升（除函数表达式和箭头函数），引用类型的赋值
  - 开辟堆空间
  - 存储内容
  - 将地址赋值给变量
- 对变量进行提升，只声明，不赋值

### 箭头函数

- 箭头函数是普通函数的简写，但是不具备很多普通函数的特性
- `this` 指向问题，箭头函数的 `this` 指向定义时所在的对象，而不是调用时所在的对象。
- 不会进行函数提升
- 没有 `arguments` 对象， 不能使用 arguments, 如果获取参数的话可以使用 `rest` 运算符
- 没有 `yeild` 属性，不能调用 `call` 和 `apply`
- 不能 `new`
  - 没有自己的 `this`, 不能调用 `call` 和 `apply`
  - 没有 `prototype`, new 关键字内部需要把新对象的 `_proto_` 指向函数的`prototype`

### `==` 与 `===` 的区别

- `===` 严格意义上的相等，会比较两边的数据类型和值大小

  - 数据类型不同返回 false
  - 数据类型相同，但值大小不同，返回 false

- `==` 是非严格意义上的相等，

  - 数据类型相同，比较值
  - 数据类型不同
    - Null == Undefined ->true
    - String == Number ->先将 String 转为 Number，在比较大小
    - Boolean == Number ->现将 Boolean 转为 Number，在进行比较
    - Object == String，Number，Symbol -> Object 转化为原始类型

### 节流

:::info
n 秒内只执行一次，若在 n 秒内重复触发，只执行一次
:::

```js
function throttle(fn, wait = 100) {
  let timer;
  return function () {
    let _this = this;
    let args = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(_this, args);
      }, wait);
    }
  };
}
```

### 防抖

:::info
n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
:::

```js
function debounce(fn, delay) {
  let timeout;
  return function () {
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(args);
    }, delay);
  };
}
```
