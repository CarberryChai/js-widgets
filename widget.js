// 相加函数，可接受任意数量的参数
export function add(...args) {
  return args.reduce((total, item) => total + item, 0);
}
//判断两个浮点数是否相等, range 为可接受的误差范围[-52，0],js能够表示的
//最小精度就是 Number.EPSILON == 2 ** (-52);
export function isFloatEqual(val1, val2, range = -52) {
  return Math.abs(val1 - val2) < Number.EPSILON * Math.pow(2, 52 + range);
}

// 嵌套数组展开为一维数组，用法:[...flatArr(arr)]
export function* flatArr(arr) {
  if (Array.isArray(arr)) {
    for (let i = 0, j = arr.length; i < j; i++) {
      yield* flatArr(arr[i]);
    }
  } else {
    yield arr;
  }
}
// 获取url的查询参数,就是?后面的一坨😜
export const qs = name => {
  let queryObj = {};
  if (name && typeof name !== 'string')
    throw new Error('the argument must be string');
  // 原生构造函数URLSearchParams，有兼容性
  if (URLSearchParams) {
    const urlObj = new URLSearchParams(location.search);
    if (name) {
      return urlObj.get(name);
    }
    for (const item of urlObj.entries()) {
      queryObj[item[0]] = item[1];
    }
    return queryObj;
  } else {
    queryObj =
      window.location.search.length > 0
        ? window.location.search
            .substring(1)
            .split('&')
            .reduce((total, cur) => {
              const temp = cur.split('=');
              total[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
              return total;
            }, {})
        : {};
    if (name) {
      return queryObj[name];
    }
    return queryObj;
  }
};

// 验证
export function validate(value, type = 'require') {
  if (type === 'require') {
    return !!value;
  }
  if (type === 'mobile') {
    return /^1[34578]\d{9}$/.test(value);
  }
  if (type === 'email') {
    return /^[a-zA-Z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(
      value
    );
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
  const baseCount = around * 2 + 1 + 2 + 2 + 2; // 元素总个数
  const surplus = baseCount - 4; // 当省略号只有一个时。剩余元素的个数
  const startPosition = 1 + 2 + around + 1; // 前面出现省略号的临界点
  const endPosition = total - 2 - around - 1;
  let result;
  if (cur <= baseCount - 2) {
    result = Array.from({ length: baseCount - 2 }, (item, i) => i + 1);
  } else {
    if (cur < startPosition) {
      result = [
        ...Array.from({ length: surplus }, (item, i) => i + 1),
        '...',
        total,
      ];
    } else if (cur > endPosition) {
      result = [
        1,
        '...',
        ...Array.from(
          { length: surplus },
          (item, i) => total - surplus + i + 1
        ),
      ];
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
      ];
    }
  }
  return result;
}

// 判断是否为普通对象
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}