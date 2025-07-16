import { getLevelChecker } from "../levelChecker.js";
import { showDoubleOrDone } from "../ui/finish-ui.js";
import { showLevelMissionUI } from "../ui/level-ui.js";
import { getMissionDescription } from "../../../api/levelApi.js";

let game = null;
let currentScore = 0;
let currentLevel = 0;
let levelChecker = null;
let description = "";

let startTime = null;
let timerText;
let stopButton;
let stopped = false;
let isMissionShown = false;
let decimalPlaces = 0;
let initialText = (0).toFixed(decimalPlaces);

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  backgroundColor: 0xF2ECE4,
  scene: {
    preload,
    create,
    update,
  },
};

window.addEventListener("message", (event) => {
  const { type, level } = event.data;
  if (type === "INIT_GAME_STATE") {
    currentLevel = level ?? 0;
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

function preload() {
  this.load.image("stopBtn", "../assets/stop-btn.png");
}

async function create() {
  description = await getMissionDescription(window.GAME_CONFIG.GAME_ID, currentLevel);
  showLevelMissionUI(description, () => {
    isMissionShown = true;
    startTime = game.scene.scenes[0].time.now;
  });

  timerText = this.add.text(200, 200, initialText, {
    fontFamily: "Orbitron",
    fontSize: "60px",
    color: "#111",
    fontStyle: "bold",
  }).setOrigin(0.5);

  this.add.rectangle(200, config.height / 2, 200, 3, 0xcccccc);

  stopButton = this.add.image(200, 400, "stopBtn")
    .setScale(0.25)
    .setInteractive();

  stopButton.on("pointerdown", () => {
    if (!stopped) {
      stopped = true;

      const elapsedStr = ((this.time.now - startTime) / 1000).toFixed(decimalPlaces);
      const elapsed = parseFloat(elapsedStr);
      
      if(levelChecker.succeed(elapsed)) {
        showDoubleOrDone(currentLevel, false);
        return;
      }
      else {
        postToParent("FAIL", {
          gameId: window.GAME_CONFIG.GAME_ID,
          level: currentLevel,
          score: null
        });
        return;
      }
    }
  });
}

function update() {
  if (isMissionShown && !stopped && startTime !== null) {
    const elapsed = (this.time.now - startTime) / 1000;
    timerText.setText(elapsed.toFixed(decimalPlaces));
    if(elapsed >= 10) {
      stopped = true;
      postToParent("FAIL", {
          gameId: window.GAME_CONFIG.GAME_ID,
          level: currentLevel,
          score: 20
        });
      return;
    }
  }
}
