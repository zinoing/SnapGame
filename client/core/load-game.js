import { createInteractionIcons } from "../ui/interaction-ui.js";
export { currentGameIndex, currentLevelIndex, gameList };

const gameList = [
  {
    id: "clickbox1",
    name: "Click the Box",
    levels: [
      "games/clickbox1/intro/intro.html",
      "games/clickbox1/level1/index.html",
      "games/clickbox1/level2/index.html",
      "games/clickbox1/level3/index.html"
    ]
  },
  {
    id: "clickbox2",
    name: "Click the Box",
    levels: [
      "games/clickbox2/intro/intro.html",
      "games/clickbox2/level1/index.html",
      "games/clickbox2/level2/index.html",
      "games/clickbox2/level3/index.html"
    ]
  }
];
const userLikes = [];
const userFavorites = [];

const gameOrder = Array.from({ length: gameList.length }, (_, i) => i);
let currentIndex = 0;
let currentGameIndex = 0;
let currentLevelIndex = 0;

export function initGameList() {
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
  
  const interactionIcons = createInteractionIcons(game.id, userLikes, userFavorites);
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