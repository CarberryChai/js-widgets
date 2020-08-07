// 相加函数，可接受任意数量的参数
export function add(...args) {
  return args.reduce((total, item) => total + item, 0)
}
//判断两个浮点数是否相等, range 为可接受的误差范围[-52，0],js能够表示的
//最小精度就是 Number.EPSILON == 2 ** (-52);
export function isFloatEqual(val1, val2, range = -52) {
  return Math.abs(val1 - val2) < Number.EPSILON * Math.pow(2, 52 + range)
}

/**
 *展平多维数组
 *
 * @export
 * @param {Array} arr
 * @param {Array} result
 * @returns
 */
export function flatten(arr, result) {
  !result && (result = [])
  for (let i = 0, j = arr.length; i < j; i++) {
    if (Array.isArray(arr[i])) {
      flatten(arr[i], result)
    } else {
      result.push(arr[i])
    }
  }
  return result
}

// 获取url的查询参数,就是?后面的一坨😜
export const qs = name => {
  let queryObj = {}
  if (name && typeof name !== 'string')
    throw new Error('the argument must be string')
  // 原生构造函数URLSearchParams，有兼容性
  if (URLSearchParams) {
    const urlObj = new URLSearchParams(location.search)
    if (name) {
      return urlObj.get(name)
    }
    for (const item of urlObj.entries()) {
      queryObj[item[0]] = item[1]
    }
    return queryObj
  } else {
    queryObj =
      window.location.search.length > 0
        ? window.location.search
            .substring(1)
            .split('&')
            .reduce((total, cur) => {
              const temp = cur.split('=')
              total[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1])
              return total
            }, {})
        : {}
    if (name) {
      return queryObj[name]
    }
    return queryObj
  }
}

// 验证
export function validate(value, type = 'require') {
  if (type === 'require') {
    return !!value
  }
  if (type === 'mobile') {
    return /^1[34578]\d{9}$/.test(value)
  }
  if (type === 'email') {
    return /^[a-zA-Z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
      value
    )
  }
}

/**
 * 分页函数
 *
 * @export
 * @param {*} total 总页数
 * @param {*} cur  当前页
 * @param {*} around 当前页前后出现的元素个数，默认两个
 */
export function makePage(total, cur, around = 2) {
  const baseCount = around * 2 + 1 + 2 + 2 + 2 // 元素总个数
  const surplus = baseCount - 4 // 当省略号只有一个时。剩余元素的个数
  const startPosition = 1 + 2 + around + 1 // 前面出现省略号的临界点
  const endPosition = total - 2 - around - 1
  let result
  if (cur <= baseCount - 2) {
    result = Array.from({ length: baseCount - 2 }, (item, i) => i + 1)
  } else {
    if (cur < startPosition) {
      result = [
        ...Array.from({ length: surplus }, (item, i) => i + 1),
        '...',
        total,
      ]
    } else if (cur > endPosition) {
      result = [
        1,
        '...',
        ...Array.from(
          { length: surplus },
          (item, i) => total - surplus + i + 1
        ),
      ]
    } else {
      result = [
        1,
        '...',
        ...Array.from(
          { length: around * 2 + 1 },
          (item, i) => cur - around + i
        ),
        '...',
        total,
      ]
    }
  }
  return result
}

// 判断是否为普通对象
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
/**
 *滚动进度条实现函数
 *
 * @export
 * @param {String} selector css选择器
 * usage:
 *  <div class='progress'></div>
 *  .progress {
        position: fixed;
        left: 0;
        top: 0;
        height: 4px;
        background-color: lightseagreen;
      }
     setProgress('.progress)
 */
export function setProgress(selector) {
  const wh = window.innerHeight
  const h = document.documentElement.scrollHeight
  const dh = h - wh
  window.addEventListener('scroll', function () {
    requestAnimationFrame(() => {
      const petcent = Math.max(0, Math.min(1, window.scrollY / dh))
      document.querySelector(selector).style.width = petcent * 100 + '%'
    })
  })
}
// 数组去重
export const deduplicate = arr =>
  arr.reduce(
    (total, cur) => (total.includes(cur) ? total : [...total, cur]),
    []
  )

/**
 *判断是否为基数
 *
 * @param {Number} i
 * @returns {Booblen}
 */
export const isOdd = i => {
  if (!Number.isInteger(i)) throw new TypeError(`${i} is not a integer`)
  return (i & 1) === 1
}
// 数字的千位分隔符表示法
export function formatMoney(money) {
  money = String(money)
  const reg = /(?!^)(?=(\d{3})+$)/g
  const result = money.replace(reg, ',')
  return result
}

// 快速生成英文26个字母，可以用在通讯录导航条
// (26) ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
export const upperLetter = Array.from({ length: 26 }, (_, index) =>
  String.fromCodePoint(65 + index)
)
export const lowerLetter = Array.from({ length: 26 }, (_, index) =>
  String.fromCodePoint(97 + index)
)

/**
 *查找集合中某个元素出现的次数
 *
 * @export
 * @param {*} collections 具有迭代器接口的集合，eg:数组，字符串
 * @param {*} item 给定元素
 * @returns
 */
export function countItem(collections, item) {
  const map = new Map()
  for (const i of collections) {
    if (map.has(i)) {
      map.set(i, map.get(i) + 1)
    } else {
      map.set(i, 1)
    }
  }
  return map.get(item)
}

// 简单的去抖函数
export function debounce(fn, wait = 200) {
  let timer = null
  return function () {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...arguments), wait)
  }
}
// 斐波那契数列
export function fibonacci(n) {
  if (!Number.isInteger(n) || n <= 0) {
    throw new TypeError(`The ${n} should be postive integer`)
  }
  let [x, y] = [1, 1]
  while (--n) {
    ;[x, y] = [y, x + y]
  }
  return y
}
// Number数组的最大值
/* function getMAx(arr) {
  return Math.max(...arr)
} */
export function getMAx(arr) {
  return arr.reduce((t, c) => (t > c ? t : c))
}

// 判断一个数是不是正整数
export function isPositiveNum(num) {
  if (typeof num != 'number')
    throw new TypeError(`The ${num} should be integer`)
  return Number.isInteger(num) && num > 0
}
// 判断一个数是不是负整数
export function isPositiveNum(num) {
  if (typeof num != 'number')
    throw new TypeError(`The ${num} should be integer`)
  return Number.isInteger(num) && num < 0
}

//sleep函数, 默认睡😪一秒
/* 用法 sleep().then(() => {
  // your code
}) */
export function sleep(time = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
