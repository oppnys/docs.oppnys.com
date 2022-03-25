## CSS

### CSS 盒模型

从内到外依次是 content(内容)、padding(内边距)、border(边框)、margin(外边距)

根据计算宽度和高度的方式不同，可分为

- 标准盒模型

```js
width = contentWidth;
height = contentHeight;
```

- 怪异盒模型

```js
widht = contentWidth + paddingWidth + borderWidth;
height = contentHeight + paddinHeight + borderHeight;
```

可通过 CSS 样式设置，实现两种不同的盒模型

- 标准盒模型

```css
box-sizing: content-box;
```

- 怪异盒模型

```css
box-sizingl: border-box;
```

### BFC 规范

BFC (Block Formatting Context) 块级格式化上下文 一块独立的区域，有自己的规则， bfc 中的元素与外界元素互不影响。BFC 是一块用来独立的布局环境，保护其中的内部元素不受外界影响，也不影响外部。

以下情况可以触发 BFC

- body 标签
- float: left|right
- overflow: !visible
- display: inint-block|table-cell|table-caption
- position: absolute|fixed

BCF 应用

- 清除浮动
- 自适应布局
- 垂直边距重叠

### 渐进增强优雅降级

- 渐进增强
  针对低版本浏览器进行构建页面，保证最基本的功能，然后在针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

- 优化降级
  一开始就构建完整的功能，然后再针对低版本浏览器进行兼容。

### CSS 特性：继承性，层叠，优先级

- 继承性
  子标签或继承父标签的某些样式，如文本颜色和字号
- 层叠
  样式冲突，遵循的是就近原则
- 优先级
  定义 CSS 样式时，通常有多个规则应用在同一元素上，此时谁的权重高显示谁的样式

:::tip

!important > 行内样式 > id > 类、伪类、属性 > 标签选择器 > 全局

对应权重： 无穷大 > 1000 > 100 > 10 > 1 > 0
:::

### position 的值

- static: 默认值，元素正常在正常的流中
- relative(相对定位): 生成相对定位的元素，相对于其正常(原本本身)位置进行定位
- absolute(绝对定位): 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位
- fixed(固定定位): 生成固定定位的元素， 相对于浏览器窗口进行定位
- sticky(粘性定位): 当前元素设置了粘性定位，滚动到顶部就会吸附顶部，往下滑回到原来的位置

### z-index 规则

- 值可以是正整数、负整数或者 0 ，值越大，z 轴位置越靠上
- 如果属性值相同，则按照书写顺序，后来居上
- 数字后面不能加单位
- z-index 只能应用于相对定位、绝对定位和固定定位的元素，其他标准流、浮动和静态定位无效
