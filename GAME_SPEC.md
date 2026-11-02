# ═══════════════════════════════════════════════════════════
# BUILD ORDER — READ BEFORE WRITING A SINGLE LINE OF CODE
# ═══════════════════════════════════════════════════════════

You are building "DSA DUNGEON" — a Phaser 3 game where every Data Structure
and Algorithm from the student's course is a PLAYABLE MECHANIC. You must
follow the rules below EXACTLY. No shortcuts. No skipped steps.

# ═══════════════════════════════════════════════════════════
# NON-NEGOTIABLE RULES
# ═══════════════════════════════════════════════════════════

1. **THE GAME MUST RUN.** After every step, the student must be able to
   open index.html in a browser and play. If it doesn't run, you failed.

2. **LINE-BY-LINE EXPLANATION.** For every method you write, add a comment
   block immediately after it, formatted EXACTLY like this:

   // ===== EXPLANATION =====
   // Line 3: this.top = -1;
   //   WHY: -1 means "empty" because valid array indices start at 0.
   //   IF WRONG: leaving top=0 would make an empty stack look like it
   //             has one item, causing pop() to return garbage.
   // =========================

   Every line of algorithm logic must have a WHY and an IF-WRONG.

3. **TRACE PANEL MANDATORY.** Every scene must show live variables:
   - Stack scene: top, stackArray, size
   - Queue scene: front, rear, nItems, queueArray
   - LinkedList scene: first, current, previous
   - Sort scene: i, j, pass, swaps, comparisons
   - Search scene: left, right, mid, inspections
   If the trace panel is missing, the game is WRONG.

4. **PREDICTION BEFORE ACTION.** Before every push/pop/insert/swap,
   the game must ask a multiple-choice question. Example:
   "You're about to push(40). What will top become?"
   [ ] 1   [ ] 2   [ ] 3   [ ] Overflow
   Correct → +10 points, green flash. Wrong → show answer, orange flash.
   This is the #1 learning feature. Do not skip it.

5. **NO BUILT-IN DSA.** Write Stack, Queue, LinkedList, Sorts, Search,
   Recursion from SCRATCH. No java.util.Stack, no Array.sort, no
   Collections. (JS has no Stack class anyway — but the rule stands for
   any helper. Write every algorithm yourself.)

6. **MATCH THE LECTURE EXACTLY.**
   - Stack: top = -1, push = ++top THEN store, pop = read THEN --top
   - Queue: front=0, rear=-1, nItems=0, wrap BEFORE store on insert,
            read FIRST then move+wrap on remove
   - LinkedList: first = head, newLink.next = first; first = newLink;
   - Sorts: bubble adjacent-swap, selection min-scan, insertion shift,
            merge i/j/k, quick Lomuto pivot=last
   Every variable name must match the student's lecture notes.

