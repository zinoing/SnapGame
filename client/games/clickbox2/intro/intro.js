import { getUserCoins } from "../../../api/userApi.js";
import { getGameInfo } from "../../../api/gameApi.js";
import { incrementLevelAttempt} from "../../../api/levelApi.js";

const gameNameEl = document.getElementById("game-name");
const gameDescriptionEl = document.getElementById("game-description");
const gameBannerEl = document.getElementById("game-banner");
const coinCostEl = document.getElementById("coin-cost");
const baseRewardEl = document.getElementById("base-reward");
const playButton = document.getElementById("play-button");

async function initIntro(userId) {
  try {
    const game = await getGameInfo(window.GAME_CONFIG.GAME_ID);
    console.log(game);
    const userCoins = await getUserCoins(userId);
    console.log(userCoins);

    console.log(game);
    console.log(userCoins);

    gameNameEl.textContent = game.name;
    gameDescriptionEl.textContent = game.description;

    coinCostEl.textContent = game.play_cost;
    baseRewardEl.textContent = game.base_reward || 0;

    const imagePath = `/games/${window.GAME_CONFIG.GAME_ID}/assets/intro-background.jpg`;
    gameBannerEl.style.backgroundImage = `url('${imagePath}')`;

    if (userCoins < game.play_cost) {
      playButton.disabled = true;
      playButton.textContent = "Not enough coins";
    }

    playButton.onclick = async () => {
      if (window.parent !== window) {
        window.parent.postMessage({
          type: "PLAY",
          gameId: window.GAME_CONFIG.GAME_ID, 
        }, "*");
        await incrementLevelAttempt(window.GAME_CONFIG.GAME_ID, 1);
      } else {
        console.warn("Not in iframe — staying on current page");
      }
    };
  } catch (err) {
    console.error("Intro load error:", err);
    alert("Failed to load game data.");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.parent.postMessage({ type: "INTRO_READY" }, "*");
});

window.addEventListener("message", (event) => {
  try {
    if (event.data.type === "SET_USER_ID") {
      const userId = event.data.userId;
      initIntro(userId);
    }
  } catch (err) {
    console.error("addEventListener error:", err);
  }
});
