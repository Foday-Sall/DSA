# AGENTS.md — DSA Dungeon

**Read this file before making changes.** It is the handoff source for every AI agent or contributor who picks up this repository. Also read `plan.md` for the detailed implementation/design plan, then `TODO.md` once the owner approves the plan and it exists. Do not rely on chat history to know what has or has not been completed.

## Current handoff — 2026-11-02

**Current stopping point:** The owner provided a detailed Phaser game prompt and asked that it be followed, with this file included so another AI can continue if the current session ends. The implementation plan incorporates that prompt and the six topics from the owner's Java DSA assignment. `AGENTS.md` and `plan.md` were pushed to the public repo in commit `e30c48e` and verified there. **The revised plan is awaiting the owner's approval. No gameplay code has been written.** Do not start game implementation until the owner approves the revised plan.

**Completed and verified:** A public GitHub repository exists at <https://github.com/Foday-Sall/DSA>, and `gh api repos/Foday-Sall/DSA/contents` confirmed `AGENTS.md` and `plan.md` are present. The Manus project workspace is `/home/ubuntu/dsajourney`. Its `origin` is the Manus-managed remote and must not be replaced; a separate `github` remote now points to the public repo. The current `main` branch has no upstream configured, so a future agent must inspect the Manus remote/checkpoint workflow before changing branch tracking; never point the project's checkpoint flow at the public remote by mistake. The local environment has Node.js, pnpm, and Java, but `ANDROID_HOME` is unset.

**Not done:** No Phaser game, Java lesson content, DSA classes, scene, trace panel, Capacitor Android project, `TODO.md`, README, contribution guide, PR template, gameplay-source push, or Android package has been implemented or verified.

**Next safe steps:**
1. Ask the owner to approve the revised plan. If they request changes, update both `plan.md` and this file before coding.
2. Only after approval, create `TODO.md` with the complete feature outcomes below, then implement in small milestones. Update this file after each meaningful milestone and before stopping.
3. Before game work, inspect the bound Webdev config/diagnostics and Git checkpoint relationship; preserve the Manus `origin` and the separate public `github` remote.
4. Before each handoff, state exactly which files changed, what commands/checks actually ran and their results, what remains, any blockers, and the next concrete actions. Never mark work complete without evidence.

## Owner-approved direction and non-negotiable decisions

- Public repository: `https://github.com/Foday-Sall/DSA`; repo name `DSA`. The game title from the uploaded prompt is **DSA Dungeon**.
- The owner wants a public, collaborative repo where AI agents can submit pull requests and the owner reviews/merges them. Contributors should work from branches/forks; public status alone does not authorize direct writes. Do not overwrite Manus `origin` or state that anonymous agents can push.
- Game runtime: JavaScript and Phaser 3 loaded from a CDN, plain browser scripts, no bundler/game build step. Root `index.html` must run when opened directly in a browser. Since Phaser comes from a CDN, network access is needed to load it.
- Mobile direction: prepare Capacitor Android packaging as a wrapper for the same static files. The current environment has Java, but no `ANDROID_HOME`; APK/AAB build/signing requires Android SDK/Android Studio and signing credentials not currently present.
- Visuals: draw all game art with Phaser Graphics (rectangles, circles, text, arrows, bars, nodes). No imported image assets. Use original simple characters, not characters copied from protected franchises.
- Learning language: the game structures/algorithms are actual JavaScript classes whose state is rendered by the game. Also teach the owner's assignment in Java, with Java signatures/snippets, step-by-step traces, and clear JS-to-Java mapping. Do not silently drop either requirement.
- Learning style: player predicts before algorithm execution where possible; then the real operation animates and is explained. Avoid punishment for mistakes.

## Full game requirements from the owner's prompt

### Project structure

Keep the prompt's requested root layout and add only the explicitly planned Java Lab/shared controls and repository documentation:

