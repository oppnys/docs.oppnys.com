## 犀牛医疗

### 将一个多种结构对象的 key 由下划线法转成驼峰法

```js
function convert(json) {
  const regExp = /_(\w)/g;
  const camelize = function (str) {
    return str.replace(regExp, (_, c) => (c ? c.toUpperCase() : ""));
  };
  const result = {};

  function convertArray(target, arr) {
    arr.forEach((item, index) => {
      if (item instanceof Array) {
        target.push([]);
        convertArray(target[index], item);
      } else if (item instanceof Object) {
        target.push({});
        convertObject(target[index], item);
      } else {
        target.push(item);
      }
    });
  }

  function convertObject(target, obj) {
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      let cameKey = obj[key];
      if (regExp.test(key)) {
        cameKey = camelize(key);
      }
      if (val instanceof Array) {
        Reflect.set(target, cameKey, []);
        convertArray(target[cameKey], val);
      } else if (val instanceof Object) {
        Reflect.set(target, cameKey, {});
        convertObject(target[cameKey], val);
      } else {
        Reflect.set(target, cameKey, val);
      }
    });
  }

  convertObject(result, json);
  return result;
}

console.log(convert({ a_bc_d: 1 }));
console.log(convert({ a_bc_d: { foo_bar: "a_bc_d" } }));
console.log(convert({ a_bc_d: [{ foo_bar: 2 }, { goo_xyz: 3 }] }));
```

### 将一个数字由千分位表示

```js
function thousand(num) {
  return (num + "").replace(/\d(?=(\d{3})+$)/g, "$&,");
}
```

### 平面结构转化成树结构

```js
function printTree(list) {
  let roots = [];
  const cNode = [...list];
  roots = list.filter(
    (item) => list.filter((t) => t.id === item.parentId).length === 0
  );

  roots.forEach((item) => {
    const i = cNode.indexOf(item);
    if (i > -1) {
      cNode.splice(i, 1);
    }
  });

  let $i = 0;
  function r(target) {
    target.forEach((item) => {
      const children = cNode.filter((t) => item.id === t.parentId);
      if (children.length) {
        item.children = children;
        children.forEach((t) => {
          const i = cNode.indexOf(t);
          if (i > -1) {
            cNode.splice(i, 1);
          }
        });
        r(item.children);
      }
    });
  }

  r(roots);
  console.log($i, JSON.stringify(roots));
  return roots;
}

//============= 测试代码 ==============
const list = [
  { id: 1001, parentId: 0, name: "AA" },
  { id: 1002, parentId: 1001, name: "BB" },
  { id: 1003, parentId: 1001, name: "CC" },
  { id: 1004, parentId: 1003, name: "DD" },
  { id: 1005, parentId: 1003, name: "EE" },
  { id: 1006, parentId: 1002, name: "FF" },
  { id: 1007, parentId: 1002, name: "GG" },
  { id: 1008, parentId: 1004, name: "HH" },
  { id: 1009, parentId: 1005, name: "II" },
];

printTree(list);
```

## 中电兴发

### 实现深拷贝

```js
// 1. JSON
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 2
function deepClone(o, hash = new map()) {
  if (!isObject(o)) return o; //检测是否为对象或者数组
  if (hash.has(o)) return hash.get(o);
  let obj = Array.isArray(o) ? [] : {};

  hash.set(o, obj);
  for (let i in o) {
    if (isObject(o[i])) {
      obj[i] = deepClone(o[i], hash);
    } else {
      obj[i] = o[i];
    }
  }
  return obj;
}
```

### 手写一个 图片懒加载 的指令

```js
Vue.directive("lazy", {
  inserted(el) {
    const windowHeight = window.screen.height;
    if (el.offsetTop - window.scrollY > windowHeight) {
      const imgUrl = el.getAttribute("src");
      el.setAttribute("src", "");
      el.setAttribute("data-url", imgUrl);
      window.addEventListener("scroll", function () {
        if (el.offsetTop - window.scrollY > windowHeight) {
          const imgUrl = el.getAttribute("data-url");
          el.setAttribute("src", imgUrl);
        }
      });
    }
  },
});
```

### 找出数组中三个数据的和与目标值差异最小的，并返回他们的差。
