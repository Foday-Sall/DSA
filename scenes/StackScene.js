class StackScene extends Phaser.Scene {
  constructor() {
    super('StackScene');
    this.stack = new Stack(5);
    this.popped = [];
    this.message = 'Predict before every PUSH or POP.';
    this.messageColor = '#aebde6';
  }

  create() {
    this.cameras.main.setBackgroundColor('#0b1020');
    this.add.text(42, 30, 'THE PLATE TOWER', { fontSize: '34px', color: '#f4f7ff', fontFamily: 'Arial Black' });
    this.add.text(42, 76, 'Stack lesson • top moves first on push, value is read first on pop', { fontSize: '18px', color: '#aebde6' });
    this.traceText = this.add.text(790, 108, '', { fontSize: '20px', color: '#dbeafe', lineSpacing: 10, wordWrap: { width: 425 } });
    this.logText = this.add.text(790, 300, '', { fontSize: '17px', color: '#93c5fd', lineSpacing: 8, wordWrap: { width: 425 } });
    this.statusText = this.add.text(42, 590, this.message, { fontSize: '20px', color: this.messageColor, wordWrap: { width: 700 } });
    this.makeButton(74, 665, 'PUSH', '#4ade80', () => this.pushPrompt());
    this.makeButton(224, 665, 'POP', '#fb923c', () => this.popPrompt());
    this.makeButton(374, 665, 'PEEK', '#60a5fa', () => this.peek());
    this.makeButton(524, 665, 'RESET', '#aebde6', () => this.reset());
    this.add.text(1040, 670, 'ESC  Menu', { fontSize: '16px', color: '#8293bd' }).setOrigin(0.5);
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));
    this.logs = [];
    this.visualLayer = this.add.container();
    this.render();
  }

  makeButton(x, y, label, color, action) {
    const body = this.add.rectangle(x, y, 125, 52, 0x202e58).setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(color).color).setInteractive({ useHandCursor: true });
    this.add.text(x, y, label, { fontSize: '18px', color: '#f4f7ff', fontFamily: 'Arial Black' }).setOrigin(0.5);
    body.on('pointerover', () => body.setFillStyle(0x2d4179));
    body.on('pointerout', () => body.setFillStyle(0x202e58));
    body.on('pointerdown', action);

    // ===== EXPLANATION =====
    // Line 1: body.setInteractive(...);
    //   WHY: The visible control must also accept a touch or mouse action.
    //   IF WRONG: the button would be decoration instead of gameplay input.
    // Line 2: body.on('pointerdown', action);
    //   WHY: Pointer-down gives the button its requested operation.
    //   IF WRONG: players could not perform the stack lesson.
    // =========================
  }

  pushPrompt() {
    const valueText = window.prompt('PUSH value (number or letter):', String((this.stack.top + 2) * 10));
    if (valueText === null || valueText.trim() === '') return;
    const value = valueText.trim();
    const nextTop = this.stack.top + 1;
    const answer = window.prompt(`Prediction: after push(${value}), what will top become?\\n1) ${nextTop}\\n2) ${this.stack.top}\\n3) -1\\nType 1, 2, or 3.`);
    if (answer === null) return;
    if (Number(answer) !== 1) {
      this.setMessage(`Wrong prediction. top becomes ${nextTop} because ++top happens before storing.`, '#fb923c');
      return;
    }
    const result = this.stack.push(value);
    if (!result.ok) {
      this.setMessage('OVERFLOW: top == maxSize-1, cannot push.', '#f87171');
      return;
    }
    this.logs.unshift(`push(${value}): top ${result.oldTop}→${this.stack.top}; store at [${this.stack.top}]`);
    this.logs = this.logs.slice(0, 5);
    this.setMessage(`Correct +10. Stored ${value} at stackArray[${this.stack.top}].`, '#4ade80');
    this.render();
  }

  popPrompt() {
    const nextTop = this.stack.top - 1;
    const answer = window.prompt(`Prediction: after pop(), what will top become?\\n1) ${nextTop}\\n2) ${this.stack.top}\\n3) ${this.stack.top + 1}\\nType 1, 2, or 3.`);
    if (answer === null) return;
    if (Number(answer) !== 1) {
      this.setMessage(`Wrong prediction. top becomes ${nextTop} because pop reads first, then --top.`, '#fb923c');
      return;
    }
    const result = this.stack.pop();
    if (!result.ok) {
      this.setMessage('UNDERFLOW: top == -1, nothing to pop.', '#f87171');
      return;
    }
    this.popped.push(result.index);
    this.logs.unshift(`pop(): read [${result.index}]=${result.value}; top ${result.index}→${this.stack.top}`);
    this.logs = this.logs.slice(0, 5);
    this.setMessage(`Correct +10. ${result.value} popped; its old cell remains visible and grey.`, '#fb923c');
    this.render();
  }

  peek() {
    const value = this.stack.peek();
    this.setMessage(value === null ? 'PEEK: stack is empty.' : `PEEK: ${value} is at stackArray[${this.stack.top}].`, '#60a5fa');
  }

  reset() {
    this.stack.reset();
    this.popped = [];
    this.logs = [];
    this.setMessage('Reset: top is -1 and every cell is empty.', '#aebde6');
    this.render();
  }

  setMessage(text, color) {
    this.message = text;
    this.messageColor = color;
    this.statusText.setText(text).setColor(color);
  }

  render() {
    this.visualLayer.removeAll(true);
    const graphics = this.add.graphics();
    this.visualLayer.add(graphics);
    graphics.fillStyle(0x151f3d, 1).fillRoundedRect(42, 135, 620, 410, 24);
    graphics.lineStyle(2, 0x344b82, 1).strokeRoundedRect(42, 135, 620, 410, 24);
    for (let index = 0; index < this.stack.maxSize; index += 1) {
      const y = 485 - index * 63;
      const isActive = index <= this.stack.top;
      const wasPopped = this.popped.includes(index);
      const color = wasPopped ? 0x4b5563 : (isActive ? 0x2563eb : 0x253252);
      graphics.fillStyle(color, 1).fillRoundedRect(210, y, 300, 48, 12);
      graphics.lineStyle(2, index === this.stack.top ? 0x60a5fa : 0x52658f, 1).strokeRoundedRect(210, y, 300, 48, 12);
      this.visualLayer.add(this.add.text(90, y + 12, `index ${index}`, { fontSize: '17px', color: '#aebde6' }));
      const value = this.stack.stackArray[index] ?? '';
      const label = wasPopped ? `${value}  (popped)` : String(value);
      this.visualLayer.add(this.add.text(360, y + 12, label, { fontSize: '18px', color: wasPopped ? '#9ca3af' : '#f4f7ff' }).setOrigin(0.5, 0));
      if (wasPopped) graphics.lineStyle(3, 0xfb923c, 1).lineBetween(225, y + 24, 495, y + 24);
    }
    if (this.stack.top >= 0) {
      graphics.lineStyle(4, 0x60a5fa, 1).lineBetween(525, 485 - this.stack.top * 63 + 24, 610, 485 - this.stack.top * 63 + 24);
      this.visualLayer.add(this.add.text(618, 485 - this.stack.top * 63 + 11, '← top', { fontSize: '18px', color: '#60a5fa' }));
    }
    this.visualLayer.add(this.add.text(630, 515, 'top pointer', { fontSize: '16px', color: '#60a5fa' }).setOrigin(1, 0));
    this.visualLayer.add(this.add.text(810, 55, 'LIVE TRACE PANEL', { fontSize: '18px', color: '#4ade80', fontFamily: 'Arial Black' }));
    this.traceText.setText(`top = ${this.stack.top}\\nstackArray = [${this.stack.stackArray.map((value, index) => this.popped.includes(index) ? `${value}*` : (value ?? ' ')).join(', ')}]\\nsize = ${this.stack.top + 1} / ${this.stack.maxSize}\\n\\nInvariant: top == -1 means empty`);
    this.logText.setText(`RECENT LOG\\n${this.logs.length ? this.logs.join('\\n') : 'No push/pop actions yet.'}`);
  }

  // ===== EXPLANATION =====
  // Line 1: const graphics = this.add.graphics();
  //   WHY: Graphics redraws the stack cells from the actual Stack instance.
  //   IF WRONG: the lesson could show a fake visual state unrelated to code.
  // Line 2: const isActive = index <= this.stack.top;
  //   WHY: Cells at or below top are logically active in the tower.
  //   IF WRONG: the player could not see which array values are in the stack.
  // Line 3: this.traceText.setText(...);
  //   WHY: The live variables make every push/pop state inspectable.
  //   IF WRONG: the central learning requirement, the Trace Panel, would be missing.
  // =========================
}
