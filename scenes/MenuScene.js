class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
    this.colors = {
      background: 0x0b1020,
      panel: 0x151f3d,
      panelEdge: 0x344b82,
      text: '#f4f7ff',
      muted: '#aebde6',
      green: '#4ade80',
      orange: '#fb923c',
      blue: '#60a5fa'
    };
  }

  create() {
    this.cameras.main.setBackgroundColor(this.colors.background);
    this.drawBackdrop();
    this.add.text(640, 104, 'DSA DUNGEON', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '64px',
      color: this.colors.text,
      stroke: '#111936',
      strokeThickness: 10
    }).setOrigin(0.5);
    this.add.text(640, 177, 'Learn the algorithm. Survive the trace.', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      color: this.colors.muted
    }).setOrigin(0.5);

    this.add.text(640, 278, 'FOUR ROOMS  •  CHOOSE YOUR CHALLENGE', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: '#93c5fd'
    }).setOrigin(0.5);
    this.createButton(640, 340, 300, 58, 'STACK: PLATE TOWER', this.colors.green, () => this.startGame());
    this.createButton(640, 414, 300, 58, 'INSTRUCTIONS', this.colors.blue, () => this.showInstructions());
    this.createButton(475, 505, 190, 54, 'QUEUE', this.colors.orange, () => this.openRoom('QueueScene'));
    this.createButton(690, 505, 190, 54, 'LINKED LIST', this.colors.blue, () => this.openRoom('LinkedListScene'));
    this.createButton(640, 570, 300, 54, 'SEARCH', this.colors.green, () => this.openRoom('SearchScene'));
    this.statusText = this.add.text(640, 625, 'Choose a room. Every room shows the live algorithm state.', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      color: this.colors.muted,
      align: 'center'
    }).setOrigin(0.5);
    this.add.text(640, 685, 'Keyboard: ENTER = Stack  •  I = Instructions', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      color: '#8293bd'
    }).setOrigin(0.5);

    this.input.keyboard.on('keydown-ENTER', () => this.startGame());
    this.input.keyboard.on('keydown-I', () => this.showInstructions());
  }

  drawBackdrop() {
    const graphics = this.add.graphics();
    graphics.fillStyle(this.colors.panel, 1);
    graphics.fillRoundedRect(330, 55, 620, 610, 28);
    graphics.lineStyle(2, this.colors.panelEdge, 1);
    graphics.strokeRoundedRect(330, 55, 620, 610, 28);
    graphics.fillStyle(0x1d2a52, 1);
    graphics.fillCircle(390, 117, 7);
    graphics.fillCircle(890, 117, 7);
    graphics.fillStyle(this.colors.orange, 0.85);
    graphics.fillTriangle(365, 622, 382, 587, 399, 622);
    graphics.fillTriangle(881, 622, 898, 587, 915, 622);
  }

  createButton(x, y, width, height, label, accent, onClick) {
    const button = this.add.container(x, y);
    const shadow = this.add.rectangle(0, 6, width, height, 0x050914, 0.8).setOrigin(0.5);
    const body = this.add.rectangle(0, 0, width, height, 0x202e58, 1)
      .setStrokeStyle(2, accent, 1)
      .setInteractive({ useHandCursor: true });
    const text = this.add.text(0, 0, label, {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '22px',
      color: this.colors.text
    }).setOrigin(0.5);
    button.add([shadow, body, text]);
    body.on('pointerover', () => body.setFillStyle(0x2d4179, 1));
    body.on('pointerout', () => body.setFillStyle(0x202e58, 1));
    body.on('pointerdown', onClick);

    // ===== EXPLANATION =====
    // Line 1: const body = this.add.rectangle(...).setInteractive(...);
    //   WHY: The rectangle is both the visible button and its pointer target.
    //   IF WRONG: text alone would not provide a reliable, roomy touch target.
    // Line 2: body.on('pointerdown', onClick);
    //   WHY: A click/tap must run the action selected by the player.
    //   IF WRONG: the button would look usable but would never open a door.
    // =========================
    return button;
  }

  startGame() {
    this.scene.start('StackScene');
  }

  // ===== EXPLANATION =====
  // Line 1: this.scene.start('StackScene');
  //   WHY: Start now opens the first playable DSA room delivered in M2.
  //   IF WRONG: the menu would not connect to the learning game.
  // =========================

  openRoom(sceneKey) {
    this.scene.start(sceneKey);
  }

  // ===== EXPLANATION =====
  // Line 1: this.scene.start(sceneKey);
  //   WHY: Each menu door starts the selected playable DSA room.
  //   IF WRONG: the new rooms would exist in code but remain unreachable.
  // =========================

  showInstructions() {
    const overlay = this.add.container(640, 360);
    const shade = this.add.rectangle(0, 0, 560, 390, 0x080d1c, 0.98)
      .setStrokeStyle(2, this.colors.blue, 1)
      .setInteractive();
    const title = this.add.text(0, -137, 'HOW TO PLAY', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '30px',
      color: this.colors.text
    }).setOrigin(0.5);
    const copy = this.add.text(0, -42,
      'Use the mouse or touch to choose a door.\\n\\n' +
      'ENTER  Start Game\\n' +
      'I  Instructions\\n' +
      'ESC  Close this panel\\n\\n' +
      'Every room will show the live variables\\n' +
      'so you can predict what the algorithm does.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '19px',
        color: this.colors.muted,
        align: 'center',
        lineSpacing: 9
      }).setOrigin(0.5);
    const close = this.add.text(0, 145, 'CLOSE', {
      fontFamily: 'Arial Black, Arial, sans-serif',
      fontSize: '20px',
      color: this.colors.orange,
      backgroundColor: '#202e58',
      padding: { left: 22, right: 22, top: 12, bottom: 12 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    overlay.add([shade, title, copy, close]);
    close.on('pointerdown', () => overlay.destroy());
    this.input.keyboard.once('keydown-ESC', () => overlay.destroy());
  }

  // ===== EXPLANATION =====
  // Line 1: const overlay = this.add.container(640, 360);
  //   WHY: A container keeps the instruction panel's pieces together.
  //   IF WRONG: closing the panel could leave stray text and shapes behind.
  // Line 2: close.on('pointerdown', () => overlay.destroy());
  //   WHY: Destroying the container removes every panel element at once.
  //   IF WRONG: repeated opens would stack old panels over the menu.
  // =========================
}
