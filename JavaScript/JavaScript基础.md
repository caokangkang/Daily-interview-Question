## 三、JavaScript基础

### 1. new操作符的实现原理？:star::star::star:

new操作符的执行过程：
（1）首先创建了一个新的空对象
（2）设置原型，将对象的原型设置为函数的 prototype 对象。
（3）让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
（4）判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

```typescript
function Fn(name, age) {
  this.name = name;
  this.age = age;
}


function create(fn, ...args) {
  // 1. 创建一个空对象
  // 2. 将空对象的原型指向构造函数
  let nObj = Object.create(fn.prototype);
  // 3. 将空对象作为构造函数的上下文（改变this）
  let result = fn.apply(nObj, args)
  // 4. 对构造函数有返回值的处理判断
  return result instanceof Object ? result : nObj;
}
console.log(create(Fn, 'ckk', 18))

```

### 2. map和Object的区别?:star::star:
1. 构造方式:
- Object使用的是对象字面量、构造方法、Object.create():
```typescript
const obj = {
  a: 1,
  b: 2
}

// 构造方法
const o = new Object();

// Object.create()方法

const o2 = Object.create()
```
- Map使用构造方法
```typescript
const m = new Map();
const m2 = new Map([
  ['a', '1'],
  ['b', '2']
])
```

2. 键的类型
- Object键类型必须是String或者Symbol, 如果非String类型，会进行数据类型转换；
- Map可以是任意类型，包括数组，对象，函数等，不会进行l类型转化，在添加键值对时，会通过严格想等（===）来判断键属性是否已存在；
```typescript
const map2 = new Map();
map2.set('a', 1);
map2.set('2', '2')
map2.set(2, 2)
map2.set(arr1, 'arr1')

```
- 特例：NaN(===)比较会返回true，通常会返回false

3.  键的顺序
  - Object的key是无序，不会按照添加的顺序返回
    1. 对于大于等于0的整数，会按照大小进行排序，对于小数和负数会当做字符串处理
    2. 对于String类型，按照定义的顺序进行输出
    3. 对于Symboll类型，会直接过滤，不会进行输出，如果想要输出Symbol类型属性，通过Object.getOwnPropertySymbols()方法；
   - Map的key是有序的，按照插e入的顺序进行返回；

4. 键值对size
  - Object只能手动计算，通过Object.keys()方法或者通过for...in循环统计；
```typescript
const obj4 = {
  2: 2,
  '1': 1,
  'b': 'b'
}
Object.keys(obj4).length;
```
  - Map直接通过size属性访问；
```typescript
const map4 = new Map()
map4.set(2, 2)
map4.set('1', 1)
map4.set('b', 'b')
map4.size(); // 3
```

5. 键值对访问
  - Object
    - 添加或修改属性，通过点或者中括号的形式
    - 判断属性是否存在

```typescript
const obj5 = {}
obj5.name = 'zhangsan'
obj[Symbol('s5')] = 's5';

// 判断
obj5.name === undefined;
obj['name']=== undefined;
// 删除

delete obj5.name;
```

 -  Map()
    -  添加和修改key-value
    -  判断属性是否存在
  
```typescript
// 添加修改
const map5 = new Map();
map5.set('name', '张三')
map5.set(Symbol('s5'), 's5')

// 判断
map5.has('name')
map5.has('age')

// 取值
map5.get('name')

// 删除键值对
map5.delete('name')

// 获取所有的属性名
map5.keys();

//清空map
map5.clear();
```

6. 迭代器-for..of
  - Oject本身不具有Iterator特性，默认情况下不能使用for...of便利；
  - Map结构的keys(), values(), entries()方法返回值具有Iterater特性；

7. JSON序列化
  - Oject类型可以通过JSON.stringify()进行序列化操作；
  - Map结构不能直接进行JSON序列化

8. 适用场景
  - Object：
    1. 仅作为数据存储，并且属性为字符串或者Symbos
    2. 需要进行序列化转换为json传输时
    3. 当做一个对象的实例，需要保留自己的属性
  - Map:
    1. 会频繁更新和删除键值对时
    2. 存储大量数据时，尤其是key类型未知情况下。
    3. 需要频繁进行迭代处理；  
   
### 3. map和weakMap的区别

### 4. JavaScript有哪些内置对象

### 5. 常用的正则表达式有哪些？

### 6. 对JSON的理解

### 7. JavaScript脚本延迟加载的方式有哪些？:star::star:
延迟加载就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

