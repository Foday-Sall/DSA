# DSA Dungeon — revised implementation plan

## Goal and scope

Build **DSA Dungeon**, a browser-playable Phaser 3 game that makes arrays, data structures, bugs, and algorithms visible and interactive so a beginner can learn Java concepts by predicting, dragging, tracing, listening, and then seeing the result. The live game is written in JavaScript because the supplied game spec requires real JavaScript classes to drive the visuals. It also teaches all six topics from the learner's Java assignment with Java method signatures/snippets and plain-language JS-to-Java explanations.

The latest uploaded prompt is the implementation authority: open root `index.html` directly, use Phaser 3 from its CDN, use plain scripts with no bundler, follow Milestones 1–11 in order, keep every milestone playable, and stop after each one until the learner says **“next.”** Do not dump the whole game at once. `AGENTS.md` is the public handoff: update it with exact completed work, evidence, stopping point, blockers, and next milestone after every milestone, then push the handoff/code change to the public `DSA` repository before pausing.

## One unresolved art decision

The detailed uploaded specification requires **Phaser Graphics only and no images**, while the learner's later message asks for **free royalty-free character assets**. These conflict. Until the learner chooses, use Graphics for all characters and game objects; do not search for, retrieve, or import character images. If the learner explicitly chooses to override the no-image rule, source character artwork only from assets whose published license permits the intended use/modification/redistribution, keep the relevant license notices/credits, and still render all arrays, pointers, traces, and algorithm mechanics in Phaser Graphics. Never promise assets are risk-free or exclusive. This does not block planning royalty-free audio.

## Game loop, visual learning, and rewards

The student enters a dungeon room, sees real arrays/objects as labelled cells/nodes with index numbers and arrows, predicts the next change, and then performs it with a drag/drop gesture or the Step button. The animation uses the actual JavaScript data-structure/algorithm instance. Show the state before and after each operation, highlight the affected indices/values, and keep the live Trace Panel visible. Each challenge gives a simple explanation and corresponding Java example.

Use drag-and-drop where it teaches the operation: place a value into a stack/queue, move an array value during in-place removal, select a merge half, or move a sort item into its predicted position. Every drag action must have an equivalent keyboard/button action; prediction still occurs before any push/pop/insert/swap. Use an `askPredict(question, options, correctIndex, explanation)` helper. Correct prediction earns +10 points, flashes green, and may award an in-game coin; a wrong choice shows the reason, flashes orange, and loses no points. Add collectible, **non-purchasable** game coins for learning milestones/room completion. They are not real money, payment, crypto, or a requirement to pay. Persist scores, coins, and room progress in `localStorage`.

Add game audio to make rooms feel alive: royalty-free/open-license background music and short sound effects for movement, correct/wrong prediction, data insert/remove/swap, coin pickup, room completion, and the boss. Keep license/attribution notices with the files and in a credits screen or `CREDITS.md`. Provide music/SFX/voice mute and volume controls. Add optional spoken explanations using device/browser speech synthesis, with visible captions and a replay button; text remains available even if voices are unavailable or muted. Search for and retrieve catalog audio only after the owner approves the revised plan and the art-source conflict is resolved; do not generate or use audio before that.

## Ordered playable milestones

Deliver the following stages in order, do not skip ahead, and stop for the learner's **“next”** after each. At the end of each milestone, include: **What you just learned** (three bullets), **Test it yourself** (exact action/input and expected result), **Assignment link** (the relevant Java assignment question/concept), and **Check your understanding** (two Q&A). Before waiting, update and push `AGENTS.md` so another agent knows exactly where work stopped.

