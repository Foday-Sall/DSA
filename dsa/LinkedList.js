class Link {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.first = null;
    this.current = null;
    this.previous = null;
  }

  insertFirst(value) {
    const newLink = new Link(value);
    newLink.next = this.first;
    this.first = newLink;
    console.log(`insertFirst(${value}): newLink.next = first; first = newLink`);
    return newLink;
  }

  // ===== EXPLANATION =====
  // Line 1: const newLink = new Link(value);
  //   WHY: Each insertion needs a new node to hold the value.
  //   IF WRONG: insertion would overwrite the existing head.
  // Line 2: newLink.next = this.first;
  //   WHY: The new node points to the old head before the head changes.
  //   IF WRONG: the rest of the chain would be disconnected.
  // Line 3: this.first = newLink;
  //   WHY: The new node becomes the first/head node.
  //   IF WRONG: traversal would still begin at the old head.
  // =========================

  deleteFirst() {
    if (!this.first) return null;
    const removed = this.first;
    this.first = this.first.next;
    removed.next = null;
    return removed.value;
  }

  // ===== EXPLANATION =====
  // Line 1: const removed = this.first;
  //   WHY: Keep the old head value before moving first.
  //   IF WRONG: the deleted value could not be reported.
  // Line 2: this.first = this.first.next;
  //   WHY: The second node becomes the new head.
  //   IF WRONG: deletion would not advance through the chain.
  // =========================

  find(value) {
    this.current = this.first;
    this.previous = null;
    while (this.current) {
      if (String(this.current.value) === String(value)) return true;
      this.previous = this.current;
      this.current = this.current.next;
    }
    return false;
  }

  // ===== EXPLANATION =====
  // Line 1: this.current = this.first;
  //   WHY: A search begins at the head of the list.
  //   IF WRONG: the first node would never be inspected.
  // Line 2: this.previous = this.current;
  //   WHY: Previous trails current so a keyed delete can reconnect links.
  //   IF WRONG: a middle node could not be removed safely.
  // Line 3: this.current = this.current.next;
  //   WHY: Traversal follows each node's next pointer.
  //   IF WRONG: search would get stuck on one node.
  // =========================

  display() {
    const values = [];
    let node = this.first;
    while (node) {
      values.push(node.value);
      node = node.next;
    }
    return values;
  }

  // ===== EXPLANATION =====
  // Line 1: let node = this.first;
  //   WHY: Display must traverse from the head.
  //   IF WRONG: the list would render no values.
  // Line 2: node = node.next;
  //   WHY: Each step follows the chain to the next node.
  //   IF WRONG: traversal would never reach later nodes.
  // =========================

  reset() {
    this.first = null;
    this.current = null;
    this.previous = null;
  }

  // ===== EXPLANATION =====
  // Line 1: this.first = null;
  //   WHY: Null head represents an empty linked list.
  //   IF WRONG: old nodes would remain reachable after reset.
  // =========================
}
