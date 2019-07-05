class Node {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  // insert node at first
  unshift(value) {
    this.head = new Node(value, this.head)
    this.size++
  }
  // insert node at index
  insert(value, index) {
    if (index > 0 && index > this.size) {
      return
    }
    if (index === 0) {
      this.unshift(value)
      this.size++
      return
    }
    const node = new Node(value)
    let count = 0,
      cur = this.head
    let prev
    while (count < index) {
      prev = cur
      count++
      cur = cur.next
    }
    prev.next = node
    node.next = cur
    this.size++
  }
  // insert node at last
  push(value) {
    const node = new Node(value)
    if (this.isEmpty()) {
      this.head = node
    } else {
      let cur = this.head
      while (cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.size++
  }
  // get the index node
  get(index) {
    if (this.isEmpty() || index < 0 || index > this.size) {
      return null
    }
    let cur = this.head,
      count = 0
    while (count < index) {
      cur = cur.next
      count++
    }
    return cur
  }
  // delete the last node
  pop() {
    if (this.isEmpty()) {
      return null
    }
    let cur = this.head,
      prev
    while (cur.next) {
      prev = cur
      cur = cur.next
    }
    prev.next = null
    this.size--
    return cur
  }
  // delete the index node
  delete(index) {
    if (this.isEmpty() || index < 0 || index > this.size) {
      return null
    }
    if (index === 0) {
      let cur = this.head
      this.head = this.head.next
      this.size--
      return cur
    }
    if (index === this.size - 1) {
      return this.pop()
    }
    let cur = this.head,
      count = 0
    let prev, next
    while (count < index) {
      prev = cur
      cur = prev.next
      next = cur.next
      count++
    }
    prev.next = next
    return cur
  }
  // print all nodes value
  print() {
    let cur = this.head
    while (cur) {
      console.log(cur.value)
      cur = cur.next
    }
  }
  isEmpty() {
    return this.size === 0
  }
}

const ll = new LinkedList()
ll.push(3)
ll.unshift(2)
ll.unshift(1)
ll.insert(5, 1)
console.log(ll.print())
console.log('***********')
console.log(ll.delete(2))
console.log('*********')
console.log(ll.print())