- `index.html`: Phaser CDN and playable game container.
- `main.js`: Phaser configuration and scene registration.
- `scenes/BootScene.js`, `MenuScene.js`, `WorldScene.js`, `StackScene.js`, `QueueScene.js`, `LinkedListScene.js`, `SearchScene.js`, `SortScene.js`, `MergeScene.js`, `QuickScene.js`, `RecursionScene.js`, `BossScene.js`.
- Add `scenes/JavaLabScene.js` for the six Java assignment challenges; do not drop the supplied scenes.
- `dsa/Stack.js`, `Queue.js`, `LinkedList.js`, `Sorts.js`, `Search.js`, `Recursion.js`, `BigO.js`.
- `ui/TracePanel.js`; planned shared helpers `ui/Prediction.js` and `ui/Controls.js`.
- Capacitor wrapper files and `scripts/copy-web.js` may copy the playable root assets into `www/`; this is only packaging/synchronization, not a bundler.
- Add `AGENTS.md`, `plan.md`, `TODO.md` (after plan approval), `README.md`, `CONTRIBUTING.md`, and `.github/pull_request_template.md`.

Use classic script tags in safe load order so `file://` opening works; avoid ES module imports that browsers block from local files. Game classes must be loaded before scenes that use them.

### Core rules

1. Every data structure is a real JS class in `dsa/`; the UI renders the exact same class instance/state, not a fake visual copy.
2. Every scene shows a live Trace Panel: scene/topic title, exact current line of algorithm logic, relevant variables, and the last five operation logs. Update it on every step. Typical variables: `top`, `front`, `rear`, `nItems`, `first`, `i`, `j`, `k`, `pivot`, `left`, `right`, `mid`, `depth`, and return value.
3. Log every algorithm state-changing action to the browser console with the operation and exact algorithm line/state transition. Example: `push(30): top 1→2, stackArray[2]=30`.
4. When possible, the player must predict before execution via multiple choice; then animate confirmation/correction.
5. Color key: GREEN = add/push/insert; ORANGE = remove/pop/delete; BLUE = pointer variable; RED = error/overflow/underflow. Quicksort pivot is gold. Correct prediction flashes green; incorrect prediction flashes orange and explains without penalty.
6. Each room has 3 rounds: easy, medium, hard. Each correct prediction is worth +10; score is based on correct predictions. Save score in `localStorage` per room.
7. `BossScene`: 20 multiple-choice questions plus 5 live traces mixed across all topics; 60 seconds per question. Grades: O(1) Grandmaster, O(n) Knight, O(n²) Squire, O(2ⁿ) Cursed.

### Room details

