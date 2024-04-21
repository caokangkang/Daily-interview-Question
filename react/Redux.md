## 六、Redux

### 1. 对 Redux 的理解，主要解决什么问题 :star::star::star:

### 2. Redux 原理及工作流程? :star::star::star:
<strong>（1）原理 Redux源码主要分为以下几个模块文件</strong>
<strong>（2）工作流程</strong>
- const store= createStore（fn）生成数据;
- action: {type: Symble('action01), payload:'payload' }定义行为;
- dispatch发起action：store.dispatch(doSomething('action001'));
- reducer：处理action，返回新的state;
<strong>通俗点解释：</strong>

### 3. Redux 中异步的请求怎么处理? :star::star:

### 4. Redux 怎么实现属性传递，介绍下原理?:star::star:

### 5. Redux 中间件是什么？接受几个参数？柯里化函数两端的参数具体是什么？

### 6. Redux 请求中间件如何处理并发

### 7. Redux 状态管理器和变量挂载到 window 中有什么区别?

### 8. mobox 和 redux 有什么区别？

### 9. Redux 和 Vuex 有什么区别，它们的共同思想? :star::star::star:
<strong>（1）Redux 和 Vuex区别</strong>
- Vuex改进了Redux中的Action和Reducer函数，以mutations变化函数取代Reducer，无需switch，只需在对应的mutation函数里改变state值即可
- Vuex由于Vue自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的State即可
<strong>（2）共同思想</strong>
- 单—的数据源
- 变化可以预测

本质上∶ redux与vuex都是对mvvm思想的服务，将数据从视图中抽离的一种方案。

### 10. Redux 中间件是怎么拿到store 和 action? 然后怎么处理?

### 11. Redux中的connect有什么作用