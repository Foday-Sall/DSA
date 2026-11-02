class Stack {
  constructor(maxSize = 5) {
    this.maxSize = maxSize;
    this.stackArray = new Array(maxSize).fill(null);
    this.top = -1;
  }

  push(value) {
    if (this.isFull()) {
      return { ok: false, reason: 'overflow' };
    }
    const oldTop = this.top;
    this.top++;
    this.stackArray[this.top] = value;
    console.log(`push(${value}): ++top FIRST (${oldTop}→${this.top}), THEN store stackArray[${this.top}]=${value}`);
    return { ok: true, index: this.top, oldTop };
  }

  // ===== EXPLANATION =====
  // Line 1: if (this.isFull()) return ...;
  //   WHY: A full stack cannot safely write beyond its maximum capacity.
  //   IF WRONG: push would write outside the taught stack boundary.
  // Line 2: this.top++;
  //   WHY: The lecture algorithm advances top before selecting the cell.
  //   IF WRONG: the first push would try to store at index -1.
  // Line 3: this.stackArray[this.top] = value;
  //   WHY: The new value belongs in the cell identified by the new top.
  //   IF WRONG: the trace and visual plate would disagree about the value's slot.
  // =========================

  pop() {
    if (this.isEmpty()) {
      return { ok: false, reason: 'underflow' };
    }
    const index = this.top;
    const value = this.stackArray[index];
    this.top--;
    console.log(`pop(): read stackArray[${index}]=${value} FIRST, THEN --top (${index}→${this.top})`);
    return { ok: true, value, index };
  }

  // ===== EXPLANATION =====
  // Line 1: if (this.isEmpty()) return ...;
  //   WHY: There is no valid top cell when top is -1.
  //   IF WRONG: pop would return undefined and hide the underflow rule.
  // Line 2: const value = this.stackArray[index];
  //   WHY: Pop reads the value before moving top below that cell.
  //   IF WRONG: decrementing first would lose the item being removed.
  // Line 3: this.top--;
  //   WHY: Moving top down makes the next lower plate the active top.
  //   IF WRONG: the removed item would still appear logically present.
  // =========================

  peek() {
    return this.isEmpty() ? null : this.stackArray[this.top];
  }

  // ===== EXPLANATION =====
  // Line 1: this.isEmpty() ? null : this.stackArray[this.top];
  //   WHY: Peek reads the active top without changing stack state.
  //   IF WRONG: a peek could accidentally remove a plate.
  // =========================

  isEmpty() {
    return this.top === -1;
  }

  // ===== EXPLANATION =====
  // Line 1: return this.top === -1;
  //   WHY: -1 means no valid array index is occupied.
  //   IF WRONG: an empty stack could be treated as if it had one item.
  // =========================

  isFull() {
    return this.top === this.maxSize - 1;
  }

  // ===== EXPLANATION =====
  // Line 1: return this.top === this.maxSize - 1;
  //   WHY: maxSize - 1 is the last valid zero-based index.
  //   IF WRONG: push could attempt an out-of-range write.
  // =========================

  reset() {
    this.stackArray.fill(null);
    this.top = -1;
  }

  // ===== EXPLANATION =====
  // Line 1: this.stackArray.fill(null);
  //   WHY: Reset clears every visible cell for a fresh lesson.
  //   IF WRONG: old values could look like active plates after reset.
  // Line 2: this.top = -1;
  //   WHY: The reset stack must return to the empty invariant.
  //   IF WRONG: the trace would claim an empty tower still has a top.
  // =========================
}
