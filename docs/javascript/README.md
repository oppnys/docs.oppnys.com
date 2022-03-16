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
