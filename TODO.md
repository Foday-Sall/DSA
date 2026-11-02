# DSA Dungeon — implementation handoff

This file is the working checklist for the next agent. Keep it current after every milestone and before stopping.

## Completed

### M1 — Browser gateway
- [x] `index.html` opens the game directly and loads Phaser 3.80.1 from the CDN before local scripts.
- [x] `main.js` creates a Phaser game with a dark `#0b1020` background, FIT scaling, and registered `BootScene`/`MenuScene`.
- [x] `scenes/BootScene.js` starts `MenuScene`.
- [x] `scenes/MenuScene.js` displays “DSA DUNGEON”, a Start button, an Instructions button, keyboard hints, and an honest M1 status message.
- [x] Menu interactions work with mouse/touch and keyboard (`ENTER`, `I`, `ESC`).
- [x] M1 source includes the required explanation blocks for its algorithm/UI logic.

### M2 — The Plate Tower

- [x] Add `dsa/Stack.js` from scratch with `top = -1`, max size 5, push (`++top` before storing), pop (read before `--top`), peek, reset, and line-by-line WHY/IF-WRONG explanations.
- [x] Add `scenes/StackScene.js` with the plate tower, PUSH/POP/PEEK/RESET controls, prediction before every push/pop, overflow/underflow feedback, blue top pointer, and visible grey/struck-through popped cells.
- [x] Keep a live trace panel showing `top`, `stackArray`, and `size`.
- [x] Log the exact lecture-order operation explanation in the console.
- [x] Register the scene without breaking the M1 menu.

### M3 — The Monster Line

- [x] Add `dsa/Queue.js` from scratch with `front=0`, `rear=-1`, `nItems=0`, five slots, wrap-before-store insert, read-before-move remove, peek, size, and explanations.
- [x] Add `scenes/QueueScene.js` with SPAWN/ATTACK/PEEK/RESET, prediction before spawn/attack, horizontal monster line, flat array view, wrap feedback, overflow/underflow, and trace panel.
- [x] Preserve the working menu and Plate Tower.

### M4 — The Chain

- [x] Add `dsa/LinkedList.js` with `first`, `current`, `previous`, `insertFirst`, `deleteFirst`, `find`, `display`, reset, and explanations.
- [x] Add `scenes/LinkedListScene.js` with INSERT, DELETE, FIND, RESET, prediction, node arrows, head/null display, and trace panel.

### M5 — The Detective

- [x] Add `dsa/Search.js` with linear search and binary search from scratch, inspection counts, and explanations.
- [x] Add `scenes/SearchScene.js` with LINEAR/BINARY/SEARCH/RESET, sorted ten-cell array, midpoint highlighting, result feedback, and trace panel.

## Next milestones (do not implement before the learner says `next`)

- [ ] M6 Sort: bubble/selection/insertion stepper plus the Java Task and bubble-trace lessons.
- [ ] M7 Merge: split/merge tree and `i`/`j`/`k` trace.
- [ ] M8 Quick: Lomuto partition using `[8,3,1,7,9,2]` and recursive subarrays.
- [ ] M9 Recursion: factorial, sum, Fibonacci, print order, memoization, and Hanoi call stack.
- [ ] M10 Boss: 20 mixed questions, 60-second timer per question, score/rank/localStorage.
- [ ] M11 World: arrow-key hub connecting rooms and completion stars.

## Constraints to preserve

- Open `index.html` directly; Phaser CDN only; no npm, bundler, backend, accounts, analytics, or real-money purchases.
- Keep DSA state visuals in Phaser Graphics. Character art is the narrow owner-approved exception, using only free/open-license or public-domain assets with credits.
- Every state-changing operation must ask for a prediction first.
- Every scene must show its required live trace panel and use high-contrast text at least 16px.
- Commit and push each completed milestone plus the updated `AGENTS.md` and this TODO before stopping.
