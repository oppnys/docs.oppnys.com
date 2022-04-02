## Object

### Object() 方法

`Object()` 方法返回一个对象，功能和构造函数相同

### 构造函数

`Object` 的构造函数根据入参的类型不同，返回不同的结果。

- 如果是引用类型，返回该引用类型的对象。
- 如果是基本数据类型，返回该类型的包装对象。

### 静态属性/方法

#### 1. Object.keys()

#### 2. Object.getOwnPropertyNames()

#### 3. 其他方法

##### (1)对象属性模型的相关方法

- Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。
- Object.defineProperty()：通过描述对象，定义某个属性。
- Object.defineProperties()：通过描述对象，定义多个属性。

##### (2)控制对象状态的方法

- Object.preventExtensions()：防止对象扩展。
- Object.isExtensible()：判断对象是否可扩展。
- Object.seal()：禁止对象配置。
- Object.isSealed()：判断一个对象是否可配置。
- Object.freeze()：冻结一个对象。
- Object.isFrozen()：判断一个对象是否被冻结。

##### (3)原型链相关方法

- Object.create()：该方法可以指定原型对象和属性，返回一个新的对象。
- Object.getPrototypeOf()：获取对象的 Prototype 对象。

### 实例属性/方法

除了静态方法，还有不少方法定义在 Object.prototype 对象。它们称为实例方法，所有 Object 的实例对象都继承了这些方法。

- Object.prototype.valueOf()：返回当前对象对应的值。
- Object.prototype.toString()：返回当前对象对应的字符串形式。
- Object.prototype.toLocaleString()：返回当前对象对应的本地字符串形式。
- Object.prototype.hasOwnProperty()：判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性。
- Object.prototype.isPrototypeOf()：判断当前对象是否为另一个对象的原型。
- Object.prototype.propertyIsEnumerable()：判断某个属性是否可枚举。

## 属性描述对象

JavaScript 提供了一个内部数据结构，用来描述对象的属性，控制它的行为，比如该属性是否可写、可遍历等等。这个内部数据结构称为“属性描述对象”（attributes object）。每个属性都有自己对应的属性描述对象，保存该属性的一些元信息。

```js
{
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false,
  get: undefined,
  set: undefined
}
```

属性描述对象提供 6 个元属性。

#### 1. `value`

value 是该属性的属性值，默认为 `undefined`。

#### 2. `writable`

`writable` 是一个布尔值，表示属性值（value）是否可改变（即是否可写），默认为 `true`。

#### 3. `enumerable`

`enumerable` 是一个布尔值，表示该属性是否可遍历，默认为 true。如果设为 `false`，会使得某些操作（比如 `for...in` 循环、`Object.keys()`）跳过该属性。

#### 4. `configurable`

`configurable` 是一个布尔值，表示可配置性，默认为 `true`。如果设为 `false`，将阻止某些操作改写该属性，比如无法删除该属性，也不得改变该属性的属性描述对象（value 属性除外）。也就是说，`configurable` 属性控制了属性描述对象的可写性。

#### 5. `get`

`get` 是一个函数，表示该属性的取值函数（`getter`），默认为 `undefined`。

#### 6. `set`

`set` 是一个函数，表示该属性的存值函数（`setter`），默认为 `undefined`。

## 数组 Array

### 构造函数

#### new Array()

### 静态属性/方法

#### 1. Array.isArray

` Array.isArray` 返回一个 `Boolean` 值, 表示参数是否为数组。

```
const arr = [1,2,3]
typeof arr // 'object'
Array.isArray(arr) // true
```

### 实例属性/方法

#### `valueOf()`,`toString()`

`valueOf()` 方法是一个所有对象都拥有的方法，表示对该对象求值。不同对象的 `valueOf()` 方法不尽一致，数组的 `valueOf()` 方法返回数组本身。

`toString()` 方法也是对象的通用方法，数组的 `toString()` 方法返回数组的字符串形式。

