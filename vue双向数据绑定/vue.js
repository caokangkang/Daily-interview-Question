class Vue {
  constructor(obj_instance) {
    this.$data = obj_instance.data;

    // 数据监听函数 Observer
    Observer(this.$data);

  }
}

// 数据劫持 -- 监听实例里的数据
function Observer(data_instance) {
  console.log('data_instance', data_instance);
  //   *** Object.keys  已数组的方式返回对象里的属性
  console.log(Object.keys(data_instance))


  /**
   * 第三个参数实现监听
   * enumerable 属性可以枚举
   * configurable 属性是否可以被改变
   * get() 访问的时候被触犯
   * set() 属性值被修改的时候触发
   * Object.defineProperty(操作对象, 操作属性, {
   *    enumerable: true,
   *    configurable: true,
   *    get(){
   *     
   *    },
   *    set(){
   *    
   *    }
   * })
   * 
   * 
   */

  Object.keys(data_instance).forEach(key => {
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get(){

      },
      set(){
        
      },
    })
  })

}
