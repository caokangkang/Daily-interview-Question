## Proxy
### 概述
> `proxy`可以理解成，在目标对象之前假设一层`"拦截"`，外界对该对象的访问，都必须先通过这层拦截，因此提供一种机制，可以对外界的访问进行`过滤`和`改写`。`Proxy`这个词愿意是`代理`,用在这里表示有它来`代理`某些操作，可以译为`代理器`。

```javascript
var obj = new Proxy({}, {
  get:function (target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set:function (target, key, value, receiver) {
    console.log(`setting ${key}!`)
    return Reflect.set(target, key, value, receiver)
  }
})
```