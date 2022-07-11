
/* 
  浅拷贝方法：
    1.Object.assign(); 方法可以把任意多个的原对象自身的可枚举属性拷贝给目标对象，然后返回目标对象;
    2.函数库lodash的_.clone方法;
    3.扩展运算符;
    4.Array.prototype.concat();
    5.Array.prototype.slice();
    6.手写浅拷贝;
*/

let obj1 = { person: { name: 'kobe', age: 41 }, sports: 'basketball' }
let obj2 = Object.assign({}, obj1);
obj2.person.name = 'wade';
obj2.sports = 'football';
// console.log(obj1);


// 函数库lodash的_.clone方法
let obj3 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3]
};

let obj4 = _.clone(obj3);
/*  console.log('obj4', obj4);
 console.log(obj3.b.f === obj4.b.f); */


// es6扩展运算符 
let obj5 = { name: 'Kobe', address: { x: 100, y: 100 } };
let obj6 = { ...obj5 };
obj5.address.x = 200;
obj5.name = 'wade';
// console.log('obj6', obj6)



// Array.prototype.concat(); // 方法用于连接两个或多个数组
let arr = [1, 3, {
  username: 'kobe'
}];
let arr2 = arr.concat();
arr[2].username = 'wade';
// console.log('arr', arr)


// Array.prototype.slice();  方法可从已有的数组中返回选定的元素；
let arr3 = [1, 3, {
  username: ' kobe'
}];
let arr4 = arr3.slice();
arr4[2].username = 'wade';
// console.log('arr3', arr3)


let obj7 = { name: 'Kobe', address: { x: 100, y: 100 } };
// 手写浅拷贝
/* function clone (target) {
  let cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key];
  }
  return cloneTarget
} */
function clone(target) {
  let cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key]
  }
  return cloneTarget;
}

let obj8 = clone(obj7);
        /* obj7.address.x = 200;
obj7.name = 'wade';
console.log('obj8', obj8) */