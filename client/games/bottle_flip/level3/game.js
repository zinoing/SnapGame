import { getLevelChecker } from "../levelChecker.js";
import { showDoubleOrDone } from "../ui/finish-ui.js";

const START_X = 200;
const START_Y = 500;

let game = null;
let currentScore = 0;
let currentLevel = 0;
let levelChecker = null;
let bottle = null;
let isFlipping = false;
let dragStartTime = 0;
let dragStartPos = null;

let resultIndex = 0;
let resultIcons = [];
let successCnt = 0;

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  backgroundColor: 0xF3F2EF,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 3 },
      debug: false
    }
  },
  scene: {
    preload,
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

function resetBottle(scene) {
  if (bottle) {
    bottle.destroy();
  }
  bottle = scene.matter.add.sprite(START_X, START_Y, 'bottle');
  bottle.setScale(0.2);
  bottle.setFriction(0.1);
  bottle.setFrictionAir(0.02);
  bottle.setBounce(0.4);
  bottle.setMass(2);
  bottle.setRectangle(40, 100);
  isFlipping = false;
}

function preload() {
  this.load.image('bottle', '../assets/bottle.png');
  this.load.image('circle', '../assets/circle.png');
  this.load.image('success', '../assets/success.png');
  this.load.image('fail', '../assets/fail.png');
}

function create() {
  bottle = this.matter.add.sprite(START_X, START_Y, 'bottle');
  bottle.setScale(0.2);
  bottle.setFriction(0.1);
  bottle.setFrictionAir(0.02);
  bottle.setBounce(0.4);
  bottle.setMass(1);
  bottle.setRectangle(40, 100);

  this.input.on('pointerdown', (pointer) => {
    if (isFlipping) return;
    dragStartTime = Date.now();
    dragStartPos = { x: pointer.x, y: pointer.y };
  });

  this.input.on('pointerup', (pointer) => {
    if (isFlipping || !dragStartPos) return;
    isFlipping = true;

    const dragDuration = Date.now() - dragStartTime;
    const dragEndPos = { x: pointer.x, y: pointer.y };

    const dx = dragEndPos.x - dragStartPos.x;
    const dy = dragEndPos.y - dragStartPos.y;

    const power = Math.min(dragDuration / 100, 15);

    const velocityY = dy * 0.05;
    bottle.setVelocity(0, -Math.abs(velocityY) * power);

    const rotationPower = Math.max(Math.abs(dx) / 50, 1); 
    const angularDirection = Math.sign(dx) * -1; 

    bottle.setAngularVelocity(angularDirection * rotationPower * 0.15);

    dragStartTime = 0;
    dragStartPos = null;
  });

  const totalIcons = 5;
  const spacing = 60;
  const iconStartX = (config.width - (spacing * (totalIcons - 1))) / 2;
  const iconStartY = 100;
  for (let i = 0; i < totalIcons; i++) {
    const icon = this.add.image(iconStartX + i * spacing, iconStartY, 'circle');
    icon.setScale(0.1);
    resultIcons.push(icon);
  }

  const groundGraphics = this.add.graphics();
  groundGraphics.fillStyle(0x888888, 1);
  groundGraphics.fillRect(0, 580, 400, 20);
  this.matter.add.rectangle(200, 590, 1000, 20, { isStatic: true });
}


function update() {
  if (!bottle || !isFlipping) return;

  const vy = bottle.body.velocity.y;
  const ay = bottle.body.angularVelocity;

  if (bottle.y > 520 && Math.abs(vy) < 0.5 && Math.abs(ay) < 0.2) {    
    const upright = Math.abs(bottle.angle % 360) < 20;
    const enoughSpin = accumulatedRotation >= 360;
    isFlipping = false;

    if (resultIndex < resultIcons.length) {
      let iconKey = null;
      if(upright && enoughSpin) {
        iconKey = 'success';
        ++successCnt;
      }
      else {
        iconKey = 'fail';
      }
      resultIcons[resultIndex].setTexture(iconKey).setVisible(true);
      resultIndex++;

      if (!(upright && enoughSpin)) {
        const remainingTries = resultIcons.length - resultIndex;
        const possibleSuccesses = successCnt + remainingTries;

        if (!levelChecker.succeed(possibleSuccesses)) {
          postToParent("FAIL", {
            gameId: window.GAME_CONFIG.GAME_ID,
            level: currentLevel,
            score: successCnt
          });
          return;
        }
      }
    }

    setTimeout(() => {
      if (upright && enoughSpin) {
        if (levelChecker && levelChecker.succeed(successCnt)) {
          window.parent.postMessage({ type: "CLEAR", score: currentScore, level: currentLevel, gameId: GAME_ID }, "*");
        }
      }

      resetBottle(this);
    }, 1000);
  }
}