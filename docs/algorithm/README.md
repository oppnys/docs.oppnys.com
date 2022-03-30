## 数据结构与算法

### 栈

- 特点：先进后出（FILO）

- 使用：JS 方法执行调用栈

- JavaScript 实现 栈

:::tip
JavaScript 原生不支持 栈 结构， 但是可以通过数据模拟 栈 的特性
:::

```javascript
class Stack {
    constructor() {
        this.stack = []
    }

    // 出栈
    pop() {
        this.stack.pop()
    }

    // 入栈
    push(val) {
        this.stack.push(val)
    }

    //返回栈顶元素
    top() {
        return this.stack[this.stack.length - 1]
    }
}
```

    
