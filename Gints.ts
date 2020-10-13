/**
 * a integer generate function
 *
 * @param {number} n
 */
function* Gints(n: number) {
  // make sure n is a integer
  n = Math.floor(n)
  let idx = 0
  while (idx < n) {
    yield idx++
  }
}
// console.log([...Gints(10.1)])
export default Gints
