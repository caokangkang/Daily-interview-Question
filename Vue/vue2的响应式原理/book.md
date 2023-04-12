## Vue响应式原理
### 原理
`Vue`时采用了数据劫持加观察者（`发布者-订阅者`）模式的方式，通过Object.defineProperty()来劫持各个属性的setter、getter,在数据变化是发布消息给订阅者(`watcher`),触发相应的监听回调来更新DOM;
### 创建、更新流程
+ 当一个`Vue`实例创建时，`Vue`会遍历`data`选项的属性，用`Object.defineProperty`为他们设置`getter/setter`并且在内部追踪相关依赖，在属性访问和修改时分别调用`getter`和`setter`。
+ 每个组件实例都有相应的`watcher`程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的`setter`被调用时，会通知`watcher`重新计算，观察者`Wacher`自动触发重新render当前组件，生成新的虚拟DOM树
+ `Vue`框架会遍历并对比`新旧虚拟` `DOM`树中每个节点的差别，并记录下来，最后将所有记录的不同点，局部修改到真实`DOM`树上。（判断新旧节点的过程在Vue2和Vue3也有不同）
### Vue2的响应式的缺点
+ `Object.defineProperty`是可以监听通过数组下标修改数组的操作，通过遍历每个数组元素的方式
  + 但是`vue2`无法监听，原因是性能代码和用户体验不成正比，其次即使监听了，也监听不了数组的原生方法的操作；
  + 出于性能考虑,`vue2`放弃了对数组元素的监听，改为对数组原型上的`7`种方法进行劫持；
+ `Object.defineProperty`无法检测直接通过`.length`改变数组长度的操作；
+ `Object.defineProperty`只能监听属性，所有需要对对象的每个属性进行遍历，因为如果对象的属性值还是对象，还需要深度遍历。因为这个`api`并不是劫持对象本身。
+ 也正是因为`Object.defineProperty`只能监听属性而不是对象，所以对象新增的属性没有响应式；因此新增的响应式对象的属性时，需要使用`Set`进行新增；
+ 不支持`Map`、`Set`等数据结构
### Vue2 如何解决数组响应式的问题
`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`这七个数组，在`Vue2`内部重写了所有可以监听到，除此之外可以使用`set()`方法，`Vue.set()`对于数组的处理其实就是调用了`splice`方法
### v-model双向绑定原理
`v-model`本质上时语法糖，`v-model`默认会解析成名为`value`的`prop`和名为`input`的事件。这种语法糖的方式时典型的双向绑定；