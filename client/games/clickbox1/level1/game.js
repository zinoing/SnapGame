import { getLevelChecker } from "../levelChecker.js";

let game = null;
let currentScore = 0;
let currentLevel = 0;
let levelChecker = null;
let scoreText, box;

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

window.addEventListener("message", (event) => {
  const { type, level, score } = event.data;

  if (type === "INIT_GAME_STATE") {
    currentLevel = level ?? 0;
    currentScore = score ?? 0;
    levelChecker = getLevelChecker(currentLevel);

    game = new Phaser.Game(config);
  }
});

function postToParent(type, payload = {}) {
  window.parent.postMessage({ type, ...payload }, "*");
}

window.addEventListener("DOMContentLoaded", () => {
  postToParent("REQUEST_GAME_STATE", { gameId: window.GAME_CONFIG.GAME_ID });
});


function create() {
  scoreText = this.add.text(20, 20, "Score: " + currentScore, {
    fontSize: "24px",
    fill: "#fff"
  });

  box = this.add.rectangle(200, 300, 100, 100, 0xff0000).setInteractive();

  box.on("pointerdown", () => {
    currentScore++;
    scoreText.setText("Score: " + currentScore);

    if (levelChecker && levelChecker.succeed(currentScore)) {
      showDoubleOrDone(currentScore, () => {
        postToParent("DONE", {
          gameId: window.GAME_CONFIG.GAME_ID,
          level: currentLevel,
          score: currentScore
        });
      }, () => {
        postToParent("DOUBLE", {
          gameId: window.GAME_CONFIG.GAME_ID,
          level: currentLevel,
          score: currentScore
        });
      }, currentLevel, false);
    }
  });
}

function update() {}
