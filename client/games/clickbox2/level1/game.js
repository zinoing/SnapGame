const currentLevel = 1;

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

const game = new Phaser.Game(config);

function create() {
  scoreText = this.add.text(20, 20, "Score: " + score, {
    fontSize: "24px",
    fill: "#fff"
  });

  box = this.add.rectangle(200, 300, 100, 100, 0x0000CD).setInteractive();

  box.on("pointerdown", () => {
    score++;
    scoreText.setText("Score: " + score);

    if (score == 5) {
      showDoubleOrFinish(score, () => {
        window.parent.postMessage({ type: "finish", score, currentLevel }, "*");
      }, () => {
        window.parent.postMessage({ type: "double", score, currentLevel }, "*");
      }, currentLevel, false);
    }
  });
}

function update() {}
