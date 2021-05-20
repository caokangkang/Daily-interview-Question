/* 
    promise.all()的用法?
        该方法会将多个Promise实例，包装成一个新的Promise实例
*/

let p1 = new Promise((resolve, reject) => {
    resolve('成功了')
})

let p2 = new Promise((resolve, reject) => {
    resolve('success')
})

let p3 = new Promise((resolve, reject) => {
    reject(new Error('失败了'))
})

Promise.all([p1, p2]).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})


Promise.all([p1,p2,p3]).then((resulte) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
})

// let p = new Promise.all([p1, p2, p3])
