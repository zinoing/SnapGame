import { getLevelChecker } from "../levelChecker.js";
import { showDoubleOrDone } from "../ui/finish-ui.js";
import { showLevelMissionUI } from '../ui/level-ui.js';
import { getMissionDescription } from "../../../api/levelApi.js"

const START_X = 200;
const START_Y = 520;

let game = null;
let currentScore = 0;
let currentLevel = 0;
let levelChecker = null;
let description = "";

let bottle = null;
let isCharging = false;
let chargeStartTime = 0;
let chargePower = 0;
let resultIcons = [];
let resultIndex = 0;
let successCnt = 0;
let spring = null;
let readyToJudge = false;
let hasTouched = false;

let accumulatedRotation = 0;
let previousAngle = 0;
let settledFrames = 0;
let isSettled = false;
let postSettleHoldFrames = 0;

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 600,
  backgroundColor: 0xF3F2EF,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 1 },
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
  const { type, level} = event.data;
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

function resetBottle(scene) {
  if(bottle) {
    bottle.destroy();
  }

  const { Bodies, Body } = Phaser.Physics.Matter.Matter;

  const mainBody = Bodies.rectangle(0, -130, 100, 500, {
    mass: 10,
    chamfer: { radius: 40 }
  });

  const base = Bodies.rectangle(0, 0, 250, 300, {
    mass: 10,
    friction: 0.6,
    restitution: 0,
    chamfer: { radius: 40 }
  });

  const weight = Bodies.rectangle(0, 0, 250, 100, {
    mass: 50,
    friction: 0.6,
    restitution: 0,
    chamfer: { radius: 40 }
  });

  const compoundBody = Body.create({
    parts: [mainBody, base, weight],
    frictionAir: 0.01,
    restitution: 0,
  });

  Body.setPosition(compoundBody, { x: START_X, y: START_Y - 200 });
  Body.setInertia(compoundBody, 5000);

  bottle = scene.matter.add.sprite(START_X, START_Y - 50, 'bottle');
  bottle.setExistingBody(compoundBody);
  bottle.setOrigin(0.5, 0.7);
  bottle.setScale(0.2);

  accumulatedRotation = 0;
  previousAngle = bottle.angle;

  scene.cameras.main.startFollow(bottle, true, 0.1, 0.1); 
  scene.cameras.main.setFollowOffset(0, 100); 
}

function resetSpring(scene) {
  if (spring) spring.destroy();
  spring = scene.matter.add.sprite(START_X, START_Y, 'spring', null, {
    collisionFilter: {
      category: 0x0002,
      mask: 0xFFFE
    }
  });
  spring.setOrigin(0.5, 0);
  spring.setScale(0.15, 0.15);
  spring.setRectangle(60, 80); 
}

function resetSetting() {
  hasTouched = false; 
}

function preload() {
  this.load.image('bottle', '../assets/bottle.png');
  this.load.image('spring', '../assets/spring.png');
  this.load.image('success', '../assets/success.png');
  this.load.image('fail', '../assets/fail.png');
  this.load.image('circle', '../assets/circle.png');
}

async function create() {
  description = await getMissionDescription(window.GAME_CONFIG.GAME_ID, currentLevel);
  showLevelMissionUI(description, () => {
  });
  resetSpring(this);
  resetBottle(this);
  resetSetting();

  this.input.on('pointerdown', () => {
    if (hasTouched) return; 
    if (bottle.body.velocity.y > 0.1) return;
    hasTouched = true; 
    isCharging = true;
    chargeStartTime = Date.now();
    this.tweens.add({
      targets: spring,
      scaleY: 0.08,
      duration: 500,
      ease: 'Power2'
    });
  });

  this.input.on('pointerup', () => {
    if (!isCharging) return;
    isCharging = false;
    readyToJudge = true;

    const duration = Date.now() - chargeStartTime;
    chargePower = Math.min(duration / 30, 20);

    spring.body.collisionFilter.mask = 0;
    spring.setVelocity(0, 5);  
    spring.setAngularVelocity(0.1);

    bottle.setVelocity(0, -chargePower);
    bottle.setAngularVelocity(Phaser.Math.Between(-3, 3) * 0.1);
  });

  const spacing = 60;
  const iconStartX = (config.width - (spacing * 4)) / 2;
  for (let i = 0; i < 5; i++) {
    const icon = this.add.image(iconStartX + i * spacing, 100, 'circle');
    icon.setScale(0.1);
    icon.setScrollFactor(0);
    resultIcons.push(icon);
  }

  const groundWidth = 4000; 
  const groundX = config.width / 2;

  const ground = this.matter.add.rectangle(groundX, 590, groundWidth, 20, {
    isStatic: true,
    collisionFilter: {
      category: 0x0001,
      mask: 0xFFFF 
    }
  });

  const groundGraphics = this.add.graphics();
  groundGraphics.fillStyle(0x888888, 1);
  groundGraphics.fillRect(0 - groundWidth / 2 + groundX, 580, groundWidth, 20);
}

async function update() {
  if (!bottle || bottle.y < 0) return;

  if (!isSettled) {
    let deltaRotation = Phaser.Math.Angle.ShortestBetween(previousAngle, bottle.angle);
    accumulatedRotation += Math.abs(deltaRotation);
    previousAngle = bottle.angle;
  }

  const vy = bottle.body.velocity.y;
  const ay = bottle.body.angularVelocity;

  const isVelocityLow = Math.abs(vy) < 0.1;
  const isAngularVelocityLow = Math.abs(ay) < 0.05;
  const isStable = bottle.y > 520 && isVelocityLow && isAngularVelocityLow;

  if (readyToJudge && isStable) {
    settledFrames++;
  } else {
    settledFrames = 0;
    postSettleHoldFrames = 0;
    isSettled = false;
  }

  if (settledFrames >= 60 && !isSettled) {
    isSettled = true;
  }

  if (isSettled) {
    if (isStable) {
      postSettleHoldFrames++;
    } else {
      postSettleHoldFrames = 0;
    }
  }

  if (postSettleHoldFrames >= 120) {
    readyToJudge = false;

    const angle = (bottle.angle % 360 + 360) % 360;
    const enoughSpin = accumulatedRotation >= 360;
    const upright = angle < 20 || angle > 340;
    const isSuccess = upright && enoughSpin;

    const iconKey = isSuccess ? 'success' : 'fail';
    if (resultIndex < resultIcons.length) {
      resultIcons[resultIndex].setTexture(iconKey);
      resultIndex++;
    }

    if (isSuccess) successCnt++;

    if (!isSuccess) {
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

    if (levelChecker.succeed(successCnt)) {
      await showDoubleOrDone(currentLevel, false);
      return;
    }

    setTimeout(() => {
      resetSpring(this);
      resetBottle(this);
      resetSetting();
    }, 1000);
  }
}