| Milestone | Playable deliverable |
| --- | --- |
| **M1** | `index.html`, `main.js`, `scenes/BootScene.js`, `scenes/MenuScene.js`: title “DSA DUNGEON”, Start and Instructions buttons, instructions for the controls, and a browser-runnable menu. Stop and verify it opens directly before adding the stack. |
| **M2** | `dsa/Stack.js` + `scenes/StackScene.js`: “The Plate Tower,” max size 5, push/pop/peek/reset, trace panel, prediction, overflow/underflow, visible grey/struck-through popped cell, line explanations. |
| **M3** | `dsa/Queue.js` + `scenes/QueueScene.js`: “The Monster Line,” 5-slot circular queue, flat array, front/rear/nItems, wrap, spawn/attack/peek/reset, prediction, overflow/underflow. |
| **M4** | `dsa/LinkedList.js` + `scenes/LinkedListScene.js`: “The Chain,” insert/delete/find/display, moving first/current/previous pointers, prediction. |
| **M5** | `dsa/Search.js` + `scenes/SearchScene.js`: “The Detective,” linear/binary search, 10 boxes, inspection count and trace. Integrate Java assignment practice for `findSmallest`, two-index palindrome, first/last/count search, and in-place array removal into this playable learning path rather than creating an unlisted milestone. |
| **M6** | `dsa/Sorts.js` + `scenes/SortScene.js`: “The Forge,” Bubble/Selection/Insertion, step/auto/reset, comparisons/swaps, compound product comparator. Integrate Java `Task` class/objects, next-task selection, total duration, and the assignment's five-value Bubble trace here. |
| **M7** | `scenes/MergeScene.js`: “The Split and Join,” merge-sort split/merge tree, i/j/k, prediction and leftover-copy loop. |
| **M8** | `scenes/QuickScene.js`: “The Pivot,” Lomuto partition and recursive subarrays using the supplied array. |
| **M9** | `dsa/Recursion.js` + `scenes/RecursionScene.js`: “The Call Stack,” factorial, sum, Fibonacci, print numbers, memoization, and Tower of Hanoi, with calls/returns and call counts. |
| **M10** | `scenes/BossScene.js`: final mixed exam with 20 random multiple-choice questions, 60 seconds each, plus five live traces and a final score/rank. |
| **M11** | `scenes/WorldScene.js`: top-down hub connecting the seven rooms, arrow-key movement, room entry, completion stars, and ESC return from any room. |

Each milestone must run by opening `index.html` in a browser (internet is needed for Phaser CDN) and must preserve the earlier playable milestones. Do not proceed to the next room/milestone until the learner says “next.” The web project's Preview server may be used to verify playability, but browser delivery must remain a static root `index.html`.

## Exact game requirements

### Global interaction and teaching rules

- Every data structure is a real JavaScript class under `dsa/`; the exact instance the UI renders is the one each operation mutates.
- Every gameplay scene shows a Trace Panel with the relevant variables, current algorithm line, and recent log. Include, as relevant: stack `top`, `stackArray`, `size`; queue `front`, `rear`, `nItems`, `queueArray`; linked list `first`, `current`, `previous`; sort `i`, `j`, `pass`, `swaps`, `comparisons`; search `left`, `right`, `mid`, `inspections`; recursion current `n`, depth, return value, call count.
- Before every push/pop/insert/swap and every other predictable state-changing operation, use `askPredict(question, options, correctIndex, explanation)`. Correct = +10/green; wrong = show answer/orange/no penalty.
- Log every operation to the console with the exact logic line and state, e.g. `push(30): ++top FIRST (1→2), THEN store stackArray[2]=30`.
- Each room has easy/medium/hard rounds. Use the colour key: green add/push/insert; orange remove/pop/delete; blue pointers; red errors/overflow/underflow; gold quicksort pivot. Colour is always paired with text/shape meaning.
- All visible text is at least 16px, high contrast, with dark background `#0b1020`.
- After every JavaScript method, place the exact-format explanation block immediately after its closing brace. Every line of algorithm logic has both a WHY and an IF-WRONG explanation. Example format:

```js
// ===== EXPLANATION =====
// Line 3: this.top = -1;
//   WHY: -1 means "empty" because valid array indices start at 0.
//   IF WRONG: leaving top=0 would make an empty stack look like it
//             has one item, causing pop() to return garbage.
// =========================
```

### Lecture invariants and rooms

