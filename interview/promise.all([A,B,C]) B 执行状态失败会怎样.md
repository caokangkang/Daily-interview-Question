###  promise.all([A,B,C]) B 执行状态失败会怎样

答：只要参数里有一个被rejected, promise.all的就变为rejected，此时第一个被reject的实例的返回值，会传递给promise.all的回调函数;