export default function quickSort(arr) {
  if (arr.length <= 1) return arr
  const mid = arr[0]
  let lower = arr.filter(item => item < mid)
  lower = quickSort(lower)
  let higher = arr.filter(item => item > mid)
  higher = quickSort(higher)
  return lower.concat(mid, higher)
}
const arr = [10, 9, 7, 24, 5, 89, 13, 40, 55, 4, 8]
console.log(quickSort(arr))
