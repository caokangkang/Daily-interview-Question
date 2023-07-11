# Vue 渲染过程

## 模版 编译原理 & 流程

+ 解析 `template`模板，生成`ast语法树`，再使用`ast语法树`生成 `render` 函数字符串，编译流程如下：
  + 解析阶段：使用大量的`正则表达式`对`template字符串`进行解析，转化为`抽象语法树AST`。
  + 优化阶段：`遍历AST`，找到其中的一些静态节点并进行标记，方便在进行`diff比较`时，直接跳过这一些静态节点，优化性能
  + 生成阶段： 将最终的`AST`转化为`render`函数


## 视图 渲染更新流程
+ 监听数据的变化，当数据发生变化时，Render 函数执行生成 vnode 对象
+ 对比新旧 VNode 对象，通过Diff算法（双端比较）生成真实DOM；


## Vue runtime-compiler 与 runtime-only
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18f65b6d588448fa8cfbc1f6ffc2f387~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

## 渲染流程图
