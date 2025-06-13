let score = 0;

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

let scoreText;
let box;

function create() {
  scoreText = this.add.text(20, 20, "Score: 0", {
    fontSize: "24px",
    fill: "#fff"
  });

  box = this.add.rectangle(200, 300, 100, 100, 0xff0000).setInteractive();

  box.on("pointerdown", () => {
    score++;
    scoreText.setText("Score: " + score);

    if (score >= 5) {
    fetch("http://192.168.123.111:3000/api/game/result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: "test123",
      score: score,
      currentLevel: 1
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("🎉 성공! 다음 라운드로 진입합니다.");
      } else {
        alert("💥 실패! 코인 초기화됩니다.");
      }
    })
    .catch(err => {
    console.error("❌ fetch 실패:", err);
  });
}

  });
}

function update() {}
