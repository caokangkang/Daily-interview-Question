/* 
    一、概念
    二、如果我们想要封装promise就需要考虑一下几个问题
        如何让Promise变成一个微任务
        如何管理Promise的状态
        then方法的返回值的问题
        静态方法：resolve、reject、all、race
*/

/* 
  说一说promise是什么与使用方法？
      得分点 pendding、rejected、resolved、微任务、then、catch、Promise.resolve()、Promise.reject()、Promise.all() Promise.any()、Promise.race() 标准回答 Promise的作用：Promise是异步微任务，解决了异步多层嵌套回调的问题，让代码的可读性更高，更容易维护 Promise使用：Promise是ES6提供的一个构造函数，可以使用Promise构造函数new一个实例，Promise构造函数接收一个函数作为参数，这个函数有两个参数，分别是两个函数 `resolve`和`reject`，`resolve`将Promise的状态由等待变为成功，将异步操作的结果作为参数传递过去；`reject`则将状态由等待转变为失败，在异步操作失败时调用，将异步操作报出的错误作为参数传递过去。实例创建完成后，可以使用`then`方法分别指定成功或失败的回调函数，也可以使用catch捕获失败，then和catch最终返回的也是一个Promise，所以可以链式调用。 Promise的特点： 1. 对象的状态不受外界影响（Promise对象代表一个异步操作，有三种状态）。 - pending（执行中） - Resolved（成功，又称Fulfilled） - rejected（拒绝） 其中pending为初始状态，fulfilled和rejected为结束状态（结束状态表示promise的生命周期已结束）。 2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。 Promise对象的状态改变，只有两种可能（状态凝固了，就不会再变了，会一直保持这个结果）： - 从Pending变为Resolved - 从Pending变为Rejected 3. resolve 方法的参数是then中回调函数的参数，reject 方法中的参数是catch中的参数 4. then 方法和 catch方法 只要不报错，返回的都是一个fullfilled状态的promise 加分回答 Promise的其他方法： Promise.resolve() :返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。 Promise.reject()：返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法。 Promise.all()：返回一个新的promise对象，该promise对象在参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。 Promise.any()：接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。 Promise.race()：当参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。


      ：异步编程的一种解决方案，解决了地狱回调问题。使用方法：new Promise（（resolve，reject）=>{ resolve();reject();}）里面有多个resolve或者reject只执行第一个。如果第一个是resolve的话可以接.then查看成功消息。如果第一个是reject的话，.catch查看错误消息。 promise 是一种异步编程的解决方案，它可以实现把异步操作按照同步操作的流程表达出来。它其实是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。resolved：成功状态返回一个 Promise 对象；reject：失败状态返回一个Promise 对象；race：多个 Promise 任务同时执行，返回最先执行结束的 Promise 任务的结果，不管这个 Promise 结果是成功还是失败；all：如果全部成功执行，则以数组的方式返回所有 Promise 任务的执行结果，如果有错误就返回reject的结果；.then链式：为 Promise 注册回调函数，函数一定要一个返回结果或者一个新的 Promise 对象，才可以让之后的then 回调接收；.catch：异常处理 用于指定发生错误时的回调函数。promise的出现是为了解决地狱回调问题。使用场景：结合 await async 将异步代码同化 接口封装
*/

const STATUS_PENDING = 'pending';
const STATUS_FULFILLED = 'fulfilled';
const STATUS_REJECTED = 'rejected';


class myPromise {
  constructor(executor) {
    // 初始化该class中的初始状态
    this.status = STATUS_PENDING;

    // 定义class中成功（res）和失败（err）时的变量值
    this.res = "";
    this.err = "";

    // promise异步中最重要的异步，定义成功和错误函数存储的数组，存放异步时还没有执行的操作
    this.onResCallbacks = [];
    this.onErrCallbacks = [];

    // 定义该构造函数constructor定义域中的变量resolve
    let resolve = (res) => {
      // 首先判断该 class 中的状态，只有状态为pending时才能转化fulfilled或者reject
      if (this.status == STATUS_PENDING) {
        // 修改 class 的状态为fulfilled，也就表示不会转进行其他状态的转化了
        this.status = STATUS_FULFILLED;
        // 将成功（resolve）状态下的值赋给class的成功返回res
        this.res = res;
        // 此时状态由pending转为fulfilled，执行之前在then中存放的需要执行的异步操作，promise的then中参数res接受结果
        this.onResCallbacks.forEach((fn) => {
          fn();
        })

      }
    }

    let reject = (err) => {
      if (this.status = STATUS_PENDING) {
        this.status = STATUS_REJECTED;

        this.err = err;

        this.onErrCallbacks.forEach((fn) => {
          fn();
        })
      }
    }


    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err)
    }
  }

  // 在 class 中定义promise的成功状态接受函数then, 按照promise逻辑，then中传入的一般都是一个函数
  then(onRes = () => {}) {
    //如果是异步的，此时在constructor中status的状态还没变成fulfilled，所以会跳过onRes调用，没有返回
    if (this.status === STATUS_FULFILLED) {
      onRes(this.res);
    }

    if (this.status === STATUS_PENDING) {
      this.onResCallbacks.push(() => onRes(this.res));
    }

    return this;
  }

}


function PromiseFn(callBack) {
  // 这里要注意，try catch 若是写 let self = this 会报错，let存在暂时死区，没有常规的变量提升
  console.log('callBack :>> ', callBack);
  try {
    callBack(resolve, reject)
  } catch (e) {
    reject() // 若是有报错，则直接变成reject的状态
  }


  let self = this
  self.resolveVal = undefined
  self.rejectVal = undefined
  self.status = 'pending'  // 默认是等待状态

  self.keepResolveFn = []
  self.keepRejectFn = []

  // promise形成函数的参数resolve
  function resolve(val) {
    if (self.status === 'pending') {
      self.resolveVal = val
      self.status = 'resolve'
      self.keepResolveFn.forEach(fn => fn())
    }
  }

  // promise 形参函数的参数reject
  function reject(val) {
    if (self.status === 'pending') {
      self.rejectVal = val
      self.status = 'reject'
      self.keepRejectFn.forEach(fn => fn())
    }
  }
  //执行先记录resolve和reject函数事件

}

PromiseFn.prototype.then = function (resolveFunction, rejectFunction) {
  let self = this;
  if (self.status == 'resolve') {
    resolveFunction(self.resolveVal)
  }
  if (self.status === 'reject') {
    rejectFunction(self.rejectVal)
  }
  if (self.status == 'pending') {
    self.keepResolveFn.push(() => {
      resolveFunction(self.resolveVal)
    })
    self.keepRejectFn.push(() => {
      rejectFunction(self.rejectVal)
    })
  }
}

let a = new PromiseFn((resolve, reject) => {
  setTimeout(() => {
    resolve('成功啦')
  }, 2000);
})
a.then((value) => {
  console.log('resolve' + value);
}, (error) => {
  console.log('reject' + error);
})