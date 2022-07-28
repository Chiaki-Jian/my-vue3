import { isObject } from "@vue/shared";

// 优化点1: 对相同数据进行响应式，使用weakMap做缓存优化
// tips: weakMap属于弱引用，不会被记入垃圾回收机制，不会内存溢出
const reactiveMap = new WeakMap()

// 优化点2: 当前传入target已经被代理过
// 定义枚举 ReactiveFlags
const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}

export function reactive(target) {
  // 1 将数据转换为响应式数据，只能对对象类型进行代理，入参必须是对象
  if (!isObject(target)) {
    return
  }
  // 实现同一个对象代理多次
  if (target[ReactiveFlags.IS_REACTIVE]) {
    return target
  }
  // 查看是否已有缓存
  const exisitingProxy = reactiveMap.get(target)
  // 若有，则返回
  if (exisitingProxy) {
    return exisitingProxy
  }
  // tips: vue3的响应式并不像vue2中，对数据进行属性修改（defineProperty）
  // proxy只是代理：取值时触发 get；赋值时触发 set
  // proxy中 get(target, propKey, receiver); set(target, propKey, value, receiver); receiver 即 proxy自身
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true
      }
      // tips: 此处使用Reflect的原因是使用Reflect.get中的receiver改变了取值时的this指向。
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver)
    }
  })
  // 放入缓存
  reactiveMap.set(target, proxy)
  return proxy
}
