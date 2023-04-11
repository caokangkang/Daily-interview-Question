/* 
  其他类型：
    我们其实只考虑了普通的 object 和 array 两种数据类型， 实际上所有的引用类型远远不止这两个，还有很多，我们先尝试获取对象准确的类型；
*/


/* 
  合理的判断引用类型：
    首先，判断是否为引用类型，我们还需要考虑 function 和 null 两种特殊的数据类型；
*/

function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

/* 
  获取数据类型
    可以使用toString来获取准确的引用类型；
      * 每一个引用类型都有 toString 方法， 默认情况下，toString() 方法被每个 Object 对象继承。如果此方法在自定义对象中未被覆盖， toString() 返回 "[object type]", 其中type是对象类型；

    注意，上面提到了如果此方法在 自定义对象中未被覆盖， toString 才会达到预想的效果，实时上，大部分引用类型比如 Array、 Date、RegExp等都重写了toString方法；

    我们可以直接 调用Object 原型上未被覆盖的 toString() 方法， 使用 cell 来改变 this 指向来达到我们想要的效果；
*/


function getType(target) {
  return Object.prototype.toString.call(target);
}

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';


const deepTag = [mapTag, setTag, arrayTag, objectTag]

/* 
  在上面的集中类型中， 我们简单将他们分为两类

    * 可以继续遍历的类型
    * 不可以继续遍历的类型

  分别为它们做不同的拷贝
*/

/* 
  可继续遍历的类型

    上面我们已经考虑的 object、array 都属于可以继续遍历的类型，因为他们内存都还可以存储其他数据类型的数据，另外还有Map, Set等都是可以继续遍历的类型，这里我们只考虑这四种，如果你有兴趣可以继续探索其他类型。

    有序这几种类型还需要继续进行递归，我们首先需要获取他们的初始化数据，例如上面的 [] 和 {}， 我们可以通过拿到constructor的方式来通用的获取。


    例如： const target = {} 就是 const target = new Object() 的语法糖。另外这种方法还有一个好处： 因为我们还使用了原对象的构造方法，所以它可以保留对象原型上的数据，如果直接使用普通的{}， 那么原型必然是丢失了的。
*/

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array
}

/* 
  不可继续遍历的类型
  其他剩余的类我们把他们同意归类成不可处理的数据类型，我们一次进行处理

  Bool number String error Date regexp symbol 这几种类型我们都可以直接用构造函数和原始数据类型创建一个新对象； 
*/

function cloneOtherType(target, type){
  const Ctor = target.constructor;
  switch(type){
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    default:
      return null;
  }
}

// 克隆Symbol

function cloneSymbol(target){
  return Object(Symbol.prototype.valueOf.call(target));
}

// 克隆正则
function cloneReg(target){
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}


/* 
  实际上还有很多数据类型我这里没有写到，有兴趣的话可以继续探索实现一下

  能写到这里，面试官已经看到了你考虑问题的严谨性，你对变量和类型的理解，对JS API的熟练程度，相信面试官已经开始对你刮目相看了。
*/

/* 
  克隆函数

  最后，我把克隆函数单独拎出来了，实际上克隆函数是没有实际引用场景的，两个对象使用一个在内存中处于同一个地址的函数也是没有问题的，我特意看了下loash对函数的处理：
  const isFunc = typeof value == 'function'
  if(isFunc || !cloneableTags[tag]){
    return object ? value : {}
  }


  可见这里如果发现是函数的话就直接返回了，没有做特殊的处理，但是我们返现不少面试官还是热衷于问这个问题的，而且据我了解写出来的少之又少。。。

  实际上这个方法并没有什么难度，主要就是考察你对基础掌握的扎不扎实。

  首先，我们可以通过prototype来区分下箭头函数和普通函数，箭头函数是没有prototype的。

  我们可以直接使用eval和函数字符串来重新生成一个箭头函数，注意这种方法是不适用于普通函数的。

  我们可以使用正则来处理普通函数：


  分别使用正则取出函数体和函数参数，然后使用new Function([arg1[, arg2[, ...argN]],], functionBody)构造函数重新构造一个新的函数：
  
*/

function cloneFunction(func){
  const bodyReg = /(?<{)(.|\n)+(?=)})/m;
  const paramReg = /?<=\().+(?=\)\s{)/;
  const funcString = func.toString();
  if (func.prototype) {
    console.log('普通函数');
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log('匹配到函数体：', body[0]);
      if (param) {
        const paramArr = param[0].split(',');
        console.log('匹配到参数', paramArr);
        return new Function(...paramArr, body[0]);
      }else{
        return new Function(body[0]);
      }
    }else{
      return null
    }
  }else{
    return eval(funcString);
  }
}

function deepClone(target, map = new WeakMap()) {

  if (!isObject(target)) {
    return target
  }

  // 初始化

  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  }

  // 防止循环引用

  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type == setTag) {
    target.forEach((value, key) => {
      cloneTarget.add(key, deepClone(value, map));
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepClone(value, map));
    })
    return cloneTarget
  }

  // 克隆对象和数据
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }

    cloneTarget[key] = deepClone(target[key], map);
  })

  return cloneTarget;
}

const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('code秘密花园');
    },
    func2: function (a, b) {
        return a + b;
    }
};


const result = deepClone(target);
console.log('result', result)