- **Stack:** vertical container with plates. Controls: Push(x), Pop, Peek, IsEmpty, IsFull; input for x. Predict resulting `top` before push/pop with 3 choices. Show top index arrow and grey popped cells. Overflow/underflow = red flash/message. Hard round pushes letters `J A V A` left-to-right and pops to show `A V A J`.
- **Queue:** circular ring of 5 slots and flat same-array view; front orange arrow, rear green arrow, `nItems` badge. Controls Insert(x), Remove, Peek, Size. Show wraparound when rear passes 4 to 0 with curved arrow. Predict rear after insert(60) when rear=4 (choices 0,4,5,error). Overflow when full, underflow when empty. Hard round predicts BFS visit order in a small tree.
- **Linked list:** rounded nodes, `next` arrows, `null`; controls InsertFirst(x), DeleteFirst, Find(key), Delete(key), Display. Show `first`/head movement and `previous`+`current` during keyed delete. Predict new first. Hard round maps stack push to insertFirst and pop to deleteFirst.
- **Search:** number boxes and a magnifier drawn with Phaser Graphics. Linear search counts cell inspections and prints `Records inspected: X`; binary search on sorted array shows left/right/mid and `mid = left + (right-left)/2`. Ask count of inspections / first midpoint. Hard round searches Student objects by matric with visible fields. Include Java assignment firstIndexOf, lastIndexOf, countOccurrences, zero-based indices, and target-not-found `-1`.
- **Sort:** Bubble, Selection, Insertion. Visual bars. Controls algorithm choice, Step, Auto-play, Reset. Show comparisons/swaps. Bubble highlights adjacent pair; Selection shows min-so-far/current; Insertion lifts key and shifts right. Ask after the first Bubble pass on `{6,3,8,2,5}`. Hard round sorts products by stock value descending, tie `product_id` ascending. Time via `performance.now()`; explain warm-ups and five timed runs.
- **Merge:** split array down to single cells, merge back; show i/j/k; predict next value from left[i] or right[j]; show leftover-copy loop.
- **Quick:** Lomuto partition, last element pivot/gold, i blue, j red; compare `a[j]` to pivot, swap when `<=`, advance; after loop swap `a[i+1]` with pivot, mark pivot final, recurse on subarrays; base case size 0/1 skips. Include predictions such as whether `j=3` swaps for `7 vs 2` and pivot destination.
- **Recursion:** nested frames for factorial 5 to 0; frame push/call and pop/return. Include Factorial(n), Sum(n), Fibonacci(n), PrintNumbers(n). Toggle printing before/after recursive call and show output order flip. Fibonacci call tree, grey repeated subtrees, show 25 calls for fib(6); memoization toggle reduces calls and displays memo array. Include predictions for factorial(3), fib(6) call count.
- **World hub:** 2D map, circle player walks with arrow keys/arcade physics; enter room launches it; show stars per room. Provide touch equivalents for phones.
- **Boss:** exact question counts, timer, and grade ranks above.
- **Big-O helpers:** `proveTheta(fn, g, c1, c2, n0)` checks `c1*g(n) <= f(n) <= c2*g(n)` over its explicitly reported finite testing range; `growthTable(n)` shows O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ); `countLoopOps(fragmentId, n)` gives exact `count++` counts for three named included lecture fragments. No lecture fragments were attached, so define and document three sample fragments; do not claim finite tests prove an infinite mathematical statement.

### Java assignment topics to include in Java Lab

The uploaded assignment is called “Data Structures and Algorithms — Assignment 1: Java Refresher for Data Structures and Algorithms.” Do not copy its PDF into the public repository; restate the requirements here and use instructional examples.

1. **Find smallest:** Java `public static int findSmallest(int[] values)`, nonempty array. Identify `smallest = 0` and `i <= values.length` defects; implement correctly. Manually trace `{8,3,9,1,6}` with `i` and `smallest` after each iteration. Show a small calling example.
2. **Palindrome:** `public static boolean isPalindrome(String text)`, read full line, ignore case and spaces, use one beginning and one ending index, stop on first mismatch, return boolean. Never reverse the string or create a reversed string/`StringBuilder.reverse()`.
3. **Search/count:** validate array size 5–20; implement `firstIndexOf`, `lastIndexOf`, and `countOccurrences`; return `-1` when absent; use zero-based indexing and no built-in search.
4. **In-place removal:** `removeAll(int[] values, int size, int target)` for requested size 1–15; remove all target values only from valid region; preserve order; modify same array, no second array/ArrayList/collection; return logical size; display only valid prefix, new size, and removed count.
5. **Tasks/objects:** class `Task` with private `title`, `priority`, `duration`; constructor, getters, `displayDetails()`. Use the assignment's sample tasks. `selectNextTask(Task[] tasks)` chooses higher priority, then shorter duration, then original array order. `calculateTotalDuration(Task[] tasks)` sums duration. Display all task details, total, next selected; do not sort.
6. **Bubble trace:** use `{6,3,8,2,5}`; show after each pass, swaps per pass, final array, comparison total, swap total, explain the nested loops and why inner bound is `data.length - 1 - pass`.

Java examples must obey the assignment's ban on `Arrays.sort()`, streams, `ArrayList`, other collections, built-in search, and reversing strings where prohibited. The game is an aid; it must not submit a complete assignment on the learner's behalf.

## Accessibility and visual rules