#### `push()`,`pop()`

`push()` 方法用于在数组的末端添加一个或多个元素，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

`pop()` 方法用于删除数组的最后一个元素，并返回该元素。注意，该方法会改变原数组。

#### `shift()`, `unshift()`

`shift()` 方法用于删除数组的第一个元素，并返回该元素。注意，该方法会改变原数组。

`unshift()` 方法可以接受多个参数，这些参数都会添加到目标数组头部。

#### `join()`

`join()`方法以指定参数作为分隔符，将所有数组成员连接为一个字符串返回。如果不提供参数，默认用逗号分隔。

如果数组成员是 undefined 或 null 或空位，会被转成空字符串。

通过 call 方法，这个方法也可以用于字符串或类似数组的对象。

#### `concat()`

`concat()` 方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。

#### `reverse()`

`reverse()` 方法用于颠倒排列数组元素，返回改变后的数组。注意，该方法将改变原数组。

#### `slice()`

`slice()` 方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

```js
arr.slice(start, end);
```

它的第一个参数为起始位置（从 0 开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。

`slice()`方法的一个重要应用，是将类似数组的对象转为真正的数组。

```js
Array.prototype.slice.call({ 0: "a", 1: "b", length: 2 });
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

上面代码的参数都不是数组，但是通过 call 方法，在它们上面调用 slice 方法，就可以把它们转为真正的数组。

#### `splice()`

`splice` 方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组

```js
arr.splice(start, count, addElement1, addElement2, ...);
```

#### `sort()`

`sort()` 方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。

如果想让 `sort` 方法按照自定义方式排序，可以传入一个函数作为参数。`sort` 的参数函数本身接受两个参数，表示进行比较的两个数组成员。如果该函数的返回值大于 0，表示第一个成员排在第二个成员后面；其他情况下，都是第一个元素排在第二个元素前面。

:::warning
自定义的排序函数应该返回数值，否则不同的浏览器可能有不同的实现，不能保证结果都一致。
:::

```js
// bad
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a > b);

// good
[1, 4, 2, 6, 0, 6, 2, 6].sort((a, b) => a - b);
```

#### `map()`

`map()` 方法将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

#### `forEach()`

`forEach` 方法与 `map` 方法很相似，也是对数组的所有成员依次执行参数函数。但是，forEach 方法不返回值，只用来操作数据。这就是说，如果数组遍历的目的是为了得到返回值，那么使用 `map` 方法，否则使用 `forEach` 方法。

`forEach` 的用法与 `map` 方法一致，参数是一个函数，该函数同样接受三个参数：当前值、当前位置、整个数组。

#### `filter()`

`filter()` 方法用于过滤数组成员，满足条件的成员组成一个新数组返回。

它的参数是一个函数，所有数组成员依次执行该函数，返回结果为 `true` 的成员组成一个新数组返回。该方法不会改变原数组。

#### `some()`, `every()`

这两个方法类似“断言”（assert），返回一个布尔值，表示判断数组成员是否符合某种条件。

它们接受一个函数作为参数，所有数组成员依次执行该函数。该函数接受三个参数：当前成员、当前位置和整个数组，然后返回一个布尔值。

`some` 方法是只要一个成员的返回值是 `true`，则整个 `some` 方法的返回值就是 true，否则返回 false。

`every` 方法是所有成员的返回值都是 true，整个 `every` 方法才返回 true，否则返回 false。

#### `reduce()`, `reduceRight()`

`reduce` 方法和 `reduceRight` 方法依次处理数组的每个成员，最终累计为一个值。它们的差别是，`reduce` 是从左到右处理（从第一个成员到最后一个成员），`reduceRight` 则是从右到左（从最后一个成员到第一个成员），其他完全一样。

#### `indexOf()`，`lastIndexOf()`

`indexOf`方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。`indexOf` 方法还可以接受第二个参数，表示搜索的开始位置。

`lastIndexOf` 方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。
