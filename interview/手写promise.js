/* 
    一、概念
    二、如果我们想要封装promise就需要考虑一下几个问题
        如何让Promise变成一个微任务
        如何管理Promise的状态
        then方法的返回值的问题
        静态方法：resolve、reject、all、race
*/
function PromiseFn(callBack) {
    // 这里要注意，try catch 若是写 let self = this 会报错，let存在暂时死区，没有常规的变量提升
    try{
        callBack(resolve, reject)
    }catch(e){
        reject() // 若是有报错，则直接变成reject的状态
    }


    let self = this
    self.resolveVal = undefined
    self.rejectVal = undefined
    self.status = 'pending'  // 默认是等待状态

    self.keepResolveFn = []
    self.keepRejectFn = []
    
    // promise形成函数的参数resolve
    function resolve(val){
        if(self.status === 'pending'){
            self.resolveVal = val
            self.status = 'resolve'
            self.keepResolveFn.forEach(fn=>fn())
        }
    }

    // promise 形参函数的参数reject
    function reject(val){
        if(self.status === 'pending'){
            self.rejectVal = val
            self.status = 'reject'
            self.keepRejectFn.forEach(fn=>fn())
        }
    }
    //执行先记录resolve和reject函数事件

}

PromiseFn.prototype.then = function (resolveFunction, rejectFunction) {
    let self = this;
    if(self.status == 'resolve'){
        resolveFunction(self.resolveVal)
    }
    if(self.status === 'reject'){
        rejectFunction(self.rejectVal)
    }
    if(self.status == 'pending'){
        self.keepResolveFn.push(()=>{
            resolveFunction(self.resolveVal)
        })
        self.keepRejectFn.push(()=>{
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
console.log('456');