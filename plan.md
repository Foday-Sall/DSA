# DSA Dungeon — implementation plan

## Goal and source of truth

Build **DSA Dungeon**, a playable, beginner-friendly JavaScript/Phaser 3 game that teaches data structures and algorithms through prediction, live state changes, and readable traces. Use the owner's uploaded DSA Dungeon specification as the detailed feature source, and also cover the six Java concepts in the uploaded course assignment. The game implementation uses real JavaScript data-structure/algorithm classes because the visible game state must be the same state produced by those classes. To honor the learner's earlier choice and Java assignment, the lessons also show corresponding Java signatures/snippets and explain how the visible algorithm maps to Java.

The game must run by opening root `index.html` in a browser. Load Phaser 3 from a CDN and use plain JavaScript scripts; do not require Vite, a bundler, or a game build step. The Phaser CDN means browser play needs network access to load Phaser. Capacitor Android packaging is an optional wrapper around the same static game; native APK/AAB compilation needs Android SDK/Android Studio, which is not present in the current workspace. Use original, simply drawn character avatars and no imported image assets, as the uploaded prompt directs.

## Rooms and learning interactions

The hub is a 2D world map of topic rooms. A player circle walks between rooms with arrow keys; on touch devices, provide an equivalent visible direction control. Enter launches a room. Each room has easy, medium, and hard rounds and displays earned stars. Every scene calls the shared `askPredict(question, options, correctIndex, explanation)` helper before an algorithm action whenever prediction is possible, then animates the actual operation and updates the trace panel. A correct prediction adds 10 points and flashes green; an incorrect answer reveals the explanation, flashes orange, and has no score penalty. Store room scores/progress in `localStorage`.

| Scene/room | Required activity |
| --- | --- |
| `StackScene` | Draw a vertical stack as plates. Provide `Push(x)`, `Pop`, `Peek`, `IsEmpty`, and `IsFull`, with an input for `x`. Before push/pop, ask what `top` becomes using three choices. Show a top arrow and greyed popped cells. Overflow/underflow causes a red flash/message. Hard round: push the letters of `JAVA` left-to-right and pop to see `AVAJ`. |
| `QueueScene` | Draw a 5-slot circular ring and the same array flat below it. Show `front` (orange arrow), `rear` (green arrow), and an `nItems` badge. Provide `Insert(x)`, `Remove`, `Peek`, and `Size`; animate wraparound from index 4 to 0, ask `after insert(60) with rear=4, where does rear point?` with choices `0`, `4`, `5`, or `error`, and show overflow/underflow. Hard round: use a queue to visit a small tree in BFS order and predict the next node. |
| `LinkedListScene` | Draw rounded nodes connected by `next` arrows and `null`. Provide `InsertFirst(x)`, `DeleteFirst`, `Find(key)`, `Delete(key)`, and `Display`. Show the `first`/head pointer, plus `previous` and `current` during deletion. Predict the new `first`. Hard round: build a stack on the list (`push = insertFirst`, `pop = deleteFirst`). |
| `SearchScene` | Draw number cells and a magnifier made from Phaser Graphics. Implement linear search and binary search on a sorted array. Count/display linear inspections as `Records inspected: X`; show `left`, `right`, and `mid`, with `mid = left + (right-left)/2`. Ask how many inspections a linear search for `9` takes and which midpoint is checked first. Hard round: search an array of Student objects by matric number, showing fields in a card. Also teach the assignment's first index, last index, count, not-found `-1`, and zero-based indices. |
| `SortScene` | Draw values as bars and allow Bubble, Selection, and Insertion sort. Provide `Step`, `Auto-play`, and `Reset`. Show comparisons/swaps; Bubble highlights the adjacent pair, Selection shows min-so-far/current, and Insertion lifts the key and shifts values right. Ask for the result after the assignment's first Bubble pass on `{6,3,8,2,5}`. Hard round: sort products by stock descending, then `product_id` ascending. Include `performance.now()` measurements and explain warm-ups plus five timed runs. |
| `MergeScene` | Animate Merge Sort splitting to single cells, then merging. On each merge show `i`, `j`, and `k`, select the next left/right value, and demonstrate leftover-copy loops. |
| `QuickScene` | Animate Lomuto partition with the last value as pivot, `i` blue and `j` red. Compare `a[j]` to pivot, swap when `<=`, advance pointers, then put the pivot in its final position and recurse over subarrays. Show size-0/1 base cases. Ask whether `j=3` swaps for `7 vs 2` and where the pivot lands. |
| `RecursionScene` | Show factorial calls from 5 to 0 as nested frames that push on calls and pop on returns. Include `Factorial(n)`, `Sum(n)`, `Fibonacci(n)`, and `PrintNumbers(n)`. Toggle printing before vs after recursion to reverse output order. Draw the Fibonacci call tree, grey repeated subtrees, show 25 calls for `fib(6)`, then toggle memoization and show reduced calls plus a memo array. Ask prediction questions. |
| `JavaLabScene` | Add six subchallenges from the course assignment: `findSmallest` method/loop/debugging and trace; two-index case-insensitive/space-insensitive palindrome without reversing; array first/last/count linear search; stable in-place `removeAll` and logical size; `Task` classes/objects, total duration, and priority/duration/original-order selection; Bubble Sort pass trace, comparisons, swaps, and shrinking inner bound. Show Java code and do not provide a submission-ready replacement for the learner's whole assignment. |
| `BossScene` | Mix 20 multiple-choice questions and 5 live traces selected from all implemented topics, allowing 60 seconds per question. End with a grade screen using Big-O ranks: O(1) Grandmaster, O(n) Knight, O(n²) Squire, O(2ⁿ) Cursed. |

