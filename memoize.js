/**
 * 缓存函数结果的缓存函数
 * @param {Function} func 要缓存的函数
 * @param {[Function]} resolver 可选的函数，调用resolver返回一个存储的key
 */
export default function memoize(func, resolver) {
  const cache = new Map()
  function f(...args) {
    const key =
      typeof resolver === 'function' ? resolver.apply(null, args) : args[0]
    if (!cache.get(key)) {
      const result = func.apply(null, args)
      cache.set(key, result)
      return result
    } else {
      console.log('get from cache ...')
      return cache.get(key)
    }
  }
  f.cache = cache
  return f
}

const double = x => x * 2
const cachedDouble = memoize(double)
console.log(cachedDouble(5))
console.log(cachedDouble(5))
console.log(cachedDouble(5))
