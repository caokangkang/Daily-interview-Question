

/*
  深拷贝方法：
    1.JSON.parse(JSON.stringify());
      这个方法虽然可以实现数组或对象深拷贝，但不能处理函数和正则；
    2.函数库lodash的_.cloneDeep方法；
    3.jquery 的$.extend 可以用来做 Deep Copy;
    4.手写递归方法；
*/

// 手写深拷贝
/* 
  如果是深拷贝的话，考虑到要拷贝的对象时不知道有多少层深度的，我们可以用递归来解决问题，稍微改写上面的代码；
    
      * 如果是原始类型，无需继续拷贝，直接返回；
      * 如果是引用类型，创建一个新的对象，遍历需要克隆的对象，将需要克隆对象属性执行深拷贝后依次添加到新对象上；
*/

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8]
};
target.target = target;
// 基础深拷贝
/* function deepClone(target) {
  if (typeof target == 'object') {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key])
    }
    return cloneTarget;
  }else{
    return target;
  }
} */


// 考虑数组
/* function deepClone(target) {
  if (typeof target == 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
} */


/* 
  循环引用
    解决循环引用问题, 我们可以额外开辟一个存储空间,来存储当前对象和拷贝对象的对应关系,当需要拷贝当前对象时,先去存储空间找,有没有拷贝过这个对象,如果有的话直接返回,如果没有的话继续拷贝,这样就巧妙化解了循环引用的问题。

    这个存储空间，需要可以存储 key-value 形式的数据，且 key 可以是一个引用类型，我们可以选择 Map 这种数据结构：

      * 检查 map 中有无克隆过的对象
      * 有-直接返回
      * 没有-将当前对象作为key, 克隆对象作为 value 进行存储
      * 继续克隆
    
    我们可以使用，WeakMap提代Map 来使代码达到画龙点睛的作用；
*/



/* function deepClone(target, map = new WeakMap()) {
  if (typeof target == 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = deepClone(target[key], map);
    }

    return cloneTarget;
  } else {
    return target;
  }
} */

let obj10 = deepClone(target);
console.log('obj10', obj10);