一般有以下几种方式：

<strong>defer 属性：</strong>给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
<strong>async 属性：</strong> 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行
<strong>动态创建 DOM 方式：</strong>动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
<strong>使用 setTimeout 延迟方法：</strong> 设置一个定时器来延迟加载js脚本文件
<strong>让 JS 最后加载：将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。</strong>



### 8. JavaScript 类数组对象的定义？:star::star:
一个拥有 length 属性和若干索引属性的对象就可以被称为类数组对象，类数组对象和数组类似，但是不能调用数组的方法。常见的类数组对象有 arguments 和 DOM 方法的返回结果，还有一个函数也可以被看作是类数组对象，因为它含有 length 属性值，代表可接收的参数个数。
常见的类数组转换为数组的方法有这样几种：
（1）通过 call 调用数组的 slice 方法来实现转换
```typescript
Array.prototype.slice.call(arrayLike);
```
（2）通过 call 调用数组的 splice 方法来实现转换
```typescript
Array.prototype.splice.call(arrayLike, 0);
```
（3）通过 apply 调用数组的 concat 方法来实现转换
```typescript
Array.prototype.concat.apply([], arrayLike);
```
通过 Array.from 方法来实现转换
```typescript
Array.from(arrayLike);
```

### 9. 数组有哪些原生方法？:star::star::star:
- 数组和字符串的转换方法：toString()、toLocalString()、join() 其中 join() 方法可以指定转换为字符串时的分隔符。
- 数组尾部操作的方法 pop() 和 push()，push 方法可以传入多个参数。
- 数组首部操作的方法 shift() 和 unshift() 
- 重排序的方法 reverse() 和 sort()，sort() 方法可以传入一个函数来进行比较，传入前后两个值，如果返回值为正数，则交换两个参数的位置。
- 数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。
- 数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。
- 数组插入方法 splice()，影响原数组
- 查找特定项的索引的方法，indexOf() 和 lastIndexOf() 
- 迭代方法 every()、some()、filter()、map() 和 forEach() 方法
- 数组归并方法 reduce() 和 reduceRight() 方法

### 10. Unicode、UTF-8、UTF-16、UTF-32的区别？

### 11. 常见的位运算符有哪些？其计算规则是什么？

### 12. 为什么函数的 arguments 参数是类数组而不是数组？如何遍历类数组?:star::star:
arguments是一个对象，它的属性是从 0 开始依次递增的数字，还有call和length等属性，与数组相似；但是它却没有数组常见的方法属性，如forEach, reduce等，所以叫它们类数组。
要遍历类数组，有三个方法：
（1）将数组的方法应用到类数组上，这时候就可以使用call和apply方法，如：
```typescript
function foo(){ 
  Array.prototype.forEach.call(arguments, a => console.log(a))
}
```
（2）使用Array.from方法将类数组转化成数组：‌
```typescript
function foo(){ 
  const arrArgs = Array.from(arguments) 
  arrArgs.forEach(a => console.log(a))
}
```
（3）使用展开运算符将类数组转化成数组
```typescript
function foo(){ 
    const arrArgs = [...arguments] 
    arrArgs.forEach(a => console.log(a)) 
}
```


### 13. 什么是 DOM 和 BOM？:star::star::star:
- DOM 指的是文档对象模型，
它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。
- BOM 指的是浏览器对象模型，
  - 它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。
  - BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。
  - window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 **D**OM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。

### 14. 对类数组对象的理解，如何转化为数组?:star::star::star:
同8题
### 15. escape、encodeURI、encodeURIComponent 的区别

### 16. 对AJAX的理解，实现一个AJAX请求?:star::star::star:
创建AJAX请求的步骤：
1. 创建一个 `XMLHttpRequest` 对象。
2. 在这个对象上使用 `open` 方法创建一个 HTTP 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
3. 在发起请求前，可以为这个对象添加一些信息和监听函数。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发`onreadystatechange` 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 `readyState` 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 `2xx` 或者 `304` 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
4. 当对象的属性和监听函数设置完成后，最后调用 `sent` 方法来向服务器发起请求，可以传入参数作为发送的数据体。

