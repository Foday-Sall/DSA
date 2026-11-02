class SearchAlgorithms {
  linearSearch(values, key) {
    let inspections = 0;
    for (let index = 0; index < values.length; index += 1) {
      inspections += 1;
      if (values[index] === key) return { index, inspections };
    }
    return { index: -1, inspections };
  }

  // ===== EXPLANATION =====
  // Line 1: for (let index = 0; index < values.length; index += 1)
  //   WHY: Linear search checks each valid cell from left to right.
  //   IF WRONG: some values could be skipped or an invalid cell inspected.
  // Line 2: inspections += 1;
  //   WHY: The trace counts every record examined.
  //   IF WRONG: the learner could not compare search effort.
  // Line 3: if (values[index] === key) return ...;
  //   WHY: The first matching index is the linear-search answer.
  //   IF WRONG: the search would continue after finding its target.
  // =========================

  binarySearch(values, key) {
    let left = 0;
    let right = values.length - 1;
    let inspections = 0;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      inspections += 1;
      if (values[mid] === key) return { index: mid, inspections, left, right, mid };
      if (values[mid] < key) left = mid + 1;
      else right = mid - 1;
    }
    return { index: -1, inspections, left, right, mid: null };
  }

  // ===== EXPLANATION =====
  // Line 1: let left = 0; let right = values.length - 1;
  //   WHY: Binary search begins with the full sorted range.
  //   IF WRONG: the first midpoint would not cover the array.
  // Line 2: const mid = left + Math.floor((right-left)/2);
  //   WHY: This selects the middle without adding large indexes directly.
  //   IF WRONG: the wrong cell could be checked or the range could fail to shrink.
  // Line 3: if (values[mid] < key) left = mid + 1;
  //   WHY: A smaller midpoint proves the target is in the right half.
  //   IF WRONG: binary search could discard the half containing the key.
  // Line 4: else right = mid - 1;
  //   WHY: A larger midpoint proves the target is in the left half.
  //   IF WRONG: the search would move in the wrong direction.
  // =========================
}
