// 相加函数，可接受任意数量的参数
export function add(...args) {
    return args.reduce((total, item) => total + item, 0)
}
//判断两个浮点数是否相等, range 为可接受的误差范围[-52，0],js能够表示的
//最小精度就是 Number.EPSILON == 2 ** (-52);
export function isFloatEqual(val1, val2, range = -52) {
    return Math.abs(val1 - val2) < Number.EPSILON * Math.pow(2, 52 + range)
}