class Vue {
  constructor(obj_instance) {
    console.log('this', this);
    console.log('obj_instance', obj_instance)
    this.$data = obj_instance.data;
    // console.log('this.$data', this.$data)
    // 数据监听函数 Observer
    Observer(this.$data);
    Compile(obj_instance.el, this);

  }
}

// 数据劫持 -- 监听实例里的数据
function Observer(data_instance) {
  //   *** Object.keys  已数组的方式返回对象里的属性
  // console.log(Object.keys(data_instance))


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

  // 递归出口
  if (!data_instance || typeof data_instance !== 'object') return;

  Object.keys(data_instance).forEach(key => {
    let value = data_instance[key]
    Observer(value) // 递归 - 子属性数据劫持;
    Object.defineProperty(data_instance, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log(`访问了属性：${key} -> 值: ${value}`);
        return value
      },
      set(newVal) {
        // 赋值
        console.log(`属性${key}的值${value}修改未 -> ${newValue}`);
        value = newVal;
        Observer(value)
      },
    })
  })
}


// HTML模板解析 - 替换DOM内
// 在渲染DOM之前，创建一个内存空间，防止频繁操作dom优化；‘’
function Compile(element, vm) {
  vm.$el = document.querySelector(element);
  // 创建一个虚拟的节点对象或创建文档碎片;
  const fragment = document.createDocumentFragment();
  // childNodes 用来获取任意一个元素额所有子元素
  // console.log('vm.$el.childNodes', vm.$el.childNodes);


  let child;
  while (child = vm.$el.firstChild) {
    fragment.append(child);
  }
  /* console.log(fragment);
  console.log(fragment.childNodes); */

  fragment_compile(fragment);

  function fragment_compile(node) {
    const pattern = /\{\{\s*(\S+)\s*\}\}/;
    if (node.nodeType === 3) {
      /* console.log('node', node)
      console.log('nodeValue', node.nodeValue); */
      const result_regex = pattern.exec(node.nodeValue);
      if (result_regex) {
        /* console.log(node.nodeValue);
        console.log(result_regex); */
        /* console.log(result_regex)
        console.log(vm.$data[result_regex[1]]); */
        const arr = result_regex[1].split('.');
        const value = arr.reduce((total, current) => total[current], vm.$data);
        node.nodeValue = node.nodeValue.replace(pattern, value);
        console.log(node.nodeValue);
      }
      return;
    };
    node.childNodes.forEach(child => fragment_compile(child));
  }
  vm.$el.appendChild(fragment);
}


// 收集 - 收集和通知订阅者
class Dependency {
  constructor() {
    this.subscribers = [];
  }

  addSub(sub) {
    this.subscribers.push(sub);
  }

  notify(){
    this.subscribers.forEach(sub => sub.update());
  }
}


// 订阅者
class Watcher {
  constructor(vm, key, callBack){
    this.vm = vm;
    this.key = key;
    this.callBack = callBack;
  }
}