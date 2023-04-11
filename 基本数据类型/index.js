function new_instanceof_of(L, R) {
  // 取右表达式 prototype 值
  let RP = R.prototype;
  // 取表达式__proto__值
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    if (L === RP) return true;
    L = L.__proto__
  }
}

// console.log(new_instanceof_of(123, ))