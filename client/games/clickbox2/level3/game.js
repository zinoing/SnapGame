import { getLevelChecker } from "../levelChecker.js";

const GAME_ID = window.GAME_CONFIG.GAME_ID;
let levelChecker = null;

let box;
let scoreText;

let currentScore = 0;
let currentLevel = 0;

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

const game = new Phaser.Game(config);

function postToParent(type, payload = {}) {
  window.parent.postMessage({ type, ...payload }, "*");
}

window.addEventListener("DOMContentLoaded", () => {
  postToParent("REQUEST_GAME_STATE", { gameId: window.GAME_CONFIG.GAME_ID });
});

window.addEventListener("message", (event) => {
  const { type, level, score } = event.data;

  if (type === "INIT_GAME_STATE") {
    currentLevel = level ?? 0;
    currentScore = score ?? 0;

    if (scoreText) {
      scoreText.setText("Score: " + currentScore);
    }

    levelChecker = getLevelChecker(currentLevel);
  }
});

function create() {
  scoreText = this.add.text(20, 20, "Score: " + currentScore, {
    fontSize: "24px",
    fill: "#fff"
  });

  box = this.add.rectangle(200, 300, 100, 100, 0x0000ff).setInteractive();

  box.on("pointerdown", () => {
    currentScore++;
    scoreText.setText("Score: " + currentScore);

    if (levelChecker.succeed(currentScore)) {
      window.parent.postMessage({ type: "CLEAR", score: currentScore, level: currentLevel, gameId: GAME_ID }, "*");
    };
  })
}

function update() {}
