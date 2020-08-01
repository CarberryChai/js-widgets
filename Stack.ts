class Stack<T> {
  private stack_container: T[] = []
  private n: number = 0
  constructor(elements?: Iterable<T>) {
    if (elements) {
      for (const e of elements) {
        this.push(e)
      }
    }
  }
  public isEmpty(): boolean {
    return this.n === 0
  }
  push(item: T): void {
    this.stack_container.push(item)
    this.n++
  }
  pop(): T | null | undefined {
    if (this.isEmpty()) {
      return null
    }
    this.n--
    return this.stack_container.pop()
  }
  size(): number {
    return this.n
  }

  *[Symbol.iterator]() {
    let i = this.n
    while (i > 0) {
      yield this.stack_container[--i]
    }
  }
}

export default Stack
