/* 
  性能：
    while的效率是最好的，所以，我们可以想办法把  for...in 遍历改变为 while 遍历。

    我们先使用 while 来实现一个通用的 forEach 遍历， intertee 是遍历的回到函数，他可以接受每次遍历的 value 和 index 两个参数；
*/

function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array
}

function deepClone(target, map = new WeakMap()) {
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
}

/* 
  下面对我们的 deepClone 函数进行改写：当遍历数组时，直接使用 forEach 进行遍历，当遍历对象，使用Object.keys取出所有的key 进行遍历，然后再遍历把 forEach 会调函数的 value 当做 key 使用；
*/

function deepClone2(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target)
    }

    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);

    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = deepClone2(target[key], map);
    })

    return cloneTarget;
  } else {
    return target;
  }
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target;


console.time();
const result = deepClone(target);
console.timeEnd();


console.time();
const result2 = deepClone2(target);
console.timeEnd();
