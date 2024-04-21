let obj = {
  name: 'ckk',
};

function addAge(age) {
  this.age = age;
  return this;
}

console.log(addAge.apply(obj, [50]));
/* 
Function.prototype.myCall1 = function (context) {
    // 传入window作为content为null时
  if (!context) context = window;
  // 将函数设为对象的属性（方法）
  context.attr = this;
  const args = [];

  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']');
  }

  // 执行改方法
  //   获得返回值
  const result = eval('context.attr(' + args.toString() + ')');

  // 删除该方法
  delete context.sttr;
  return result;
}; */

Function.prototype.myCall2 = function (context) {
  // 判断调用对象
  if (typeof this !== 'function') {
    console.error('type error');
  }

  // 获取参数
  let args = [...arguments].slice(1),
    result = null;

  // 判断 context 是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用的函数设为对象的方法
  context.fn = this;

  // 调用函数
  result = context.fn(...args);

  // 将属性删除
  delete context.fn;
  return result;
};

/* console.log(addAge.myCall2(obj, 20));
console.log(addAge.myCall2(null, 20).age);
console.log(obj);
 */

Function.prototype.myApply = function (context) {
  // 判断调用对象
  if (typeof this !== 'function') {
    console.error('error');
  }

  // 获取参数
  let result = null;

  // 判断 context 是否传入，如果未传入则设置为window
  context = context || window;
  // 将调用的函数设为对象的方法
  context.fn = this;

  // 调用函数
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn(...args);
  }

  // 将属性删除
  delete context.fn;
  return result;
};

/* console.log(addAge.myApply(obj, [20]));
console.log(addAge.myApply(null, [20]).age);
console.log(obj); */

Function.prototype.myBind = function (txt) {
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }

  // 获取参数
  let args = [...arguments].slice(1);
  fn = this;

  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(this instanceof Fn ? this : context, args.concat(...arguments));
  };
};


console.log(addAge.myApply(obj, [20]).age);
console.log(addAge.myBind(obj, [20]));
console.log(obj);