```Typescript
// 创建xmlhttpRequest对象
const xhr = new XMLHttpRequest();

// 创建请求
xhr.open('GET', url, true);

// 监听
xhr.onreadystatechange = function() {
  if(this.readyState !== 4) return;

  if(this.status === 200){
    handle(this.response)
  }else{
    console.error(this.statusText)
  }
}

// 报错监听
xhr.onerror = function () {
  console.error(this.statusText)
}

// 设置请求头
xhr.responseType = "json"
xhr.setRequestHeader('Accept', "application/json")
// 发送 Http 请求
xhr.send(null)
```

使用Promise封装AJAX：
```typescript
// promise 封装
function getJSON(url) {
  // 创建 promise 对象
  return new Promise((resolve, rejest) => {
    // 创建 xhr 对象
    let xhr = new XMLHttpRequest();
    
    // 创建请求
    xhr.open("GET", url, true)

    // 监听状态
    xhr.onreadystatechange = function () {
      if(this.readeState !== 4) return;

      if(this.status === 200){
        resolve(this.response)
      }else{
        rejest(new Error(this.statusText))
      }
    }
    
    
    xhr.onerror = function () {
      rejest(new Error(this.statusText))
    }
    
    // 设置请求头
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    
//  // 发起请求
    xhr.send(null)
  })
}
```


### 17. JavaScript为什么要进行变量提升，它导致了什么问题？:star::star::star:
变量提升的表现是，无论在函数中何处位置声明的变量，好像都被提升到了函数的首部，可以在变量声明前访问到而不会报错。
造成变量声明提升的本质原因是 js 引擎在代码执行前有一个解析的过程，创建了执行上下文，初始化了一些代码执行时需要用到的对象。当访问一个变量时，会到当前执行上下文中的作用域链中去查找，而作用域链的首端指向的是当前执行上下文的变量对象，这个变量对象是执行上下文的一个属性，它包含了函数的形参、所有的函数和变量声明，这个对象的是在代码解析的时候创建的。


### 18. 什么是尾调用，使用尾调用有什么好处？

### 19. ES6模块与CommonJS模块有什么异同？:star::star:
ES6 Module和CommonJS模块的区别：
- CommonJS是对模块的浅拷⻉，ES6 Module是对模块的引⽤，即ES6 Module只存只读，不能改变其值，也就是指针指向不能变，类似const；
- import的接⼝是read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，但可以改变变量内部指针指向，可以对commonJS对重新赋值（改变指针指向），但是对ES6 Module赋值会编译报错。

ES6 Module和CommonJS模块的共同点：
CommonJS和ES6 Module都可以对引⼊的对象进⾏赋值，即对对象内部属性的值进⾏改变。

### 20. 常见的DOM操作有哪些

### 21. use strict是什么意思 ? 使用它区别是什么？

### 22. 如何判断一个对象是否属于某个类？:star::star:
- 第一种方式，使用 instanceof 运算符来判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
- 第二种方式，通过对象的 constructor 属性来判断，对象的 constructor 属性指向该对象的构造函数，但是这种方式不是很安全，因为 constructor 属性可以被改写。
- 第三种方式，如果需要判断的是某个内置的引用类型的话，可以使用 Object.prototype.toString() 方法来打印对象的[[Class]] 属性来进行判断。

### 23. 强类型语言和弱类型语言的区别？

### 24. 解释性语言和编译型语言的区别

### 25. for...in和for...of的区别?:star::star:
for…of 是ES6新增的遍历方式，允许遍历一个含有iterator接口的数据结构（数组、对象等）并且返回各项的值，和ES3中的for…in的区别如下
- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

### 26. 如何使用for...of遍历对象

### 27. ajax、axios、fetch的区别

### 28. 数组的遍历方法有哪些？:star::star:
方法|是否改变原数组|特点
-|-|-
forEach()|否|数组方法，不改变原数组，没有返回值
map()|否|	数组方法，不改变原数组，有返回值，可链式调用
filter()|否|数组方法，过滤数组，返回包含符合条件的元素的数组，可链式调用
for...of|否|for...of遍历具有Iterator迭代器的对象的属性，返回的是数组的元素、对象的属性值，不能遍历普通的obj对象，将异步循环变成同步循环
every() 和 some()|否|	数组方法，some()只要有一个是true，便返回true；而every()只要有一个是false，便返回false.
find() 和 findIndex()|否|数组方法，find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的索引值
reduce() 和 reduceRight()|否|	数组方法，reduce()对数组正序操作；reduceRight()对数组逆序操作
### 29. forEach和map方法有什么区别?:star::star:
这方法都是用来遍历数组的，两者区别如下：
- forEach()方法会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值；
- map()方法不会改变原数组的值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值；