
/**
 *new 操作符的实现
  当执行 new Con(...)，下面的事情会发生：
  ①：创建一个对象o，该对象继承自Con.prototype
  ②：绑定构造函数Con的this为o
  ③：执行构造函数Con
  ④：构造函数Con返回的对象将作为整个new 表达式的返回值，如果构造函数Con无返回值或者返回一个原始数据类型，o就是整个new 表达式的返回值
 *
 * @param {*} Con
 * @param {*} args
 * @returns
 */
function createNew(Con, ...args) {
	const o = Object.create(Con.prototype)
	const result = Con.apply(o, args)
	return result instanceof Object ? result : o
}