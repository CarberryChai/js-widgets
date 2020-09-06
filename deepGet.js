import { isPlainObject } from './widget'
/**
 *获取data深层嵌套的属性值
 *
 * @export
 * @param {Object} data 数据源
 * @param {string} str 类似于'foo.bar.baz'字符串
 */
export default function deepGet(data, str) {
  const arr = str.split('.')
  if (arr.length === 0) return
  if (!isPlainObject(data)) return
  return arr.reduce((acc, curr) => (acc && acc[curr] ? acc[curr] : null), data)
}