- **Stack — “The Plate Tower”:** `top = -1`; max size 5. Push increments `top` first, then stores (`++top`, then array write); pop reads first, then decrements. Buttons PUSH (opens input), POP, PEEK, RESET. Character (circle with eyes) stands at base; blue top arrow beside top plate. Predict before every push/pop. On overflow show red flash plus `OVERFLOW: top == maxSize-1, cannot push.` On underflow show red flash plus `UNDERFLOW: top == -1, nothing to pop.` After pop grey and strike through the cell but leave it visible, proving the value remains in the array while `top` moves below it. Trace: top, array, size. Log `push(30): ++top FIRST (1→2), THEN store stackArray[2]=30`.
- **Queue — “The Monster Line”:** horizontal five monster circles with eyes; front on left, rear on right; flat same-array view with numeric indices. Initialize `front=0`, `rear=-1`, `nItems=0`. SPAWN, ATTACK, PEEK, RESET. On insert, move and wrap rear before storing; on remove, read first, then move/wrap front. Animate rear jumping from 4 to 0 with a curved arrow; predict before spawn/attack. Overflow: `nItems == maxSize, queue full.` Underflow: `nItems == 0, queue empty.` Log `insert(60): rear moves 4→5→wrap to 0, then queueArray[0]=60, nItems++`.
- **Linked list — “The Chain”:** horizontal rounded nodes with values, `next` arrows, final `null`, blue `first` arrow. INSERT_FIRST(input), DELETE_FIRST, FIND(input), DISPLAY; also demonstrate keyed `DELETE(key)` with previous/current arrows. Predict `after insertFirst(40), what does first point to?` Implement exact order `newLink.next = first; first = newLink;`. Log that line.
- **Search — “The Detective”:** 10 number boxes and magnifier. LINEAR/BINARY toggle. Linear scans left-to-right, highlights every box, counts inspections, returns first match index or `-1`; binary requires pre-sorted array, shows blue left/right/mid arrows and orange checked midpoint, with `mid = left + (right-left)/2`. Ask `For linear search of 9, how many inspections?` and `For binary search, which index is checked first?`. Print `Records inspected: X` before returning. Include exact trace example `binarySearch: left=0 right=9 mid=4 a[4]=16 < key=23 → left=5`.
- **Sort — “The Forge”:** row of seven value bars. Choose BUBBLE/SELECTION/INSERTION; STEP/AUTO/RESET. Bubble highlights adjacent comparisons and green swap; Selection marks min-so-far orange/current blue; Insertion lifts key and shifts larger values right with green arrows. Show comparison/swap counters, pass, i/j; time with `performance.now()` and explain warm-ups plus five timed runs. Ask after pass 1 of Bubble sort on `[6,3,8,2,5,1,7]`. Hard mode sorts Product objects by `stockValue DESC, id ASC`. Include console example such as `bubbleSort: compare a[2]=8 > a[3]=2 → swap → [6,3,2,8,5,1,7], swaps++`.
- **Merge — “The Split and Join”:** split arrays into halves, quarters, single cells, then merge; show i/j/k arrows; predict whether next value is from left[i] or right[j]; copy smaller value with green flash; show leftover-copy loop and all halves/merged array in trace.
- **Quick — “The Pivot”:** six values; use PDF example `[8,3,1,7,9,2]` round 1. Gold pivot is last value; blue i starts -1; red j starts 0. Step Lomuto: compare `a[j]` with pivot; if `<=`, increment i, swap `a[i]`/`a[j]`, flash green; otherwise only advance j. At end swap `a[i+1]` with pivot, turn pivot green, bracket subarrays, then recurse. Base subarray size 0/1 skips. Ask `Does j=3 swap? a[3]=7 vs pivot=2?` Trace `lowIndex`, `highIndex`, pivot, i, j.
- **Recursion — “The Call Stack”:** vertical method frames push on calls/pop on returns. Toggle FACTORIAL/SUM/FIBONACCI/PRINT_NUMBERS/HANOI; input n, STEP/AUTO/RESET. Show factorial 5→0 and unwind results 2→6→24→120. Fibonacci tree greys repeated subtrees and shows 25 calls for fib(6); memoization toggle drops calls and shows memo array. Print-numbers toggle before/after recursion flips output `5,4,3,2,1` vs `1,2,3,4,5`. Ask `factorial(3)` and number of fib(6) calls. Trace current n, depth, return value, call count.
- **Boss:** 20 random MCQs, each with a 60-second timer; five mini-traces ask for the next state. +10 correct, 0 wrong; pass mark 60%. Rank: 0–40% O(2ⁿ) Cursed; 41–60% O(n²) Squire; 61–75% O(n log n) Knight; 76–90% O(n) Champion; 91–100% O(1) Grandmaster. Save score in localStorage.
- **World hub:** M11 top-down map with seven labelled room rectangles; circle-with-eyes player moves with arrow keys/arcade physics; walking into room launches it; completed rooms show a star when all three rounds are passed; ESC returns from any room.

### Java assignment integration

Use Java examples in the Search and Sort learning path, corresponding to the original assignment, and explain them line by line without completing/submitting the learner's entire assignment. Preserve: (1) `findSmallest(int[] values)` on a nonempty array, identify initialization and `<= values.length` bugs, corrected trace on `{8,3,9,1,6}` with i/smallest after each iteration; (2) `isPalindrome(String text)` ignores case/spaces, uses left/right indices, stops on mismatch, does not reverse or use `StringBuilder.reverse()`; (3) `firstIndexOf`, `lastIndexOf`, `countOccurrences`, valid size 5–20, zero-based, return -1 if absent, no built-in search; (4) `removeAll(values,size,target)`, input size 1–15, stable in-place removal within valid logical size, no second array/collection, return new size, print valid prefix/new size/removed count only; (5) `Task` private title/priority/duration, constructor/getters/displayDetails; five assignment sample tasks; choose higher priority, then shorter duration, then earlier array position; calculate/display total duration, do not sort; (6) Bubble trace `{6,3,8,2,5}`, after each pass, swaps/pass, final array, total comparisons/swaps, explain `data.length - 1 - pass`.

