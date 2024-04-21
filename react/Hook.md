## 七、Hooks
### 1. 对 React Hook 的理解，它的实现原理是什么?:star::star::star:
### 2. 为什么 useState 要使用数组而不是对象;:star::star::star:
useState 返回的是 array 而不是 object 的原因就是为了降低使用的复杂度
返回数组的话可以直接根据顺序解构，而返回对象的话要想使用多次就需要定义别名了。
### 3. React Hooks 解决了哪些问题？:star::star::star:
React Hooks 主要解决了以下问题：
（1）在组件之间复用状态逻辑很难
- React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）解决此类问题可以使用 render props 和 高阶组件
- 但是这类方案需要重新组织组件结构，这可能会很麻烦，并且会使代码难以理解
- 由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。
- 尽管可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。
（2）复杂组件变得难以理解
（3）难以理解的 class

### 4. React Hook 的使用限制有哪些？
### 5. useEffect 与 useLayoutEffect 的区别?:star::star::star:
### 6. React Hooks在平时开发中需要注意的问题和原因
### 7. React Hooks 和生命周期的关系？
