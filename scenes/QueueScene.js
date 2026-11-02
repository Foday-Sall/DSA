class QueueScene extends Phaser.Scene {
  constructor() { super('QueueScene'); this.queue = new Queue(5); this.logs = []; }

  create() {
    this.cameras.main.setBackgroundColor('#0b1020');
    this.add.text(42, 30, 'THE MONSTER LINE', { fontSize: '34px', color: '#f4f7ff', fontFamily: 'Arial Black' });
    this.add.text(42, 76, 'Queue lesson • FIFO: first in, first out', { fontSize: '18px', color: '#aebde6' });
    this.trace = this.add.text(790, 100, '', { fontSize: '19px', color: '#dbeafe', lineSpacing: 9, wordWrap: { width: 430 } });
    this.logText = this.add.text(790, 300, '', { fontSize: '16px', color: '#93c5fd', lineSpacing: 7, wordWrap: { width: 430 } });
    this.status = this.add.text(42, 585, 'Predict before every SPAWN or ATTACK.', { fontSize: '20px', color: '#aebde6', wordWrap: { width: 700 } });
    this.makeButton(85, 665, 'SPAWN', 0x4ade80, () => this.spawn());
    this.makeButton(235, 665, 'ATTACK', 0xfb923c, () => this.attack());
    this.makeButton(385, 665, 'PEEK', 0x60a5fa, () => this.peek());
    this.makeButton(535, 665, 'RESET', 0xaebde6, () => this.reset());
    this.add.text(1050, 670, 'ESC  Menu', { fontSize: '16px', color: '#8293bd' }).setOrigin(0.5);
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('MenuScene'));
    this.render();
  }

  makeButton(x, y, label, color, action) {
    const body = this.add.rectangle(x, y, 125, 52, 0x202e58).setStrokeStyle(2, color).setInteractive({ useHandCursor: true });
    this.add.text(x, y, label, { fontSize: '17px', color: '#f4f7ff', fontFamily: 'Arial Black' }).setOrigin(0.5);
    body.on('pointerover', () => body.setFillStyle(0x2d4179)); body.on('pointerout', () => body.setFillStyle(0x202e58)); body.on('pointerdown', action);
  }

  spawn() {
    const value = window.prompt('SPAWN monster value:', String((this.queue.nItems + 1) * 10)); if (value === null) return;
    const nextRear = this.queue.rear + 1 === this.queue.maxSize ? 0 : this.queue.rear + 1;
    const answer = window.prompt(`Prediction: after spawn(${value}), where will rear point?\n1) ${nextRear}\n2) ${this.queue.rear}\n3) front\nType 1, 2, or 3.`); if (answer === null) return;
    if (Number(answer) !== 1) return this.say(`Wrong. rear advances and wraps before storage to ${nextRear}.`, '#fb923c');
    const result = this.queue.insert(value); if (!result.ok) return this.say('OVERFLOW: nItems == maxSize, queue full.', '#f87171');
    this.logs.unshift(`insert(${value}): rear→${result.index}; nItems++`); this.logs = this.logs.slice(0, 5); this.say(`Correct +10. Monster joined at slot ${result.index}.`, '#4ade80'); this.render();
  }

  attack() {
    const nextFront = this.queue.front + 1 === this.queue.maxSize ? 0 : this.queue.front + 1;
    const answer = window.prompt(`Prediction: after ATTACK, where will front point?\n1) ${nextFront}\n2) ${this.queue.front}\n3) rear\nType 1, 2, or 3.`); if (answer === null) return;
    if (Number(answer) !== 1) return this.say(`Wrong. front moves after reading to ${nextFront}.`, '#fb923c');
    const result = this.queue.remove(); if (!result.ok) return this.say('UNDERFLOW: nItems == 0, queue empty.', '#f87171');
    this.logs.unshift(`remove(): read [${result.index}]=${result.value}; front→${this.queue.front}`); this.logs = this.logs.slice(0, 5); this.say(`Correct +10. Monster ${result.value} attacked from the front.`, '#fb923c'); this.render();
  }

  peek() { this.say(this.queue.peek() === null ? 'PEEK: queue is empty.' : `PEEK: ${this.queue.peek()} is next at front ${this.queue.front}.`, '#60a5fa'); }
  reset() { this.queue.reset(); this.logs = []; this.say('Reset: front=0, rear=-1, nItems=0.', '#aebde6'); this.render(); }
  say(text, color) { this.status.setText(text).setColor(color); }

  render() {
    if (this.layer) this.layer.destroy(); this.layer = this.add.container();
    const graphics = this.add.graphics(); this.layer.add(graphics); graphics.fillStyle(0x151f3d, 1).fillRoundedRect(42, 135, 680, 390, 24); graphics.lineStyle(2, 0x344b82, 1).strokeRoundedRect(42, 135, 680, 390, 24);
    for (let index = 0; index < 5; index += 1) {
      const x = 75 + index * 125; const occupied = this.queue.queueArray[index] !== null; const active = occupied ? 0x2563eb : 0x253252;
      graphics.fillStyle(active, 1).fillCircle(x + 45, 270, 42); graphics.lineStyle(2, index === this.queue.front ? 0xfb923c : 0x52658f, 1).strokeCircle(x + 45, 270, 42);
      this.layer.add(this.add.text(x + 45, 258, occupied ? '●' : '·', { fontSize: '24px', color: '#f4f7ff' }).setOrigin(0.5));
      this.layer.add(this.add.text(x + 45, 325, `[${index}] ${occupied ? this.queue.queueArray[index] : 'empty'}`, { fontSize: '16px', color: '#dbeafe' }).setOrigin(0.5));
    }
    this.layer.add(this.add.text(72, 390, `front → [${this.queue.front}]`, { fontSize: '18px', color: '#fb923c' }));
    this.layer.add(this.add.text(420, 390, `rear → [${this.queue.rear}]`, { fontSize: '18px', color: '#4ade80' }));
    this.layer.add(this.add.text(790, 50, 'LIVE TRACE PANEL', { fontSize: '18px', color: '#4ade80', fontFamily: 'Arial Black' }));
    this.trace.setText(`front = ${this.queue.front}\nrear = ${this.queue.rear}\nnItems = ${this.queue.nItems}\nqueueArray = [${this.queue.queueArray.map((v) => v ?? ' ').join(', ')}]\n\nWraparound: rear/front return to index 0`);
    this.logText.setText(`RECENT LOG\n${this.logs.length ? this.logs.join('\n') : 'No queue actions yet.'}`);
  }
}