## Shared learning and algorithm requirements

Every data structure must be a real JavaScript class in `dsa/`; the scene/UI must display the state returned by that same class, not a decorative duplicate. Every scene shows a live Trace Panel containing its title, the current algorithm line, relevant variable/value pairs, and the five most recent log messages. Update it on every step. Log every algorithm action to the browser console with the exact operation/logic and state transition, such as `push(30): top 1→2, stackArray[2]=30`.

Keep the color semantics consistent: green for add/push/insert; orange for remove/pop/delete; blue for pointer variables; red for errors, overflow, and underflow; gold for the quicksort pivot. Preserve the prompt's green success and orange wrong-answer feedback. Use the specified names where applicable: `top`, `front`, `rear`, `nItems`, `first`, `i`, `j`, `k`, `pivot`, `lowIndex`, and `highIndex`.

`dsa/BigO.js` provides `proveTheta(fn, g, c1, c2, n0)`, `growthTable(n)`, and `countLoopOps(fragmentId, n)`. Include three named loop fragments in the game so operation counts are exact and reproducible; because arbitrary code cannot be proven for all infinite `n` by finite execution, label `proveTheta` honestly as a bounded computational check and show its checked range rather than claiming a formal proof.

The Java Lab must respect the assignment's constraints: use Java for lesson examples; no `Arrays.sort()`, streams, `ArrayList`, collection classes, reversed-string creation, `StringBuilder.reverse()`, or built-in search when the assignment prohibits them. Keep original array order and use zero-based indices. For Task ties, higher priority wins, then shorter duration, then earlier array position. Do not sort the task array.

## Technical structure

Use the user's root-file layout and plain script loading so `index.html` can be opened directly:

```text
index.html                 Phaser CDN, game container, script load order
main.js                    Phaser configuration and scene registration
scenes/BootScene.js
scenes/MenuScene.js
scenes/WorldScene.js       map hub and room navigation
scenes/StackScene.js
scenes/QueueScene.js
scenes/LinkedListScene.js
scenes/SearchScene.js
scenes/SortScene.js
scenes/MergeScene.js
scenes/QuickScene.js
scenes/RecursionScene.js
scenes/JavaLabScene.js     six Java assignment lessons
scenes/BossScene.js
 dsa/Stack.js
 dsa/Queue.js
 dsa/LinkedList.js
 dsa/Sorts.js
 dsa/Search.js
 dsa/Recursion.js
 dsa/BigO.js
 ui/TracePanel.js
 ui/Prediction.js           shared prediction/score handling
 ui/Controls.js             keyboard and touch controls
 capacitor.config.js        Android wrapper configuration
 scripts/copy-web.js        copy static files for Capacitor; no bundler
 www/                       Capacitor's copied web assets
 AGENTS.md                  agent instructions and current handoff log
 plan.md                    approved scope/design record
 README.md                  browser run, lesson map, Android prerequisites
 CONTRIBUTING.md            branch/fork and owner-reviewed PR rules
 .github/pull_request_template.md
```

