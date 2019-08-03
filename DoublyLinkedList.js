class Node {
  constructor(value, prev = null, next = null) {
    this.value = value
    this.prev = prev
    this.next = next
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }
  push(value) {
    const node = new Node(value)
    if (this.isEmpty()) {
      this.head = node
      this.tail = node
    } else {
      node.prev = this.tail
      this.tail.next = node
      this.tail = node
    }
    this.size++
  }

  isEmpty() {
    return this.size === 0
  }
}

const dl = new DoublyLinkedList()
dl.push('a')
dl.push('b')
console.log(dl)
