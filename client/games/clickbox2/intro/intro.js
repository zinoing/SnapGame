const USER_ID = window.USER_ID.BASE_ID;
const GAME_ID = window.GAME_CONFIG.GAME_ID;

import { getGameInfo } from "../../../api/gameApi.js";
import { getUserCoins, updateUserCoins } from "../../../api/userApi.js";

const gameNameEl = document.getElementById("game-name");
const gameDescriptionEl = document.getElementById("game-description");
const gameBannerEl = document.getElementById("game-banner");
const coinCostEl = document.getElementById("coin-cost");
const baseRewardEl = document.getElementById("base-reward");
const playButton = document.getElementById("play-button");

const imagePath = `/games/${GAME_ID}/assets/intro-background.jpg`;

async function initIntro() {
  try {
    const game = await getGameInfo(GAME_ID);
    const userCoins = await getUserCoins(USER_ID);

    gameNameEl.textContent = game.name;
    gameDescriptionEl.textContent = "Click the red box!";

    coinCostEl.textContent = game.play_cost;
    baseRewardEl.textContent = game.base_reward || 0;

    gameBannerEl.style.backgroundImage = `url('${imagePath}')`;

    if (userCoins < game.play_cost) {
      playButton.disabled = true;
      playButton.textContent = "Not enough coins";
    }

    playButton.onclick = async () => {
      if (window.parent !== window) {
        window.parent.postMessage({
          type: "play",
          score: 0,
          level: 0,
          gameId: GAME_ID, 
        }, "*");
      } else {
        console.warn("Not in iframe — staying on current page");
      }
    };
  } catch (err) {
    console.error("Intro load error:", err);
    alert("Failed to load game data.");
  }
}

initIntro();
