import { getCurrentLevel, getLevelChecker, incrementLevel} from "../level.js";
import { getScore, incrementScore} from "../score.js";

const GAME_ID = window.GAME_CONFIG.GAME_ID;
const checker = getLevelChecker();

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

const game = new Phaser.Game(config);

function create() {
  scoreText = this.add.text(20, 20, "Score: " + getScore(), {
    fontSize: "24px",
    fill: "#fff"
  });

  box = this.add.rectangle(200, 300, 100, 100, 0xff0000).setInteractive();

  box.on("pointerdown", () => {
    incrementScore();
    
    let score = getScore();
    scoreText.setText("Score: " + score);

    if (checker.succeed({ score })) {
      const level = getCurrentLevel();
      incrementLevel();
      window.parent.postMessage({ type: "clear", score, level: level , gameId: GAME_ID }, "*");
    }
  });
}

function update() {}
