var proxy = new Proxy({
  name: 'ckk',
  title: 'peaper',
  time: '2023.4.6'
}, {
  get: function (target, property) {
    return 35
  }
})
// console.log('proxy.name :>> ', proxy.name);
// console.log('proxy.title :>> ', proxy.title);
// console.log('proxy.time :>> ', proxy.time);


/* const handler = {
  get: function (target, name) {
    if (name === 'prototype') {
      return Object.prototype;
    }
    return 'Hello,' + name;
  },
  apply: function (target, thisBinding, args) {

  }
} */


function createArray(...elements) {
  let handler = {
    get(target, propKey, receiver) {
      console.log('target :>> ', target);
      console.log('propKey :>> ', propKey);
      console.log('receiver :>> ', receiver);
      let index = Number(propKey)
      if (index < 0) {
        propKey = String(target.length + index);
      }

      return Reflect.get(target, propKey, receiver)
    }
  }
  let target = [];
  target.push(...elements)
  return new Proxy(target, handler)
}

let arr = createArray('a', 'b', 'c')
arr[-1]
// console.log('object :>> ', arr[-1]);