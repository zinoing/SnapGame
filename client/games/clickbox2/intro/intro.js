const API_BASE = window.SERVER_CONFIG.BASE_URL;
const USER_ID = window.USER_ID.BASE_ID;
const GAME_ID = window.GAME_CONFIG.GAME_ID;

const gameNameEl = document.getElementById("game-name");
const gameDescriptionEl = document.getElementById("game-description");
const gameBannerEl = document.getElementById("game-banner");
const coinCostEl = document.getElementById("coin-cost");
const baseRewardEl = document.getElementById("base-reward");
const playButton = document.getElementById("play-button");

const imagePath = `/games/${GAME_ID}/assets/intro-background.jpg`;

async function fetchGame() {
  const res = await fetch(`${API_BASE}/api/game/${GAME_ID}`);
  if (!res.ok) throw new Error("Game not found");
  return await res.json();
}

async function getUserCoins() {
  const res = await fetch(`${API_BASE}/api/user/${USER_ID}/coins`);
  if (!res.ok) {
    throw new Error("Failed to fetch user coins");
  }
  const data = await res.json();
  return data.coins;
}

async function deductUserCoins(amount) {
  const currentCoins = await getUserCoins(USER_ID);
  const newCoins = currentCoins - amount;

  const res = await fetch(`${API_BASE}/api/user/${USER_ID}/coins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      coins: newCoins
    })
  });


  if (!res.ok) {
    throw new Error("Failed to update user coins");
  }
}

async function initIntro() {
  try {
    const game = await fetchGame();
    const userCoins = await getUserCoins();

    gameNameEl.textContent = game.name;
    gameDescriptionEl.textContent = "Click the blue box!";

    coinCostEl.textContent = game.play_cost;
    baseRewardEl.textContent = game.base_reward || 0;

    gameBannerEl.style.backgroundImage = `url('${imagePath}')`;

    if (userCoins < game.play_cost) {
      playButton.disabled = true;
      playButton.textContent = "Not enough coins";
    }

    playButton.onclick = async () => {
      await deductUserCoins(game.play_cost);
      if (window.parent !== window) {
        window.parent.postMessage({
          type: "play",
          score: 0,
          level: 0,
          gameId: GAME_ID
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
