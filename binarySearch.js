const arr = Array.from({ length: 100 }, (_, index) => index + 1)
/**
 * 二分查找，对给定排序后的数组查找某一项的索引
 * @param {any} key 数组中的某一项
 * @param {Array} array 一个排序后的数组
 */
export default function binarySearch(key, array) {
  let low = 0
  let high = array.length - 1
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2)
    if (key < array[mid]) high = mid - 1
    // 核心就是尽可能的缩小查找的范围
    else if (key > array[mid]) low = mid + 1
    else return mid
  }
  return -1
}
console.log(binarySearch(10, arr))
console.log(arr.indexOf(10))