Load Phaser 3 from its CDN first in `index.html`, followed by `dsa/` classes, shared `ui/`, scene scripts, and `main.js` as classic scripts (no ES-module imports that fail under `file://`). Game art is built from Phaser Graphics: rectangles, circles, arrows, bars, nodes, text, and the player/magnifier shapes. Keep visible text at least 16px with high contrast. Provide arrow-key movement, Space to step, Enter to confirm, plus touch equivalents.

Capacitor may use a small static-copy script to mirror the root game files into `www/` before `npx cap sync android`; this is not a bundler and is not needed to play in a browser. Progress stays local; no account/backend/analytics is in scope. Do not attempt APK signing without an Android SDK/keystore. Put a static route manifest at `/manus-routes.json` for the managed Preview route.

## Repository collaboration and session continuity

The public repo is `https://github.com/Foday-Sall/DSA`; its short name is `DSA`, while the game title is `DSA Dungeon`. Keep the Manus-managed `origin` untouched and use a separate GitHub remote for the public collaboration repo. Put `AGENTS.md` there before gameplay implementation so another agent can understand the full spec, current state, and exact stopping point. At the start of every session, agents read `AGENTS.md` and `plan.md`; after approval they also read `TODO.md`. Update the status and dated session log after every meaningful milestone and before pausing. Only mark an item complete when code/docs/evidence show it is done. AI agents and other contributors work on branches/forks and submit PRs; the repository owner reviews and merges. Do not grant or imply anonymous write access.

## Design direction

Use a readable 2D arcade dungeon built entirely from Phaser Graphics, as requested. The dungeon should feel adventurous but calm enough for study. A simple named player avatar is a circle; all props, pointers, bars, nodes, and the magnifier are drawn shapes, never imported artwork.

- **Core principles:** expose algorithm state; ask before executing; reward a correct mental model; explain errors without punishment; keep controls touch/keyboard accessible.
- **Color philosophy:** dark, muted dungeon surfaces create contrast; green means data added, orange removed, blue identifies pointers, red signals errors/overflow/underflow, and gold singles out the pivot. The semantic mapping outranks decorative styling.
- **Layout:** room visualization in the main canvas; desktop Trace Panel fixed at the side; on narrow mobile screens, an always-visible lower panel preserves the same trace information without squeezing the main visualization.
- **Interaction/animation:** step-by-step first, optional auto-play for sorting; short motions with a clear pause on comparisons/swaps; keyboard and touch parity; avoid motion that hides state.
- **Typography/voice:** system sans-serif for instructions and system monospace for pseudocode/values; minimum 16px text. Microcopy is patient and direct: “Predict first—what changes next?” and “Here’s the line that changed it.”
- **Brand:** “DSA Dungeon,” a playful but precise practice game; encouraging, transparent, hands-on. Use an original bracket-and-pointer wordmark if needed, created without imported gameplay imagery.

## Boundaries and known implementation limits

The public repository and `AGENTS.md` are for owner-reviewed collaboration; public visibility allows reading/forking but does not give every AI agent write access. The prompt's Phaser CDN needs internet to load Phaser. Capacitor source/setup can be prepared here, but this environment currently lacks `ANDROID_HOME`; native APK/AAB build and signing remain dependent on an Android SDK and credentials. The supplied 3 Big-O lecture fragments are not included verbatim, so the game must define and document its own three example fragments unless the owner later supplies course snippets. The game should teach, not submit the user's assignment for them.
