class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.scene.start('MenuScene');
  }

  // ===== EXPLANATION =====
  // Line 1: this.scene.start('MenuScene');
  //   WHY: BootScene is the safe first scene and hands control to the menu.
  //   IF WRONG: the game would remain on an empty boot scene and the player
  //             would have no way to start learning.
  // =========================
}
