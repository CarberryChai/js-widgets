class Stack<T> {
  private stack_container: T[] = []
  constructor() {}
  isEmpty(): boolean {
    return this.size() === 0
  }
  push(item: T): void {
    this.stack_container.push(item)
  }
  pop(): T {
    return this.stack_container.pop()
  }
  size(): number {
    return this.stack_container.length
  }
}
