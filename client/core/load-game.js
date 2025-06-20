import { createInteractionIcons } from "../ui/interaction-ui.js";
import { loadGameList, getGameList } from "./gameListLoader.js";

export { currentGameIndex, currentLevelIndex };

let gameList = [];
let gameOrder = [];
let userLikes = [];

let currentIndex = 0;
let currentGameIndex = 0;
let currentLevelIndex = 0;

export async function initializeGameList() {
  gameList = await loadGameList();
  console.log("🎮 Loaded game list:", gameList);

  gameOrder = Array.from({ length: gameList.length }, (_, i) => i);
  shuffle(gameOrder);

  loadGame(gameOrder[0], 0);
}

export function shuffle() {
  for (let i = gameOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gameOrder[i], gameOrder[j]] = [gameOrder[j], gameOrder[i]];
  }
}

export function loadGame(gameIndex, levelIndex) {
  const game = gameList[gameIndex];
  const levelUrl = game.levels[levelIndex];

  const wrapper = document.createElement("div");
  wrapper.className = "game-container";
  wrapper.style.position = "relative";

  const iframe = document.createElement("iframe");
  iframe.src = `../${levelUrl}`;
  
  const interactionIcons = createInteractionIcons(game.id, userLikes);
  wrapper.appendChild(interactionIcons);

  wrapper.appendChild(iframe);

  const feed = document.getElementById("feed");
  if (!feed) {
    console.error("❌ feed container not found");
    return;
  }

  feed.innerHTML = "";
  feed.appendChild(wrapper);

  currentGameIndex = gameIndex;
  currentLevelIndex = levelIndex;
}

export function loadNextGame() {
  currentIndex = (currentIndex + 1) % gameOrder.length;
  loadGame(gameOrder[currentIndex], 0);
}

export function loadPreviousGame() {
  currentIndex = (currentIndex - 1 + gameOrder.length) % gameOrder.length;
  loadGame(gameOrder[currentIndex], 0);
}