- All game visuals use Phaser Graphics: rectangles, circles, arrows, bars, nodes, and text. No image assets.
- Maintain high contrast and minimum 16px text.
- Keyboard: arrows move, Space steps, Enter confirms. Equivalent touch buttons must be usable on a phone.
- Keep a fixed Trace Panel on wide screens; adapt it into a readable fixed lower panel on small screens without losing variables/current line/logs.
- Make each state change legible; do not rely on color alone for correctness or error meaning; pair color with labels/shapes/text.

## Agent operating rules

- At session start, read this file, `plan.md`, current `TODO.md` if present, then inspect `git status`, branch, and files. Treat files and commit receipts, not remembered chat, as evidence of progress.
- The revised plan is currently awaiting approval. Do not write gameplay code, TODO, or install runtime dependencies until approval is recorded.
- After approval, update/create `TODO.md` before configuration or implementation. Keep outcomes separate and preserve every acceptance detail above.
- Update `AGENTS.md` after each meaningful milestone. Before pausing, ending, hitting a blocker, or handing off, add a dated log entry with: work attempted; exact files changed; actual commands/checks and outcomes; remaining work; blockers; the next action. Update the status table at the top. Never claim unverified behavior works.
- Work on a feature branch or fork for contributions. Do not push an agent's unreviewed changes directly into the owner's default branch; the owner reviews/merges PRs.
- Keep user-provided assignment PDF private; do not include it in the public repository.
- Do not enable a backend/database or collect personal data.

## Status board

| Area | Status | Evidence / next action |
| --- | --- | --- |
| Public repo `Foday-Sall/DSA` created and verified public | Done | `gh repo view` confirmed public URL. |
| Detailed Phaser prompt read and captured in this handoff | Done | Requirements transcribed above from the owner's uploaded prompt. |
| Revised `plan.md` | Draft | Includes the full DSA Dungeon spec plus Java assignment; awaiting owner approval. |
| `AGENTS.md` handoff and revised plan in public GitHub repo | Done | Commit `e30c48e`; remote contents verified with GitHub API. |
| `TODO.md` | Not started | Create only after owner approves the revised plan. |
| Phaser game / DSA classes / scenes / Trace Panel | Not started | Implement only after approval. |
| Java Lab lesson content | Not started | Implement all six assignment topics after approval. |
| Capacitor Android wrapper | Not started | SDK is absent; prepare configuration and sync path after approval. |
| Public code release / PR workflow | Not started | Publish code and instructions after implementation; keep owner review/merge. |
| APK/AAB build/signing | Blocked / not available | Android SDK (`ANDROID_HOME`) and signing credentials are not present. |

## Session log

### 2026-11-02 — initial specification and handoff

- Read the owner's assignment PDF, then the uploaded `pasted_content.txt` with the full DSA Dungeon game specification.
- Created public repo `https://github.com/Foday-Sall/DSA`; it was empty before the handoff-document push. The project workspace is `/home/ubuntu/dsajourney`, with Manus-managed `origin`; preserve it.
- Replaced the initial six-lesson-only plan with the expanded Phaser CDN/no-bundler game, all supplied rooms and rules, Capacitor Android scope, and all six assignment lessons.
- Wrote this handoff before implementation so a future agent can continue without this conversation.
- No game source, TODO, dependencies, tests, app, Android wrapper, or gameplay-source commit has been created yet. The revised plan still needs owner approval.
- Next: request approval. After approval, create `TODO.md` before coding.

### 2026-11-02 — handoff documents published

- Committed `AGENTS.md` and `plan.md` as `e30c48e` and pushed `main` to the separate public `github` remote. GitHub API confirmed both files are visible in `Foday-Sall/DSA`.
- Verified the Manus `origin` is still configured and unchanged. The local `main` branch currently has no upstream; do not guess or change it before inspecting the project's official checkpoint state.
- Work completed: public agent handoff and detailed plan only. Game implementation is still not started.
- Next action: obtain owner approval of the revised plan; after approval create `TODO.md` and begin the game in milestones.
