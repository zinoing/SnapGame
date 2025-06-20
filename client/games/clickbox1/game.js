import { getLevelChecker } from "./level.js";

let currentLevel = 1;
const GAME_ID = window.GAME_CONFIG.GAME_ID;
const levels = createLevelChecker(currentLevel);

let score = 0;
let box;
let scoreText;

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  backgroundColor: "#1d1d1d",
  scene: {
    create,
    update
  }
};

function create() {
  scoreText = this.add.text(20, 20, "Score: " + score, {
    fontSize: "24px",
    fill: "#fff"
  });

  box = this.add.rectangle(200, 300, 100, 100, 0xff0000).setInteractive();

  box.on("pointerdown", () => {
    score++;
    scoreText.setText("Score: " + score);

    if (checker.succeed({ score })) {
      const level = currentLevel;
      incrementLevel();
      showDoubleOrFinish(score, () => {
        window.parent.postMessage({ type: "finish", score, level: level , gameId: GAME_ID }, "*");
      }, () => {
        window.parent.postMessage({ type: "double", score, level: level , gameId: GAME_ID }, "*");
      },level , false);
    }
  });
}

function update() {}
