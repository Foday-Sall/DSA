class Queue {
  constructor(maxSize = 5) {
    this.maxSize = maxSize;
    this.queueArray = new Array(maxSize).fill(null);
    this.front = 0;
    this.rear = -1;
    this.nItems = 0;
  }

  insert(value) {
    if (this.isFull()) return { ok: false, reason: 'overflow' };
    const oldRear = this.rear;
    this.rear += 1;
    if (this.rear === this.maxSize) this.rear = 0;
    this.queueArray[this.rear] = value;
    this.nItems += 1;
    console.log(`insert(${value}): rear moves ${oldRear}→${this.rear}, then queueArray[${this.rear}]=${value}, nItems++`);
    return { ok: true, index: this.rear, oldRear };
  }

  // ===== EXPLANATION =====
  // Line 1: if (this.isFull()) return ...;
  //   WHY: nItems == maxSize means every queue slot is occupied.
  //   IF WRONG: insert could overwrite an item that has not been attacked.
  // Line 2: this.rear += 1;
  //   WHY: The rear advances before the new value is stored.
  //   IF WRONG: the new monster would be placed behind the taught rear pointer.
  // Line 3: if (this.rear === this.maxSize) this.rear = 0;
  //   WHY: Circular queues wrap the rear to the first array index.
  //   IF WRONG: the queue would fail after reaching the last slot.
  // Line 4: this.queueArray[this.rear] = value;
  //   WHY: The value belongs in the newly selected rear cell.
  //   IF WRONG: the flat array and monster line would disagree.
  // =========================

  remove() {
    if (this.isEmpty()) return { ok: false, reason: 'underflow' };
    const index = this.front;
    const value = this.queueArray[index];
    this.front += 1;
    if (this.front === this.maxSize) this.front = 0;
    this.nItems -= 1;
    console.log(`remove(): read queueArray[${index}]=${value} FIRST, then front moves to ${this.front}, nItems--`);
    return { ok: true, index, value };
  }

  // ===== EXPLANATION =====
  // Line 1: const value = this.queueArray[index];
  //   WHY: Queue removal reads the oldest item before moving front.
  //   IF WRONG: the attack could skip the monster being removed.
  // Line 2: this.front += 1;
  //   WHY: FIFO order advances front to the next waiting item.
  //   IF WRONG: the same monster could be attacked repeatedly.
  // Line 3: if (this.front === this.maxSize) this.front = 0;
  //   WHY: Front also wraps around the circular array.
  //   IF WRONG: a wrapped queue would stop removing after index 4.
  // =========================

  peek() {
    return this.isEmpty() ? null : this.queueArray[this.front];
  }

  // ===== EXPLANATION =====
  // Line 1: this.isEmpty() ? null : this.queueArray[this.front];
  //   WHY: Peek observes the oldest item without changing FIFO state.
  //   IF WRONG: a peek would accidentally remove a monster.
  // =========================

  isEmpty() {
    return this.nItems === 0;
  }

  // ===== EXPLANATION =====
  // Line 1: return this.nItems === 0;
  //   WHY: Zero items means the queue contains no valid element.
  //   IF WRONG: underflow would be hidden.
  // =========================

  isFull() {
    return this.nItems === this.maxSize;
  }

  // ===== EXPLANATION =====
  // Line 1: return this.nItems === this.maxSize;
  //   WHY: nItems counts occupancy independently of wrapped indexes.
  //   IF WRONG: a wrapped queue could be mistaken for empty space.
  // =========================

  reset() {
    this.queueArray.fill(null);
    this.front = 0;
    this.rear = -1;
    this.nItems = 0;
  }

  // ===== EXPLANATION =====
  // Line 1: this.queueArray.fill(null);
  //   WHY: Reset clears every visible queue slot.
  //   IF WRONG: old monsters could appear after reset.
  // Line 2: this.front = 0; this.rear = -1; this.nItems = 0;
  //   WHY: These are the lecture's empty-queue invariants.
  //   IF WRONG: the next insert/remove would start from an invalid state.
  // =========================
}
