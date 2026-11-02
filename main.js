// DSA DUNGEON — Milestone 1
// Phaser is loaded by index.html before this file.

const gameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1280,
  height: 720,
  backgroundColor: '#0b1020',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720
  },
  scene: [BootScene, MenuScene]
};

new Phaser.Game(gameConfig);