Do not use `Arrays.sort()`, streams, `ArrayList`, other Java collection classes, built-in searching, or reversed-string creation where the assignment prohibits them.

### Big-O

Implement `dsa/BigO.js` with `proveTheta(fn,g,c1,c2,n0)`, `growthTable(n)` showing O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), and `countLoopOps(fragmentId,n)` for three clearly documented loop fragments. The course fragments were not supplied; define and document the three examples used. Because finite program execution cannot prove an arbitrary inequality for every infinite n, have `proveTheta` report its bounded tested range and label it a computational check, not a formal proof.

## Files and technical structure

Keep the prompt's root layout and classic script tags so direct `file://` play works. No npm/Vite/Webpack/bundler is needed for the game runtime; Phaser CDN only is `https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js`. Planned source: `index.html`, `main.js`, `scenes/BootScene.js`, `MenuScene.js`, `WorldScene.js`, `StackScene.js`, `QueueScene.js`, `LinkedListScene.js`, `SearchScene.js`, `SortScene.js`, `MergeScene.js`, `QuickScene.js`, `RecursionScene.js`, `BossScene.js`; `dsa/Stack.js`, `Queue.js`, `LinkedList.js`, `Sorts.js`, `Search.js`, `Recursion.js`, `BigO.js`; `ui/TracePanel.js`, shared prediction and controls helpers; `audio/` and `CREDITS.md` for sourced sounds/music if approved. Keep the assignment lessons inside M5/M6 rather than inserting an extra build milestone.

For Capacitor, provide `capacitor.config.js` and a simple static-copy helper to place the unbundled browser files under `www/` before `npx cap sync android`; the copy helper is packaging only, not needed to play in a browser. The current environment has Java but no Android SDK/`ANDROID_HOME`, so do not promise an APK/AAB. Use no backend, accounts, analytics, paid content, or real-money coin purchases. Provide a static `/manus-routes.json` for Webdev Preview.

## Agent continuity and public repo

Public repository: `https://github.com/Foday-Sall/DSA` (repo name `DSA`; game title `DSA DUNGEON`). `AGENTS.md` is required and is already public with the current handoff. Keep the Manus `origin` unchanged; public GitHub remains a separate collaboration remote. Future agents read `AGENTS.md`, `plan.md`, and `TODO.md` before work. At every milestone: update the AGENTS status board and dated log with exact files, commands/check results, what remains, blockers, and next milestone; commit and push the milestone plus handoff to the public repo; verify the remote; give the learner the four required end-of-milestone sections; then stop and wait for “next.” No contributor/agent pushes unreviewed work to the owner's main; use a branch/fork and PR for outside contributions, with the owner deciding merges. Keep the uploaded assignment PDF out of the public repo.

## Design direction

Use a high-contrast 2D dungeon arcade visual style, with the prompt's dark background `#0b1020`, Phaser Graphics for arrays and objects, and the exact semantic colour key above. Make the array's index labels, values, pointers, movement, and before/after state large and readable. Keep at least 16px type, desktop Trace Panel fixed to the side and phone Trace Panel in a fixed lower panel. Drag and drop is supported by button/keyboard equivalents. Add an audio settings control and spoken explanation captions. Coins are celebratory game tokens, never money. Character art remains Phaser Graphics unless the owner explicitly chooses the royalty-free asset exception.

Personality: energetic, funny, clear, never shaming. Use short, direct guidance and visible reactions. Motion should confirm state changes, not obscure them; preserve a simple step-by-step mode, with optional autoplay only where specified. Support keyboard arrows to move, Space to step, Enter to confirm, ESC to return, and touch controls.

## Approval and current boundary

This revised plan is **not yet approved**. The owner has requested visual learning, drag-and-drop interactions, audio/music/voice, non-purchasable game coins, public handoffs at each milestone, and a milestone-by-milestone wait-for-“next” workflow. The precise character art source remains unresolved because “royalty-free character assets” conflicts with the uploaded prompt's “Phaser Graphics only, no images.” No asset search/retrieval or gameplay implementation should start until the owner chooses that art policy and approves the plan.
