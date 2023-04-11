## 盒模型
### 概念
>盒模型的组成部分为：`content(元素内容)` + `padding(内边距)` +　`border(边距)` + `margin(外边距)`

`css`的`盒模型`有两种：`标准盒模型`和`IE盒模型`

+ 标准盒模型：盒子的实际宽高 = width/height(content) + padding + border + margin
+ IE盒模型：盒子的实际宽高 = width/height(content + padding + border) + margin

### 如何设置盒模型
通过设置`box-sizing`的值改变盒模型

+ `box-sizing: content-box`为`标准盒模型`;也是`默认值`
+ `box-sizing: border-box`为`IE盒模型`

### 盒模型`margin`负值问题

+ `margin-top`元素自身会向上移动，同时会影响下方的元素会向上移动；
+ `margin-bottom`元素自身不会位移，但是会减少自身供css读取的高度，从而影响下方的元素向上移动；
+ `margin-left`元素自身会向左移动，同时会影响其他元素；
+ `margin-right`元素自身不会移动，但是会减少自身供css读取的高度，从而影响右侧的元素会向左移动；