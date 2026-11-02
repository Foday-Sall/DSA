# AGENTS.md — DSA Dungeon

**Read this file before making changes.** It is the handoff source for every AI agent or contributor who picks up this repository. Also read `GAME_SPEC.md` verbatim (the owner's latest build-order prompt) and `plan.md`; read `TODO.md` once the owner approves the plan and it exists. Do not rely on chat history to know what has or has not been completed.

## Current handoff — 2026-11-02

**Current stopping point:** The owner supplied a refreshed, exact build-order prompt and asked for a more visual, audio-rich game with drag-and-drop, voice explanations, in-game coins, and real characters. The owner explicitly chose real character art, overriding the attached prompt's no-images rule for character sprites only; arrays, pointers, traces, and algorithm visuals remain Phaser Graphics. Source free/open-license character art and retain credits, but do not search/retrieve assets until plan approval. `GAME_SPEC.md`, `plan.md`, and this handoff are public. **Only approval of the complete revised plan remains; no game code or external assets have been started.**

**Completed and verified:** The public repo is <https://github.com/Foday-Sall/DSA>; its latest verified public `main` is documentation-only. A separate `github` remote points there; keep the Manus-managed `origin` untouched. The local workspace is `/home/ubuntu/dsajourney`; its `main` has no upstream configured, so inspect the Manus checkpoint workflow before changing branch tracking. The latest `GAME_SPEC.md` copy matched the uploaded prompt by SHA-256. The local environment has Node.js, pnpm, and Java, but `ANDROID_HOME` is unset. For each handoff, verify the latest local documentation commit is also on the public `github/main` remote.

**Not done:** No Phaser game, Java lesson content, DSA classes, scene, Trace Panel, sound/music/voice, drag/drop, game coin loop, character artwork/audio assets, Capacitor Android project, `TODO.md`, README, contribution guide, PR template, gameplay-source push, or Android package has been implemented or verified.

**Next safe steps:**
1. Obtain explicit approval of the full revised plan; the character-art choice is resolved in favor of free/open-license sprites for characters only.
2. Keep the uploaded Java assignment PDF private. After approval, create `TODO.md`, inspect Webdev diagnostics and Git checkpoint setup, then implement M1 only.
3. Test that `index.html` runs, update/push `AGENTS.md`, deliver the four milestone wrap-up items in `GAME_SPEC.md`, and stop until the owner says “next.”
4. Repeat one milestone at a time. Before each handoff, record exact files, actual commands/checks and outcomes, work remaining, blockers, and the next milestone. Never mark unverified work complete.

## Owner-requested direction and non-negotiable decisions

- Public repository: `https://github.com/Foday-Sall/DSA`; repo name `DSA`. The game title is **DSA DUNGEON**.
- The owner wants a public, collaborative repo where AI agents submit pull requests and the owner reviews/merges them. Contributors work from branches/forks; public status alone does not grant direct write access. Do not overwrite Manus `origin` or claim anonymous agents can push.
- Game runtime: JavaScript and Phaser 3 loaded from the CDN, plain browser scripts, no bundler/build step. Root `index.html` must run when opened directly in a browser; internet is needed for Phaser CDN.
- Mobile direction: prepare Capacitor Android packaging as a wrapper for the same static game. The current workspace has Java but no `ANDROID_HOME`; APK/AAB build/signing needs Android SDK/Android Studio and signing credentials.
- Character art: the owner explicitly chose real, free/open-license character art, overriding `GAME_SPEC.md`'s no-images rule for character sprites only. Keep arrays, indices, arrows, pointers, and trace visuals in Phaser Graphics. Preserve notices/credits; do not use recognizable copyrighted-franchise characters or retrieve assets before plan approval.
- New direct requests: make the game highly visual and game-like; add simple drag-and-drop, spoken explanations, music/SFX, and collectible **non-purchasable in-game coins**. Coins are not real money, payments, or crypto. Provide captions/replay/mute for speech/audio, and button/keyboard alternatives for every drag action.
- Audio: after plan approval, use audio with published free/open licenses and preserve the applicable notices/credits. Built-in browser/device speech synthesis is the planned voice option; keep written text available if voices are unsupported or muted.
- The learning game uses real JavaScript classes whose exact state is rendered. Also teach the uploaded Java assignment using Java signatures/snippets, line-by-line traces, and clear JS-to-Java explanations. The learner predicts before actions and gets explanations, never a punitive reset.

## Latest build order — `GAME_SPEC.md` is authoritative

Read the latest uploaded prompt verbatim. It supersedes conflicting older examples/ranks further below.

- After **every method**, put the requested `// ===== EXPLANATION ===== ... // =========================` comment block immediately after the method's closing brace. Every algorithm-logic line needs both a WHY and an IF-WRONG explanation.
- Implement Stack, Queue, LinkedList, Sorts, Search, and Recursion from scratch; no built-in DSA. Match exact lecture variables and operation order: stack starts `top=-1`, increments before storing and reads before decrement; queue starts `front=0,rear=-1,nItems=0`, wraps before insert-store and reads before remove-pointer movement; linked-list insert runs `newLink.next=first; first=newLink`; preserve Bubble, Selection, Insertion, Merge i/j/k, and Lomuto-last-pivot Quick.
- Keep the exact Phaser CDN URL in `GAME_SPEC.md`; no npm, bundler, or build command for browser play. Every milestone must leave `index.html` runnable.
- Build **one milestone at a time**, in order: M1 `index.html`/`main.js`/BootScene/MenuScene; M2 Stack class/scene; M3 Queue; M4 LinkedList; M5 Search plus Java `findSmallest`, palindrome, search/count, in-place removal; M6 Sorts plus Java Task/objects and assignment Bubble trace; M7 Merge; M8 Quick; M9 Recursion (factorial, Fibonacci, Hanoi); M10 Boss; M11 World hub. No skipping ahead; assignment content stays inside M5/M6, no extra milestone.
- At every milestone end: test the direct `index.html`; update this file's status board and dated log; publish the code and handoff to the public repo; deliver **What you just learned** (3 bullets), exact **Test it yourself** action/result, **Assignment link**, and **Check your understanding** (2 Q&A); then STOP until the learner says **“next.”**
- The user also asks for drag/drop where useful, visual before/after array values and indices, optional narrated voice explanations, sound/music, real character art, and non-purchasable learning coins. Keep accessible text/captions and keyboard/button alternatives. Use licensed character/audio assets only after plan approval.
- Use the exact sample arrays, logs, error messages, Boss pass mark, and rank ranges from `GAME_SPEC.md`; when earlier text in this file differs, follow `GAME_SPEC.md`.

## Earlier detailed room and Java requirements

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
4. Every scene uses `askPredict(question, options, correctIndex, explanation)` before executing an action whenever possible; then animate confirmation/correction.
5. Color key: GREEN = add/push/insert; ORANGE = remove/pop/delete; BLUE = pointer variable; RED = error/overflow/underflow. Quicksort pivot is gold. Correct prediction flashes green; incorrect prediction flashes orange and explains without penalty.
6. Each room has 3 rounds: easy, medium, hard. Each correct prediction is worth +10; score is based on correct predictions. Save score in `localStorage` per room.
7. `BossScene`: 20 multiple-choice questions plus 5 live traces mixed across all topics; 60 seconds per question. Grades: O(1) Grandmaster, O(n) Knight, O(n²) Squire, O(2ⁿ) Cursed.

### Room details

- **Stack:** vertical container with plates. Controls: Push(x), Pop, Peek, IsEmpty, IsFull; input for x. Predict resulting `top` before push/pop with 3 choices. Show top index arrow and grey popped cells. Overflow/underflow = red flash/message. Hard round pushes letters `J A V A` left-to-right and pops to show `A V A J`.
- **Queue:** circular ring of 5 slots and flat same-array view; front orange arrow, rear green arrow, `nItems` badge. Controls Insert(x), Remove, Peek, Size. Show wraparound when rear passes 4 to 0 with curved arrow. Ask exactly `after insert(60) with rear=4, where does rear point?` with choices `0`, `4`, `5`, or `error`. Overflow when full, underflow when empty. Hard round predicts BFS visit order in a small tree.
- **Linked list:** rounded nodes, `next` arrows, `null`; controls InsertFirst(x), DeleteFirst, Find(key), Delete(key), Display. Show `first`/head movement and `previous`+`current` during keyed delete. Predict new first. Hard round maps stack push to insertFirst and pop to deleteFirst.
- **Search:** number boxes and a magnifier drawn with Phaser Graphics. Linear search counts cell inspections and prints `Records inspected: X`; binary search on sorted array shows left/right/mid and `mid = left + (right-left)/2`. Ask how many inspections linear search of `9` takes and which midpoint is checked first. Hard round searches Student objects by matric with visible fields. Include Java assignment firstIndexOf, lastIndexOf, countOccurrences, zero-based indices, and target-not-found `-1`.
- **Sort:** Bubble, Selection, Insertion. Visual bars. Controls algorithm choice, Step, Auto-play, Reset. Show comparisons/swaps. Bubble highlights adjacent pair; Selection shows min-so-far/current; Insertion lifts key and shifts right. Ask after the first Bubble pass on `{6,3,8,2,5}`. Hard round sorts products by stock value descending, tie `product_id` ascending. Time via `performance.now()`; explain warm-ups and five timed runs.
- **Merge:** split array down to single cells, merge back; show i/j/k; predict next value from left[i] or right[j]; show leftover-copy loop.
- **Quick:** Lomuto partition, last element pivot/gold, i blue, j red; compare `a[j]` to pivot, swap when `<=`, advance; after loop swap `a[i+1]` with pivot, mark pivot final, recurse on subarrays; base case size 0/1 skips. Ask `does j=3 swap? (7 vs 2)` yes/no, and where the pivot lands.
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
| Latest prompt `GAME_SPEC.md` | Done | Copied verbatim from the owner's attachment; SHA-256 matched before publishing. |
| Revised `plan.md` | Draft | Includes the Java assignment, eleven milestones, licensed character art, drag/drop, voice/audio and in-game coins; awaiting owner approval. |
| Public handoff (`AGENTS.md`, `plan.md`, `GAME_SPEC.md`) | Done | Latest docs are on public `main`; verify GitHub contents and inspect `git log` for the newest sync. |
| Character art source | Resolved by owner | Use free/open-license sprites for characters only; preserve credits. Search/retrieve after plan approval. |
| Voice/audio, drag/drop, collectible game coins | Planned, not built | Implement only after plan approval; coins are gameplay rewards, never real money. |
| `TODO.md` | Not started | Create only after owner approves the revised plan. |
| Phaser game / DSA classes / scenes / Trace Panel | Not started | After approval, deliver M1 only and wait for “next.” |
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
- Cross-checked the full uploaded specification again and added the exact `askPredict(question, options, correctIndex, explanation)` interface and queue/search/quicksort example prompts to both planning documents.
- Verified the Manus `origin` is still configured and unchanged. The local `main` branch currently has no upstream; do not guess or change it before inspecting the project's official checkpoint state.
- Work completed: public agent handoff and detailed plan only. Game implementation is still not started.
- Next action: obtain owner approval of the revised plan; after approval create `TODO.md` and begin the game in milestones.

### 2026-11-02 — refreshed build-order and game-feel request

- The owner supplied an updated 260-line DSA DUNGEON build-order prompt. Copied it byte-for-byte to `GAME_SPEC.md`; SHA-256 matched the upload.
- Revised `plan.md` for the exact M1–M11 order, playable milestone boundaries, four end-of-milestone teaching items, line-by-line WHY/IF-WRONG method explanations, array visuals, drag/drop, optional spoken explanations, licensed music/SFX, and non-purchasable game coins. Kept all six Java assignment topics in M5/M6.
- Updated `AGENTS.md` to make `GAME_SPEC.md` the source of truth, refresh status, preserve the public PR workflow, and require a public handoff update before each stop.
- Conflict remains unresolved: detailed prompt says Phaser Graphics only/no images; later direct user request asks for royalty-free character assets. No asset search/retrieval, dependencies, app code, or gameplay has started.
- Next: publish the updated spec/plan/handoff, then ask the owner to resolve the character-art choice and approve this revised plan. After approval, create `TODO.md`, implement M1 only, test it, update/push the handoff, and wait for “next.”

### 2026-11-02 — refreshed specification and plan synced

- Added `GAME_SPEC.md` as a verbatim 260-line copy of the latest user prompt; its SHA-256 matched the uploaded file (`46700181a5fa05785be3a3bb7235df059e5a17da80738c87709a7d76275acac1`).
- Updated `plan.md` and `AGENTS.md` with milestone-by-milestone delivery, stop/wait for “next,” direct-file playability, WHY/IF-WRONG method comments, visual drag/drop, voice/audio, coins, and the open character-art conflict.
- Pushed documentation commit `2103be4` to public `github/main`; GitHub confirmed the repository is public and its root contains `AGENTS.md`, `GAME_SPEC.md`, and `plan.md`. `ls-remote` matched the local `HEAD` at verification.
- No gameplay code, asset retrieval, TODO, dependency install, tests, Capacitor wrapper, or APK has been started.
- Current blocker: owner must choose Graphics-only characters versus a royalty-free sprite exception and approve the revised plan.
- Next action after the owner's decision/approval: create `TODO.md`, implement M1 only, verify the menu runs from `index.html`, update/push this handoff, provide the four milestone wrap-up sections, and wait for “next.”


### 2026-11-02 — character art choice confirmed

- The owner clarified: use real characters. This explicitly overrides the prompt's no-images rule for character sprites only; keep data structures, array cells, indices, pointers, and algorithm traces in Phaser Graphics.
- Plan/handoff now specify free/open-license or public-domain character assets with preserved license notices/credits, not recognizable copyrighted-franchise characters.
- No game assets have been searched for or retrieved because the revised plan still needs explicit approval. No game implementation has started.
- Next: ask the owner to approve the complete revised plan. After approval, create `TODO.md`, search the approved asset catalog, implement M1 only, verify it runs, publish the handoff, provide the four required milestone wrap-up sections, and wait for “next.”


### 2026-11-02 — character choice synced to public repo

- Updated `plan.md` and `AGENTS.md` to record the owner's choice of real free/open-license character sprites as a narrow exception to the no-images prompt; kept DSA state visuals in Phaser Graphics.
- Committed as `2adb0e7` and pushed to public `github/main`. Verification confirmed the repo is public, contains `AGENTS.md`, `GAME_SPEC.md`, and `plan.md`, and the remote ref matched the local commit. `git diff --check` passed.
- No assets were searched/retrieved and no implementation started; the full plan still awaits explicit approval.
- Next: ask for plan approval. If approved, create `TODO.md` and implement only M1, then test, update/push this log, present the required learning wrap-up, and wait for “next.”