7. **VISUAL STYLE.**
   - Use Phaser Graphics only (rectangles, circles, text). No images.
   - Colour key: GREEN = add/push/insert, ORANGE = remove/pop/delete,
     BLUE = pointer variable (top, front, rear, i, j, mid), RED = error.
   - Minimum text size 16px. High contrast (dark background #0b1020).

8. **BUILD IN MILESTONES.** After each milestone, STOP and wait for
   the student to say "next" before continuing. Each milestone must be
   playable on its own. Milestones in order:

   M1: index.html + main.js + BootScene + MenuScene (empty menu, runs)
   M2: dsa/Stack.js + StackScene.js (plate tower game, PLAYABLE)
   M3: dsa/Queue.js + QueueScene.js (monster line, PLAYABLE)
   M4: dsa/LinkedList.js + LinkedListScene.js (chain game, PLAYABLE)
   M5: dsa/Search.js + SearchScene.js (linear + binary, PLAYABLE)
   M6: dsa/Sorts.js + SortScene.js (bubble/selection/insertion, PLAYABLE)
   M7: MergeScene.js (merge sort tree, PLAYABLE)
   M8: QuickScene.js (Lomuto partition, PLAYABLE)
   M9: dsa/Recursion.js + RecursionScene.js (factorial/fibonacci/hanoi)
   M10: BossScene.js (mixed quiz, 20 questions, timer, final score)
   M11: WorldScene.js (hub connecting all rooms with arrow-key walking)

   Do NOT skip ahead. Do NOT dump the whole project at once.

9. **EVERY MILESTONE ENDS WITH:**
   - ✅ "What you just learned" (3 bullets)
   - 🎯 "Test it yourself" (exact input to type, exact expected output)
   - 📝 "Assignment link" (which of the student's assignments this solves)
   - ❓ "Check your understanding" (2 Q&A)

10. **DEPENDENCIES.**
    Phaser 3 via CDN only:
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script>
    No npm, no webpack, no build step. Student opens index.html and plays.

# ═══════════════════════════════════════════════════════════
# SCENE SPECIFICATIONS (detailed)
# ═══════════════════════════════════════════════════════════

## StackScene — "The Plate Tower"
- Vertical container, max size 5, plates are coloured rectangles.
- Character (circle with eyes) stands at the base.
- Buttons: PUSH (opens input), POP, PEEK, RESET.
- Top arrow (blue) floats beside the top plate.
- Prediction prompt before each PUSH and POP.
- Overflow (push on full): plate shatters (flash red), message
  "OVERFLOW: top == maxSize-1, cannot push."
- Underflow (pop on empty): character shrugs, message
  "UNDERFLOW: top == -1, nothing to pop."
- After pop: the value's cell greys out but stays visible with a
  strikethrough, proving "value is still in the array, top moved below."
- Trace panel: top=X, array=[...], size=X.
- Console log every action:
  "push(30): ++top FIRST (1→2), THEN store stackArray[2]=30"

## QueueScene — "The Monster Line"
- Horizontal line of 5 monsters (circles with eyes), front on LEFT,
  rear on RIGHT.
- Buttons: SPAWN (adds monster at rear), ATTACK (removes from front),
  PEEK, RESET.
- Below the line: a "flat array view" showing the same slots with
  numeric indices.
- Wraparound: when rear reaches index 4 and you spawn again, animate
  rear JUMPING to index 0 with a curved arrow.
- Prediction prompt before each spawn/attack.
- Overflow: "nItems == maxSize, queue full."
- Underflow: "nItems == 0, queue empty."
- Trace panel: front=X, rear=X, nItems=X, array=[...].
- Console log:
  "insert(60): rear moves 4→5→wrap to 0, then queueArray[0]=60, nItems++"

## LinkedListScene — "The Chain"
- Horizontal chain of nodes (rounded rectangles), each with value and
  an arrow to the next node. Last node's arrow points to "null".
- first arrow (blue) points at the head.
- Buttons: INSERT_FIRST(input), DELETE_FIRST, FIND(input), DISPLAY.
- During DELETE(key): show TWO arrows (previous and current) walking
  the chain.
- Prediction: "after insertFirst(40), what does first point to?"
- Trace panel: first=value, current=value, previous=value.
- Console log:
  "insertFirst(40): newLink.next = first (old head); first = newLink"

## SearchScene — "The Detective"
- Array of 10 number boxes. A magnifier icon.
- Toggle: LINEAR or BINARY.
- LINEAR: magnifier moves left→right, highlights each cell, counts
  inspections. Returns first match index or -1.
- BINARY: requires sorted array (pre-sorted). Show left, right, mid
  arrows (all blue). Highlight the checked mid cell in orange.
- Prediction: "For linear search of 9, how many inspections?" and
  "For binary search, which index is checked first?"
- Both must print "Records inspected: X" before returning.
- Trace panel: left, right, mid (for binary), inspections count.
- Console log:
  "binarySearch: left=0 right=9 mid=4 a[4]=16 < key=23 → left=5"

## SortScene — "The Forge"
- Row of 7 value bars (heights = values).
- Choose: BUBBLE / SELECTION / INSERTION.
- Buttons: STEP, AUTO, RESET.
- BUBBLE: highlight adjacent pair being compared; green flash on swap.
- SELECTION: show minimum-so-far (orange) and current (blue).
- INSERTION: lift key out (floating above row), shift larger right
  (green arrows), drop key into place.
- Counters: comparisons = X, swaps = X.
- Prediction: "After pass 1 of bubble sort on [6,3,8,2,5,1,7], what is
  the array?" — multiple choice.
- Timer (performance.now()): "Sort took X.X ms."
- Trace panel: pass, i, j, comparisons, swaps.
- Round 3 hard mode: sort Product objects by (stockValue DESC, id ASC)
  — compound comparator.
- Console log:
  "bubbleSort: compare a[2]=8 > a[3]=2 → swap → [6,3,2,8,5,1,7], swaps++"

## MergeScene — "The Split and Join"
- Show the array splitting downward into halves, then quarters, then
  single cells (a tree of rectangles).
- On merge: show i (left pointer), j (right pointer), k (merged
  pointer) as coloured arrows. Each step, the smaller of
  left[i], right[j] is copied to merged[k] with a green flash.
- Prediction: "Next value taken — left[i]=4 or right[j]=2?" (click).
- Show leftover copy loop when one half empties.
- Trace panel: i, j, k, leftHalf, rightHalf, mergedArray.

## QuickScene — "The Pivot"
- Array of 6 values. Pivot (last element) is gold.
- i arrow (blue) starts at -1. j arrow (red) starts at 0.
- STEP through Lomuto:
  - Compare a[j] vs pivot. If a[j] <= pivot → i++, swap a[i] a[j],
    flash green.
  - If a[j] > pivot → j++ only.
- After j reaches the end: swap a[i+1] with pivot, pivot turns green
  (final position), draw a bracket around left/right subarrays.
- Recurse: show the two subarrays being processed next.
- Prediction: "Does j=3 swap? a[3]=7 vs pivot=2" → yes/no.
- Use the exact PDF example [8,3,1,7,9,2] for round 1.
- Trace panel: lowIndex, highIndex, pivot, i, j.

## RecursionScene — "The Call Stack"
- Vertical stack of frames (rectangles) showing active method calls.
- Toggle: FACTORIAL / SUM / FIBONACCI / PRINT_NUMBERS.
- Controls: input n, STEP, AUTO, RESET.
- FACTORIAL(n): frames push downward (winding), then unwind upward
  with return values combining (2 → 6 → 24 → 120).
- FIBONACCI(n): draw the CALL TREE (nodes branching). Repeated
  subtrees greyed out. Counter shows 25 calls for n=6.
  Toggle MEMOIZATION → counter drops, memo array shown.
- PRINT_NUMBERS(n): toggle "print BEFORE recursive call" vs "AFTER" —
  output order flips between 5,4,3,2,1 and 1,2,3,4,5.
- Prediction: "What does factorial(3) return?" and "How many fib(6)
  calls total?"
- Trace panel: current n, call depth, return value, call count.

## BossScene — "The Final Exam"
- 20 multiple-choice questions pulled randomly from ALL topics.
- 60 seconds per question.
- 5 mini-traces: show a state, ask next step.
- Scoring: +10 correct, 0 wrong. Pass mark 60%.
- Final rank based on score:
  - 0–40%: O(2ⁿ) Cursed
  - 41–60%: O(n²) Squire
  - 61–75%: O(n log n) Knight
  - 76–90%: O(n) Champion
  - 91–100%: O(1) Grandmaster
- Save score to localStorage per room.

## WorldScene — "The Hub" (M11)
- Top-down map, 7 rooms as coloured rectangles with labels.
- Player = circle with eyes, moves with arrow keys (arcade physics).
- Walking into a room rectangle → scene.start(that room's scene).
- Show a star (★) above each room if completed (all 3 rounds passed).
- Press ESC to return to hub from any room.

# ═══════════════════════════════════════════════════════════
# START NOW
# ═══════════════════════════════════════════════════════════

Begin with MILESTONE 1 (index.html, main.js, BootScene, MenuScene).
It must run in a browser (a menu screen with "Start Game" is enough).

For MILESTONE 1, deliver:
1. index.html (complete, all script tags in correct order)
2. main.js (Phaser config, scene registration)
3. scenes/BootScene.js (load any assets, then start MenuScene)
4. scenes/MenuScene.js ("DSA DUNGEON" title, "Start" button,
   "Instructions" button showing control keys)

Then STOP. Wait for the student to say "next."

Do NOT proceed to StackScene until the student confirms Milestone 1
runs correctly.

# ═══════════════════════════════════════════════════════════
# FINAL NOTE
# ═══════════════════════════════════════════════════════════

The student's goal is to UNDERSTAND EVERY LINE. Not to have a game.
The game is the vehicle. If you skip explanations, the student fails.
If you skip predictions, the student watches but doesn't learn.
If you dump the whole project at once, the student drowns.

One milestone. Full explanations. Runs in browser. Wait for "next."

GO.