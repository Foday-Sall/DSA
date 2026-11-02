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

## Next milestone: M2 — The Plate Tower

- [ ] Add `dsa/Stack.js` from scratch with `top = -1`, max size 5, push (`++top` before storing), pop (read before `--top`), peek, reset, and line-by-line WHY/IF-WRONG explanations.
- [ ] Add `scenes/StackScene.js` with the plate tower, character, PUSH/POP/PEEK/RESET controls, prediction before every push/pop, overflow/underflow feedback, blue top pointer, and visible grey/struck-through popped cells.
- [ ] Keep a live trace panel showing `top`, `stackArray`, and `size`.
- [ ] Log the exact lecture-order operation explanation in the console.
- [ ] Register the scene without breaking the M1 menu.
- [ ] Stop after M2 and wait for the learner to say `next`.

## Later milestones (do not implement before the learner says `next`)

- [ ] M3 Queue: circular five-slot queue with `front`, `rear`, `nItems`, wraparound, spawn/attack prediction.
- [ ] M4 LinkedList: first/current/previous pointers, insert/delete/find/display prediction.
- [ ] M5 Search: linear and binary search traces plus the Java search/removal assignment lessons.
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
